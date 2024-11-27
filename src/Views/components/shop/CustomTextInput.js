import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ label, error,value, ...props }) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={[styles.input]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={label}
        value={value}
        placeholderTextColor="#A8A8A8" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#F9F9F9',
  },
  focusedInput: {
    borderColor: '#0088a9', 
  },
  errorInput: {
    borderColor: 'red', 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomTextInput;
