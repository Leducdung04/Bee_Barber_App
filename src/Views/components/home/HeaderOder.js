import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../Resources/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation} from '@react-navigation/native'


const HeaderOder = () => {
  const navigation = useNavigation()
  return (
    <LinearGradient colors={['#A4D0F6',colors.secondary,colors.primary200]}
                      start={{ x: 0, y: 0 }} // Điểm bắt đầu (trái)
                      end={{ x: 1, y: 0 }}   // Điểm kết thúc (phải)
                       style={styles.headerContainer}>
        <View>
          <View style={{margin:12,flexDirection:'row',alignItems:'center'}}>
              <Image source={require('../../../Resources/assets/icons/barber.png')} style={{height:30,width:30,margin:8}}/>
              <Image source={require('../../../Resources/assets/images/men.png')} style={{height:35,width:35}}/>
          </View>
          <Text style={{color:'white',fontWeight:'bold',fontSize:18,marginStart:14}}>Đặt lịch ngay ⚡</Text>
        </View>   

        <View style={{justifyContent:'center',marginTop:24}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('AppointmentScreen')}}>
          <LinearGradient colors={['#A4D0F6','#F4F1F1','#DF9CC9','#95C8F1','#A6CFFF']}
                        start={{ x: 0, y: 0 }} // Điểm bắt đầu (trái)
                        end={{ x: 1, y: 0 }}
                        style={{width:140,height:40,borderRadius:8,justifyContent:'center'}}
                        >
              <Text style={{textAlign:'center',color:'black',fontSize:16}}>Đặt lịch</Text>
          </LinearGradient>
          </TouchableOpacity>
        </View>
      
      </LinearGradient>
  )
}

export default HeaderOder

const styles = StyleSheet.create({
    headerContainer :{
        height:110,
        marginVertical:12,
        marginHorizontal:24,
        backgroundColor:colors.primary200,
        borderRadius:8,
        flexDirection:'row',
        justifyContent:'space-around'
     }
})