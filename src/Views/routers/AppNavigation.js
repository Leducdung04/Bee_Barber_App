import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import CategoriesProductsScreen from '../screens/CategoriesProductsScreen';
import {Menu, Provider} from 'react-native-paper';
import CircleBorder from '../components/CircleBorder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoriesSortingProduct from '../screens/CategoriesSortingProduct';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <Stack.Navigator initialRouteName="TabNavigator">
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
                  style={{zIndex: 1000}}>
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
          name="Thêm"
          component={CategoriesSortingProduct}
          options={{
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
                  anchor={
                    <CircleBorder
                      name="dots-three-vertical"
                      size={20}
                      background="#f7f7f7"
                      border="#e3e3e3"
                      onPress={openMenu}
                    />
                  }
                  style={{zIndex: 1000}}>
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
