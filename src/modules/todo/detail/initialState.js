'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')

const Form = Record({
  error: null,
  isFetching: false,
  title:'Detail View',
  fields: new (Record({
    id: '',
    text: '',
    textHasError: false,
    completed: true,
    createdAt:'',
    updatedAt:''
  }))
})

var InitialState = Record({
  form:new Form
})

export default InitialState