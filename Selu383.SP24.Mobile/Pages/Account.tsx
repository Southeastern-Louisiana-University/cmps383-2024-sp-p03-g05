import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable, ImageBackground, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function AccountsPage({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [card, setcard] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    // Fetch user data when screen comes into focus
    navigation.reset({
      index: 0,
      routes: [{ name: 'Account' }],
    });
    //me();
  }, []);

  useEffect(() => {
    // Fetch user data when the screen mounts initially
    me();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("User logged out successfully");
      // Refresh user data when the screen comes into focus
      refreshData();
    } catch (error) {
      //console.error('Error logging out:', error);
      // Display error message to the user
    }
  };


  //const userId = userData.id;
  const userId = userData ? userData.id : null;



  // const getcard = async () => {
  //   try {
  //     const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/users/GetCardOnFile?userId='+userId, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  
  //     if (!response.ok) {
  //       setcard('No'); // Set card to 'No' if there's an error or the card is not present
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const data = await response.json();
  //     setcard(data); // Set card to 'Yes' if it's present, otherwise 'No'
  //     console.log("Card:", data);
  //   } catch (error) {
  //     console.error('Error fetching card status:', error);
  //     // Display error message to the user
  //   }
  // };


  const getcard = async () => {
    try {
      const response = await fetch(`https://selu383-sp24-p03-g05.azurewebsites.net/api/users/GetCardOnFile?id=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        setcard('No'); // Set card to 'No' if there's an error or the card is not present
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const cardOnFile = await response.json();
      setcard(cardOnFile ? 'Yes' : 'No');
      console.log("Card:", cardOnFile);
    } catch (error) {
      //console.error('Error fetching card status:', error);
      // Display error message to the user
    }
  };

getcard();















  const me = async () => {
    try {
      const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      //console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  return (
        <View style={styles.con1}>
          {userData ? (
            <View style={styles.content}>
              <View style={styles.imageContainer}>
   <Image source={require('../assets/Beach.jpg')} style={styles.image} />
  </View>
              <Text style={styles.username}>UserName: {userData.userName}</Text>
              <Text style={styles.username}>Card In Account: {card}</Text>
              <Pressable style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Log Out</Text>
              </Pressable>
            </View>
          ) : (
            <Text>No user data available</Text>
          )}
     
        </View>
  );
}

const styles = StyleSheet.create({
 
  con1: {
    flex: 1,
    backgroundColor: '#211f20',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    //padding: 20,
    //borderRadius: 10,
    alignItems: 'center',
    marginTop: 80,
    top: 25,
  //right: 0,
  alignSelf: "center",
  borderColor: 'gray',
  borderWidth: 2,
  paddingHorizontal: 20, 
 
  borderRadius: 25,
  zIndex: 1, 
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6AA30D',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
