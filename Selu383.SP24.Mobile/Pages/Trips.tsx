import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
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

      // No need to set userData here, as it's not used in this function
      setLoading(false);
      setLoggedIn(true);
    } catch (error) {
      //console.error('Error fetching user data:', error);
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
      setUserData(data); // Set userData to the array of reservations
      setLoading(false);
    } catch (error) {
      //console.error('Error fetching user reservations:', error);
      setLoading(false);
    }
  };

  const refreshData = useCallback(() => {
    // Fetch user data and reservations when screen comes into focus
    setLoading(true);
    fetchUserData();
    getMyReservations();
  }, []);

  // Fetch user data and reservations when the screen mounts initially
  useEffect(() => {
    fetchUserData();
    getMyReservations();
  }, []);

  // Refresh user data and reservations when the screen comes into focus
  useFocusEffect(refreshData);

  if (!loggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Make account</Text>
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
      {userData.length > 0 ? (
        userData.map((reservation, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>ID: {reservation.id}</Text>
            <Text>Hotel: {reservation.Hotel}</Text>
            <Text>Room Number: {reservation.RoomNumber}</Text>
            <Text>Status: {reservation.Status}</Text>
            <Text>Phone Number: {reservation.PhoneNumber}</Text>
            <Text>Reservation Start: {reservation.ReservationStartDate}</Text>
            <Text>Reservation End: {reservation.ReservationEndDate}</Text>
            {/* Add more fields as needed */}
          </View>
        ))
      ) : (
        <Text>No reservations available</Text>
      )}
    </View>
  );
}
