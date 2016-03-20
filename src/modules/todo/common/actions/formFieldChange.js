const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  TODO_FORMFIELD_CHANGE

} = require('../constants').default


export function formFieldChange(field,value) {
  return {
    type: TODO_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}