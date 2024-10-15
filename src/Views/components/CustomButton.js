import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e8e8e8', 
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 90,
    paddingVertical:10,
    alignSelf: 'center', 
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight:"medium"
  },
});

export default CustomButton;