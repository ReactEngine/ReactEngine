import React,{
	Component,
	PropTypes,
	View,
	StyleSheet,
	TouchableHighlight,
	Text
} from 'react-native'

import Swipeout from 'react-native-swipeout'


// Swipeout component


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
	_onPress(item) {
	  console.log(item.text+' pressed')
	},
	render() {
		// Buttons
		const self = this;
		const swipeoutBtns = [
		  {
		    text: 'Delete',
		    backgroundColor:'red',
		    color:'#fff',
		    type: 'primary',
		    autoClose: true,
		    onPress:()=>{debugger
		    	self.props.deleteItem(self.props.item.id)
		    }
		  }
		]

		return (
		  <Swipeout right={swipeoutBtns}
		  autoClose={true}
		  backgroundColor={'#fff'}
		  >
		    <TouchableHighlight 
    		    style={styles.row} 
    		    underlayColor='#c8c7cc'
    		    onPress={() => this._onPress(this.props.item)}
    		  >  
    		    <Text>{this.props.item.text}</Text>
    		  </TouchableHighlight>
		  </Swipeout>
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
