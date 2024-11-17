import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import CategoriesProductsScreen from '../components/shop/CategoriesProductsScreen';
import { Menu, Provider } from 'react-native-paper';
import CircleBorder from '../components/shop/CircleBorder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoriesSortingProduct from '../components/shop/CategoriesSortingProduct';
import TopSearchScreen from '../components/shop/TopSearchScreen';
import ServiceByCategoryScreen from '../screens/ServiceByCategoryScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import UserProfile from '../screens/UserProfile'
import Cart from '../screens/Cart';
import ProductScreen from '../components/shop/ProductScreen';import WelcomeScreen from '../screens/WelcomeScreen';
import TestZaloPay from '../screens/TestZaloPay';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (

    <Provider>
      <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen name="TestZaloPay" component={TestZaloPay} options={{headerShown:false}} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CategoriesProductsScreen"
          component={CategoriesProductsScreen}
          options={{
            headerShown: true,
            title: 'Sản phẩm mới',
            headerRight: () => (
              <View style={styles.headerRight}>
                <CircleBorder
                  name="search-outline"
                  size={20}
                  background="#f7f7f7"
                  border="#e3e3e3"
                />
                <CircleBorder
                  name="cart-outline"
                  size={20}
                  badgeCount={2}
                  background="#f7f7f7"
                  border="#e3e3e3"
                />
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <CircleBorder
                      name="dots-three-vertical"
                      size={20}
                      background="#f7f7f7"
                      border="#e3e3e3"
                      onPress={openMenu}
                    />
                  }
                  style={{zIndex: 1000,marginTop:32}}>
                  <Menu.Item
                    onPress={() => {
                      console.log('Trang chủ');
                      closeMenu();
                    }}
                    title="Trang chủ"
                    leadingIcon={() => (
                      <MaterialCommunityIcons
                        name="home-outline"
                        size={23}
                        color="black"
                      />
                    )}
                  />
                  <Menu.Item
                    onPress={() => {
                      console.log('Đơn hàng');
                      closeMenu();
                    }}
                    title="Đơn hàng"
                    leadingIcon={() => (
                      <MaterialCommunityIcons
                        name="clipboard-check-outline"
                        size={23}
                        color="black"
                      />
                    )}
                  />
                </Menu>
              </View>
            ),
          }}
          headerBackButtonMenuEnabled
        />
        <Stack.Screen
          headerBackButtonMenuEnabled
          name="CategoriesSortingProduct"
          component={CategoriesSortingProduct}
          options={{
            title:"Thêm",
            headerShown: true,
            headerRight: () => (
              <View style={styles.headerRight}>
                <CircleBorder
                  name="search-outline"
                  size={20}
                  background="#f7f7f7"
                  border="#e3e3e3"
                />
                <CircleBorder
                  name="cart-outline"
                  size={20}
                  badgeCount={2}
                  background="#f7f7f7"
                  border="#e3e3e3"
                />
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  mode = 'elevated'
                  theme={{ colors: { primary: 'green' } }}
                  anchor={
                    <CircleBorder
                      name="dots-three-vertical"
                      size={20}
                      background="#f7f7f7"
                      border="#e3e3e3"
                      onPress={openMenu}
                    />
                  }
                  style={{zIndex: 1000,marginTop:32}}>
                  <Menu.Item
                    onPress={() => {
                      console.log('Option 1 clicked');
                      closeMenu();
                    }}
                    leadingIcon={() => (
                      <MaterialCommunityIcons
                        name="home-outline"
                        size={23}
                        color="black"
                      />
                    )}
                    title="Trang chủ"
                  />
                  <Menu.Item
                    onPress={() => {
                      console.log('Đơn hàng');
                      closeMenu();
                    }}
                    leadingIcon={() => (
                      <MaterialCommunityIcons
                        name="clipboard-check-outline"
                        size={23}
                        color="black"
                      />
                    )}
                    title="Đơn hàng"
                  />
                </Menu>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="TopSearchScreen"
          component={TopSearchScreen}
          options={{
            headerShown: true,
            title: 'Chăm sóc da',
            headerRight: () => (
              <View style={styles.headerRight}>
                <CircleBorder
                  name="search-outline"
                  size={20}
                  background="#f7f7f7"
                  border="#e3e3e3"
                />
                <CircleBorder
                  name="cart-outline"
                  size={20}
                  badgeCount={2}
                  background="#f7f7f7"
                  border="#e3e3e3"
                />
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <CircleBorder
                      name="dots-three-vertical"
                      size={20}
                      background="#f7f7f7"
                      border="#e3e3e3"
                      onPress={openMenu}
                    />
                  }
                  style={{zIndex: 1000,marginTop:32}}>
                  <Menu.Item
                    onPress={() => {
                      console.log('Trang chủ');
                      closeMenu();
                    }}
                    title="Trang chủ"
                    leadingIcon={() => (
                      <MaterialCommunityIcons
                        name="home-outline"
                        size={23}
                        color="black"
                      />
                    )}
                  />
                  <Menu.Item
                    onPress={() => {
                      console.log('Đơn hàng');
                      closeMenu();
                    }}
                    title="Đơn hàng"
                    leadingIcon={() => (
                      <MaterialCommunityIcons
                        name="clipboard-check-outline"
                        size={23}
                        color="black"
                      />
                    )}
                  />
                </Menu>
              </View>
            ),
          }}
          headerBackButtonMenuEnabled
        />
        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{
            headerShown: true,
            title: 'Chăm sóc da',
            headerRight: () => (
              <View style={styles.headerRight}>
                <CircleBorder
                  name="search-outline"
                  size={20}
                  background="#f7f7f7"
                  border="#e3e3e3"
                />
                <CircleBorder
                  name="cart-outline"
                  size={20}
                  badgeCount={2}
                  background="#f7f7f7"
                  border="#e3e3e3"
                />
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <CircleBorder
                      name="dots-three-vertical"
                      size={20}
                      background="#f7f7f7"
                      border="#e3e3e3"
                      onPress={openMenu}
                    />
                  }
                  style={{ zIndex: 1000, marginTop: 32 }}>
                  <Menu.Item
                    onPress={() => {
                      console.log('Trang chủ');
                      closeMenu();
                    }}
                    title="Trang chủ"
                    leadingIcon={() => (
                      <MaterialCommunityIcons
                        name="home-outline"
                        size={23}
                        color="black"
                      />
                    )}
                  />
                  <Menu.Item
                    onPress={() => {
                      console.log('Đơn hàng');
                      closeMenu();
                    }}
                    title="Đơn hàng"
                    leadingIcon={() => (
                      <MaterialCommunityIcons
                        name="clipboard-check-outline"
                        size={23}
                        color="black"
                      />
                    )}
                  />
                </Menu>
              </View>
            ),
          }}
          headerBackButtonMenuEnabled
        />
        <Stack.Screen name='AppointmentScreen' component={AppointmentScreen}
          options={{ title: 'Đặt lịch giữ chỗ ' }} />
        <Stack.Screen name='ServiceByCategoryScreen' component={ServiceByCategoryScreen}
          options={{ title: 'Dịch vụ theo danh mục' }}
        />
        <Stack.Screen name='ServicesScreen' component={ServicesScreen}
          options={{ title: 'Chọn dịch vụ', headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            title: 'Thông tin tài khoản',
            headerTitleAlign: 'center'
          }}
         <Stack.Screen name='AppointmentScreen' component={AppointmentScreen}
        options={{ title: 'Đặt lịch giữ chỗ ' }}
      />
      <Stack.Screen name='ServiceByCategoryScreen' component={ServiceByCategoryScreen}
         options={{ title: 'Dịch vụ theo danh mục' }}
      />
      <Stack.Screen 
          name="UserProfile" 
          component={UserProfile} 
          options={{ title: 'Thông tin tài khoản',
            headerTitleAlign: 'center'  
           }}
        />
        <Stack.Screen 
          name="UpdateUserScreen" 
          component={UpdateUserScreen} 
          options={{ title: 'Cập nhật thông tin',
            headerTitleAlign: 'center'  
           }}
        />
      <Stack.Screen 
          name="Cart" 
          component={Cart} 
          options={{ title: 'Giỏ Hàng' ,
            headerTitleAlign: 'center'  
          }}
        />
   </Stack.Navigator>
    </Provider>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-end',
    zIndex: 1000,
  },
});