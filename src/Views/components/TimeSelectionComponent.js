// Views/components/TimeSelectionComponent.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TimeSelectionComponent = ({ availableTimes, selectedTime, onTimeSelect }) => {
  return (
    <View style={styles.timeGrid}>
      {availableTimes.map((time) => (
        <TouchableOpacity
          key={time}
          style={[styles.timeButton, selectedTime === time && styles.selectedTimeButton]}
          onPress={() => onTimeSelect(time)}
        >
          <Text style={styles.timeText}>{time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeButton: {
    padding: 12,
    width: 80,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
  },
  selectedTimeButton: {
    backgroundColor: '#007bff',
  },
  timeText: {
    color: 'black',
  },
});

export default TimeSelectionComponent;
