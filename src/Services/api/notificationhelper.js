import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { API_SEND_NOTIFICATION, API, API_GET_LIST_NOTIFICATIONS,API_SEND_SCHEDULE_NOTIFICATION } from '@env'

export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permissions granted.');
      return getToken();
    } else {
      console.warn('Notification permissions not granted.');
    }
  } catch (error) {
    console.error('Error requesting user permissions:', error);
  }
}

export async function getToken() {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
        console.log('FCM Token generated:', token);
        fcmToken = token;
      }
    } else {
      console.log('FCM Token retrieved from storage:', fcmToken);
    }
    return fcmToken;
  } catch (error) {
    console.error('Error retrieving FCM token:', error);
    return null;
  }
}

export const initializeFCM = async (getToken, setToken) => {
  try {
    const retrievedToken = await getToken();
    if (retrievedToken) {
      setToken(retrievedToken);
    } else {
      console.warn('FCM Token not available.');
    }

    PushNotification.channelExists('default-channel', (exists) => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: 'default-channel',
            channelName: 'Default Channel',
            channelDescription: 'A channel to categorize notifications',
            soundName: 'default',
            importance: PushNotification.Importance.HIGH,
            vibrate: true,
          },
          (created) => console.log(`Notification channel created: ${created}`)
        );
      } else {
        console.log('Notification channel already exists.');
      }
    });
  } catch (error) {
    console.error('Error initializing FCM:', error);
  }
};

export const sendLocalNotification = ({ channelId, title, message, data }) => {
  try {
    PushNotification.localNotification({
      channelId,
      title,
      message,
      data,
    });
    console.log('Local notification sent:', { title, message, data });
  } catch (error) {
    console.error('Error sending local notification:', error);
  }
};

export const sendRemoteNotification = async ({ payload }) => {
  try {
    console.log(`Sending request to: ${API}${API_SEND_NOTIFICATION}`);
    const response = await fetch(`${API}${API_SEND_NOTIFICATION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_AUTH_TOKEN`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error sending remote notification:", errorResponse);
      throw new Error(errorResponse.message || response.statusText);
    }

    const result = await response.json();
    console.log("Remote notification sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending remote notification:", error);
    throw error;
  }
};

type = "booking"
export const get_List_Notification = async (userId, status) => {
  try {
    const response = await fetch(`${API}${API_GET_LIST_NOTIFICATIONS}?user_id=${id}&type=${type}&status=${status}`);
    const data = await response.json();
    return data;

  } catch (error) {
    console.log('Error getting list Notification', error);
    return [];
  }
};

export const sendScheduleNotification = async (userId, status) => {
  try {
    const response = await fetch(`${API}${API_SEND_SCHEDULE_NOTIFICATION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_AUTH_TOKEN`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error sending schedule notification:", errorResponse);
      throw new Error(errorResponse.message || response.statusText);
    }

    const result = await response.json();
    console.log("Schedule notification sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending schedule notification:", error);
    throw error;
  }
}
