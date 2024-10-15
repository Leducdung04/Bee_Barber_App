import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function GridDesign() {
  return (
    <View style={styles.container}>
      <View style={styles.gridItem}>
        <Image
          source={require('../../Resources/assets/icons/fast-delivery.png')}
          style={styles.icon}
        />
        <Text style ={styles.text}>Giao Hàng Siêu Tốc</Text>
      </View>
      <View style={styles.gridItem}>
        <Image
          source={require('../../Resources/assets/icons/package.png')}
          style={styles.icon}
        />
        <Text style ={styles.text}>Hoàn tiền 120%</Text>
      </View>
      <View style={styles.gridItem}>
        <Image
          source={require('../../Resources/assets/icons/return-box.png')}
          style={styles.icon}
        />
        <Text style ={styles.text}>Đổi trả tận nơi</Text>
      </View>
      <View style={styles.gridItem}>
        <Image
          source={require('../../Resources/assets/icons/product-approved.png')}
          style={styles.icon}
        />
        <Text style ={styles.text}>Cam kết 7 ngày hiệu quả</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor:"white",
    flexDirection: 'row',
    width: '50%',
    height: 65,
    borderColor: 'black',
    borderWidth: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginEnd: 7,
    height: 26,
    width: 26,
  },
  text:{
    width: 130,
  }
});
