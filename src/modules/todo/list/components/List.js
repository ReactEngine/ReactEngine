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
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  _onFetch(page = 1, callback, options) {
    setTimeout(() => {
      var header = 'Header '+page
      var rows = {}
      rows[header] = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)]
      if (page === 2) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        })        
      } else {
        callback(rows)
      }
    }, 1000) // simulating network fetching
  },
  
  /**
   * Render a row
   * @param {object} rowData Row data
   */
 _renderRowView(item) {
    return (
      <ItemComponent item={{text:item}}/>
    )
  },
  
  /**
   * Render a separator between rows
   */
  _renderSeparatorView() {
    return (
      <View style={customStyles.separator} />
    )
  },
  
  render() {
    return (
        <GiftedListView
          rowView={this._renderRowView}
          
          onFetch={this._onFetch}
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