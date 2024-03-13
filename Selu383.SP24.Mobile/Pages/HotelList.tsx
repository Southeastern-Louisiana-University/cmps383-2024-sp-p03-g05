import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image} from 'react-native';
import { HotelDto  } from '../Queries/HotelDto';

export default function HotelList({ navigation }) {
const [hotels, setHotels] = useState<HotelDto[]>([]);
 useEffect(() => {
  fetch("https://selu383-sp24-p03-g05.azurewebsites.net/api/hotels", {
  method: "GET",
 })
 .then((response) => {
   if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
   }
   return response.json();
   })
  .then((data: HotelDto[]) => {
    setHotels(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
  }, []);

const renderHotelItem = ({ item }) => (
 <View style={styles.hotelContainer}>
  <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.imageContainer}/>
  <Text style={styles.id}>id: {item.id}</Text>
 <Text style={styles.hotelName}>Name: {item.name}</Text>
 <Text style={styles.hotelAddress}>Address: {item.address}</Text>
 <Text style={styles.ManagerID}>ManagerID: {item.managerID}</Text>
 <Pressable style={styles.Button}>
 <Text style={styles.Text}>Make A Reservations</Text>
 </Pressable>
 </View>
);

return (
 <View style={styles.container}>
 <Text style={styles.title}>All Hotels:</Text>
 <FlatList data={hotels} keyExtractor={(item) => item.id.toString()}
  renderItem={renderHotelItem}
  />
  </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
 Text: {
 color: '#c1e3a8',
 fontSize: 20
 },
 container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#65a30d',
 },
 title: {
  textAlign: 'center',
  fontSize: 30,
  fontWeight: 'bold',
  marginBottom: 10,
 },
 hotelContainer: {
  backgroundColor: '#869190',
  padding: 16,
  marginBottom: 10,
  borderRadius: 8,
  borderWidth: 1,
  //borderColor: '#ddd',
 },
 hotelName: {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
 },
 id: {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
 },
 hotelAddress: {
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
 },
 ManagerID: {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
 },
 Button: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 20,
  paddingHorizontal: 32,
  borderRadius: 4,
  elevation: 3,
  backgroundColor: '#787063',
 }
});
