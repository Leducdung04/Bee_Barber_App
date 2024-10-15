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
  },
  textTitle:{
    fontWeight:'bold',
    fontSize:20,
    color:colors.primary
  },
  containerShadow:{
    elevation: 5, // Android
    shadowColor: 'gray', // iOS
    shadowOffset: { width: 0, height: 2 }, // iOS
    shadowOpacity: 0.25, // iOS
    shadowRadius: 3.84, // iOS
  }

  
});
export default globalStyles;