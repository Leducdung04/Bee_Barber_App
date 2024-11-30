import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import { Menu, Provider, TextInput } from 'react-native-paper';
import CircleBorder from '../components/shop/CircleBorder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryScreen from '../components/shop/CategoryScreen';
import ServiceByCategoryScreen from '../screens/ServiceByCategoryScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import colors from '../../Resources/styles/colors';
import ServicesScreen from '../screens/ServicesScreen';
import UserProfile from '../screens/UserProfile';
import LoginScreen from "../screens/LoginScreen"
import SignUpScreen from '../screens/SignUpScreen';
import Cart from '../screens/Cart';
import DetailsHistoryScreen from '../screens/DetailsHistoryScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useNavigation } from '@react-navigation/native';
import ProductScreen from '../components/shop/ProductScreen';
import OrderConfirmationScreen from '../components/shop/OrderConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';
import NotificationScreen from '../screens/NotificationScreen';
import OderHistory from '../screens/OderHistory';
import Notification from '../screens/Notification';
import UpdateUserScreen from '../screens/UpdateUserScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import TestScreen from '../screens/Test';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const nav = useNavigation();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const openMenu1 = () => setVisible1(true);
  const closeMenu1 = () => setVisible1(false);
  return (
    <Provider>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="OderHistory" component={OderHistory} options={{ title: 'Đơn hàng của bạn' }} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen } options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen } options={{ title: '', headerTitleAlign: 'center', }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Notification" component={Notification} options={{ title: 'Thông báo' }} />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{
            headerShown: true,
            title: 'Chăm sóc da',
            headerRight: () => (
              <View style={styles.headerRight}>
                <CircleBorder
                  name="cart-outline"
                  size={20}
                  badgeCount={2}
                  background="#f7f7f7"
                  border="#e3e3e3"
                  onPress={() => nav.navigate("Cart")}
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
                      nav.navigate("OrderScreen")
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

          }}
          headerBackButtonMenuEnabled
        />
        <Stack.Screen name='AppointmentScreen' component={AppointmentScreen}
          options={{ title: 'Đặt lịch giữ chỗ ', headerShown: false }} />
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
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="UpdateUserScreen"
          component={UpdateUserScreen}
          options={{
            title: 'Thông tin tài khoản',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            title: 'Giỏ Hàng',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            title: 'Đơn Hàng',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="OrderConfirmationScreen"
          component={OrderConfirmationScreen}
          options={{
            title: 'Xác Nhận Thanh Toán',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            title: 'Thông báo',
            headerTitleAlign: 'center',
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
  searchContainer: {
    width: 313,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 17,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginVertical: 1,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
  },
  iconContainer: {
    marginRight: 1,
  },
});
