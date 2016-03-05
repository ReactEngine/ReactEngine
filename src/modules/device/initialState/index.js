/**
 * # deviceInitialState.js
 * 
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 *
 */
'use strict';
/**
 * ## Import immutable record
 */
import {Record} from 'immutable';

/**
 * ## InitialState
 * 
 * The fields we're concerned with
 */
var InitialState = Record({
  isMobile: false,
  platform: '',
  version: null
});

export default InitialState;
