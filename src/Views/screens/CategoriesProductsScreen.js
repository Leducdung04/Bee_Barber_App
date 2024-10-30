import {StyleSheet, Text, View, TouchableOpacity, FlatList, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Drawer} from 'react-native-paper';
import useShopTab from "../../ViewModels/useShopTab"

import ProductLayout from '../components/shop/ProductLayout';

const CategoriesProductsScreen = () => {
  const [value, setValue] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [active, setActive] = useState('');
  const drawerAnimation = useRef(new Animated.Value(-300)).current; // Hidden position

  const {productList,categoryProductList}  = useShopTab()
  console.log("Hellllll",productList);
  
  const data = [
    {label: 'Mặc định', value: '1'},
    {label: 'Đánh giá cao', value: '2'},
    {label: 'Giá thấp đến cao', value: '3'},
    {label: 'Giá cao đến thấp', value: '4'},
    {label: 'Tên: từ A-Z', value: '5'},
    {label: 'Tên: từ Z-A', value: '6'},
  ];

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(drawerAnimation, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: -300, 
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerVisible(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Mặc định"
          searchPlaceholder="Tìm kiếm..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
        <TouchableOpacity style={styles.filterButton} onPress={openDrawer}>
          <Text style={styles.filterText}>Lọc</Text>
          <MaterialCommunityIcons
            name="filter-outline"
            size={24}
            color="darkslategrey"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={productList}
        numColumns={2}
        renderItem={({item}) => <ProductLayout item={item} />}
        keyExtractor={item => item.id}
      />
      {/* <Drawer.Section
        visible={drawerVisible}
        onDismiss={closeDrawer}
        style={styles.drawer}
        anchor="right">
        <Drawer.Item
          label="First Item"
          active={active === 'first'}
          onPress={() => console.log('first')}
        />
        <Drawer.Item
          label="Second Item"
          active={active === 'second'}
          onPress={() => console.log('second')}
        />
      </Drawer.Section> */}
    </View>
  );
};

export default CategoriesProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#b4b4b4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdown: {
    width: 200,
    height: 40,
    backgroundColor: '#b4b4b4',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  drawer: {
    width: 200,
  },
  drawerContent: {
    padding: 16,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterOption: {
    fontSize: 16,
    marginVertical: 10,
  },
});
