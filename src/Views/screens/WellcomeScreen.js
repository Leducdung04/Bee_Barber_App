import React, { useState, useRef, useEffect } from 'react';
import { View, ImageBackground, Dimensions, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../Resources/styles/colors';

const { width: widthScreen, height: heightScreen } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const listBanner = [
    require('../../Resources/assets/images/wellcome.1.jpg'),
    require('../../Resources/assets/images/wellcome.2.jpg'),
    require('../../Resources/assets/images/wellcome.3.jpg'),
  ];

  const [indexImage, setIndexImage] = useState(0);
  const flatListRef = useRef(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      const userId = await AsyncStorage.getItem('userLocal');
      if (userId) {
        setTimeout(() => {
          navigation.replace('TabNavigator');
        }, 3000);
      } else {
        setTimeout(() => {
          setIsLoadingData(false);
        }, 3000);
      }
    };

    checkUserStatus();

    // Cleanup khi component unmount
    return () => clearTimeout();
  }, [navigation]);

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
      {isLoadingData ? (
        <Modal visible={isLoadingData} animationType='fade'>
          <ImageBackground source={require('../../Resources/assets/images/wellcome.jpg')} style={styles.imageBackground} />
          <ActivityIndicator style={{ position: 'absolute', bottom: 100, start: 0, end: 0 }} size={38} color={colors.primary} />
        </Modal>
      ) : (
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
      )}

      <View style={styles.dotContainer}>
        {listBanner.map((_, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={indexImage === index ? styles.activeDot : styles.dot}
              onPress={() => flatListRef.current.scrollToIndex({ index, animated: true })}
            />
          );
        })}
      </View>

      <View style={[styles.dotContainer, { bottom: 150 }]}>
        <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen'); }} style={{ flex: 1 }}>
          <View style={{ flex: 1, height: 45, backgroundColor: colors.primary, borderRadius: 12, justifyContent: 'center', marginHorizontal: 100 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Đăng nhập</Text>
          </View>
        </TouchableOpacity>
      </View>
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
