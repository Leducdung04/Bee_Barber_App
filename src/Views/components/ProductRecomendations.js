import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import ProductLayout from './ProductLayout';

const ProductRecomendationsList = ({ products }) => (
  <FlatList
    data={products}
    numColumns={2}
    renderItem={({ item }) => <ProductLayout item = {item}/>}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.listContainer}
  />
);


const MaterialTopApp = () => {
  const tabs = [
    'Sản phẩm mới',
    'Tạo kiểu tóc',
    'Chăm sóc tóc',
    'Chăm sóc da',
    'Chăm sóc cá nhân',
    'Combo siêu tiết kiệm',
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const productData = {
    0: [
      {     
        id: '1',
        image: require('../../Resources/assets/images/anh9.jpg'),
        name: 'Pomade Tạo Kiểu',
        priceRange: '300.000 - 500.000 VND',
        rating: 4.5, 
      },
      {  
        id: '2',
        image: require('../../Resources/assets/images/anh11.jpg'),
        name: 'Dầu Gội Chăm Sóc Tóc',
        priceRange: '250.000 - 400.000 VND',
        rating: 4.0, 
      },
    ],
    1: [
      {
        id: '3',
        image: require('../../Resources/assets/images/anh10.jpg'),
        name: 'Sữa Rửa Mặt',
        priceRange: '200.000 - 350.000 VND',
        rating: 4.7,
      },
      {
        id: '4',
        image: require('../../Resources/assets/images/anh12.jpg'),
        name: 'Combo Chăm Sóc Da',
        priceRange: '500.000 - 800.000 VND',
        rating: 4.9,
      },
    ],
    2: [
      {
        id: '3',
        image: require('../../Resources/assets/images/anh10.jpg'),
        name: 'Sữa Rửa Mặt',
        priceRange: '200.000 - 350.000 VND',
        rating: 4.7,
      },
      {
        id: '4',
        image: require('../../Resources/assets/images/anh12.jpg'),
        name: 'Combo Chăm Sóc Da',
        priceRange: '500.000 - 800.000 VND',
        rating: 4.9,
      },
    ],
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
      {/* Custom Horizontal Tab Bar */}
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === index && styles.activeTab]}
            onPress={() => setSelectedTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === index && styles.activeTabText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      <View style={{ flex: 1 }}>
        <ProductRecomendationsList
          products={productData[selectedTab] || []}
        />
      </View>
    </View>
  );
};

export default MaterialTopApp;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'gray',
  },
  activeTab: {
    backgroundColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    color: 'white',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: 'white',
  },
  productItem: {
    backgroundColor: '#eaeaea',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
