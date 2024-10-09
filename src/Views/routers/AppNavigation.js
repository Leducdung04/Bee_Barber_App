import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import CategoriesProductsScreen from '../screens/CategoriesProductsScreen';
import Entypo from 'react-native-vector-icons/Entypo'
import CircleBorder from '../components/CircleBorder';
import CategoriesSortingProduct from '../screens/CategoriesSortingProduct';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} 
         options={{headerShown:false}}
      />
      <Stack.Screen name="CategoriesProductsScreen" component={CategoriesProductsScreen} 
         options={
          {
            headerShown:true,
            title : "Sản phẩm mới",
            headerRight:() => (
              <View style={{flexDirection: 'row',gap:8,alignSelf:'flex-end' }}>
                <CircleBorder name="search-outline" size={20} background='#f7f7f7' border='#e3e3e3'/>
                <CircleBorder name="cart-outline" size={20} badgeCount={2} background='#f7f7f7' border='#e3e3e3'/>
                <CircleBorder name="dots-three-vertical" size={20} background='#f7f7f7' border='#e3e3e3'/>
              </View>
            )
          }
        }
        headerBackButtonMenuEnabled
      />
      <Stack.Screen name="Thêm" component={CategoriesSortingProduct} 
         options={
          {
            headerShown:true,
            headerRight:() => (
              <View style={{flexDirection: 'row',gap:8,alignSelf:'flex-end' }}>
                <CircleBorder name="search-outline" size={20} background='#f7f7f7' border='#e3e3e3'/>
                <CircleBorder name="cart-outline" size={20} badgeCount={2} background='#f7f7f7' border='#e3e3e3'/>
                <CircleBorder name="dots-three-vertical" size={20} background='#f7f7f7' border='#e3e3e3'/>
              </View>
            )
          }
        }
        headerBackButtonMenuEnabled
      />
   </Stack.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})