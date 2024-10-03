import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../Resources/styles/colors'

const AppointmentHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AppointmentHistoryScreen</Text>
    </View>
  )
}

export default AppointmentHistoryScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})