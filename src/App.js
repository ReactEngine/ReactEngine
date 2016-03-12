'use strict'

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React, {
  AppRegistry,
  Navigator,
  View,
  Text } from 'react-native'

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import RNRF, {
  Route,
  Schema,
  TabBar} from 'react-native-router-flux'

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
  Provider,
  connect } from 'react-redux'

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './configureStore'
import initialState from './initialState'

/**
 * ### containers
 *
 * All the top level containers
 *
 */
import startUp from './modules/startup/containers'
import userLogin from './modules/user/login/containers'
import userLogout from './modules/user/logout/containers'
import userRegister from './modules/user/register/containers'
import userForgotPassword from './modules/user/forgotPassword/containers'
import userProfile from './modules/user/profile/containers'
import todoList from './modules/todo/list/containers'
import todoAdd from './modules/todo/add/containers'

/**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
import Icon from 'react-native-vector-icons/FontAwesome'

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './modules/device/deviceActions'
import {setStore} from './modules/global/actions'



/**
 *  The version of the app but not  displayed yet
 */
var VERSION='0.0.1'


/**
* ## TabIcon
*
* Displays the icon for the tab w/ color dependent upon selection
*/
class TabIcon extends React.Component {
  render() {
    var color = this.props.selected ? 'FF3366' : 'FFB3B3'
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
      	<Icon style={{color: color}} name={this.props.iconName} size={30} />
      	<Text style={{color: color}}>{this.props.title}</Text>
      </View>
    )
  }
}

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {

  let AppComponent = React.createClass( {
    render() {

      const store = configureStore(initialState)

      //Connect w/ the Router
      const Router = connect()(RNRF.Router)

      // configureStore will combine reducers and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform))
      store.dispatch(setVersion(VERSION))
      store.dispatch(setStore(store))

      // setup the router table with App selected as the initial component
      return (
        <Provider store={store}>
      	  <Router hideNavBar={true}>
      	    <Schema name="modal"
                          sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

      	    <Schema name="floatFromRight"
                          sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>

      	    <Schema name="default" />

      	    <Schema name="tab"
                          type="switch"
                          icon={TabIcon} />

      	    <Route name="startUp"
                         component={startUp}
                         title="startUp"
                         initial={true}
            />

      	    <Route name="userLogin"
                         component={userLogin}
                         title="userLogin"
                         type="replace" />

      	    <Route name="userRegister"
                         component={userRegister}
                         title="userRegister"
                         type="replace" />

      	    <Route name="userForgotPassword"
                         component={userForgotPassword}
                         title="userForgotPassword"
                         type="replace" />

      	    <Route name="todoAdd"
                         component={todoAdd}
                         title="todoAdd"
                         Schema="floatFromRight"	/>

      	    <Route name="Tabbar" type="replace">
      	      <Router footer={TabBar} showNavigationBar={false}>

      	        <Route name="userLogout"
                     schema="tab"
                     title="logout"
                     iconName={"sign-out"}
                     hideNavBar={true}
                     component={userLogout}
                />

      	        <Route name="todoList"
                     schema="tab"
                     title="main"
                     iconName={"home"}
                     hideNavBar={true}
                     component={todoList}
                     initial={true}
                />

                <Route name="userProfile"
                     schema="tab"
                     title="profile"
                     iconName={"gear"}
                     hideNavBar={true}
                     component={userProfile}
                />

      	      </Router>
      	    </Route>

      	  </Router>
        </Provider>
      )
    }
  })

  AppRegistry.registerComponent('App', () => AppComponent)
}
