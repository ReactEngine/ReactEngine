/**
 * Utility class to automatically create Redux reducers for REST API endpoints.
 */
import itemStatus from './itemStatus';
import asyncDispatch from './asyncDispatch'
import Endpoint from './endpoint'
import ActionTypes from './actionTypes'
import Actions from './actions'
import ItemReducer from './reducers/itemReducer'
import CollectionReducer from './reducers/collectionReducer'

export { itemStatus };

export default class APIBot {
  constructor(APIConfig, CSRFOptions) {
    this.API = {};
    this.actionTypes = {};
    this.actions = {};
    this.reducers = {};
    for (let endpointName in APIConfig) {
      if (APIConfig.hasOwnProperty(endpointName)) {
        let url = APIConfig[endpointName];
        this.API[endpointName] = new Endpoint(url, CSRFOptions);
        //actionTypes
        this.actionTypes[endpointName] = new ActionTypes(endpointName);
        //actions
        this.actions[endpointName] = new Actions(
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
