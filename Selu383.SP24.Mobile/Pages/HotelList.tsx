import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';
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
 container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#f3efe0',
  alignItems:'center',
  }
});
