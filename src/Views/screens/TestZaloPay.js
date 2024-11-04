import { Alert, Button, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TestZaloPay = () => {
    const orderUrl = 'https://qcgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOiJBQ214OEI1Tnh5UHROby0tZHhINWxCQXciLCJhcHBpZCI6MjU1M30=';

    const openPaymentUrl = async () => {
      // Kiểm tra xem URL có thể mở được không
     // await Linking.openURL(orderUrl);
      const supported = await Linking.canOpenURL(orderUrl);
  
      if (supported) {
        // Mở URL
        await Linking.openURL(orderUrl);
      } else {
        Alert.alert(`Không thể mở URL: ${orderUrl}`);
      }
    };
  
    return (
        <View style={{marginTop:200}}>
            <Button  title="Thanh toán với ZaloPay" onPress={openPaymentUrl} />
        </View>
    );
}

export default TestZaloPay

const styles = StyleSheet.create({})