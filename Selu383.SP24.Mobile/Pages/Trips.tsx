import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Trips() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
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

      setLoading(false);
      setLoggedIn(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const getMyReservations = async () => {
    try {
      const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/reservation/GetMyReservations', {
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
      setLoading(false);
    }
  };

  const refreshData = useCallback(() => {
    setLoading(true);
    fetchUserData();
    getMyReservations();
  }, []);

  useEffect(() => {
    fetchUserData();
    getMyReservations();
  }, []);

  useFocusEffect(refreshData);

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please log in to view your reservations.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }


  
/*
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Options to include the day of the week
    const weekday = {weekday: 'long'}
    const options = { weekday: 'long',  month: 'long', day: 'numeric',};
    // Format the date with options
    const formattedDate = `${date.toLocaleDateString(undefined, weekday)} at ${date.toLocaleTimeString()}`;
    return formattedDate;
  };
  */

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const weekdayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
    const dateFormatter = new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric' });
    const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: 'numeric' });
  
    const formattedDate = `${weekdayFormatter.format(date)}, ${dateFormatter.format(date)} at ${timeFormatter.format(date)}`;
    return formattedDate;
  };
  return (
    
    <View style={styles.container}>
      {userData.length > 0 ? (
        userData.map((reservation, index) => (
          <View key={index} style={styles.reservationContainer}>
            <Text style={styles.title}>{reservation.hotel}</Text>
            <Text style={styles.subtitle}>Phone Number: {reservation.phoneNumber}</Text>
            <Text style={styles.subtitle}>Room Number: {reservation.roomNumber}</Text>
            <Text style={styles.subtitle}>Start: {formatDate(reservation.reservationStartDate)}</Text>
            <Text style={styles.subtitle}>End: {formatDate(reservation.reservationEndDate)}</Text>
          </View>
        ))
      ) : (
        <View style={styles.reservationContainer}>
        <Text style={styles.title}>You Have No reservations</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:"center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  },
  reservationContainer: {
    textAlign:'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
