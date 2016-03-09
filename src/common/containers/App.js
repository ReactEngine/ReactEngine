/**
 * # app.js
 *  **Note** a lot of this is boilerplate which is also in Auth &
 *  Profile
*
 *  After setting up the Redux actions, props and dispatch, this
 * class ```renders``` either the ```Auth``` or ```Tabbar```
 */
'use strict';
/*
 * ## Imports
 *  
 * Imports from redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Immutable Map
 */
import {Map} from 'immutable';

/**
 * Project imports
 */
const Auth = require('../../modules/auth/containers').default;
const Tabbar = require('./Tabbar').default;

/**
 * Project actions
 */
import * as authActions from '../../modules/auth/actions';
import * as deviceActions from '../../modules/device/actions';
import * as globalActions from '../../modules/global/actions';

/**
 * We only need React
 */
import React,
{ 

}
from 'react-native';

/**
 * We only have one state to worry about
 */

const {
  LOGIN_STATE_LOGOUT
} = require('../constants').default;

/**
 * ## Actions
 * 3 of our actions will be available as ```actions```
 */
const actions = [
  authActions,
  deviceActions,
  globalActions
];

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
      ...state
  };
};

/*
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```

 */
function mapDispatchToProps(dispatch) {

  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}
/**
 * ## App class
 */
let App = React.createClass({
  /**
   * The initial state will be logged out
   */
  getInitialState() {
    return {
      loggedIn: false
    };
  },
  /**
   * Change the state to logged in if the Auth form is in the state of
   * ```LOGIN_STATE_LOGOUT```.  This  state will be set after a
   * successful Registrations or Auth
   */
  componentWillReceiveProps(props) {
    var loggedIn =  props.auth.form.state === LOGIN_STATE_LOGOUT;
    this.setState({
      loggedIn: loggedIn
    });
  },
  /**
   * See if there's a accessToken from a previous login, if so, then
   * the state will be changed to ```LOGIN_STATE_LOGOUT```
   */
  componentDidMount() {
    this.props.actions.getAccessToken();
  },
  /**
   * Display the ```Tabbar``` if we're logged in
   */
  render () {
    let component = <Auth/>;
    if (this.state.loggedIn) {
      component = <Tabbar/>;
    }
    return (
      component
    );
  }
});
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);

