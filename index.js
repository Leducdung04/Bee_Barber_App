/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging'

messaging().setBackgroundMessageHandler(async messaging => {
    console.log('messaging',messaging)
})

// Register background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Received background message:', remoteMessage.notification);
});

// Register foreground message handler
messaging().onMessageSent(async remoteMessage => {
  console.log('Received foreground message:', remoteMessage.data);
});


AppRegistry.registerComponent(appName, () => App);
