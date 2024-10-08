import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function CategoriesGridLayout() {
  const imageList = [
    {
      image: require('../../Resources/assets/images/anh3.png'),
      name: 'Sản Phẩm Mới',
      action: () => console.log('Sản Phẩm Mới')
      
    },
    {
      image: require('../../Resources/assets/images/anh5.png'),
      name : "Săn sale deal hời",
      action: () => console.log("Săn sale deal hời")
    },
    {
      image: require('../../Resources/assets/images/anh1.png'),
      name: 'Sản phẩm độc quyền',
      action: () => console.log('Sản phẩm độc quyền')
    },
    {
      image: require('../../Resources/assets/images/anh2.png'),
      name: 'Nhanh hết mụn',
      action: () => console.log('Nhanh hết mụn')
    },
    {
      image: require('../../Resources/assets/images/anh6.png'),
      name: 'Skin care',
      action: () => console.log('Skin care')
    },
    {
      image: require('../../Resources/assets/images/anh8.png'),
      name: 'Muốn tóc đẹp',
      action: () => console.log('Muốn tóc đẹp')
    },
    {
      image: require('../../Resources/assets/images/anh7.png'),
      name: 'Thơm tho sạch sẽ',
      action: () => console.log('Thơm tho sạch sẽ')
    },
    {
      image: require('../../Resources/assets/images/anh4.png'),
      name: 'Râu care',
      action: () => console.log('Râu care')
    },
  ];

  return (
    <View style={styles.container}>
      {imageList.map((item, index) => (
        <View style={styles.gridItem} key={index}>
          <TouchableOpacity onPress={item.action}>
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop:10
  },
  gridItem: {
  
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 40,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
