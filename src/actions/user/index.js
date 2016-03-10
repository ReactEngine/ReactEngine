import _            from 'lodash'
import reduxCrud    from 'redux-crud'

const standardActionCreators = reduxCrud.actionCreatorsFor('user')

let actionCreators = {
	/**
	 * ## onAuthFormFieldChange
	 * Set the payload so the reducer can work on it
	 */
	export function onAuthFormFieldChange(field,value) {
	  return {
	    type: ON_FORM_FIELD_CHANGE,
	    payload: {field: field, value: value}
	  }
	}
}

actionCreators = _.extend(actionCreators, standardActionCreators);

export default actionCreators;
