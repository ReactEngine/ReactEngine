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
    value: PropTypes.object,
    onChange: PropTypes.func
  },

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {

   let UserForm = t.struct({
      username: t.String,
      email: t.String
    })

   /**
    * Set up the field definitions.  If we're fetching, the fields
    * are disabled.  
    */
   let options = {
     auto: 'placeholders',
     fields: {
       username: {
         label: 'Username',
         maxLength: 12,
         editable: !this.props.form.isFetching,
         hasError: this.props.form.fields.usernameHasError,
         error: 'Must have 6-12 characters and/or numbers'
       },
       email: {
         label: 'Email',
         keyboardType: 'email-address',
         editable: !this.props.form.isFetching,
         hasError: this.props.form.fields.emailHasError,
         error: 'Please enter valid email'
       }
     }
   }

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
        <Form ref="form"
          type={UserForm}
          options={options}
          value={this.props.value}
          onChange={this.props.onChange}
        />
    )
  }
})
