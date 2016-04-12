'use strict';
var React = require('react-native');

var {
  NativeMethodsMixin,
  ReactNativeViewAttributes,
  NativeModules,
  StyleSheet,
  Platform,
  View,
  requireNativeComponent,
  ScrollView,
} = React;

var invariant = require('invariant');

import TableViewScrollResponder from './TableViewScrollResponder.js'

var RNTableViewConsts = NativeModules.UIManager.RNTableView.Constants;

var TABLEVIEW = 'tableview';

function extend(el, map) {
    for (var i in map)
        if (typeof(map[i])!='object')
            el[i] = map[i];
    return el;
}
var TableView = React.createClass({
    mixins: [NativeMethodsMixin, TableViewScrollResponder.Mixin],

    propTypes: {
        ...ScrollView.propTypes,

        onPress: React.PropTypes.func,
        onWillDisplayCell: React.PropTypes.func,
        onEndDisplayingCell: React.PropTypes.func,
        selectedValue: React.PropTypes.any, // string or integer basically
        autoFocus: React.PropTypes.bool,
        moveWithinSectionOnly: React.PropTypes.bool,
        json: React.PropTypes.string,
        textColor: React.PropTypes.string,
        detailTextColor: React.PropTypes.string,
        tintColor: React.PropTypes.string,
        footerLabel: React.PropTypes.string,
        headerFont: React.PropTypes.number,
        headerTextColor: React.PropTypes.string,
        footerTextColor: React.PropTypes.string,
        separatorColor: React.PropTypes.string,


        /**
         * The amount by which the content is inset from the edges
         * of the TableView. Defaults to `{0, 0, 0, 0}`.
         * @platform ios
         */
        contentInset: React.EdgeInsetsPropType,
        /**
         * Used to manually set the starting scroll offset.
         * The default value is `{x: 0, y: 0}`.
         * @platform ios
         */
        contentOffset: React.PointPropType,
        /**
         * The amount by which the scroll view indicators are inset from the
         * edges of the TableView. This should normally be set to the same
         * value as the `contentInset`. Defaults to `contentInset` or
         * `{0, 0, 0, 0}`.
         * @platform ios
         */
        scrollIndicatorInsets: React.EdgeInsetsPropType,
        tableViewCellEditingStyle: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            tableViewCellEditingStyle: RNTableViewConsts.CellEditingStyle.Delete,
        };
    },

    getInitialState: function() {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        var state = this._stateFromProps(nextProps);
        this.setState(state);
    },

    getScrollResponder: function() {
      return this;
    },

    // Translate TableView prop and children into stuff that RNTableView understands.
    _stateFromProps: function(props) {
        var sections = [];
        var additionalItems = [];
        var children = [];
        var json = props.json;

        // iterate over sections
        React.Children.forEach(props.children, function (section, index) {
            var items=[];
            var count = 0;
            if (section && section.type==TableView.Section) {
                let customCells = false;
                React.Children.forEach(section.props.children, function (child, itemIndex) {
                    var el = {};
                    extend(el, section.props);
                    extend(el, child.props);
                    if (el.children) {
                        el.label = el.children;
                    }
                    count++;
                    items.push(el);

                    if (child.type==TableView.Cell){
                        customCells = true;
                        count++;
                        var element = React.cloneElement(child, {key: index+" "+itemIndex, section: index, row: itemIndex});
                        children.push(element);
                    }

                });
                sections.push({
                    customCells,
                    label: section.props.label,
                    footerLabel: section.props.footerLabel,
                    footerHeight: section.props.footerHeight,
                    headerHeight: section.props.headerHeight,
                    items: items,
                    count: count
                });
            } else if (section && section.type==TableView.Item){
                var el = extend({},section.props);
                if (!el.label){
                    el.label = el.children;
                }
                additionalItems.push(el);
            } else if (section){
                children.push(section);
            }
        });
        this.sections = sections;
        return {sections, additionalItems, children, json};
    },

    render: function() {

      // if (__DEV__ && this.props.style) {
      //   var style = flattenStyle(this.props.style);
      //   var childLayoutProps = ['alignItems', 'justifyContent']
      //     .filter((prop) => style && style[prop] !== undefined);
      //   invariant(
      //     childLayoutProps.length === 0,
      //     'ScrollView child layout (' + JSON.stringify(childLayoutProps) +
      //       ') must by applied through the contentContainerStyle prop.'
      //   );
      // }

      var contentSizeChangeProps = {};
      if (this.props.onContentSizeChange) {
        contentSizeChangeProps = {
          onLayout: this._handleContentOnLayout,
        };
      }

      var alwaysBounceHorizontal =
        this.props.alwaysBounceHorizontal !== undefined ?
          this.props.alwaysBounceHorizontal :
          this.props.horizontal;

      var alwaysBounceVertical =
        this.props.alwaysBounceVertical !== undefined ?
          this.props.alwaysBounceVertical :
          !this.props.horizontal;

      var props = {
        ...this.props,
        alwaysBounceHorizontal,
        alwaysBounceVertical,
        style: ([styles.base, this.props.style]: ?Array<any>),
        onTouchStart: this.scrollResponderHandleTouchStart,
        onTouchMove: this.scrollResponderHandleTouchMove,
        onTouchEnd: this.scrollResponderHandleTouchEnd,
        onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
        onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
        onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
        onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
        onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
        onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
        onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
        onScroll: this.handleScroll,
        onResponderGrant: this.scrollResponderHandleResponderGrant,
        onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
        onResponderTerminate: this.scrollResponderHandleTerminate,
        onResponderRelease: this.scrollResponderHandleResponderRelease,
        onResponderReject: this.scrollResponderHandleResponderReject,
        sendMomentumEvents: (this.props.onMomentumScrollBegin || this.props.onMomentumScrollEnd) ? true : false,
      };

      var onRefreshStart = this.props.onRefreshStart;
      if (onRefreshStart) {
        // this is necessary because if we set it on props, even when empty,
        // it'll trigger the default pull-to-refresh behavior on native.
        props.onRefreshStart =
          function() { onRefreshStart && onRefreshStart(this.endRefreshing); }.bind(this);
      }

      var { decelerationRate } = this.props;
      if (decelerationRate) {
        props.decelerationRate = processDecelerationRate(decelerationRate);
      }

      var ScrollViewClass;
      if (Platform.OS === 'ios') {
        ScrollViewClass = RNTableView;
      } else if (Platform.OS === 'android') {
        if (this.props.horizontal) {
          ScrollViewClass = undefined;
        } else {
          ScrollViewClass = undefined;
        }
      }
      invariant(
        ScrollViewClass !== undefined,
        'ScrollViewClass must not be undefined'
      );

      var refreshControl = this.props.refreshControl;
      if (refreshControl) {
        if (Platform.OS === 'ios') {
          // On iOS the RefreshControl is a child of the ScrollView.
          return (
            <ScrollViewClass  {...props}
                              ref={TABLEVIEW}
                              sections={this.state.sections}
                              additionalItems={this.state.additionalItems}
                              tableViewStyle={TableView.Consts.Style.Plain}
                              tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                              tableViewCellEditingStyle={this.props.tableViewCellEditingStyle}
                              separatorStyle={TableView.Consts.SeparatorStyle.Line}
                              scrollIndicatorInsets={this.props.contentInset}
                              json={this.state.json}
                              onPress={this._onPress}
                              onChange={this._onChange}
                              onWillDisplayCell={this._onWillDisplayCell}
                              onEndDisplayingCell={this._onEndDisplayingCell}>

              <Header>{refreshControl}</Header>
              {this.state.children}
            </ScrollViewClass>
          );
        } else if (Platform.OS === 'android') {
          // On Android wrap the ScrollView with a AndroidSwipeRefreshLayout.
          // Since the ScrollView is wrapped add the style props to the
          // AndroidSwipeRefreshLayout and use flex: 1 for the ScrollView.
          // return React.cloneElement(
          //   refreshControl,
          //   {style: props.style},
          //   <ScrollViewClass {...props} style={styles.base} ref={SCROLLVIEW}>
          //     {contentContainer}
          //   </ScrollViewClass>
          // );
          return null;
        }
      }

      return (
        <ScrollViewClass  {...props}
                          ref={TABLEVIEW}
                          sections={this.state.sections}
                          additionalItems={this.state.additionalItems}
                          tableViewStyle={TableView.Consts.Style.Plain}
                          tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                          tableViewCellEditingStyle={this.props.tableViewCellEditingStyle}
                          separatorStyle={TableView.Consts.SeparatorStyle.Line}
                          scrollIndicatorInsets={this.props.contentInset}
                          json={this.state.json}
                          onPress={this._onPress}
                          onChange={this._onChange}
                          onWillDisplayCell={this._onWillDisplayCell}
                          onEndDisplayingCell={this._onEndDisplayingCell}>

          {this.state.children}
        </ScrollViewClass>
      );
        // return (
        //     // <View style={[{flex:1},this.props.style]}>
        //         <RNTableView
        //             ref={TABLEVIEW}
        //             style={[{flex:1},this.props.style]}
        //             sections={this.state.sections}
        //             additionalItems={this.state.additionalItems}
        //             tableViewStyle={TableView.Consts.Style.Plain}
        //             tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
        //             tableViewCellEditingStyle={this.props.tableViewCellEditingStyle}
        //             separatorStyle={TableView.Consts.SeparatorStyle.Line}
        //             scrollIndicatorInsets={this.props.contentInset}
        //             {...this.props}
        //             json={this.state.json}
        //             onPress={this._onPress}
        //             onChange={this._onChange}
        //             onWillDisplayCell={this._onWillDisplayCell}
        //             onEndDisplayingCell={this._onEndDisplayingCell}>
        //
        //             {this.state.children}
        //         </RNTableView>
        //     // </View>
        // );
    },

    _onPress: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onPress){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onPress(data);
        }
        if (this.props.onPress) {
            this.props.onPress(data);
        }
        event.stopPropagation();
    },
    _onChange: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onChange){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onChange(data);
        }
        if (this.props.onChange) {
            this.props.onChange(data);
        }
        event.stopPropagation();
    },
    _onWillDisplayCell: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.section] && this.sections[data.section].items[data.row] && this.sections[data.section].items[data.row].onWillDisplayCell) {
            this.sections[data.section].items[data.row].onWillDisplayCell(data);
        }
        if (this.props.onWillDisplayCell) {
            this.props.onWillDisplayCell(data);
        }
        event.stopPropagation();
    },
    _onEndDisplayingCell: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.section] && this.sections[data.section].items[data.row] && this.sections[data.section].items[data.row].onEndDisplayingCell) {
            this.sections[data.section].items[data.row].onEndDisplayingCell(data);
        }
        if (this.props.onEndDisplayingCell) {
            this.props.onEndDisplayingCell(data);
        }
        event.stopPropagation();
    },

    setNativeProps: function(props: Object) {
      this.refs[TABLEVIEW].setNativeProps(props);
    },

    endRefreshing: function() {
      RCTScrollViewManager.endRefreshing(
        React.findNodeHandle(this)
      );
    },

    /**
     * Returns a reference to the underlying scroll responder, which supports
     * operations like `scrollTo`. All ScrollView-like components should
     * implement this method so that they can be composed while providing access
     * to the underlying scroll responder's methods.
     */
    getScrollResponder: function(): ReactComponent {
      return this;
    },

    getScrollableNode: function(): any {
      return React.findNodeHandle(this.refs[TABLEVIEW]);
    },

    getInnerViewNode: function(): any {
      return React.findNodeHandle(this.refs[INNERVIEW]);
    },

    /**
     * Scrolls to a given x, y offset, either immediately or with a smooth animation.
     * Syntax:
     *
     * scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
     *
     * Note: The weird argument signature is due to the fact that, for historical reasons,
     * the function also accepts separate arguments as as alternative to the options object.
     * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
     */
    scrollTo: function(
      y?: number | { x?: number, y?: number, animated?: boolean },
      x?: number,
      animated?: boolean
    ) {
      if (typeof y === 'number') {
        console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
      } else {
        ({x, y, animated} = y || {});
      }
      // $FlowFixMe - Don't know how to pass Mixin correctly. Postpone for now
      this.getScrollResponder().scrollResponderScrollTo({x: x || 0, y: y || 0, animated: animated !== false});
    },

    /**
     * Deprecated, do not use.
     */
    scrollWithoutAnimationTo: function(y: number = 0, x: number = 0) {
      console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
      this.scrollTo({x, y, animated: false});
    },

    handleScroll: function(e: Object) {
      if (__DEV__) {
        if (this.props.onScroll && !this.props.scrollEventThrottle) {
          console.log(
            'You specified `onScroll` on a <ScrollView> but not ' +
            '`scrollEventThrottle`. You will only receive one event. ' +
            'Using `16` you get all the events but be aware that it may ' +
            'cause frame drops, use a bigger number if you don\'t need as ' +
            'much precision.'
          );
        }
      }
      if (Platform.OS === 'android') {
        if (this.props.keyboardDismissMode === 'on-drag') {
          dismissKeyboard();
        }
      }
      this.scrollResponderHandleScroll(e);
    },

    _handleContentOnLayout: function(e: Object) {
      var {width, height} = e.nativeEvent.layout;
      this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
    },
});

TableView.Item = React.createClass({
    propTypes: {
        value: React.PropTypes.any, // string or integer basically
        label: React.PropTypes.string,
    },

    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

TableView.Footer = React.createClass({
    getInitialState(){
        return {width:0, height:0}
    },
    render: function() {
        return <RNFooterView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}} {...this.props} componentWidth={this.state.width} componentHeight={this.state.height}/>
    },
});
var RNFooterView = requireNativeComponent('RNTableFooterView', null);

TableView.Header = React.createClass({
    getInitialState(){
        return {width:0, height:0}
    },
    render: function() {
        return <RNHeaderView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}} {...this.props} componentWidth={this.state.width} componentHeight={this.state.height}/>
    },
});
var RNHeaderView = requireNativeComponent('RNTableHeaderView', null);

TableView.Cell = React.createClass({
    getInitialState(){
        return {width:0, height:0}
    },
    render: function() {
        return <RNCellView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}} {...this.props} componentWidth={this.state.width} componentHeight={this.state.height}/>
    },
});
var RNCellView = requireNativeComponent('RNCellView', null);

TableView.Section = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
        footerLabel: React.PropTypes.string,
        arrow: React.PropTypes.bool,
        footerHeight: React.PropTypes.number,
        headerHeight: React.PropTypes.number,
    },

    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

var styles = StyleSheet.create({
    tableView: {
        // The picker will conform to whatever width is given, but we do
        // have to set the component's height explicitly on the
        // surrounding view to ensure it gets rendered.
        //height: RNTableViewConsts.ComponentHeight,
    },
});
TableView.Consts = RNTableViewConsts;

var RNTableView = requireNativeComponent('RNTableView', null);

module.exports = TableView;
