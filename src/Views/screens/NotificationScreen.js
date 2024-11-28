import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { get_List_Notification } from '../../Services/utils/httpNotification';
import CustomButton from '../components/shop/CustomButton';
import { setUserlocal } from '../../Services/utils/user__AsyncStorage';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("unread");
  const [userId, setuserId] = useState(null)

  const type = "";

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await get_List_Notification(statusFilter);
      setNotifications(data.data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [statusFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.buttonGroup}>
          <CustomButton 
            title="Đã Đọc"
            onPress={() => setStatusFilter("read")}
            style={statusFilter === "read" ? styles.activeButton : styles.inactiveButton}
          />
          <CustomButton
            title="Chưa Đọc"
            onPress={() => setStatusFilter("unread")}
            style={statusFilter === "unread" ? styles.activeButton : styles.inactiveButton}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.title}>{item.content}</Text>
              <Text style={styles.type}>Loại: {item.type}</Text>
            </View>
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
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: 'gray',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  buttonGroup:{
    flexDirection:'row',
    gap:12
  }
});
