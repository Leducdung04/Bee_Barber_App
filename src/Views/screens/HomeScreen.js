import {Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListBanner from '../components/home/ListBanner';
import useHomeTab from '../../ViewModels/useHomeTab';
import ServiceCategoryList from '../components/home/ServiceCategoryList';
import HeaderOder from '../components/home/HeaderOder';
import CategoryProductList from '../components/home/CategoryProductList';
import BarberList from '../components/home/BarberList';
import colors from '../../Resources/styles/colors';

const HomeScreen = () => {
  const {listBanner,categoryList,categoryProductList,barberList} = useHomeTab();
  const data = [
    { key: 'banner', component: <ListBanner listBanner={listBanner} /> },
    { key: 'categoryProduct', component: <CategoryProductList categoryProductList={categoryProductList} /> },
    { key: 'headerOrder', component: <HeaderOder /> },
    { key: 'serviceCategory', component: <ServiceCategoryList categoryList={categoryList} /> },
    { key: 'barber', component: <BarberList barberList={barberList} /> },
  ];

  const renderItem = ({ item }) => (
    <View>
      {item.component}
    </View>
  );
  return (
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.key}
    showsVerticalScrollIndicator={false}
  />
    // <ScrollView 
    //   style={styles.container} 
    //   scrollEnabled={scrollEnabled}
    // >
    //   <ListBanner 
    //     listBanner={listBanner} 
    //   />
    //   <CategoryProductList 
    //     categoryProductList={categoryProductList}
    //   />
    //   <HeaderOder/>
    //   <ServiceCategoryList 
    //     categoryList={categoryList}
    //   />
    //   <BarberList 
    //     barberList={barberList}
    //     onScrollStart={() => setScrollEnabled(false)}   
    //     onScrollEnd={() => setScrollEnabled(true)}
    //   />
    //   {/* <Image source={require('../../Resources/assets/images/footer.png')} style={{width:Dimensions.get('window').width,height:220,marginBottom:120}}/> */}
    // </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
