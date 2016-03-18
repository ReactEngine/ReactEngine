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
import RowComponent from './Row'
import styles from './List.styles'


var ListComponent = React.createClass({
  
  /**
   * Render a row
   * @param {object} rowData Row data
   */
 _renderRowView(item) {
    return (
      <RowComponent item={item}
      deleteById={this.props.deleteById}
      />
    )
  },
  
  /**
   * Render a separator between rows
   */
   _renderSeparatorView() {
     return (
       <View 
       style={styles.separator} 
       />
     )
   },
  
  render() {
    return (
          <GiftedListView
            rowView={this._renderRowView}
            deleteById={this.props.deleteById}
            onFetch={this.props.onFetch}
            find={this.props.find}
            fetchedData={this.props.fetchedData}
            fetchOptions={this.props.fetchOptions}
            initialListSize={12}
            firstLoader={true}
          
            pagination={false}

            refreshable={true} 
            refreshableViewHeight={50} 
            refreshableDistance={40} 
            
            renderSeparator={this._renderSeparatorView}
            
            withSections={false}
            
            PullToRefreshViewAndroidProps={{
              colors: ['#fff'],
              progressBackgroundColor: '#003e82',
            }}
          />        
    )
  }
})

module.exports = ListComponent