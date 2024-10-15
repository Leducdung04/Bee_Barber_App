// Views/components/StylistSelectionComponent.js
import React, { useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const StylistSelectionComponent = ({ stylists, onSelect }) => {
  const [selectedStylistId, setSelectedStylistId] = useState(null);

  const handleSelect = (item) => {
    setSelectedStylistId(item.id);
    onSelect(item);
  };

  const renderStylist = ({ item }) => {
    const isSelected = selectedStylistId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.stylistCard,
          isSelected && styles.selectedCard,
        ]}
        onPress={() => handleSelect(item)}
      >
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmark} />
          </View>
        )}
        <Image source={{ uri: item.image }} style={styles.stylistImage} />
        <Text style={styles.stylistName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={stylists}
      renderItem={renderStylist}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  stylistCard: {
    marginRight: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#007BFF', // Màu border khi chọn
  },
  stylistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  stylistName: {
    marginTop: 5,
    textAlign: 'center',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ADD8E6', // Màu xanh dương nhạt
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default StylistSelectionComponent;
