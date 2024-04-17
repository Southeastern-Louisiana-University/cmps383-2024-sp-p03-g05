import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Reservation({ route }) {
  const navigation = useNavigation(); // Get access to navigation object
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const {hid} = route.params;


  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        const response = await fetch(`https://selu383-sp24-p03-g05.azurewebsites.net/api/hotels/${route.params.hid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setHotel(data);
      //console.log(data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
  
      }
    };

    fetchHotelById();
  }, [hid]);

  
 /*
  const fetchRoomsByHotelId = async (hotelId) => {
    try {
      const response = await fetch(`https://selu383-sp24-p03-g05.azurewebsites.net/api/hotels/GetRoomByAny?hotelId=${hotelId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };
*/

const fetchRoomsByHotelId = async (hid) => {
  try {
    const response = await fetch(`https://selu383-sp24-p03-g05.azurewebsites.net/api/room/GetRoomByAny?hotelId=${hid}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setRooms(data);
    console.log(data);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }


};

useEffect(() => {
  fetchRoomsByHotelId(hid);
}, [hid]);










  const showStartPicker = () => {
    setStartPickerVisibility(true);
  };

  const showEndPicker = () => {
    setEndPickerVisibility(true);
  };

  const hidePicker = () => {
    setStartPickerVisibility(false);
    setEndPickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setStartDate(date); // Update start date when confirming
    hidePicker();
  };
  const handleConfirmend = (date) => {
    setEndDate(date);
    hidePicker();
  };

  

  return (
  <SafeAreaView style={styles.container} >
    <View style={styles.container}>
      {hotel ? (
        <View>
        <Image 
  source={require('../assets/Enstay-Hotel1.jpg')} 
  style={{ 
    width: '100%',
    height: undefined,
    aspectRatio: 1
  }} 
/>
          <View style={styles.itemContainer}>
            <Text>Name: {hotel.name}</Text>
            <Text>Address: {hotel.address}</Text>
            <Text>Phone Number: {hotel.phoneNumber}</Text>
            
          <Text>Rooms:</Text>
          {rooms.map((room) => (
            <View key={0} style={styles.itemContainer}>
              <Text>Room Number: {room.roomNumber}</Text>
              {/* Add more room details as needed */}
            </View>
             ))}
            </View>
          

          <View style={styles.itemContainer}>
            <View style={styles.dateTimeContainer}>
              <Text>Start:</Text>
              <Button title="Select Start Date" onPress={showStartPicker} />
              <DateTimePickerModal
                isVisible={isStartPickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
              />
              <Text>{startDate ? startDate.toString() : "No date selected"}</Text>
            </View>
            <View style={styles.dateTimeContainer}>
              <Text>End:</Text>
              <Button title="Select End Date" onPress={showEndPicker} />
              <DateTimePickerModal
                isVisible={isEndPickerVisible}
                mode="datetime"
                onConfirm={handleConfirmend}
                onCancel={hidePicker}
              />
              <Text>{endDate ? endDate.toString() : "No date selected"}</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading hotel details...</Text>
      )}
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#c8c8c8a6",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    textAlign:"center",
    alignItems:"center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#c8c8c8a6",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: "column",
    backgroundColor: "#c8c8c8a6",
    alignItems: "center",
    marginBottom: 10,
  },
});
