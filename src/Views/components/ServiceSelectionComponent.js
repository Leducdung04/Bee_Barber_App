// Views/components/ServiceSelectionComponent.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ServiceSelectionComponent = ({ items, selectedItems, onSelectedItemsChange }) => {
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const route = useRoute();
  const { selectedServices = [] } = route.params || {}; // Lấy dữ liệu từ ServicesScreen
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('ServicesScreen');
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text>{selectedServices.length > 0 ? `Đã chọn ${selectedServices.length} dịch vụ` : "Chọn dịch vụ..."}</Text>
        <Text style={styles.primaryText}>→</Text>
      </TouchableOpacity>

      {selectedServices.length == 0 && (
        <Text style={styles.warningText}>Vui lòng chọn dịch vụ!</Text>
      )}

      {selectedServices && selectedServices.length > 0 ? (
        <View>
          {selectedServices.map((service, index) => (
            <Text key={index}>
              {service.name} - {service.price}K
            </Text>
          ))}
        </View>
      ) : (
        <Text>Chưa chọn dịch vụ nào</Text>
      )}
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