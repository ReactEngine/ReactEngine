/**
 * # Main.js
 *  This is the main app screen
 *  
 */
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

/**
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 * Router
 */
import { Actions as routerActions }  from 'react-native-router-flux'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../../../common/components/Header'
import ListComponent from '../components/List'

/**
 * The components needed from React
 */
import React,
{ 	
  Component,
  StyleSheet,
  View,
  Text
}
from 'react-native'

/**
 * The platform neutral button
 */
const  Button = require('apsl-react-native-button')


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


/**
 * ## App class
 */
class ListContainer extends Component {
  
  render() {
    var titleConfig = {
      title: "Todos"
    }
    var rightButtonConfig = {
      title: 'Add',
      handler: routerActions.todoAdd
    }
    return(
      <View style={styles.container}>
          <NavigationBar
            title={ titleConfig }
            rightButton={ rightButtonConfig }
          />
        <ListComponent 
           items={[
              {
                "completed": true,
                "text": "todo1",
                "id": "644ca090-ebf0-11e5-81e1-a53b29f0d75f",
                "createdAt": "2016-03-17T03:29:01.000Z",
                "updatedAt": "2016-03-17T03:29:01.000Z"
              },
              {
                "completed": true,
                "text": "todo2",
                "id": "6fd5f740-ebf0-11e5-81e1-a53b29f0d75f",
                "createdAt": "2016-03-17T03:29:20.000Z",
                "updatedAt": "2016-03-17T03:29:20.000Z"
              },
              {
                "completed": true,
                "text": "todo3",
                "id": "72111a30-ebf0-11e5-81e1-a53b29f0d75f",
                "createdAt": "2016-03-17T03:29:24.000Z",
                "updatedAt": "2016-03-17T03:29:24.000Z"
              }
            ]}
           isRefreshingItems={false}
           refreshItems={()=>{debugger
              dispatch(this.props.actions.find())
           }}
         />
        
      </View>
    )
  }
}



var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF',
  },
  summary: {
    marginBottom:10,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  summaryText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3385ff',
    borderColor:  '#3385ff',
    marginLeft: 10,
    marginRight: 10    
  },
  navBar: {
    height: 64,
    backgroundColor: '#007aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  }
})
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)

