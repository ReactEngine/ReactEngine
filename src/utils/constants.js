import _ from 'lodash'

export function addPrefix(arr = [],prefix = "") {
	//添加前缀
    var mirrored = {}
    prefix = "$RE_$" + prefix + "_"

    _.each(arr, (val) => { 
      mirrored[val] = prefix + val
    })

    return mirrored
}

