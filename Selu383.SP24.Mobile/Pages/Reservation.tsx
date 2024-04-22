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
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Reservation({ route }) {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [login, setlogin] = useState(true);
  const [siginmodal, setsigninmodal] = useState(false);
  const [error, setError] = useState("");
  const { hid } = route.params;
  const { width, height } = useWindowDimensions();

  

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
                style={{
                  height: height / 3, // Reduced from height / 2
                  width: width / 2, // Unchanged
                  aspectRatio: 1,
                }} />
              <Text style={styles.hotelname}>{hotel.name}</Text>
              <Text style={styles.adrress}>{hotel.address}</Text>
              <Text style={styles.pnum}>{hotel.phoneNumber}</Text>
              <Text style={styles.pack}>Packages for This Hotel:</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View>
                {rooms.map((rooms, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.pname}>
                      <Text style={styles.packsub}>{rooms.title}{"\n"}</Text>
                    </Text>
                    <Text style={styles.prices}>
                      Price:<Text style={styles.prices}> ${rooms.startingPrice}{"\n"}</Text>
                    </Text>
                    <Text style={styles.dname}>Description:</Text>
                    {rooms.description
                      .split(", ")
                      .map((sentence, sentenceIndex) => (
                        <Text style={styles.desc} key={sentenceIndex}>
                          {sentence}
                          {sentenceIndex !==
                            rooms.description.split(", ").length - 1 && ", "}
                          {"\n"}
                        </Text>
                      ))}
                    <Pressable
                      style={[styles.button]}
                      onPress={() => {
                        navigation.navigate("Book", {
                          hid: hotel.id,
                          john: rooms.id,
                          title: rooms.title,
                          price: rooms.startingPrice,
                        });
                      }}
                    >
                      <Text style={[styles.buttonText]}>
                        Select This Package
                      </Text>
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
    
      )
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
  },
  hotelname: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 2,
  },
  adrress: {
    textAlign: "center",
    fontSize: 19,
    fontStyle: "italic",
    marginBottom: 2,
  },
  packsub: {
    fontSize: 25,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 2,
  },
  pnum: {
    textAlign: "center",
    fontSize: 17,
    fontStyle: "italic",
    marginBottom: 2,
  },
  pack: {
    textAlign: "center",
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
    justifyContent: "flex-end",
  },
  pname: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 2,
  },
  prices: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 2,
  },
  dname: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 2,
  },
  desc: {
    textAlign: "center",
    fontSize: 26,
    fontStyle: "italic",
    marginBottom: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
