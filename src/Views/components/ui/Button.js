import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../Resources/styles/colors'

const ButtonComponents = ({children,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View>
            <Text style={styles.text}>{children}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ButtonComponents

const styles = StyleSheet.create({
    container:{
        height:55,
        backgroundColor:colors.primary,
        borderRadius:16,
        marginHorizontal:24,
        justifyContent:'center',
        marginBottom:12
    },
    text:{
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
        fontSize:20
    }
})