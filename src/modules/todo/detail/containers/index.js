'use strict'
import React,
{
  StyleSheet,
  View,
  Text
}
from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionUtils from '../../../../utils/action'
import { Actions as routerActions }  from 'react-native-router-flux'
import DetailComponent from '../components/index'
import ErrorAlert from '../../../common/components/ErrorAlert'
import FormButton from '../../../common/components/FormButton'
import NavigationBar from 'react-native-navbar'
import * as viewActions from '../actions'

function mapStateToProps(state) {
  return {
      ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(viewActions, dispatch),
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

let DetailContainer = React.createClass({
  render() {
    console.log("DetailContainer render,props:",this.props.todoDetail)
    var titleConfig = {
      title: this.props.title || "Detail View"
    }

    var leftButtonConfig = {
      title: 'Back',
      handler: routerActions.pop
    }

    return (
      <View style={styles.container}>
        <NavigationBar
                  title={ titleConfig }
                  leftButton={ leftButtonConfig }
        />
        <DetailComponent
            form={this.props.todoDetail.form}
            buttonText={'Update'}
            updateAction={this.props.actions.update}
            formFieldChangeAction={this.props.actions.formFieldChange}
        />
      </View>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer)
