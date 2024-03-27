import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
//import axios from 'axios'; // Assuming you're using Axios for HTTP requests

export default function AccountsPage() {
  const [loading, setLoading] = useState(true);
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
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };

    fetchUserData();
  }, []);
   if (loading) {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <ActivityIndicator size="large" color="tomato" />
       </View>
     );
   } else { 




return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userData ? (
        <View>
          <Text>ID: {userData.id}</Text>
          <Text>Username: {userData.userName}</Text>
          <Text>Role: {userData.roles.join(', ')}</Text>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
    </View>
  );
      }
}
