'use strict'
/*
 * ## Imports
 *  
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as asyncActions from '../actions/async'
import NavigationBar from 'react-native-navbar'
const ApiFactory = require('../../../../services/api').default
/**
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 * Router
 */
import { Actions as routerActions }  from 'react-native-router-flux'
import ListComponent from '../components/List'
/**
 * The components needed from React
 */
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


/**
 * Support for Hot reload
 * 
 */
const actions = [
  asyncActions  
]

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
      ...state
  }
}

/*
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```

 */
function mapDispatchToProps(dispatch) {

  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
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
  onRowPress(row){
    routerActions.todoDetail({data:row, title:row.text })
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
          deleteById={this.props.actions.deleteById}
          fetchedData={this.props.todoList.data}
          fetchOptions={this.props.todoList.options}
          onRowPress={this.onRowPress}
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

