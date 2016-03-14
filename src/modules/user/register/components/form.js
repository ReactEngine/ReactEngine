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

    let options = {
      auto: 'placeholders',
      fields: {

      }
    }

    let username = {
      label: 'Username',
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: 'Must have 6-12 characters and/or numbers'
    }

    let email = {
      label: 'Email',
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: 'Please enter valid email'
    }

    let secureTextEntry = !this.props.form.fields.showPassword

    let password = {
      label: 'Password',
      maxLength: 12,
      secureTextEntry: secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: 'Must have 6-12 characters with at least 1 number and 1 special character'
    }

    let userForm = t.struct({
          username: t.String,
          email: t.String,
          password: t.String,
        })
        options.fields['username'] = username
        options.fields['email'] = email
        options.fields['password'] = password

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
        <Form ref="form"
          type={userForm}
          options={options}
          value={this.props.value}
          onChange={this.props.onChange}
        />

    )
  }
})
