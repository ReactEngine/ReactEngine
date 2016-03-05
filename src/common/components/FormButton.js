/**
* # FormButton.js
*
* Display a button that responds to onPress and is colored appropriately
*/
'use strict';
/**
 * ## Imports
 *
 * React
 */
const  React = require('react-native');
const
{
  StyleSheet,
  View
} = React;
  
/**
 * The platform neutral button
 */
const  Button = require('apsl-react-native-button');

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  signin: {
    marginLeft: 10,
    marginRight: 10
  },
  buttonDisabled: {
      backgroundColor: '#428bca',
      borderColor:  '#428bca'
  },
  buttonEnabled:{
    backgroundColor: '#007eff',
    borderColor:  '#007eff'
  }
});

var FormButton = React.createClass({
  /**
   * ### render
   *
   * Display the Button 
   */
  render() {
    return (
      <View style={styles.signin}>
        <Button style={styles.buttonEnabled} 
            disabledStyle={styles.buttonDisabled} 
            textStyle={{color: 'white'}}
            isDisabled={this.props.isDisabled}
            isLoading={this.props.isLoading}
            onPress={this.props.onPress}
        >
          {this.props.buttonText}
        </Button>
      </View>
    );
  }
});

module.exports = FormButton;
