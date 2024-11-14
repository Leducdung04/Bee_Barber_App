import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomButton from '../components/shop/CustomButton';
import GridDesign from '../components/shop/GridLayout';
import CategoriesGridLayout from '../components/shop/CategoriesGridLayout';
import TopSearch from '../components/shop/TopSearch';
import PartnershipBranding from '../components/shop/PartnershipBranding';
import MaterialTopTab from '../components/shop/ProductRecomendations';

const ShopScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1,paddingBottom:100}}>
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
