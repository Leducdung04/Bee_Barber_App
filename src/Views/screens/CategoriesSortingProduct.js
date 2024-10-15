import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const CategoriesSortingProduct = () => {
  const tabs = {
    0: [
      {
        name: 'Danh mục',
        action: () => console.log('Danh mục'),
      },
      {
        name: 'Combo siêu hời',
        action: () => console.log('Combo siêu hời'),
      },
      {
        name: 'Sản phẩm bán chạy',
        action: () => console.log('Sản phẩm bán chạy'),
      },
      {
        name: 'Sản phẩm mới',
        action: () => console.log('Sản phẩm mới'),
      },
      {
        name: 'Thương hiệu',
        action: () => console.log('Thương hiệu'),
      },
    ],
    1: [
      {
        name: 'Giới thiệu',
        action: () => console.log('Giới thiệu'),
      },
      {
        name: 'Liên hệ',
        action: () => console.log('Liên hệ'),
      },
      {
        name: 'Blog',
        action: () => console.log('Blog'),
      },
    ],
    2: [
      {
        name: 'Điều kiện giao dịch chung',
        action: () => console.log('Điều kiện giao dịch chung'),
      },
      {
        name: 'Chính sách bảo mật',
        action: () => console.log('Chính sách bảo mật'),
      },
    ],
  };

  const renderTabSection = (sectionTabs, sectionTitle) => (
    <View key={sectionTitle} style={styles.sectionContainer}>
      {sectionTabs.map((tab, index) => (
        <TouchableOpacity key={index} onPress={tab.action}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              paddingVertical: 10,
            }}>
            <Text style={styles.tabText}>{tab.name}</Text>
            <Entypo name="chevron-small-right" size={22} />
          </View>
          <Divider />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderTabSection(tabs[0])}
      {renderTabSection(tabs[1])}
      {renderTabSection(tabs[2])}
    </View>
  );
};

export default CategoriesSortingProduct;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
});
