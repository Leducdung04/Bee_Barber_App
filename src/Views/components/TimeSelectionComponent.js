// Views/components/TimeSelectionComponent.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import colors from '../../Resources/styles/colors';

const TimeSelectionComponent = ({ availableTimes, selectedTime, onTimeSelect }) => {
  // Split the time slots into rows of 3 items each
  const timesInRows = [];
  for (let i = 0; i < availableTimes.length; i += 3) {
    timesInRows.push(availableTimes.slice(i, i + 3));
  }

  return (
    <FlatList
      data={timesInRows}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.timeGrid}
      renderItem={({ item }) => (
        <View style={styles.row}>
          {item.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeButton, selectedTime === time && styles.selectedTimeButton]}
              onPress={() => onTimeSelect(time)}
            >
              <Text style={{ color: selectedTime === time ? 'white' : 'black' }}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  timeGrid: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 12,
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
    backgroundColor: colors.primary,
  },
});

export default TimeSelectionComponent;
