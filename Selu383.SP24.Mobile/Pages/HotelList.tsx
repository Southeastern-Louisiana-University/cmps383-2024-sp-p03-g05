import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
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
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelAddress}>{item.address}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Hotel List:</Text>
    <FlatList
      data={hotels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderHotelItem}
    />
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#698561',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    hotelContainer: {
      backgroundColor: '#86a6a2',
      padding: 16,
      marginBottom: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    hotelName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    hotelAddress: {
      fontSize: 16,
      color: '#555',
    },
  });
