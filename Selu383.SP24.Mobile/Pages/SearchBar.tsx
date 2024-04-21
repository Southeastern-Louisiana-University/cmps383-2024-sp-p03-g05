import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, Pressable, Image, useWindowDimensions, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

export default function SearchBar() {
 const navigation = useNavigation();
 const { width } = useWindowDimensions();
 const [searchTerm, setSearchTerm] = useState("");
 const [hotels, setHotels] = useState([]);

 useEffect(() => {
  const delayDebounceFn = _.debounce(async () => {
  if (!searchTerm.trim()) {
   setHotels([]);
  return;
  }
  try {
   const response = await fetch(`https://selu383-sp24-p03-g05.azurewebsites.net/api/hotels/SearchForHotel?searchTerm=${searchTerm}`, {
   method: "GET",
  });
  if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  setHotels(data);
  } 
  catch (error) {
   console.error('Error fetching data:', error);
  }
  }, 200);
  delayDebounceFn(); //Initial call without debounce
  return delayDebounceFn.cancel; // Cleanup function to cancel debounced function
  },[searchTerm]);

  const renderHotelItem = ({ item }) => (
   <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}  >
   <View style={styles.hotelContainer}>
   <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.imageContainer}/>
   <Text style={styles.hotelName}>{item.name}</Text>
   <Text style={styles.hotelAddress}>{item.address}</Text>
   <Pressable style={styles.Button} onPress={() =>  navigation.navigate('Reservation', {hid: item.id})}>
   <Text style={styles.buttonText}>Make A Reservations</Text>
   </Pressable>
   </View>
   </KeyboardAvoidingView>
  );

  return (
   <View>
   <TextInput
    style={[styles.TextInput, { width: width * 0.7 }]}
        clearButtonMode="always"
        placeholder="Look For A Hotel"
        value={searchTerm} 
        onChangeText={text => setSearchTerm(text)}
      />
      {hotels.length > 0 && (
        <FlatList
          data={hotels}
          ListEmptyComponent={this._listEmptyComponent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHotelItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    TextInput: {
        width:'70%', 
        height: 40, 
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 20, 
        textAlign:'center',
        marginBottom: 20,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: 20,
        alignItems: 'center',
        fontSize: 20,
        backgroundColor: 'white',
       borderRadius: 25,
        padding: 10,
    },

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
    flex: 1, // pushes the footer 
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
    backgroundColor: "#6AA30D",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
