import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import CategoriesProductsScreen from '../screens/CategoriesProductsScreen';
import {Menu, Provider} from 'react-native-paper';
import CircleBorder from '../components/CircleBorder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoriesSortingProduct from '../screens/CategoriesSortingProduct';
import TopSearchScreen from '../screens/TopSearchScreen';
import ServiceByCategoryScreen from '../screens/ServiceByCategoryScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import colors from '../../Resources/styles/colors';


import UserProfile from '../screens/UserProfile'
import Cart from '../screens/Cart';
import AppointmentScreen from '../screens/AppointmentScreen';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} 
         options={{headerShown:false}}
      />
   </Stack.Navigator>
    </Provider>
  );
};

export default AppNavigation

const styles = StyleSheet.create({})