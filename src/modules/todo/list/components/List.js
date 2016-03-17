/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

var React = require('react-native')
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform
} = React

import GiftedListView from '../../../common/components/GiftedListView'
import ItemComponent from './Item'

var ListComponent = React.createClass({
  
  /**
   * Render a row
   * @param {object} rowData Row data
   */
 _renderRowView(item) {
    return (
      <ItemComponent item={item}
      deleteItem={this.props.deleteItem}
      />
    )
  },
  
  /**
   * Render a separator between rows
   */
  _renderSeparatorView() {
    return (
      <View 
      style={customStyles.separator} 
      />
    )
  },
  
  render() {
    return (
        <GiftedListView
          rowView={this._renderRowView}
          
          onFetch={this.props.onFetch}
          initialListSize={12} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

          firstLoader={true} // display a loader for the first fetching
      
          pagination={false} // enable infinite scrolling using touch to load more

          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableViewHeight={50} // correct height is mandatory
          refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
          
          renderSeparator={this._renderSeparatorView}
          
          withSections={true} // enable sections
          sectionHeaderView={this._renderSeparatorView}
          
          PullToRefreshViewAndroidProps={{
            colors: ['#fff'],
            progressBackgroundColor: '#003e82',
          }}
        />
    )
  }
})


var customStyles = {
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  }
}

module.exports = ListComponent