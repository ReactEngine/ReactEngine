/**
 * # deviceActions-test.js
 *
 * This test is for deviceActions
 *
 */

'use strict';

jest.autoMockOff();

/**
 * ## Mocks
 *
 * We don't want to use the devices storage, nor actually call Server
 */
jest.mock('../../../../lib/AppAuthToken');
jest.mock('../../../../api');

/**
 * ## Mock Store
 *
 * The ```mockStore``` confirms the all the actions are dispatched and
 * in the correct order
 *
 */
var mockStore = require('../../mocks/Store').default;

/**
 * ## Class under test
 *
 */
var actions = require('../actions');

/**
 * ## Imports
 *
 * actions under test
 */
const {
  SET_PLATFORM,
  SET_VERSION
} = require('../../../common/constants').default;

/**
 * ## Tests
 *
 * deviceActions
 */
describe('deviceActions', () => {
  it('should setPlatform', () => {
    let platform = 'ios';
    expect(actions.setPlatform(platform)).toEqual({
      type: SET_PLATFORM,
      payload: platform
    });
  });

  it('should setVersion', () => {
    let version = '0.0.8';
    expect(actions.setVersion(version)).toEqual({
      type: SET_VERSION,
      payload: version
    });
  });
});

