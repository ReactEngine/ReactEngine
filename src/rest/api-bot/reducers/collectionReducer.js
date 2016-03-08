import BaseReducer from './baseReducer'

export default class CollectionReducer extends BaseReducer {

  _reducer(state = [], action) {
    let item;
    if (action.type === this.actionTypes.list) {
      item = {
        action: 'list',
        status: itemStatus.pending,
        pendingID: action.pendingID
      };
      return [...state, item];

    } else if (action.type === this.actionTypes.list_success) {
      item = {action: 'list', status: itemStatus.saved};
      return this._replaceItem(state, 'pendingID', action.pendingID, item);

    } else if (action.type === this.actionTypes.list_failure) {
      item = {action: 'list', status: itemStatus.failed};
      return this._replaceItem(state, 'pendingID', action.pendingID, item);
    }

    return state;
  }
}
