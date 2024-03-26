import { View, StyleSheet, TextInput, FlatList, Text, Pressable, Image, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import React, { useState, useEffect } from "react";
//import Reservation from './Reservation';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBar() {
const navigation = useNavigation(); 
 
   const { width } = useWindowDimensions();
const [searchTerm, setSearchTerm] = useState("");
const [hotels, setHotels] = useState([]);

 useEffect(() => {
  if (!searchTerm.trim()) {
  setHotels([]);
  return;
  }

  



  const fetchHotels = async () => {
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
  //Handle error state
  }
  };
  fetchHotels();
  console.log(searchTerm);
  },
  
  [searchTerm]
  );

  

  const renderHotelItem = ({ item }) => (

    <View style={styles.hotelContainer}>
     <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.imageContainer}/>
     <Text style={styles.id}>id: {item.id}</Text>
    <Text style={styles.hotelName}>Name: {item.name}</Text>
    <Text style={styles.hotelAddress}>Address: {item.address}</Text>
    <Text style={styles.ManagerID}>ManagerID: {item.managerID}</Text>
   
<Pressable style={styles.Button} onPress={() =>  navigation.navigate('Reservation', { hname: item.name, haddress: item.address })}>
 <Text style={styles.Text}>Make A Reservations</Text>
 </Pressable>
        </View>
        
    );

    
    
    return (
        <SafeAreaView>
     
        <View>
         
        <TextInput
  style={{ 
    width: width * 0.7, 
    height: 40, 
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 20, 
    textAlign:'center',
    marginBottom: 20,
    marginLeft: 20,
    alignItems: 'center',
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
  }}
  clearButtonMode="always"
  placeholder="Look For A Hotel"
  value={searchTerm} 
  onChangeText={setSearchTerm}
/>

{/* Arrow icon for navigation */}
<Pressable
  style={{
    position: 'absolute',
    top: 10,
    left: 10,
  }}
  onPress={() => navigation.navigate('Home')}
>
  <Ionicons name="arrow-back" size={24} color="black" />
</Pressable>
{hotels.length > 0 &&  (
                <FlatList
                    data={hotels}
                    ListEmptyComponent={this._listEmptyComponent}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderHotelItem}
                />
            )}
        </View>
        </SafeAreaView>
        
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
    backgroundColor: '#787063',
   }
  });
