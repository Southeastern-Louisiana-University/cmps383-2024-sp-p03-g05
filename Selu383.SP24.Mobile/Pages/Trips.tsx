import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
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
        <Text style={styles.title}>Welcome to Trips</Text>
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

  return (
    <View style={styles.container}>
      {userData.length > 0 ? (
        userData.map((reservation, index) => (
          <View key={index} style={styles.reservationContainer}>
            <Text style={styles.reservationTitle}>Reservation ID: {reservation.id}</Text>
            <Text>Hotel: {reservation.Hotel}</Text>
            <Text>Room Number: {reservation.RoomNumber}</Text>
            <Text>Status: {reservation.Status}</Text>
            <Text>Phone Number: {reservation.PhoneNumber}</Text>
            <Text>Reservation Start: {reservation.ReservationStartDate}</Text>
            <Text>Reservation End: {reservation.ReservationEndDate}</Text>
          </View>
        ))
      ) : (
        <Text>No reservations available</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  },
  reservationContainer: {
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
