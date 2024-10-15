import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import AppointmentScreen from '../screens/AppointmentScreen';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} 
         options={{headerShown:false}}
      />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
   </Stack.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})