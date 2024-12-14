import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/Views/routers/AppNavigation';
import {requestUserPermission} from './src/Services/api/notificationhelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import store from './src/stores/redux/store';
import {CartProvider} from './src/Services/utils/cartContext';

export default function App() {
  const [token, setToken] = React.useState(null);
  React.useEffect(() => {
    //  getData()
    requestUserPermission();
    getFcmToken();
  }, []);

  async function getData() {
    await AsyncStorage.removeItem('fcmToken');
  }
  async function getFcmToken() {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken) {
      setToken(fcmToken);
      console.log('Token ,', fcmToken);
    }
  }

  return (
    <Provider store={store}>
      <CartProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </CartProvider>
    </Provider>
  );
}
