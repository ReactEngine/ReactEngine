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
import ItemComponent from '../components/Item'
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
    this.setState({
      list: props.todoList.list
    })
  }

  _onFetch(page = 1, callback, options) {
    const pageLength = 10 //每一个 page 有多少 item
    const skip = pageLength * (page-1)
    const filter = {
      skip:skip,
      limit:10,
      order:'updatedAt DESC'
    }

    this.find(filter)
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
    //     callback(rows)
    //   }
    // })
  }
   /**
    * Render a row
    * @param {object} rowData Row data
    */
  _renderRowView(item) {
     return (
       <ItemComponent item={item}
       deleteById={this.props.actions.deleteById}
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
            onFetch={this._onFetch}
            find={this.props.actions.find}

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

