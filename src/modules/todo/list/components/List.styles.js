var React = require('react-native')
var {
  StyleSheet,
} = React

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF',
  },
  summary: {
    marginBottom:10,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  summaryText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3385ff',
    borderColor:  '#3385ff',
    marginLeft: 10,
    marginRight: 10    
  },
  navBar: {
    height: 64,
    backgroundColor: '#007aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  }
})

export default styles