/**
 * # Profile.js
 * 
 * This component provides an interface for a logged in user to change
 * their username and email.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
 */
'use strict'
/**
* ## Imports
*
* Redux
*/
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
// import * as profileActions from '../actions'
import * as profileAsyncActions from '../actions/async'

/**
 * Immutable Mapn
 */
import {Map} from 'immutable'

/**
 * The ErrorAlert will display any and all errors
 */
import ErrorAlert from '../../../common/components/ErrorAlert'
/**
 * The FormButton will respond to the press
 */
import FormButton from '../../../common/components/FormButton'
/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../../../common/components/Header'

/**
 * The itemCheckbox will display the state of the email verified
 */
import ItemCheckbox from '../../../common/components/ItemCheckbox'
/**
 * The necessary React components
 */
import React,
{
  Component,
  StyleSheet,
  View
}
from 'react-native'

/**
* The form processing component
*/
import t from 'tcomb-form-native'

let Form = t.form.Form

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    marginTop:80
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})

/** 
* ## Redux boilerplate
*/
const actions = [
  profileAsyncActions
]

function mapStateToProps(state) {
  return {
      ...state
  }
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  }
}


class Profile extends Component {
  /**
   * ## Profile class
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      formValues: {
        username: '',
        email: ''
      }
    }
  }
  /**
   * ### onChange
   *
   * When any fields change in the form, fire this action so they can
   * be validated.
   * 
   */
  onChange(value) {
    this.props.actions.formFieldChange(value)
    this.setState({value})
  }
  /**
   * ### componentWillReceiveProps
   *
   * Since the Forms are looking at the state for the values of the
   * fields, when we we need to set them
   */
  componentWillReceiveProps(props) {
    this.setState({
      formValues: {
        username: props.userProfile.form.fields.username,
        email: props.userProfile.form.fields.email
      }
    })

  }
  /**
   * ### componentDidMount
   *
   * During Hot Loading, when the component mounts due the state
   * immediately being in a "logged in" state, we need to just set the
   * form fields.  Otherwise, we need to go fetch the fields
   */
  componentDidMount() {
    const username = this.props.userProfile.form.fields.username
    const email = this.props.userProfile.form.fields.email
    if ( username == '' &&  email == '') {
      this.props.actions.getCurrentUser()
    } else {
      this.setState({
        formValues: {
          username: username,
          email: email
        }
      })
    }      
  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {
    this.errorAlert.checkError(this.props.userProfile.form.error)

    let self = this
    
    let ProfileForm = t.struct({
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
          editable: !this.props.userProfile.form.isFetching,
          hasError: this.props.userProfile.form.fields.usernameHasError,
          error: 'Must have 6-12 characters and/or numbers'
        },
        email: {
          label: 'Email',
          keyboardType: 'email-address',
          editable: !this.props.userProfile.form.isFetching,
          hasError: this.props.userProfile.form.fields.emailHasError,
          error: 'Please enter valid email'
        }
      }
    }

    /**
     * When the button is pressed, send the users info including the
     * ```currrentUser``` object as it contains the accessToken and
     * user objectId which maxleap.cn requires
     */
    let profileButtonText = 'Update Profile'
    let onButtonPress = () => {
      this.props.actions.updateCurrentUser(
        this.props.userProfile.form.originalProfile.objectId,
        this.props.userProfile.form.fields.username,
        this.props.userProfile.form.fields.email)
    }
    /**
     * Wrap the form with the header and button.  The header props are
     * mostly for support of Hot reloading. See the docs for Header
     * for more info.
     */
    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <Form
              ref="form"
              type={ProfileForm}
              options={options}
              value={this.state.formValues}
              onChange={this.onChange.bind(self)}
          />
          <ItemCheckbox text="Email verified (display only)"
                        disabled={true}
                        checked={this.props.userProfile.form.fields.emailVerified}
          />
        </View>

        <FormButton
            isDisabled={!this.props.userProfile.form.isValid || this.props.userProfile.form.isFetching}
            onPress={onButtonPress.bind(self)}
            buttonText={profileButtonText}/>

      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
