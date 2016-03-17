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
	render() {
		return (
			<TouchableHighlight {...this.props} style={[styles.container, this.props.style]}>
				<View style={[styles.content, this.props.contentStyle]}>
					<View style={{height: 40, backgroundColor: '#ffffff', borderWidth: 0.5, borderColor: '#d6d7da'}}>
					  <Text>
					    {this.props.item}
					  </Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	content: {
		flex: 1,
		flexDirection: 'row'
	}
});


export default Row;
