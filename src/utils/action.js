import _ from 'lodash'

import {
	Map
}
from 'immutable'

export function getCreators(actions = []) {
	if (!_.isArray(actions)) {
		actions = [actions]
	}

	return Map()
		.merge(...actions)
		.filter(value => typeof value === 'function')
		.toObject()
}