import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SelectedServices = ({ list }) => {
  return (
    <View style={styles.container}>
      {list.map((item, index) => (
        <View
          key={index}
          style={[
            styles.item,
            index % 2 === 0 ? styles.itemLeft : styles.itemRight, // canh trái hoặc phải tùy vào vị trí
          ]}
        >
          <Text style={styles.text}>{item.name}</Text>
        </View>
      ))}
    </View>
  )
}

export default SelectedServices

const styles = StyleSheet.create({
  container: {
    marginTop:12,
    marginBottom:12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
  },
  item: {
    marginTop:1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    margin: 8,
    padding: 6,
  },
  itemLeft: {
    alignSelf: 'flex-start',
  },
  itemRight: {
    alignSelf: 'flex-end',
  },
  text: {
    color: 'black',
  },
})
