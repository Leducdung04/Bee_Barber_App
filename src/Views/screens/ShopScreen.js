import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import GridDesign from '../components/GridLayout';
import CategoriesGridLayout from '../components/CategoriesGridLayout';
import TopSearch from '../components/TopSearch';
import PartnershipBranding from '../components/PartnershipBranding';
import MaterialTopTab from '../components/ProductRecomendations';

const ShopScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1,paddingBottom:100}}>
        <View style={{flexDirection: 'row', margin: 10, gap: 9}}>
          <CustomButton title="Sổ địa chỉ" />
          <CustomButton title="Đơn hàng" />
        </View>
        <CategoriesGridLayout />
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('../../Resources/assets/images/banner.png')}
            style={styles.imageBackground}>
            <Text style={styles.titleText}>GỢI Ý MUA SẮM LIỀN TAY</Text>
            <Text style={styles.subtitleText}>
              Lựa chọn ưa chuộng cho quý khách
            </Text>
          </ImageBackground>
        </View>
        <MaterialTopTab/>
        <TopSearch/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
  },
  imageBackground: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 23,
    color: 'white',
    textAlign: 'center',
  },
});
