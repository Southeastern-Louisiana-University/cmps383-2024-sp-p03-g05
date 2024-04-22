import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, Pressable, Image, useWindowDimensions, KeyboardAvoidingView, Modal, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

export default function SearchBar() {
 const navigation = useNavigation();
 const { width } = useWindowDimensions();
 const [searchTerm, setSearchTerm] = useState("");
 const [hotels, setHotels] = useState([]);
 const [login, setlogin] = useState(true);
 const [siginmodal, setsigninmodal] = useState(false);
 const [error, setError] = useState("");

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






  const me = async () => {
    try {
      const response = await fetch(
        "https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/me",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        setlogin(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      //const data = await response.json();
      //console.log(data);
      setlogin(true);
    } catch (error) {
      // console.error('Error fetching user data:', error);
      // setLoading(false);
    }
  };


me();








  const renderHotelItem = ({ item }) => (
   <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}  >
   <View style={styles.hotelContainer}>
   <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.imageContainer}/>
   <Text style={styles.hotelName}>{item.name}</Text>
   <Text style={styles.adrress}>{item.address}</Text>
   <Pressable style={styles.Button}
   onPress={() => {
     if (login) {
       navigation.navigate("Reservation", {
         hid: item.id,
       });
     } else {
       setsigninmodal(true);
     }
   }}
>
   <Text style={styles.buttonText}>Make A Reservations</Text>
   </Pressable>
   </View>
   </KeyboardAvoidingView>
  );

  return (
   <><View>
      <TextInput
        style={[styles.TextInput, { width: width * 0.7 }]}
        clearButtonMode="always"
        placeholder="Look For A Hotel"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)} />
      {hotels.length > 0 && (
        <FlatList
          data={hotels}
          ListEmptyComponent={this._listEmptyComponent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHotelItem} />
      )}
    </View><Modal
      animationType="fade"
      transparent={true}
      visible={siginmodal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setsigninmodal(!siginmodal);
      } }
    >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setsigninmodal(!siginmodal)}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <Text>You Do Not Have a Account Please Make One To Reservation</Text>
          </View>
        </View>
      </Modal></>




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
    centeredView: {
      //flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    closeText: {
      fontSize: 20,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  adrress: {
    fontSize: 19,
    fontStyle:"italic",
    marginBottom: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#6AA30D",
    elevation: 2,
    //marginBottom:50,
    justifyContent: "flex-end",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
