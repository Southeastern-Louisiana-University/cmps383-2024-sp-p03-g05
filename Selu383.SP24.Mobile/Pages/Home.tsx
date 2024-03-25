import React, { useEffect } from 'react';
import { useState} from "react";
import { Button, Overlay } from 'react-native-elements';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, SafeAreaView, Pressable, useWindowDimensions} from 'react-native';
import SearchBar from './SearchBar';
import { ScreenHeight } from 'react-native-elements/dist/helpers';


export default function Home({ navigation }) {

  const { width } = useWindowDimensions();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          // No need to send body for GET request
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once on component mount



















  return (    
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <View style={styles.header}> 
  <Text style={styles.headerText}>EnStay</Text> 
  </View> 
      </View>
      <View style={styles.Bar}>
<Pressable>
<Text style={styles.searchBarText}>Where can we take you?</Text> 
</Pressable>
</View>

      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.image} />
        </View>
        <Text style={styles.text}>Welcome Back To The EnStay  {userData ? `${userData.userName}` : 'No user data available'}</Text>
        
        {/* <SearchBar navigation={navigation} /> */}
      </View>
      </SafeAreaView>
      
   
  );
};

const styles = StyleSheet.create({
  searchBarText: { fontSize: 16, color: '#555', }, 
  Bar: { 
    
   // position: 'absolute',
    //left: 0,
    top: 25,
     //right: 0,
     alignSelf: "center",
    width: '70%', 
    height: 40, 
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 20, 
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    zIndex: 1,
        
  }, 
  container: {
      // Try setting `flexDirection` to `"row"`.
      //flexDirection: 'column',
      backgroundColor: '#000',
   
    flex: 1,
    marginBottom: -95,
    padding: 20,
  },
  innerContainer: {
    flex: 7,
      // Try setting `flexDirection` to `"row"`.
      //flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#65a30d',
    padding: 10,
    marginLeft:-50,
    marginRight:-50,
    marginBottom:-50
  },
  header: { paddingVertical: 20, paddingHorizontal: 24, backgroundColor: '#000' }, 
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign:'center'}, 
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // half of the width and height to create a circle
    overflow: 'hidden', // clip the image to the circle
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    marginBottom: 20, // Add some space after the text
  },
});
