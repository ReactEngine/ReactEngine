/**
 * Utility class to automatically create Redux reducers for REST API endpoints.
 */
import agent from 'superagent';
import itemStatus from './itemStatus';
import asyncDispatch from './asyncDispatch'
import Endpoint from './endpoints'
import ActionTypes from './actionTypes'
import ActionCreators from './actionCreators'
import ItemReducer from './reducers/itemReducer'
import CollectionReducer from './reducers/collectionReducer'

export { itemStatus };

export default class Flux {
  constructor(APIConfig, CSRFOptions) {
    this.API = {};
    this.actionTypes = {};
    this.actionCreators = {};
    this.reducers = {};
    for (let endpointName in APIConfig) {
      if (APIConfig.hasOwnProperty(endpointName)) {
        let url = APIConfig[endpointName];
        this.API[endpointName] = new Endpoint(url, CSRFOptions);
        //actionTypes
        this.actionTypes[endpointName] = new ActionTypes(endpointName);
        //actionCreators
        this.actionCreators[endpointName] = new ActionCreators(
          endpointName,
          this.API[endpointName],
          this.actionTypes[endpointName]
        );
        //reducers
        this.reducers[`${endpointName}_items`] = new ItemReducer(
          this.actionTypes[endpointName]).getReducer();
        this.reducers[`${endpointName}_collection`] = new CollectionReducer(
          this.actionTypes[endpointName]).getReducer();
      }
    }
  }
}
