export function loopbackUpdateAll(modeName, payload) {
    return {
        type: 'MODEL_UPDATE_ALL',
        payload: payload,
        meta: {
            modelName: modeName
        }
    }
}
