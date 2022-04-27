import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  todo_wrap: {
    flex: 1,
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'pink',
    margin: 10,
  },
  input_wrap: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    padding: 10,
  },
  list_wrap: {
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: 'red',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
});

export default styles;
