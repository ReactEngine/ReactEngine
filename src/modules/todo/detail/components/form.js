/**
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
'use strict'
/**
 * ## Import
 *
 * React
 */
const React = require('react-native')
const {
  PropTypes
} = React

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native')
let Form = t.form.Form

module.exports = React.createClass({
  /**
   * ## LoginForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    form: PropTypes.object,
    actions:PropTypes.object
  },
  onChange(value,field) {
      
  },
  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {
    let self = this
    let options = {
      auto: 'placeholders',
      fields: {
        id: {
          label: 'ID',
          editable: false
        },
        text: {
          label: 'Text',
          editable: !this.props.form.isFetching,
          hasError: this.props.form.fields.textHasError,
          error: 'Text is required'
        },
        completed: {
          label: 'Completed',
          editable: !this.props.form.isFetching
        },
        createdAt: {
          label: 'Created At',
          editable: false
        },
        updatedAt: {
          label: 'Updated At',
          editable: false
        }
      }
    }

    let DetailForm = t.struct({
        id: t.String,
        text: t.String,
        completed: t.Boolean,
        createdAt: t.String,
        updatedAt: t.String
      })
      /**
       * ### Return
       * returns the Form component with the correct structures
       */
    return ( <Form ref = "form"
      type = {
        DetailForm
      }
      options = {
        options
      }
      value = {{
        id: this.props.form.fields.id,
        text: this.props.form.fields.text,
        completed: this.props.form.fields.completed,
        createdAt: this.props.form.fields.createdAt,
        updatedAt: this.props.form.fields.updatedAt
      }}
      onChange = {
        this.props.onChange
      }
      />

    )
  }
})