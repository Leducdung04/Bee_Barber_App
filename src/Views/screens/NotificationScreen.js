import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { get_List_Notification, updateNotificationStatus } from '../../Services/api/notificationhelper';
import CustomButton from '../components/shop/CustomButton';

import { getUserlocal } from '../../Services/utils/user__AsyncStorage';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("unread");
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const initializeUser = async () => {
      const user = await getUserlocal();
      setUserId(user?._id || null);
    };
    initializeUser();
  }, []);


  const fetchNotifications = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await get_List_Notification(userId);
      setNotifications(data.data || []);
      console.log(data, "Hello");

    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await updateNotificationStatus(notificationId);

      fetchNotifications();
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [statusFilter, userId]);


  const renderNotification = ({ _id, type, content, created_at, status }) => {
    const isUnread = status === "unread"; 
    return (
      <TouchableOpacity style={[styles.notificationItem, isUnread && styles.unreadNotification]} onPress={() => handleNotificationClick(_id)}>
        <View style={styles.notificationContent}>
          <Text style={styles.title}>{content}</Text>
          <Text>Thông Báo</Text>
          <Text style={styles.date}>📆 {new Date(created_at).toLocaleString()}</Text>
        </View>
       
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            renderNotification(item)
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không có thông báo nào</Text>
          }
        />
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: '#0088a9',
    color: 'white',
  },
  inactiveButton: {
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  notificationItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadNotification: {
    backgroundColor: '#e8f7ff', 
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  type: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  badge: {
    backgroundColor: '#ff6347',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
});

