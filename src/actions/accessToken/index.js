import _            from 'lodash'
import * as getActions from './get'
import * as deleteActions from './delete'

export default _.extend({}, getActions, deleteActions)