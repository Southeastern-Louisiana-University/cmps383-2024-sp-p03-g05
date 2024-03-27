import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image, ScrollViewComponent, SafeAreaView} from 'react-native';
import { HotelDto  } from '../Queries/HotelDto';
import SearchBar from './SearchBar';

export default function HotelList({ navigation }) {

return (
  <SafeAreaView style={styles.container}>
 <View style={styles.container}>
 
 
<SearchBar/>

  </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
 Text: {
 color: '#c1e3a8',
 fontSize: 20
 },
 container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#65a30d',
  alignItems:'center',
  
 },
 title: {
  textAlign: 'center',
  fontSize: 30,
  fontWeight: 'bold',
  marginBottom: 10,
 },
});
