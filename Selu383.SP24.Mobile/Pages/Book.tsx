import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Book({ route }) {
  const navigation = useNavigation(); // Get access to navigation object
  const { hid } = route.params;
  const { john } = route.params;
  const { title } = route.params;
  const { price } = route.params;
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState("");
  const { width, height } = useWindowDimensions();

  const gotosearch = () => {
    navigation.navigate("Trips");
  };
  const home = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        const response = await fetch(
          `https://selu383-sp24-p03-g05.azurewebsites.net/api/hotels/${route.params.hid}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelById();
  }, []);

  const CreateR = async () => {
    try {
      const response = await fetch(
        `https://selu383-sp24-p03-g05.azurewebsites.net/api/reservation/CreateReservation?hotelId=${hid}&packageId=${john}&reservationStartDate=${startDate.toISOString()}&reservationEndDate=${endDate.toISOString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log(
          `https://selu383-sp24-p03-g05.azurewebsites.net/api/reservation/CreateReservation?hotelId=${hid}&packageId=${john}&reservationStartDate=${startDate.toISOString()}&reservationEndDate=${endDate.toISOString()}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      gotosearch();
      console.log("Reservation created successfully");
    } catch (error) {
      setError("Failed to create reservation");
      console.error(error);
    } finally {
    }
  };

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      //console.log("home", data);
    } catch (error) {
      setError("Error fetching user data");
    }
  };

  //Fetch user data when the screen mounts initially
  useEffect(() => {
    me();
  }, []);

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
    console.log(date);
    hidePicker();
  };
  const handleConfirmend = (date) => {
    setEndDate(date);
    console.log(date);
    hidePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {hotel ? (
          <View>
            <Image
              source={require("../assets/Enstay-Hotel1.jpg")}
              style={{
                height: height / 2,
                width: width / 2,
                aspectRatio: 1,
              }}
            />
            <View style={styles.itemContainer}>
              <Text style={styles.hotelname}>{hotel.name}</Text>
              <Text style={styles.hotelname}>{hotel.address}</Text>
              <Text style={styles.hotelname}>{hotel.phoneNumber}</Text>
              <Text style={styles.hotelname}>Package:{title}</Text>
              <Text style={styles.hotelname}>Price:{price}</Text>
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
                <Text>
                  {startDate ? startDate.toString() : "No date selected"}
                </Text>
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
              <Pressable style={styles.button} onPress={CreateR}>
                <Text>Book Reservation</Text>
              </Pressable>
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
    backgroundColor: "#c8c8c8a6",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    textAlign: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#c8c8c8a6",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  hotelname: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  adrress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pnum: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pack: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#6AA30D",
    elevation: 2,
    //marginBottom:50,
    justifyContent: "flex-end",
  },
  dateTimeContainer: {
    flexDirection: "column",
    backgroundColor: "#c8c8c8a6",
    alignItems: "center",
    marginBottom: 10,
  },
});
