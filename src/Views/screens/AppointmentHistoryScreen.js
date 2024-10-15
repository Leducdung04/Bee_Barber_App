import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../../Resources/styles/colors';

const AppointmentHistoryScreen = () => {
  
  const haircutHistory = [
    { id: '1', date: '01-10-2023', time: '10:00 AM', stylist: 'Nguyễn Văn Hải', service: 'Combo 5 Bước Nam', price: '$20' },
    { id: '3', date: '15-09-2013', time: '02:30 PM', stylist: 'Trần Văn Hào', service: 'Lấy Ráy Tai và Gội Đầu', price: '$10' },
    { id: '2', date: '20-08-2022', time: '09:45 AM', stylist: 'Phan Văn Tiền', service: 'Làm Mặt S�� Làm Răng', price: '$15' },
    { id: '4', date: '07-07-2022', time: '06:15 PM', stylist: 'Lê Văn Minh', service: 'Làm Mặt Sưa Làm Răng', price: '$15' },

  ];

  const [rating, setRating] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.details}>Thời gian: {item.time}</Text>
      <Text style={styles.details}>Thợ cắt: {item.stylist}</Text>
      <Text style={styles.details}>Dịch vụ: {item.service}</Text>
      <Text style={styles.details}>Giá: {item.price}</Text>
    </View>
  );

  const StarRating = () => {
    return (
      <View style={styles.Sumsao}>
        <Text style={styles.textdanhgia}>Mời Khách Hàng Đánh Giá Chất Lượng Dịch Vụ</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Text style={[styles.star, { color: star <= rating ? '#FFD700' : '#E0E0E0' }]}>
                {star <= rating ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={haircutHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={StarRating} // Đặt StarRating ở cuối danh sách
      />
    </View>
  );
};

export default AppointmentHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: "10%",
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#E0E0E0",
    elevation: 2,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    fontSize: 50,
    marginRight: 5,
  },
  Sumsao: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, 
  },
  textdanhgia: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#757575",
    textTransform: 'uppercase',
  },
});