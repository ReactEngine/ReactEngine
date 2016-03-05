/**
 * # globalInitialState.js
 * 
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 *
 */
'use strict';
/**
 * ## Import
 */
import {Record} from 'immutable';
/**
 * ## InitialState
 *  
 * * currentUser - object returned from Server when validated
 * * showState - toggle for Header to display state
 * * currentState - object in Json format of the entire state
 * * store - the Redux store which is an object with initial states
 *
 */
var InitialState = Record({
  currentUser: null,
  showState: false,
  currentState: null,
  store: null
});
export default InitialState;
