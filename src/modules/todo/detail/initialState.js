'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')

const Form = Record({
  error: null,
  isFetching: false,
  fields: new (Record({
    id: '',
    text: '',
    textHasError: false,
    completed: true
  }))
})

var InitialState = Record({
  form:new Form
})

export default InitialState