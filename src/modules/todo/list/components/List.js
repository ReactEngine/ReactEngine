var React = require('react-native')
var {Text, View, ListView} = React
var ControlledRefreshableListView  = require('react-native-refreshable-listview/lib/ControlledRefreshableListView')

// var ItemComponent = require('./Item')

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

var ListComponent = React.createClass({
  getInitialState() {
    return {dataSource: ds.cloneWithRows(this.props.items)}
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({dataSource: ds.cloneWithRows(nextProps.items)})
    }
  },
  renderItem(item) {
    return <View> 
          <Text>
              {item.text}
            </Text>
          </View>
  },
  render() {
      return <ControlledRefreshableListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        isRefreshing={this.props.isRefreshingItems}
        onRefresh={this.props.refreshItems}
        refreshDescription="Refreshing items"
      />
  }
})


export default ListComponent