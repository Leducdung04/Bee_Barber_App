import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../Resources/styles/colors';

const AppointmentHistoryScreen = () => {
  const haircutHistory = [
    {
      id: '1',
      Phone:"*678",
      gio:"5 Giờ 20 phút",
      time: 'Thứ 2,Ngày 18.11,12h00',
      stylist: 'Nguyễn Văn Hải',
      address: '123 Đường ABC, Quận 1, TP.HCM',
     
    },
    {
      id: '3',
      Phone:"*789",
      gio:"6 Giờ 40 phút",
      date: 'Thứ 4,Ngày 19.11,14h00',
      stylist: 'Trần Văn Hào',
      address: '456 Đường XYZ, Quận 2, TP.HCM',

    }
  ];

  const [rating, setRating] = useState(0);

  const renderItem = ({ item }) => (
    <View style={{flex: 1, marginHorizontal: 20}}>
    <View style={{marginTop: '10%', marginBottom: '2%'}}>
      <Text style={{color: '#003399', fontSize: 15, fontWeight: '600'}}>
        LỊCH ĐẶT SẮP TỚI
      </Text>
    </View>
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E0E0E0',
      }}>
      <Text style={{color: 'black', fontSize: 14, fontWeight: '800'}}>
        Chỉ Còn <Text style={{color: 'red'}}>20 Giờ 20 phút</Text> là đến lịch
        hẹn SDT *4758
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 30, height: 30, marginTop: 10}}
          source={require('../../Resources/assets/icons/calendarfill.jpg')}></Image>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: '300',
            marginTop: 12,
            marginLeft: 5,
          }}>
          Thứ 4, Ngày 16.10, 11h00
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 30, height: 30, marginTop: 10}}
          source={require('../../Resources/assets/icons/vitri.png')}></Image>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: '300',
            marginTop: 12,
            marginLeft: 5,
          }}>
          10 Trần Phú ,P. Hà Đông, Hà Nội
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 30, height: 30, marginTop: 10}}
          source={require('../../Resources/assets/icons/accountFill.png')}></Image>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: '300',
            marginTop: 12,
            marginLeft: 5,
          }}>
          Salon sẽ chọn stylist phù hợp
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:20
        }}>
        <TouchableOpacity
          style={{
            width: 150,
            height:40,
            backgroundColor: '#DDDDDD',
            borderRadius: 5,
            marginRight:10
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '400',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Đổi/Hủy Lịch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
          width: 150,
          height: 40,
          backgroundColor: '#3333FF',
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: '400',
            textAlign: 'center',
            marginTop: 10,
          }}>
         Chỉ đường tới Salon
        </Text>
      </TouchableOpacity>
      </View>
    </View>
   
  </View>
  );

  const StarRating = () => {
    return (
      <View style={styles.Sumsao}>
        <Text style={styles.textdanhgia}>
          Mời Anh Giá Chất Lượng Dịch Vụ
        </Text>
        <View style={styles.ratingContainer}>
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
  };
 
  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
    <View style={{marginTop: '10%', marginBottom: '2%'}}>
      <Text style={{color: '#003399', fontSize: 15, fontWeight: '600'}}>
        LỊCH ĐẶT SẮP TỚI
      </Text>
    </View>
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E0E0E0',
      }}>
      <Text style={{color: 'black', fontSize: 14, fontWeight: '800'}}>
        Chỉ Còn <Text style={{color: 'red'}}>20 Giờ 20 phút</Text> là đến lịch
        hẹn SDT *4758
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 30, height: 30, marginTop: 10}}
          source={require('../../Resources/assets/icons/calendarfill.jpg')}></Image>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: '300',
            marginTop: 12,
            marginLeft: 5,
          }}>
          Thứ 4, Ngày 16.10, 11h00
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 30, height: 30, marginTop: 10}}
          source={require('../../Resources/assets/icons/vitri.png')}></Image>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: '300',
            marginTop: 12,
            marginLeft: 5,
          }}>
          10 Trần Phú ,P. Hà Đông, Hà Nội
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 30, height: 30, marginTop: 10}}
          source={require('../../Resources/assets/icons/accountFill.png')}></Image>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: '300',
            marginTop: 12,
            marginLeft: 5,
          }}>
          Salon sẽ chọn stylist phù hợp
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:20
        }}>
        <TouchableOpacity
          style={{
            width: 150,
            height:40,
            backgroundColor: '#DDDDDD',
            borderRadius: 5,
            marginRight:10
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '400',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Đổi/Hủy Lịch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
          width: 150,
          height: 40,
          backgroundColor: '#3333FF',
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: '400',
            textAlign: 'center',
            marginTop: 10,
          }}>
         Chỉ đường tới Salon
        </Text>
      </TouchableOpacity>
      </View>
    </View>
    <Text style={{color: '#003399', fontSize: 15, fontWeight: '600',marginTop:10,marginBottom:10}}>
    HÀNH TRÌNH TỎA SÁNG    
    </Text>
    <View
    style={{
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    }}>
    <StarRating></StarRating>
    
    </View>
  </View>
  );
};
// <FlatList
// data={haircutHistory}
// renderItem={renderItem}
// keyExtractor={(item) => item.id}
// contentContainerStyle={styles.listContainer}
// ListFooterComponent={StarRating} // Đặt StarRating ở cuối danh sách
// />

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
