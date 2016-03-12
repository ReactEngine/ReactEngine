import _ from 'lodash'

export function addPrefix(arr = [],prefix = "") {
	//添加前缀
    var mirrored = {}

    _.each(arr, (val) => { 
      mirrored[val] = prefix + val
    })

    return mirrored
}


export function keyMirror(arr) {
	return addPrefix(arr,"")
}