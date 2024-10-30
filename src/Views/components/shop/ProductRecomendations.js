import React, {useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import ProductLayout from './ProductLayout';
import { useNavigation } from '@react-navigation/native';
import useShopTab from '../../../ViewModels/useShopTab'



const MaterialTopApp = () => {

  const {productList,categoryList,categoryProductList}  = useShopTab()

  const tabs = [
    'Sản phẩm mới',
    'Tạo kiểu tóc',
    'Chăm sóc tóc',
    'Chăm sóc da',
    'Chăm sóc cá nhân',
    'Combo siêu tiết kiệm',
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const nav = useNavigation()

  const productData = {
    0: [
      {
        id: '1',
        image: require('../../../Resources/assets/images/anh9.jpg'),
        name: 'Pomade Tạo Kiểu',
        priceRange: '300.000 - 500.000 VND',
        rating: 4.5,
        onPress : () => nav.navigate("ProductScreen",{})
      },
      {
        id: '2',
        image: require('../../../Resources/assets/images/anh11.jpg'),
        name: 'Dầu Gội Chăm Sóc Tóc',
        priceRange: '250.000 - 400.000 VND',
        rating: 4.0,
      },
      {
        id: '3',
        image: require('../../../Resources/assets/images/anh9.jpg'),
        name: 'Pomade Tạo Kiểu',
        priceRange: '300.000 - 500.000 VND',
        rating: 4.5,
      },
      {
        id: '4',
        image: require('../../../Resources/assets/images/anh11.jpg'),
        name: 'Dầu Gội Chăm Sóc Tóc',
        priceRange: '250.000 - 400.000 VND',
        rating: 4.0,
      },
      {
        id: '5',
        image: require('../../../Resources/assets/images/anh9.jpg'),
        name: 'Pomade Tạo Kiểu',
        priceRange: '300.000 - 500.000 VND',
        rating: 4.5,
      },
      {
        id: '6',
        image: require('../../../Resources/assets/images/anh11.jpg'),
        name: 'Dầu Gội Chăm Sóc Tóc',
        priceRange: '250.000 - 400.000 VND',
        rating: 4.0,
      },
      {
        id: '7',
        image: require('../../../Resources/assets/images/anh9.jpg'),
        name: 'Pomade Tạo Kiểu',
        priceRange: '300.000 - 500.000 VND',
        rating: 4.5,
      },
      {
        id: '8',
        image: require('../../../Resources/assets/images/anh11.jpg'),
        name: 'Dầu Gội Chăm Sóc Tóc',
        priceRange: '250.000 - 400.000 VND',
        rating: 4.0,
      },
    ],
    1: [
      {
        id: '3',
        image: require('../../../Resources/assets/images/anh10.jpg'),
        name: 'Sữa Rửa Mặt',
        priceRange: '200.000 - 350.000 VND',
        rating: 4.7,
      },
      {
        id: '4',
        image: require('../../../Resources/assets/images/anh12.jpg'),
        name: 'Combo Chăm Sóc Da',
        priceRange: '500.000 - 800.000 VND',
        rating: 4.9,
      },
    ],
    2: [
      {
        id: '3',
        image: require('../../../Resources/assets/images/anh10.jpg'),
        name: 'Sữa Rửa Mặt',
        priceRange: '200.000 - 350.000 VND',
        rating: 4.7,
      },
      {
        id: '4',
        image: require('../../../Resources/assets/images/anh12.jpg'),
        name: 'Combo Chăm Sóc Da',
        priceRange: '500.000 - 800.000 VND',
        rating: 4.9,
      },
    ],
  };

  const handleTabPress = index => {
    setSelectedTab(index);
  };

  const ProductRecomendationsList = ({products}) => (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({item}) => <ProductLayout item={item} onPress={item.onPress} />}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      ListHeaderComponent={HeaderTabs}
    />
  );

  const HeaderTabs = () => {
    return (
      <ScrollView horizontal style={styles.tabContainer}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabButton}
            onPress={() => handleTabPress(index)}>
            <Text style={styles.tabText}>{item}</Text>
            {selectedTab === index && <View style={styles.indicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ProductRecomendationsList products={productData[selectedTab] || []} />
    </View>
  );
};

export default MaterialTopApp;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: 'white',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  indicator: {
    marginTop: 5,
    height: 4,
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 2,
  },
});
