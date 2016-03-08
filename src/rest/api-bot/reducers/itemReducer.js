import BaseReducer from './baseReducer'

export default class ItemReducer extends BaseReducer {

  _reducer(state = [], action) {
    let item;
    if (action.type === this.actionTypes.create) {
      item = {...action.payload, status: itemStatus.pending, pendingID: action.pendingID};
      return [...state, item];

    } else if (action.type === this.actionTypes.create_success) {
      item = {...action.payload, status: itemStatus.saved};
      return this._replaceItem(state, 'pendingID', action.pendingID, item);

    } else if (action.type === this.actionTypes.create_failure) {
      item = this._getItem(state, 'pendingID', action.pendingID);
      item.status = itemStatus.failed;
      return this._replaceItem(state, 'pendingID', action.pendingID, item);

    } else if (action.type === this.actionTypes.update) {
      item = {...action.payload, status: itemStatus.pending};
      // TODO shouldn't hardcode 'id' field
      return this._replaceItem(state, 'id', item.id, item);

    } else if (action.type === this.actionTypes.update_success) {
      item = {...action.payload, status: itemStatus.saved};
      // TODO shouldn't hardcode 'id' field
      return this._replaceItem(state, 'id', item.id, item);

    } else if (action.type === this.actionTypes.update_failure) {
      item = {...action.payload, status: itemStatus.failed};
      // TODO shouldn't hardcode 'id' field
      return this._replaceItem(state, 'id', item.id, item);

    } else if (action.type === this.actionTypes.list_success) {
      return [...action.payload];

    }
    return state;
  }
}
