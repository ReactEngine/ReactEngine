'use strict'
import React,
{   
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Platform
}
from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const ApiFactory = require('../../../../services/api').default
import * as viewActions from '../actions'
import * as detailActions from '../../detail/actions'
import NavigationBar from 'react-native-navbar'
import * as actionUtils from '../../../../utils/action'
import { Actions as routerActions }  from 'react-native-router-flux'
import ListComponent from '../components/List'


function mapStateToProps(state) {
  return {
      ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionUtils.getCreators(viewActions), dispatch),
    detailActions: bindActionCreators(actionUtils.getCreators(detailActions), dispatch),
    dispatch
  }
}

class ListContainer extends Component {
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
    this.find(filter,options)
  }
  
  render() {
    console.log("======== container render,state:",this.state," props:",this.props)
    var titleConfig = {
      title: "Todos"
    }
   var rightButtonConfig = {
      title: 'Add',
      handler: routerActions.todoDetail
    }
    return(
      <View style={styles.container}>
        <NavigationBar
          title={ titleConfig }
          rightButton={ rightButtonConfig }
        />
        <ListComponent  
          titleConfig={titleConfig}
          rightButtonConfig={rightButtonConfig}
          onFetch={this.onFetch}
          find={this.props.actions.find}
          deleteById={this.props.detailActions.deleteById}
          changeDetailState={this.props.detailActions.routerChange}
          fetchedData={this.props.todoList.data}
          fetchOptions={this.props.todoList.options}
         />
       </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)

