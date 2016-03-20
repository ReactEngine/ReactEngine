import React,{
	Component,
	PropTypes,
	View,
	StyleSheet,
	TouchableHighlight,
	Text
} from 'react-native'

import Swipeout from 'react-native-swipeout'
import { Actions as routerActions }  from 'react-native-router-flux'


// Swipeout component


class Row extends Component {
	onRowPress(row){
	  //切换路由
	  routerActions.todoDetail()
	  //改 detail 的 state
	  this.props.actions.routerChange({
	    fields:row, title:row.text
	  })
	}
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
		    onPress:()=>{
		    	self.props.actions.deleteById(self.props.item.id)
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
    		    onPress={()=>{
    		    	this.onRowPress(this.props.item)
    		    }}
    		  >  
    		    <Text>{this.props.item.text}</Text>
    		  </TouchableHighlight>
		  </Swipeout>
		)
	}
}


const styles = StyleSheet.create({
	row: {
	  padding: 10,
	  height: 44,
	},
})


export default Row
