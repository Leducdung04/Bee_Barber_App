import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ListBanner from '../components/ListBanner';
import useHomeTab from '../../ViewModels/useHomeTab';
import FastImage from 'react-native-fast-image';

const HomeScreen = () => {
  const {listBanner} = useHomeTab();
  return (
    <ScrollView style={{flex:1}}>
      <ListBanner listBanner={listBanner} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
