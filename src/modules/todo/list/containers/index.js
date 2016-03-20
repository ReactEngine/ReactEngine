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
import moduleActions from '../../common/actions'
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
    actions: bindActionCreators(actionUtils.getCreators(moduleActions), dispatch),
    dispatch
  }
}

class ListContainer extends Component {
  
  render() {
    console.log("======== list container render,state:",this.state," props:",this.props)
    var titleConfig = {
      title: "Todos"
    }
   var rightButtonConfig = {
      title: 'Add',
      handler: ()=>{
        routerActions.todoDetail()
        //改 detail 的 state
        this.props.actions.routerChange({
          fields:{}, title:"Add Todo"
        })
      }
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

          actions={this.props.actions}

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

