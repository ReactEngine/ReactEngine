'use strict'
/**
 * ## Import
 */
const {Record} = require('immutable')

const Item = Record({
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
  item:new Item
})

export default InitialState