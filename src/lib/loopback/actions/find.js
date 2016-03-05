export function findById(modeName, modelId, payload) {
    return {
        type: 'MODEL_FIND_BY_ID',
        payload: payload,
        meta: {
            modelName: modeName,
            modelId: modelId
        }
    }
}

export function findOne(modeName, payload) {
    return {
        type: 'MODEL_FIND_ONE',
        payload: payload,
        meta: {
            modelName: modeName
        }
    }
}

export function find(modeName, payload) {
    return {
        type: 'MODEL_FIND',
        payload: payload,
        meta: {
            modelName: modeName
        }
    }
}
