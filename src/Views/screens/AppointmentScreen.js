// // Views/Screens/BookingScreen.js
// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Modal } from 'react-native';
// import ServiceSelectionComponent from '../components/ServiceSelectionComponent';
// import TimeSelectionComponent from '../components/TimeSelectionComponent';
// import { useBookingViewModel } from '../../ViewModels/AppointmentModel';

// const BookingScreen = () => {
//   const {
//     selectedItems,
//     selectedTime,
//     onSelectedItemsChange,
//     handleTimeSelect,
//   } = useBookingViewModel();

//   const items = [
//     { id: '1', name: 'Cắt tóc' },
//     { id: '2', name: 'Gội đầu' },
//     { id: '3', name: 'Nhuộm tóc' },
//     // other services...
//   ];

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View>
//           <Text>Chọn dịch vụ</Text>
//           <ServiceSelectionComponent
//             items={items}
//             selectedItems={selectedItems}
//             onSelectedItemsChange={onSelectedItemsChange}
//           />
//         </View>

//         {selectedItems.length > 0 && (
//           <View>
//             <Text>Chọn thời gian</Text>
//             <TimeSelectionComponent
//               availableTimes={['08:00', '09:00', '10:00']}
//               selectedTime={selectedTime}
//               onTimeSelect={handleTimeSelect}
//             />
//           </View>
//         )}

//         <TouchableOpacity>
//           <Text>Xác nhận</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default BookingScreen;

// Views/Screens/BookingScreen.js
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ServiceSelectionComponent from '../components/ServiceSelectionComponent';
import TimeSelectionComponent from '../components/TimeSelectionComponent';
import StylistSelectionComponent from '../components/StylistSelectionComponent'; // Import component mới
import { useBookingViewModel } from '../../ViewModels/AppointmentModel';

const BookingScreen = () => {
  const {
    selectedItems,
    selectedTime,
    onSelectedItemsChange,
    handleTimeSelect,
  } = useBookingViewModel();

  const items = [
    { id: '1', name: 'Cắt tóc' },
    { id: '2', name: 'Gội đầu' },
    { id: '3', name: 'Nhuộm tóc' },
    { id: '4', name: 'Làm đẹp' },
    { id: '5', name: 'Hút mụn' },
    { id: '6', name: 'Xông hơi' },
    { id: '7', name: 'Lấy ráy tai' },
  ];

  // Lấy ngày giờ hiện tại
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = currentDate.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
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

  const [selectedStylist, setSelectedStylist] = useState(null);
  const [stylistVisible, setStylistVisible] = useState(false); // State cho việc hiển thị stylist

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
    // setStylistVisible(false); // Đóng khi chọn stylist
  };

  const toggleStylistVisibility = () => {
    setStylistVisible(!stylistVisible); // Chuyển đổi trạng thái hiển thị
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>1. Chọn dịch vụ</Text>
          <ServiceSelectionComponent
            items={items}
            selectedItems={selectedItems}
            onSelectedItemsChange={onSelectedItemsChange}
          />

          {/* Phần chọn ngày, giờ & stylist */}
          <View style={styles.itemContainers}>
            <View style={styles.flexItem}>
              <View style={styles.roundCircle}></View>
              <Text style={styles.textMuted}>2. Chọn ngày & giờ stylist</Text>
            </View>
            {selectedItems.length > 0 && (
              <TouchableOpacity onPress={toggleStylistVisibility}>
                <Text style={styles.textStylist}>👤Chọn Stylist </Text>
              </TouchableOpacity>
            )}
            {stylistVisible && (
              <StylistSelectionComponent stylists={stylists} onSelect={handleStylistSelect} />
            )}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.primaryText}>📅 {formattedDate}, {formattedTime}</Text>
            </TouchableOpacity>
          </View>

          {selectedItems.length > 0 && (
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
    </SafeAreaView>
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
