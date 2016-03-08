export default class BaseReducer {
  constructor(actionTypes) {
    this.actionTypes = actionTypes;
  }

  getReducer() {
    return this._reducer.bind(this);
  }

  _getItem(state, key, value) {
    return state.find(item => item[key] === value);
  }

  _replaceItem(state, key, value, newItem) {
    let index = state.findIndex(item => item[key] === value);
    let newState = [...state];
    newState.splice(index, 1, newItem);
    return newState;
  }
}
