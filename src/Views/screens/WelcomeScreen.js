import React, { useState, useRef, useEffect } from 'react';
import { View, ImageBackground, Dimensions, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Resources/styles/colors';

const { width: widthScreen, height: heightScreen } = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  const listBanner = [
    require('../../Resources/assets/images/wellcome1.jpg'),
    require('../../Resources/assets/images/wellcome2.jpg'),
    require('../../Resources/assets/images/wellcome3.jpg'),
  ];

  const [indexImage, setIndexImage] = useState(0);
  const flatListRef = useRef(null);
  const [isLodingData, setisLodingData] = useState(true)

  // Xử lý khi lấy dữ liệu data thành công 
  useEffect(() => {
    // tạm thời để sau 3s thì tắt 
    const timer = setTimeout(() => {
      setisLodingData(false);
    }, 3000);
  
    // Cleanup để xóa timer khi component unmount
    return () => clearTimeout(timer);
  }, []);
  
  

  // Kiểm tra nếu không có banner thì hiển thị màn hình loading

  // Hàm xử lý cuộn và cập nhật chỉ số hình ảnh
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndexImage(viewableItems[0].index);
    }
  }).current;

  const ItemImage = ({ item }) => {
    return (
      <ImageBackground source={item} style={styles.imageBackground} />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listBanner}
        horizontal
        pagingEnabled // Chỉ cho phép vuốt qua 1 item mỗi lần
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ItemImage item={item} />}
        onViewableItemsChanged={onViewableItemsChanged} // Cập nhật trạng thái khi cuộn
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }} // Đảm bảo hình ảnh hiển thị ít nhất 50%
        ref={flatListRef}
      />

      <View style={styles.dotContainer}>
        {listBanner.map((_, index) => {
          return (
            <TouchableOpacity
              key={index}
              style= {indexImage === index ? styles.activeDot:styles.dot}
              
              onPress={() => flatListRef.current.scrollToIndex({ index, animated: true })}
            />
          );
        })}
      </View>

      <View style={[styles.dotContainer,{bottom:150}]}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}  style={{ flex: 1 }}>
              <View style={{ flex: 1, height: 45, backgroundColor: colors.primary, borderRadius: 12, justifyContent: 'center',marginHorizontal:100 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Đăng nhập</Text>
              </View>
        </TouchableOpacity>
      </View>

       <Modal visible={isLodingData} animationType='fade' >
       <ImageBackground source={require('../../Resources/assets/images/wellcome.jpg')} style={styles.imageBackground} />
       <ActivityIndicator style={{position:'absolute',bottom:100,start:0,end:0}} size={38} color={colors.primary}/>
       </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightScreen,
  },
  loadingContainer: {
    width: widthScreen,
    height: heightScreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: widthScreen,
    height: heightScreen,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 100, // Khoảng cách của dot từ dưới cùng
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    backgroundColor: colors.primary,
  },
  imageInView: {
    backgroundColor: colors.secondary, // Màu sắc khi ảnh đang hiển thị
  },
});

export default WelcomeScreen;
