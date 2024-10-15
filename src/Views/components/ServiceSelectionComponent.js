// // Views/components/ServiceSelectionComponent.js
// import React from 'react';
// import { FlatList, TouchableOpacity, Text } from 'react-native';

// const ServiceSelectionComponent = ({ items, selectedItems, onSelectedItemsChange }) => {
//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => onSelectedItemsChange(item.id)}>
//       <Text>{item.name}</Text>
//       {selectedItems.includes(item.id) && <Text>✓</Text>}
//     </TouchableOpacity>
//   );

//   return (
//     <FlatList
//       data={items}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//     />
//   );
// };

// export default ServiceSelectionComponent;

// Views/components/ServiceSelectionComponent.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

const ServiceSelectionComponent = ({ items, selectedItems, onSelectedItemsChange }) => {
  const [serviceModalVisible, setServiceModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onSelectedItemsChange(item.id)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      {selectedItems.includes(item.id) && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => setServiceModalVisible(true)}>
        <Text>{selectedItems.length > 0 ? `Đã chọn ${selectedItems.length} dịch vụ` : "Chọn dịch vụ..."}</Text>
        <Text style={styles.primaryText}>→</Text>
      </TouchableOpacity>

      {selectedItems.length === 0 && (
        <Text style={styles.warningText}>Vui lòng chọn dịch vụ!</Text>
      )}

      {selectedItems.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text>Dịch vụ đã chọn:</Text>
          <View style={styles.selectedItems}>
            {selectedItems.map(id => {
              const selectedItem = items.find(item => item.id === id);
              return (
                <View key={id} style={styles.individualItem}>
                  <Text style={styles.selectedItemText}>{selectedItem?.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={serviceModalVisible}
        onRequestClose={() => setServiceModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setServiceModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginVertical: 8,
  },
  primaryText: {
    fontSize: 18,
    color: '#007bff',
  },
  warningText: {
    color: '#dc3545',
    marginTop: 4,
  },
  selectedContainer: {
    marginTop: 10,
  },
  selectedItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  individualItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
  },
  selectedItemText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 16,
    color: '#007bff',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
  },
});

export default ServiceSelectionComponent;
