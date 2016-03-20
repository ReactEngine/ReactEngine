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
      <RowComponent 
      item={item}
      key={item.id}
      actions={this.props.actions}
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
  onFetch(page = 1, options) {
    console.log("container/_onFetch page:",page," options:",options)
    const pageLength = 10 //每一个 page 有多少 item
    const skip = pageLength * (page-1)
    const filter = {
      skip:skip,
      limit:10,
      order:'updatedAt DESC'
    }
    options = _.assign({},options,{
      page:page
    })
    this.props.actions.find(filter,options)
  },
  render() {
    return (
          <GiftedListView
            rowView={this._renderRowView}
            onFetch={this.onFetch}

            actions={this.props.actions}

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