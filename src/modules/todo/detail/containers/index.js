/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Immutable
 */
import {Map} from 'immutable'

/**
 * Router
 */
import { Actions as routerActions }  from 'react-native-router-flux'

import DetailForm from '../components/form'
/**
 * The ErrorAlert will display any and all errors
 */
import ErrorAlert from '../../../common/components/ErrorAlert'
/**
 * The FormButton will respond to the press
 */
import FormButton from '../../../common/components/FormButton'

/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar'

/**
 * The necessary components from React
 */
import React,
{
  StyleSheet,
  View,
  Text,
  Component
}
from 'react-native'

/**
 * If your app uses Redux action creators, you can add them here...
 *
 */
const actions = [
]

/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
      ...state
  }
}

/*
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```

 */
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

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})
// let DetailView = React.createClass({
  class DetailView extends Component {
  /**
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      formValues: {
        id: '',
        text: ''
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
        id: props.todoDetail.form.fields.id,
        text: props.todoDetail.form.fields.text
      }
    })
  }

  render() {
    this.errorAlert.checkError(this.props.todoDetail.form.error)

    let self = this

    let profileButtonText = 'Update Profile'
    let onButtonPress = () => {
      this.props.actions.update(
        this.props.todoDetail.form.fields.id,
        this.props.todoDetail.form.fields.text)
    }

    var titleConfig = {
      title: this.props.title || "Detail View"
    }

    var leftButtonConfig = {
      title: 'Back',
      handler: routerActions.pop
    }

    let detailData = this.props.data || {
      "completed": true,
      "text": "",
      "id": "",
      "createdAt": "",
      "updatedAt": ""
    }
    return (
      <View style={styles.container}>
        <NavigationBar
                  title={ titleConfig }
                  leftButton={ leftButtonConfig }
        />
        <View style={styles.inputs}>
          <DetailForm
              value={this.state.formValues}
              onChange={this.onChange.bind(self)}
              form={this.props.todoDetail.form}
          />
        </View>
        <FormButton
            isDisabled={!this.props.todoDetail.form.isValid || this.props.todoDetail.form.isFetching}
            onPress={onButtonPress.bind(self)}
            buttonText={profileButtonText}/>
      </View>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView)
