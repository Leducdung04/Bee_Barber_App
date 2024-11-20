import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DetailsHistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../Resources/assets/images/check-mark.png')}
          style={{height: 74, width: 74}}
        />
        <Text
          style={{
            color: '#ffffff',
            fontSize: 20,
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: 32,
            marginTop: 40,
            marginBottom: 12,
          }}>
          {'Wohoo! Your flight has been\nbooked'}
        </Text>
        <Text
          style={{
            color: '#D2D2D2',
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 24,
          }}>
          {'Payment of ₹ 10,505 has been received.'}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 99,
          }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 99,
              backgroundColor: '#3498db',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 16,
            marginHorizontal: 16,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.label}>Departure</Text>
              <Text style={styles.largeValue}>09:25 AM</Text>
            </View>
            <Image
              resizeMode="contain"
              source={require('../../Resources/assets/images/logo_30shine.png')}
              style={{width: 100, height: 38}}
            />
            <View>
              <Text style={styles.label}>Arrival</Text>
              <Text style={styles.largeValue}>12:00 PM</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginBottom: 8}}>
                <View style={{marginBottom: 8}}>
                  <Text style={[styles.label, styles.smallLabel]}>
                    Passenger Name
                  </Text>
                  <Text style={styles.largeValue}>Robert Daniel</Text>
                </View>
                <View>
                  <Text style={[styles.label, styles.smallLabel]}>
                    Terminal
                  </Text>
                  <Text style={styles.largeValue}>2</Text>
                </View>
              </View>
              <View
                style={{
                  marginLeft: 32,
                }}>
                <View style={{marginBottom: 8}}>
                  <Text style={[styles.label, styles.smallLabel]}>Class</Text>
                  <Text style={[styles.largeValue, styles.smallValue]}>
                    Economy
                  </Text>
                </View>
                <View>
                  <Text style={[styles.label, styles.smallLabel]}>Seat</Text>
                  <Text style={[styles.largeValue, styles.smallValue]}>C3</Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.label,
                  styles.smallLabel,
                  {textDecorationLine: 'line-through'},
                ]}>
                {' '}
                ₹ 13000
              </Text>
              <Text style={styles.largeValue}>₹ 10,505 </Text>
            </View>
          </View>
          <Image
            source={require('../../Resources/assets/images/frame.png')}
            style={{width: 272, height: 50, alignSelf: 'center', marginTop: 16}}
            resizeMode={'cover'}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 99,
              backgroundColor: '#3498db',
            }}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            paddingVertical: 12,
            borderRadius: 44,
          }}>
          <Text
            style={{
              lineHeight: 24,
              fontSize: 16,
              fontWeight: '600',
              color: 'black',
              textAlign: 'center',
            }}>
            Go to dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            paddingVertical: 12,
            borderRadius: 44,
            borderWidth: 1.2,
            borderColor: 'white',
            marginTop: 16,
          }}>
          <Text
            style={{
              lineHeight: 24,
              fontSize: 16,
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
            }}>
            Save to wallet
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    justifyContent: 'space-around',
  },
  largeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: '#737373',
  },
  largeValue: {
    color: '#191919',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 15,
  },
  smallLabel: {
    fontSize: 10,
  },
  smallValue: {
    fontSize: 10,
  },
});
export default DetailsHistoryScreen;
