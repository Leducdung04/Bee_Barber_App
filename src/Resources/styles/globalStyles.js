import { StyleSheet } from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',  // Màu trắng
    textAlign: 'center',
  }
  
});
export default globalStyles;