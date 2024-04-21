import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Reservation({ route }) {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [login, setlogin] = useState(true);
  const { hid } = route.params;
  const { width, height } = useWindowDimensions();

  const gotosearch = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {


    const me = async () => {
      try {
        const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
          setlogin(false);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        //const data = await response.json();
        //console.log(data);
      setlogin(true);
      } catch (error) {
       // console.error('Error fetching user data:', error);
       // setLoading(false);
      }
    };
  

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
        console.log(hid);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelById();
  }, [hid]);

  const fetchRooms = async (hid) => {
    try {
      const response = await fetch(
        `https://selu383-sp24-p03-g05.azurewebsites.net/api/room/GetAllAvailablePackages?hotelId=${hid}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRooms(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms(hid);
  }, [hid]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {hotel ? (
          <View>
            <View style={styles.hinfo}>
              <Image
                source={require("../assets/Enstay-Hotel1.jpg")}
                style={{ height: height / 3, // Reduced from height / 2
                width: width / 2, // Unchanged
                aspectRatio: 1, }}
              />
              <Text style={styles.hotelname}>{hotel.name}</Text>
              <Text style={styles.adrress}>{hotel.address}</Text>
              <Text style={styles.pnum}>{hotel.phoneNumber}</Text>
              <Text>Packages for This Hotel:</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View>
                {rooms.map((rooms, index) => (
                  <View key={index} style={styles.itemContainer}>
                      <Text>{rooms.title}</Text>
                      <Text>Description:</Text>
                      {rooms.description
                        .split(", ")
                        .map((sentence, sentenceIndex) => (
                          <Text key={sentenceIndex}>
                            {sentence}
                            {sentenceIndex !==
                              rooms.description.split(", ").length - 1 && ", "}
                            {"\n"}
                          </Text>
                        ))}
                      <Text>Price: {rooms.startingPrice}</Text>
                      <Pressable
                      style={[styles.button]}
                      onPress={() =>
                        navigation.navigate("Book", {
                          hid: hotel.id,
                          john: rooms.id,
                          title: rooms.title,
                          price: rooms.startingPrice
                        })
                      }
                    >
                      <Text style={[styles.buttonText]}>Select This Package</Text>
                    </Pressable>
                    {/* Add more room details as needed */}
                  </View>
                ))}
              </View>
            </ScrollView>
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
    //padding: 16,
    backgroundColor: "#c8c8c8a6",
    alignItems: "center",
    justifyContent: "center",
      
  },
  hinfo: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#c8c8c8a6",
  },
  itemContainer: {
    textAlign: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#211f20",
    backgroundColor: "#c8c8c8a6",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  hotelname: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  adrress: {
    fontSize: 20,
    fontStyle:"italic",
    marginBottom: 2,
  },
  pnum: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  pack: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#6AA30D",
    elevation: 2,
    //marginBottom:50,
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
