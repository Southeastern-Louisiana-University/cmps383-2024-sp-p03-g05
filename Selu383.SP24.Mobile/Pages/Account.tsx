import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function AccountsPage({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [card, setcard] = useState(null);
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


  const userId = userData.id;




  const getcard = async () => {
    try {
const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/users/ToggleCardOnFile?userId=' + userId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setcard(data);


    } catch (error) {
      //console.error('Error logging out:', error);
      // Display error message to the user
    }
  };





















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
      getcard();
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
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Beach.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          {userData ? (
            <View>
              <Text style={styles.username}>Welcome, {userData.userName}</Text>
              <Text style={styles.username}>Card, {card}</Text>
              <Pressable style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Log Out</Text>
              </Pressable>
            </View>
          ) : (
            <Text>No user data available</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
