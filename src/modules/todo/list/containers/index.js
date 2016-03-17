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
const ApiFactory = require('../../../../services/api').default

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
  onFetch(page = 1, callback, options) {
    ApiFactory().todo.find()
      .then((data) => {
        
      var rows = {}
      var header = 'Page_'+page
      rows[header] = data
      if (page === 2) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        })        
      } else {
        callback(rows)
      }
    })
  }
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
          onFetch={this.onFetch}
          deleteItem={this.props.actions.deleteById}
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

