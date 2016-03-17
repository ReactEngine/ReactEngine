import React,{
	Component,
	PropTypes,
	View,
	StyleSheet,
	TouchableHighlight,
	Text
} from 'react-native'


var Row = React.createClass({
	getInitialState() {
	  return {
		    "completed": true,
		    "text": "todo1",
		    "id": "644ca090-ebf0-11e5-81e1-a53b29f0d75f",
		    "createdAt": "2016-03-17T03:29:01.000Z",
		    "updatedAt": "2016-03-17T03:29:01.000Z"
		  }
	},
	/**
	 * When a row is touched
	 * @param {object} rowData Row data
	 */
	_onPress(text) {
	  console.log(text+' pressed')
	},
	render() {
		return (
		  <TouchableHighlight 
		    style={styles.row} 
		    underlayColor='#c8c7cc'
		    onPress={() => this._onPress(this.props.item.text)}
		  >  
		    <Text>{this.props.item.text}</Text>
		  </TouchableHighlight>
		)
	}
})


const styles = StyleSheet.create({
	row: {
	  padding: 10,
	  height: 44,
	},
})


export default Row
