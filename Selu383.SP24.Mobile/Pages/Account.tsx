import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function AccountsPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
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
      setLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const refreshData = useCallback(() => {
    // Fetch user data when screen comes into focus
    setLoading(true);
    fetchUserData();
  }, []);

  // Fetch user data when the screen mounts initially
  useEffect(() => {
    fetchUserData();
  }, []);

  // Refresh user data when the screen comes into focus
  useFocusEffect(refreshData);

  if (!loggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You are a guest</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userData ? (
        <View>
          <Text>Username: {userData.id}</Text>
          <Text>Username: {userData.userName}</Text>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
    </View>
  );
}
