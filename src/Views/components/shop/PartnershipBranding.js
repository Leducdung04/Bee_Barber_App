import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  
  const PartnershipBranding = () => {
    const BrandImages = [
      {
        image: require('../../../Resources/assets/logo/Brands/davines.jpg'),
        action: () => console.log('Davines'),
      },
      {
        image: require('../../../Resources/assets/logo/Brands/glanzen.jpg'),
        action: () => console.log('Glanzen'),
      },
      {
        image: require('../../../Resources/assets/logo/Brands/reuzel.jpg'),
        action: () => console.log('Reuzel'),
      },
      {
        image: require('../../../Resources/assets/logo/Brands/SNPBeauty.jpg'),
        action: () => console.log('SNPBeauty'),
      },
      {
        image: require('../../../Resources/assets/logo/Brands/theplantbase.jpg'),
        action: () => console.log('The Plant Base'),
      },
    ];
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thương Hiệu Hợp Tác</Text>
        <Text style={styles.subtitle}>
          Hệ thống cửa hàng phân phối mỹ phẩm nam chính hãng từ các thương hiệu
          nổi tiếng
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {BrandImages.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.action}
              style={styles.touchable}>
              <View style={styles.shadowContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  export default PartnershipBranding;
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color:"dimgrey",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 16,
      color: '#666',
    },
    touchable: {
      marginRight: 10,
    },
    shadowContainer: {
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 7,
    },
    image: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      borderWidth:0.5,
      borderColor:"darkgray"
    },
  });
  