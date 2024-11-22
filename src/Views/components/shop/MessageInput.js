import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const MessageInput = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lời nhắn cho người bán</Text>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Nhập lời nhắn tại đây"
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  textInput: {
    height: 120,
    textAlignVertical: "top",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default MessageInput;
