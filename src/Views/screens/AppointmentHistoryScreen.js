import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../Resources/styles/colors';
import {useNavigation} from '@react-navigation/native';

const AppointmentHistoryScreen = () => {
  const nav = useNavigation();
  const [datahisStory, setdatahisStory] = useState([]);
  const api_url = 'http://10.0.2.2:3000/api/getAppointmentsByIduser/66fe1856faa0e86597afdbae';
  
  const getApi = async () => {
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setdatahisStory(data);
      console.log(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    getApi();
  }, []);
  // const haircutHistory = [
  //   {
  //     id: '1',
  //     Phone: '*678',
  //     appointment_time: '5 Giờ 20 phút',
  //     appointment_date: 'Thứ 2, Ngày 18.11, 12h00',
  //     stylist: 'Nguyễn Văn Hải',
  //     address: '123 Đường ABC, Quận 1, TP.HCM',
  //     status: false,
  //     price: 500000,
  //     action: () => nav.navigate('DetailsHistoryScreen'),
  //   },
  //   {
  //     id: '3',
  //     Phone: '*789',
  //     appointment_time: '6 Giờ 40 phút',
  //     appointment_date: 'Thứ 4, Ngày 19.11, 14h00',
  //     stylist: 'Trần Văn Hào',
  //     address: '456 Đường XYZ, Quận 2, TP.HCM',
  //     status: true,
  //     price: 500000,
  //     action: () => nav.navigate('DetailsHistoryScreen'),
  //   },
  // ];

  const finishhaircutHistory = [];
  const [rating, setRating] = useState(0);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => nav.navigate('DetailsHistoryScreen', { appointment: item })} // Chuyển sang DetailsHistoryScreen
      style={styles.itemContainer}
    >
      <View style={styles.card}>
        <Text style={styles.appointmentText}>
          {item.status? (
            <>
              Đã Thanh Toán Với Giá: <Text style={styles.highlight}>{item.price}đ</Text>
            </>
          ) : (
            <>
              Chỉ Còn <Text style={styles.highlight}>{item.appointment_time} h</Text> là đến lịch hẹn
            </>
          )}
        </Text>
        {renderInfoRow(
          require('../../Resources/assets/icons/calendarfill.jpg'),
          item.appointment_date,
        )}
        {renderInfoRow(
          require('../../Resources/assets/icons/accountFill.png'),
          item.barber_id.name,
        )}
        {renderInfoRow(
          require('../../Resources/assets/icons/accountFill.png'),
          item.service_id.description, // Đảm bảo rằng bạn đã lấy description chính xác từ API
        )}
        {renderActionButtons()}
      </View>
    </TouchableOpacity>
  );

  const renderInfoRow = (iconSource, text) => (
    <View style={styles.infoRow}>
      <Image style={styles.icon} source={iconSource} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Hủy Lịch</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.directionButton]}>
        <Text style={styles.directionButtonText}>Chỉ đường tới Salon</Text>
      </TouchableOpacity>
    </View>
  );

  const StarRating = () => (
    <View style={styles.ratingContainer}>
      <Text style={styles.textdanhgia}>Mời Anh Giá Chất Lượng Dịch Vụ</Text>
      <View style={styles.ratingStars}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text
              style={[
                styles.star,
                {color: star <= rating ? '#FFD700' : '#E0E0E0'},
              ]}>
              {star <= rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <Text style={styles.headerText}>Lịch hẹn</Text>
          <Image
            style={styles.customIcon}
            source={require('../../Resources/assets/images/cross.png')}
          />
        </View>

        <FlatList
          data={datahisStory}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không có lịch cắt nào.</Text>
          }
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <Text style={styles.headerText}>Đã cắt xong</Text>
          <Image
            style={styles.customIcon}
            source={require('../../Resources/assets/images/check-mark.png')}
          />
        </View>
        <FlatList
          data={datahisStory} // Nếu bạn có danh sách khác, hãy thay đổi ở đây
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            // <Text style={styles.emptyText}>Không có lịch cắt nào.</Text>
            <View style={styles.centeredContainer}>
              <Image
                style={styles.emptyList}
                source={require('../../Resources/assets/images/box.png')}
              />
            </View>
          }
        />
        <StarRating />
      </View>
    </ScrollView>
  );
};

export default AppointmentHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
    backgroundColor: colors.white,
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  centeredContainer: {
    flex: 1, // Đảm bảo chiếm toàn bộ không gian trong View
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  emptyList: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  customIcon: {
    width: 20,
    height: 20,
    marginTop: 3,
  },
  headerText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemContainer: {
    marginVertical: 10,
  },
  statusText: {
    color: '#003399',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  card: {
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E0E0E0',
  },
  appointmentText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  highlight: {
    color: 'red',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  infoText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
    height: 40,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionButton: {
    backgroundColor: '#3333FF',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  directionButtonText: {
    color: 'white',
  },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  textdanhgia: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#757575',
    textTransform: 'uppercase',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    fontSize: 50,
    marginRight: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.darkGrey,
    marginVertical: 20,
  },
});
