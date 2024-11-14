import { Alert, Button, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TestZaloPay = () => {
    const orderUrl = 'https://qcgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOiJBQ0g3UXVjeUNyQkd1UFdkRFA1bHRXUWciLCJhcHBpZCI6MjU1M30=';

    const openPaymentUrl = async () => {
      try {
        const supported = await Linking.canOpenURL(orderUrl);
      console.log('supported', supported)
        await Linking.openURL(orderUrl);
      } catch (error) {
        Alert.alert('KHông thể mở')
      }
      // Kiểm tra xem URL có thể mở được không
     
      console.log('openPaymentUrl', hh)
      // const supported = await Linking.canOpenURL(orderUrl);
      // console.log('supported', supported)
      // if (supported) {
      //   // Mở URL
      //   await Linking.openURL(orderUrl);
      // } else {
      //   Alert.alert(`Không thể mở URL: ${orderUrl}`);
      // }
    };
  
    return (
        <View style={{marginTop:200}}>
            <Button  title="Thanh toán với ZaloPay" onPress={openPaymentUrl} />
        </View>
    );
}

export default TestZaloPay

const styles = StyleSheet.create({})