
const _isNumerical = function(obj) {
    obj = obj - 0;
    return obj === obj;
};

const camelize = function(string) {
    if (_isNumerical(string)) {
      return string;
    }
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
};

const modelSuccess = function(action, res) {
    return {
        type: action.type + '_SUCCESS',
        payload: res,
        meta: {
            originalPayload: action.payload
        }
    }
};

const modelPending = function(action) {
    return {
        type: action.type + '_PENDING',
        meta: {
            originalPayload: action.payload
        }
    }
};

const modelError = function(action, err) {
    return {
        type: action.type + '_ERROR',
        payload: err,
        error: true,
        meta: {
            originalPayload: action.payload
        }
    }
};

export function execModelMethod(app, store, action) {
    store.dispatch(modelPending(action));
    const method = camelize(action.type.substr(6).toLowerCase());
    const modelName = action.meta.modelName;
    const model_method = app.models[modelName][method];

    if(action.meta.modelId){
        return model_method(action.meta.modelId, action.payload, (err, res) => exeCB);
    }else{
        return model_method(action.payload, (err, res) => exeCB);
    }

    function exeCB(err,res){
     if (!err) {
            store.dispatch(modelSuccess(action, res));
        } else {
            store.dispatch(modelError(action, err));
        }
    }
    
}
