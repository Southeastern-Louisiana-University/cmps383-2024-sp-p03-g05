import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
  useWindowDimensions,
  Modal,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
export default function Home({ navigation }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const gotosearch = () => {
    navigation.navigate("HotelLIst");
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
      setUserData(data);
      setLoading(false);
      //console.log("home", data);
    } catch (error) {
      setError("Error fetching user data");
    }
  };

  const refreshData = useCallback(() => {
    //Fetch user data when screen comes into focus
    setLoading(false);
    me();
  }, []);

  //Fetch user data when the screen mounts initially
  useEffect(() => {
    me();
  }, []);

  //Refresh user data when the screen comes into focus
  useFocusEffect(refreshData);

  if (loading == true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.con1}>
        <View style={styles.con1}>
          <View>
            <Text style={styles.Title}>EnStay</Text>
          </View>
        </View>

        <View style={styles.con3}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Enstay-Hotel1.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>
            Welcome Back To The EnStay{" "}
            {userData ? `${userData.userName}` : "No user data available"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

{
  /*-------------------------------*/
}
const styles = StyleSheet.create({
  Title: {
    textAlign: "center",
    fontSize: 24, // You can adjust this value based on your design
    color: "#6AA30D",
    paddingBottom: 5, // You can adjust this value based on your design
  },
  safecon: {
    backgroundColor: "grey",
  },
  con1: {
    flexDirection: "column",
    backgroundColor: "#211f20",
    flex: 1,
  },
  con3: {
    flex: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c8c8c8a6",
    marginLeft: -50,
    marginRight: -50,
    marginBottom: -50,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 5,
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  text: {
    fontSize: 20,
    marginBottom: 20, // Add some space after the text
  },
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#6AA30D",
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#151617",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
