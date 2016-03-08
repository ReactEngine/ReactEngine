export class ActionCreators {
  constructor(endpointName, API, actionTypes,methods = ['list', 'retrieve', 'create', 'update']) {
    this.actionTypes = actionTypes;
    this._pendingID = 0;
    methods.forEach(action => {
      this[action] = this._createAction.bind(this, action, API[action].bind(API));
    });
  }

  _createAction(action, apiRequest, payload, objectID) {
    return (dispatch) => {
      let pendingID = this._getPendingID();
      let call = apiRequest(payload, objectID)
          .end((err, res) => {
            if (err) {
              dispatch(this._failure(action, 'error', pendingID));
            } else {
              dispatch(this._success(action, res.body, pendingID));
            }
          });
      dispatch(this._pending(action, payload, pendingID));
      return call;
    };
  }

  _success(...args) {
    return this._makeActionObject(...args, 'success');
  }

  _failure(...args) {
    return this._makeActionObject(...args, 'failure');
  }

  _pending(...args) {
    return this._makeActionObject(...args);
  }

  _makeActionObject(action, payload, pendingID, result) {
    let actionType = this.actionTypes.getConstant(action, result);
    return {
      type: actionType,
      payload: payload,
      pendingID: pendingID
    };
  }

  _getPendingID() {
    this._pendingID += 1;
    return this._pendingID;
  }
}
