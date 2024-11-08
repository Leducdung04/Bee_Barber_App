import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { get_list_barber } from '../../Services/utils/httpbarber';
import { replaceLocalhostWithIP } from '../../Services/utils/replaceLocalhostWithIP'; // Nhập hàm thay thế

const StylistSelectionComponent = ({ onSelect }) => {
  const [selectedStylistId, setSelectedStylistId] = useState(null); // State để lưu ID stylist đã chọn
  const [stylists, setStylists] = useState([]); // State để lưu danh sách stylist
  const [selectedStylist, setSelectedStylist] = useState(null); // State để lưu stylist đã chọn

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_list_barber(); // Gọi API để lấy danh sách barber
        console.log("Dữ liệu nhận được:", data); // In ra dữ liệu nhận được
        const formattedStylists = data.map(stylist => ({
          ...stylist,
          image: stylist.image ? replaceLocalhostWithIP(stylist.image) : null,
        }));
        setStylists(formattedStylists);
      } catch (error) {
        console.error('Error fetching barber data', error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (item) => {
    const isSelected = selectedStylistId === item._id;
    setSelectedStylistId(isSelected ? null : item._id);
    const newSelectedStylist = isSelected ? null : item; // Cập nhật stylist đã chọn
    setSelectedStylist(newSelectedStylist); // Cập nhật state cho stylist đã chọn
    onSelect(newSelectedStylist); // Gửi lên component cha

    // Log thông tin stylist được chọn
    console.log("Stylist được chọn:", newSelectedStylist);
  };

  const renderStylist = ({ item }) => {
    const isSelected = selectedStylistId === item._id; // Kiểm tra xem stylist có đang được chọn hay không

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
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.stylistImage} resizeMode="cover" />
        ) : (
          <View style={styles.noImagePlaceholder}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}
        <Text style={styles.stylistName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={stylists} // Danh sách stylist
        renderItem={renderStylist} // Render từng item stylist
        keyExtractor={(item) => item._id} // Sử dụng _id làm key để tránh lỗi warning
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      />

      {/* Hiển thị thông tin của stylist đã chọn */}
      {selectedStylist && (
        <View style={styles.selectedStylistContainer}>
          <Text style={styles.stylistName}>Tên: {selectedStylist.name}</Text>
          {selectedStylist.image ? (
            <Image source={{ uri: selectedStylist.image }} style={styles.stylistImage} />
          ) : (
            <Text>No Image</Text>
          )}
          <Text>Trạng thái: {selectedStylist.status ? 'Active' : 'Inactive'}</Text>
        </View>
      )}
    </View>
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
    padding: 10,
    borderWidth: 1,
    borderColor: 'transparent', // Không hiển thị border nếu chưa được chọn
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#007BFF', // Màu border khi stylist được chọn
  },
  stylistImage: {
    width: 70,
    height: 100,
    borderRadius: 5,
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
    backgroundColor: '#007BFF', // Màu nền của dấu checkmark
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: 'white', // Màu trắng cho dấu checkmark
    borderRadius: 5,
  },
  noImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ced4da',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  noImageText: {
    color: '#6c757d',
  },
  selectedStylistContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
  },
});

export default StylistSelectionComponent;
