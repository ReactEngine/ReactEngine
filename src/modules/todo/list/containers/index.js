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
import GiftedListView from '../../../common/components/GiftedListView'
import RowComponent from '../components/Row'
/**
 * Immutable
 */ 
import {Map} from 'immutable'

/**
 * Router
 */
import { Actions as routerActions }  from 'react-native-router-flux'

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

  componentWillReceiveProps(props) {
    console.log("container/setState:",props.todoList)
    // this.setState(props.todoList)
  }

  _onFetch(page = 1, options) {
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
    // ApiFactory().todo.find()
    //   .then((data) => {
        
    //   var rows = {}
    //   var header = 'Page_'+page
    //   rows[header] = data
    //   if (page === 2) {
    //     callback(rows, {
    //       allLoaded: true, // the end of the list is reached
    //     })        
    //   } else {
    //     console.log("rows",rows)
    //     callback(rows)
    //   }
    // })
  }
   /**
    * Render a row
    * @param {object} rowData Row data
    */
  _renderRowView(row) {
     // var deleteById = this.props.deleteById
     return (
       <RowComponent item={row}
       />
     )
   }
   
   /**
    * Render a separator between rows
    */
   _renderSeparatorView() {
     return (
       <View 
       style={styles.separator} 
       />
     )
   }

  render() { 
    console.log("container render,state:",this.state," props:",this.props)
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
          <GiftedListView
            rowView={this._renderRowView}
            deleteById={this.props.actions.deleteById}
            onFetch={this._onFetch}
            find={this.props.actions.find}
            fetchedData={this.props.todoList.data}
            fetchOptions={this.props.todoList.options}
            initialListSize={12} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

            firstLoader={true} // display a loader for the first fetching
          
            pagination={false} // enable infinite scrolling using touch to load more

            refreshable={true} 
            refreshableViewHeight={50} 
            refreshableDistance={40} 
            
            renderSeparator={this._renderSeparatorView}
            
            withSections={true} // enable sections
            
            PullToRefreshViewAndroidProps={{
              colors: ['#fff'],
              progressBackgroundColor: '#003e82',
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
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  }
})

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)

