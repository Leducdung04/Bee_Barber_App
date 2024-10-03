import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getToken()
  }
}

export async function getToken() {
    let fcmToken =await AsyncStorage.getItem('fcmToken')
    console.log("Token get ",fcmToken)
    if(!fcmToken){
       try {
        const token = await messaging().getToken();
        console.log(`Token firebase ${token}`)
        if(token){
            await AsyncStorage.setItem('fcmToken',token)
        }
       } catch (error) {
         console.log('get token err ',error)
       }
    }

  
  
}
