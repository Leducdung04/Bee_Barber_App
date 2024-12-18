import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import AccountScreen from '../screens/AccountScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, Provider } from 'react-native-paper';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import AppointmentHistoryScreen from '../screens/AppointmentHistoryScreen';
import colors from '../../Resources/styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../../Resources/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import UserProfile from '../screens/UserProfile';
import CircleBorder from '../components/shop/CircleBorder';

const TabNavigator = () => {
  const _renderIcon = (routeName, selectedTab) => {
    let size;
    let iconSource;
    let name;
    let textColor = selectedTab === routeName ? colors.primary : 'gray'; // Set text color based on selected tab
    switch (routeName) {
      case 'title1':
        iconSource =
          selectedTab === 'title1'
            ? require('../../Resources/assets/icons/homeFill.png')
            : require('../../Resources/assets/icons/home.png');
        size = 25;
        name = 'Home';
        break;
      case 'title2':
        iconSource =
          selectedTab === 'title2'
            ? require('../../Resources/assets/icons/storeFill.png')
            : require('../../Resources/assets/icons/store.png');
        size = 25;
        name = 'Shop';
        break;
      case 'title3':
        iconSource =
          selectedTab === 'title3'
            ? require('../../Resources/assets/icons/historyFill.png')
            : require('../../Resources/assets/icons/history.png');
        size = 30;
        name = 'History';
        break;
      case 'title4':
        iconSource =
          selectedTab === 'title4'
            ? require('../../Resources/assets/icons/userFill.png')
            : require('../../Resources/assets/icons/user.png');
        size = 25;
        name = 'Account';
        break;

        iconSource =
          selectedTab === 'title3'
            ? require('../../Resources/assets/icons/historyFill.png')
            : require('../../Resources/assets/icons/history.png');
        size = 30;
        name = 'Lịch sử';
        break;
      case 'title4':
        iconSource =
          selectedTab === 'title4'
            ? require('../../Resources/assets/icons/userFill.png')
            : require('../../Resources/assets/icons/user.png');
        size = 25;
        name = 'Tài khoản';
        break;
    }

    return (
      <View style={{ alignItems: 'center' }}>
        <Image source={iconSource} style={{ width: size, height: size }} />
        <Text style={{ color: textColor }}>{name}</Text>
      </View>
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const nav = useNavigation()
  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={65}
      circleWidth={50}
      bgColor="white"
      initialRouteName="title1"
      borderTopLeftRight
      screenOptions={{
        headerShown: false
      }}
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('AppointmentScreen') }}
          >
            <Image source={require('../../Resources/assets/icons/appointment.png')} style={{ width: 32, height: 32 }} />
          </TouchableOpacity>
          <Text style={{ position: 'absolute', bottom: -24 }}>Đặt lịch</Text>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="title1"
        position="LEFT"
        component={HomeScreen}
        options={{
          title: "",
          headerShown: true,
          // headerBackground: () => (
          //   <View  style={{backgroundColor:'white',height:85,justifyContent:'center'}}>
          //       <Text style={globalStyles.titleStyle}>Lịch sử cắt</Text>
          //   </View>
          // ),
          headerLeft: ({ tintColor }) => (
            <Image source={require('../../Resources/assets/logo/Bee_Barber.png')}
              style={{ marginStart: 16, height: 30, width: 170 }}
            />
          ),
          headerRight: ({ tintColor }) => (
            <View style={{ flexDirection: 'row', marginHorizontal: 32 }}>
              <CircleBorder onPress={() => nav.navigate("Cart")} />
              <TouchableOpacity onPress={() => nav.navigate("NotificationScreen")}>
                <Image source={require('../../Resources/assets/icons/notification.png')}
                  style={{ marginStart: 4, height: 26, width: 26, marginHorizontal: 12 }} />
              </TouchableOpacity>

            </View>
          ),

        }}



      />
      <CurvedBottomBar.Screen
        name="title2"
        component={ShopScreen}
        position="LEFT"
        options={{
          title: "",
          headerShown: true,
          headerLeft: ({ tintColor }) => (
            <Image
              source={require('../../Resources/assets/logo/Bee_Barber.png')}
              style={{ marginStart: 16, height: 30, width: 170 }}
            />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <CircleBorder onPress={() => nav.navigate("Cart")} />
              <TouchableOpacity onPress={() => nav.navigate("NotificationScreen")}>
                <Image source={require('../../Resources/assets/icons/notification.png')}
                  style={{ marginStart: 4, height: 26, width: 26, marginHorizontal: 12 }} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <CurvedBottomBar.Screen
        name="title3"
        component={AppointmentHistoryScreen}
        position="RIGHT"
        options={{
          title: '',
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackground: () => (
            <View style={{ backgroundColor: 'white', height: 65, justifyContent: 'center' }}>
              <Text style={globalStyles.titleStyle}>Lịch sử cắt ✂</Text>
            </View>
          ),
        }}
      />
      <CurvedBottomBar.Screen
        name="title4"
        component={AccountScreen}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  )
}

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#153A80',
    // backgroundColor: '#E8E8E8',
    bottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-end',
    zIndex: 1000,
    marginEnd: 8
  }
});
