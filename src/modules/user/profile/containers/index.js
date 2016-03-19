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
import _ from 'lodash'
const userStorage = require('../../../../storage/user').default

/**
 * The actions we need
 */
import * as profileActions from '../actions'
import * as profileAsyncActions from '../actions/async'

/**
 * Immutable Mapn
 */
import {Map} from 'immutable'

import UserForm from '../components/form'
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
  profileActions,
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
    console.log("profile componentDidMount")
    const username = this.props.userProfile.form.fields.username
    const email = this.props.userProfile.form.fields.email

    if ( username == '' &&  email == '') {
      //获取用户信息
      new userStorage().get()
      .then((user)=>{
        if(_.has(user,'username') && _.has(user,'email')){
          this.setState({
            formValues: {
              username: user.username,
              email: user.email
            }
          })
        }else{
          this.props.actions.getCurrentUser()
        }
      })//get
    } else {
      //用户信息不为空
      // this.setState({
      //   formValues: {
      //     username: username,
      //     email: email
      //   }
      // })
    }      
  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {
    console.log("profile render")
    this.errorAlert.checkError(this.props.userProfile.form.error)

    let self = this
  
    /**
     * When the button is pressed, send the users info including the
     * ```currrentUser``` object as it contains the accessToken and
     * user objectId which maxleap.cn requires
     */
    let profileButtonText = 'Update Profile'
    let onButtonPress = () => {
      this.props.actions.updateCurrentUser(
        this.props.userProfile.form.fields.username,
        this.props.userProfile.form.fields.email)
    }
    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <UserForm
              value={this.state.formValues}
              onChange={this.onChange.bind(self)}
              form={this.props.userProfile.form}
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
