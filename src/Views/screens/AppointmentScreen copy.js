// Views/Screens/BookingScreen.js
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ServiceSelectionComponent from '../components/ServiceSelectionComponent';
import TimeSelectionComponent from '../components/TimeSelectionComponent';
import StylistSelectionComponent from '../components/StylistSelectionComponent'; // Import component mới
import { useBookingViewModel } from '../../ViewModels/AppointmentModel';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { useNavigation, useRoute } from '@react-navigation/native';
import ButtonComponents from '../components/ui/Button';

const BookingScreen = () => {
  const {
    selectedItems,
    selectedTime,
    onSelectedItemsChange,
    handleTimeSelect,
  } = useBookingViewModel();

  const route = useRoute();
  const servicesFromRoute = route.params?.selectedServices || [];  // Nhận dịch vụ từ ServicesScreen

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // State để hiển thị DatePicker

  const [selectedStylist, setSelectedStylist] = useState(null);
  const [stylistVisible, setStylistVisible] = useState(false); // State cho việc hiển thị stylist

  // Hàm để hiển thị DatePicker
  const onPressDate = () => {
    setShowDatePicker(true);
  };

  // Hàm xử lý khi người dùng chọn ngày
  const onDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      // Nếu người dùng chọn ngày và bấm "OK"
      const currentDate = selectedDate || date; // Lấy ngày được chọn
      setDate(currentDate); // Cập nhật ngày
    }
    setShowDatePicker(false); // Ẩn DatePicker sau khi chọn
  };
  // Định dạng ngày và giờ đã chọn
  const formattedDate = date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,  // Thêm tùy chọn này để đảm bảo trả về định dạng 24 giờ
  });

  const stylists = [
    { id: '1', name: 'Stylist A', image: 'https://example.com/imageA.jpg' },
    { id: '2', name: 'Stylist B', image: 'https://example.com/imageB.jpg' },
    { id: '3', name: 'Stylist C', image: 'https://example.com/imageC.jpg' },
    { id: '4', name: 'Stylist C', image: 'https://example.com/imageC.jpg' },
    { id: '5', name: 'Stylist C', image: 'https://example.com/imageC.jpg' },
    { id: '6', name: 'Stylist C', image: 'https://example.com/imageC.jpg' },
    // Thêm stylist khác...
  ];

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
    // setStylistVisible(false); // Đóng khi chọn stylist
  };

  const toggleStylistVisibility = () => {
    setStylistVisible(!stylistVisible); // Chuyển đổi trạng thái hiển thị
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>1. Chọn dịch vụ</Text>
          <ServiceSelectionComponent
            // items={items}
            selectedItems={selectedItems}
            onSelectedItemsChange={onSelectedItemsChange}
          />

          {/* Phần chọn ngày, giờ & stylist */}
          <View style={styles.itemContainers}>
            <View style={styles.flexItem}>
              <View style={styles.roundCircle}></View>
              <Text style={styles.textMuted}>2. Chọn ngày & giờ stylist</Text>
            </View>
              <TouchableOpacity onPress={toggleStylistVisibility}>
                <Text style={styles.textStylist}>👤Chọn Stylist </Text>
              </TouchableOpacity>
            {stylistVisible && (
              <StylistSelectionComponent stylists={stylists} onSelect={handleStylistSelect} />
            )}
            <TouchableOpacity style={styles.button} onPress={onPressDate}>
              <Text style={styles.primaryText}>📅 {formattedDate}, {formattedTime}</Text>
              <Text style={styles.primaryText2}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Hiển thị DatePicker khi người dùng nhấn */}
          {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date" // Chọn ngày, có thể đổi thành "time" để chọn giờ
                display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Android hiển thị hộp thoại
                onChange={onDateChange}
                minimumDate={new Date()} // Để ngăn chọn ngày trong quá khứ
              />
            )}

          {servicesFromRoute.length > 0 && (
            <>
              <Text style={styles.title}>Chọn thời gian</Text>
              <TimeSelectionComponent
                availableTimes={['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
              />
            </>
          )}
          <TouchableOpacity style={styles.confirmButton}> 
            <Text style={styles.confirmButtonText}>Chốt giờ cắt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemContainers: {
    marginTop: 14,
  },
  flexItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#007bff',
  },
  textMuted: {
    marginLeft: 8,
    color: '#6c757d',
  },
  textStylist: {
    marginLeft: 5,
    marginTop: 20,
    color: '#007bff',
  },
  rectangle: {
    height: 120,
    width: 80,
    marginTop: 8,
    marginLeft: 7,
    marginRight: 8,
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    lineHeight: 50,
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    marginRight: 8,
    paddingVertical: 6,
  },
  primaryText: {
    fontSize: 13,
    // fontWeight: '500',
    color: 'black',
  },
  primaryText2: {
    fontSize: 18,
    color: '#007bff',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookingScreen;
