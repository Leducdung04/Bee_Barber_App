import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CustomRadioButton = ({ data }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.section}>
        {data.map((time) => (
          <TouchableOpacity
            key={time.id}
            style={styles.radioButtonContainer}
            onPress={() => setSelectedTime(time.id)}
          >
            <View style={styles.radioCircle}>
              {selectedTime === time.id && <View style={styles.selectedCircle} />}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.radioLabel}>{time.title}</Text>
              {time.subTitle && <Text style={styles.subTitle}>{time.subTitle}</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 10,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#333", // Black border
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#333", // Black filled circle
  },
  radioLabel: {
    fontSize: 16,
    color: "#333", // Black text for the label
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 12,
    color: "#666", // Lighter gray for subtitle
  },
  textContainer: {
    flex: 1,
  },
});
