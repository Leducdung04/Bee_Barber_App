import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/Views/routers/AppNavigation';
import { requestUserPermission } from './src/Services/api/notificationhelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

 const [token, setToken] = React.useState(null)
  React.useEffect(() => {
    //  getData()
     requestUserPermission()
     getFcmToken()
  }, [])

  async function getData(){
  await AsyncStorage.removeItem('fcmToken')

  //  await requestUserPermission()
  //  await getFcmToken()
  }
  async function getFcmToken() {

     const fcmToken = await AsyncStorage.getItem('fcmToken')
     if(fcmToken){
      setToken(fcmToken)
      console.log("Token ,", fcmToken)
     }
     
  }
  
  return (
    <NavigationContainer>
       <AppNavigation/>
    </NavigationContainer>
  );
}