import {
  Animated,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ProductLayout from './ProductLayout';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Divider, Searchbar, Checkbox} from 'react-native-paper';

const TopSearchScreen = () => {
  const [value, setValue] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedBrands, setSelectedBrands] = useState({});
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState({from: '', to: ''});
  const [showAllBrands, setShowAllBrands] = useState(false);
  const tabs = [
    'Tất cả',
    'Kem Chống Nắng',
    'Toner',
    'Tẩy tế bào chết',
    'Dưỡng da',
    'Sửa rửa mặt',
    'Miếng dán mụn',
    'Mặt nạ',
  ];
  const handleSelectBrand = brand => {
    setSelectedBrands(prev => ({
      ...prev,
      [brand]: !prev[brand],
    }));
  };
  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showFilterModal, slideAnim]);

  const handleStarPress = rating => {
    setSelectedRating(rating);
  };

  const productData = {
    0: [
      {
        id: '1',
        image: require('../../../Resources/assets/images/anh9.jpg'),
        name: 'Pomade Tạo Kiểu',
        priceRange: '300.000 - 500.000 VND',
        rating: 4.5,
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

  const data = [
    {label: 'Mặc định', value: '1'},
    {label: 'Đánh giá cao', value: '2'},
    {label: 'Giá thấp đến cao', value: '3'},
    {label: 'Giá cao đến thấp', value: '4'},
    {label: 'Tên: từ A-Z', value: '5'},
    {label: 'Tên: từ Z-A', value: '6'},
  ];

  const ProductTopRecomendations = ({products}) => (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({item}) => <ProductLayout item={item} />}
      keyExtractor={item => item.id}
    />
  );

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabPress = index => {
    setSelectedTab(index);
  };

  const partnerships = [
    'BENEW',
    'LABORIE',
    'UMOS',
    'UNO',
    'CERAVE',
    'LA ROCHE POSAY',
    'CAFE MINI',
    'NERMAN',
    'NÓNG CÙNG MÙA BÓNG',
    'HALIO',
    'SIMPLE',
    'G.G.G',
    'SELSUN',
    'DERLADIE',
    'NEUTROGENA',
    'ONOFF',
  ];
  const displayedBrands = showAllBrands
    ? partnerships
    : partnerships.slice(0, 5);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 50}}>
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
      </View>
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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}>
          <Text style={styles.filterText}>Lọc</Text>
          <MaterialCommunityIcons
            name="filter-outline"
            size={24}
            color="darkslategrey"
          />
        </TouchableOpacity>
      </View>
      <ProductTopRecomendations products={productData[selectedTab] || []} />
      <Modal visible={showFilterModal} transparent animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {transform: [{translateX: slideAnim}]},
            ]}>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Fontisto name="close-a" color="black" size={15} />
            </TouchableOpacity>
            <Text style={styles.modalText}>BỘ LỌC</Text>
            <Divider />
            <Text style={styles.modalSubText}>Khoảng Giá</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.priceRangeRow}>
                <View style={styles.priceRangeContainer}>
                  <Text style={styles.priceRangeText}>Từ</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="đ _ _ _ _"
                    keyboardType="numeric"
                    value={priceRange.from}
                    onChangeText={text =>
                      setPriceRange({...priceRange, from: text})
                    }
                  />
                </View>
                <View style={styles.priceRangeContainer}>
                  <Text style={styles.priceRangeText}>Đến</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="đ _ _ _ _"
                    keyboardType="numeric"
                    value={priceRange.to}
                    onChangeText={text =>
                      setPriceRange({...priceRange, to: text})
                    }
                  />
                </View>
              </View>
            </View>
            <Divider />
            <Text style={styles.modalSubText}>Đánh giá</Text>
            <View style={styles.ratingContainer}>
              {[5, 4, 3, 2, 1].map(rating => (
                <View key={rating} style={styles.ratingRow}>
                  {Array.from({length: rating}, (_, index) => (
                    <MaterialCommunityIcons
                      key={index}
                      name="star"
                      size={32}
                      color="gold"
                    />
                  ))}

                  {Array.from({length: 5 - rating}, (_, index) => (
                    <MaterialCommunityIcons
                      key={index}
                      name="star-outline"
                      size={32}
                      color="gray"
                    />
                  ))}

                  <Text style={styles.starText}>{`${rating} sao`}</Text>
                </View>
              ))}
            </View>

            {/* <Divider />
            <Text style={styles.modalSubText}>Thương hiệu</Text>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
            <FlatList
              data={displayedBrands}
              renderItem={({item}) => (
                <View style={styles.brandContainer}>
                  <Checkbox
                    status={selectedBrands[item] ? 'checked' : 'unchecked'}
                    onPress={() => handleSelectBrand(item)}
                  />
                  <Text>{item}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={
                !showAllBrands ? (
                  <TouchableOpacity
                    onPress={() => setShowAllBrands(true)}
                    style={styles.seeMoreContainer}>
                    <Text style={styles.seeMoreText}>Xem thêm</Text>
                    <MaterialCommunityIcons name="chevron-down" size={22} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setShowAllBrands(false)}
                    style={styles.seeMoreContainer}>
                    <Text style={styles.seeMoreText}>Ẩn bớt</Text>
                    <MaterialCommunityIcons name="chevron-up" size={22} />
                  </TouchableOpacity>
                )
              }
            /> */}

            <Divider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              
              }}>
              <TouchableOpacity style={styles.clearFiltersButton}>
                <Text style={styles.clearFiltersText}>Bỏ tất cả bộ lọc</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyFiltersButton}>
                <Text style={styles.applyFiltersText}>Áp dụng bộ lọc</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default TopSearchScreen;

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
  tabContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 7,
    backgroundColor: 'white',
    position: 'relative',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  productItem: {
    backgroundColor: '#eaeaea',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    flex: 1,
  },
  indicator: {
    marginTop: 5,
    height: 4,
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: 290,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  clearFiltersButton: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  clearFiltersText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
  },
  applyFiltersButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  applyFiltersText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',
  },
  modalSubText: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    color: 'dimgrey',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  ratingContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    width: '45%',
    color: 'lightslategrey',
  },
  priceRangeText: {
    fontWeight: '600',
    color: 'darkgrey',
  },
  priceRangeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  seeMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    color: 'grey',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  starCountText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  starText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'dimgrey',
    fontWeight: '600',
  },
  
});
