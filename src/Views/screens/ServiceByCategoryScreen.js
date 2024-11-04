import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get_Service_By_Category } from '../../Services/utils/httpService';
import globalStyles from '../../Resources/styles/globalStyles';
import colors from '../../Resources/styles/colors';
import ItemService from '../components/Item/ItemService';
import ButtonComponents from '../components/ui/Button';



const ServiceByCategoryScreen = ({ route, navigation }) => {
    const item=route.params;
    const [serviceList, setserviceList] = useState([])
    useEffect(() => {
        async function getlistServicate(){
            const list = await get_Service_By_Category(item._id)
            setserviceList(list)
        }
        navigation.setOptions({ title: item.name });
        getlistServicate()
        console.log('serviceList',serviceList)
      }, [navigation, item]);
  return (
    <View style={styles.container}>
      <FlatList 
      data={serviceList} keyExtractor={(item)=>item._id} 
      numColumns={2}
      renderItem={({item})=><ItemService item={item} />}

      ListHeaderComponent={()=>{
        return <View>
            <View style={styles.titleContainer}>
            <View style={styles.TitleContainerRight}></View>
            <Text style={[globalStyles.textTitle,{marginStart:12}]}>{item.name}</Text>
      </View>
      <Text style={styles.text}>{item.description}</Text>
        </View>
      }
      }
      ListFooterComponent={()=>{
        return <View style={styles.footer}><ButtonComponents onPress={()=>{navigation.navigate('AppointmentScreen')}}>Đặt lịch</ButtonComponents></View>
      }}
        />
    </View>
  )
}

export default ServiceByCategoryScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        color:colors.background,
        margin:12
    },
    titleContainer:{
        flexDirection:'row',
        margin:16
    },
    TitleContainerRight:{
        width:6,height:30,backgroundColor:colors.primary300,borderRadius:4
    },
    text:{
        margin:12,
        fontSize:16,
        color:colors.primary,
        marginStart:16
    },
    footer:{
        marginVertical:12
    }
})