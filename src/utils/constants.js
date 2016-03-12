import _ from 'lodash'

export function addPrefix(arr,prefix) {
	//添加前缀
    var mirrored = {}
    prefix = prefix || "RE_COM_"

    _.each(arr, (val) => { 
      mirrored[val] = prefix + val
    })

    return mirrored
}

