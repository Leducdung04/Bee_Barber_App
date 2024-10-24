import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ListBanner from '../components/home/ListBanner';
import useHomeTab from '../../ViewModels/useHomeTab';
import ServiceCategoryList from '../components/home/ServiceCategoryList';
import HeaderOder from '../components/home/HeaderOder';
import CategoryProductList from '../components/home/CategoryProductList';
import BarberList from '../components/home/BarberList';
import colors from '../../Resources/styles/colors';

const HomeScreen = () => {
  const {listBanner,categoryList,categoryProductList,barberList} = useHomeTab();
  return (
    <ScrollView style={styles.container}>
      <ListBanner listBanner={listBanner} />
      <CategoryProductList categoryProductList={categoryProductList}/>
      <HeaderOder/>
      <ServiceCategoryList categoryList={categoryList}/>
      <BarberList barberList={barberList}/>
      {/* <Image source={require('../../Resources/assets/images/footer.png')} style={{width:Dimensions.get('window').width,height:220,marginBottom:120}}/> */}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
