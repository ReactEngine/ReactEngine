import React,{
	Component,
	PropTypes,
	View,
	StyleSheet,
	TouchableHighlight,
	Text
} from 'react-native';


class Row extends Component {
	getInitialState() {
	  return {
	  	text:'todo'
	  }
	}
	/**
	 * When a row is touched
	 * @param {object} rowData Row data
	 */
	_onPress(text) {
	  console.log(text+' pressed');
	}
	render() {
		return (
		  <TouchableHighlight 
		    style={styles.row} 
		    underlayColor='#c8c7cc'
		    onPress={() => this._onPress(this.props.item.text)}
		  >  
		    <Text>{this.props.item.text}</Text>
		  </TouchableHighlight>
		);
	}
}


const styles = StyleSheet.create({
	row: {
	  padding: 10,
	  height: 44,
	},
});


export default Row;
