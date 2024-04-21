import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  useWindowDimensions,
  Modal,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HomeGuest({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [error, setError] = useState("");
  //const [guest, setguest] = useState(true);
  const [loading, setLoading] = useState(false);
  //const [login, setlogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [siginmodal, setsigninmodal] = useState(false);
  const [camodal, casetmodal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  

  
  {
    /*-------------------------------*/
  }

  const refreshData = useCallback(() => {
    //Fetch user data when screen comes into focus
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    });
    me();
  }, []);

  {
    /*-------------------------------*/
  }

  //Fetch user data when the screen mounts initially
  useEffect(() => {}, []);

  {
    /*-------------------------------*/
  }

  const CheckLogin = async () => {
    //Prevent multiple presses
    if (isLoggingIn) return;
    try {
      //Set login in progress
      setIsLoggingIn(true);
      const response = await fetch(
        "https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        setsigninmodal(true);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //Reset login state
      setIsLoggingIn(false);
      setLoading(true);
      //Refresh user data when the screen comes into focus
      //useFocusEffect(refreshData);
      refreshData();
    } catch (error) {
      setError("Invalid username or password");
      //Reset login state in case of error
      setIsLoggingIn(false);
    } finally {
      setsigninmodal(false);
    }
  };

  const Signup = async () => {
    if (isLoggingIn) return;
    try {
      //Set login in progress
      setIsLoggingIn(true);
      const response = await fetch(
        "https://selu383-sp24-p03-g05.azurewebsites.net/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, firstname, lastname }),
        }
      );
      if (!response.ok) {
        casetmodal(true);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //Reset login state
      setIsLoggingIn(false);
      setLoading(true);
      //Update login state to true after successful login
      //setguest(false);
      //setlogin(true);
      //Refresh user data when the screen comes into focus
      //useFocusEffect(refreshData);
      // refreshData();
    } catch (error) {
      setError("Invalid username or password");
      //Reset login state in case of error
      setIsLoggingIn(false);
    } finally {
      casetmodal(false);
    }
  };

  {
    /*-------------------------------*/
  }

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
        //setIsLoggingIn(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      //console.error('Error fetching user data:', error);
      setError("Error fetching user data");
    }
  };

  return (
    
      <SafeAreaView style={[{ paddingTop: insets.top,
        paddingBottom: insets.bottom,}, styles.safe]}>
    <View style={styles.Header}>
      <Text style={styles.Title}>EnStay</Text>
      </View>
     
      <View style={styles.Body}>

      <View style={[{marginTop:40 },styles.imageContainer]}>
                  <Image
            source={require("../assets/GuestIcon.jpg")}
            style={styles.image} />
        </View>

        <Text style={styles.text}>Travel With Us</Text>
        <Text style={styles.text}>
          Join for the benefits,stay for the rewards
        </Text>
        <Pressable
          style={[styles.buttonOpen, styles.button]}
          onPress={() => casetmodal(true)}
        >
          <Text style={styles.textStyle}>Join EnStay</Text>
        </Pressable>
        <Text style={styles.text}>Have an account?</Text>
        <Pressable
          style={[{marginBottom: height <= 600 ? 20 : 34,},styles.buttonOpen, styles.button]}
          onPress={() => setsigninmodal(true)}
        >
          <Text style={styles.textStyle}>Sign in</Text>
        </Pressable>
      </View>

      
        <Modal
          animationType="fade"
          transparent={true}
          visible={siginmodal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setsigninmodal(!siginmodal);
          } }
        >
           <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setsigninmodal(!siginmodal)}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
              <TextInput
                style={[{ width: width * 0.7 }, styles.Input]}
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)} />
              <TextInput
                style={[{ width: width * 0.7 }, styles.Input]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)} />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={CheckLogin}
              >
                <Text style={styles.textStyle}>Login</Text>
              </Pressable>
          </View>
          </View>
        </Modal>
      
    

        <Modal
          animationType="fade"
          transparent={true}
          visible={camodal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            casetmodal(!camodal);
          } }
        >
          {/*-------------------------------*/}
          <View style={styles.centeredView}> 
            <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => casetmodal(!camodal)}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
              <TextInput
                style={[{ width: width * 0.7 }, styles.Input]}
                placeholder="UserName"
                value={username}
                onChangeText={(text) => setUsername(text)} />
              <TextInput
                style={[{ width: width * 0.7 }, styles.Input]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)} />
              <TextInput
                style={[{ width: width * 0.7 }, styles.Input]}
                placeholder="First Name"
                value={firstname}
                onChangeText={(text) => setfirstname(text)} />
              <TextInput
                style={[{ width: width * 0.7 }, styles.Input]}
                placeholder="Last Name"
                value={lastname}
                onChangeText={(text) => setlastname(text)} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={Signup}
              >
                <Text style={styles.textStyle}>Create Account</Text>
              </Pressable>
            </View>
          </View> 
        </Modal>
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
 safe: {
  flexGrow: 1,
  backgroundColor: "#211f20",
  flex: 1,
 },
 Header: {
  backgroundColor: "#211f20",
  flex:0.3,
  marginBottom:0.5,
 },
 Body: {
  flex: 3,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#c8c8c8a6",
  
 },
 Input: {
  height: 40,
  borderColor: "black",
  borderWidth: 3,
  textAlign: "center",
  paddingHorizontal: 10,
  marginBottom: 20,
  },
  Title: {
    textAlign: "center",
    fontSize: 24, // You can adjust this value based on your design
    color: "#6AA30D",
  },

  
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 100,
    overflow: "hidden",
    //marginBottom: 5,
    //marginTop: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  text: {
    fontSize: 20,
    marginBottom: 5,
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
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#6AA30D",
    elevation: 2,
    //marginBottom:50,
    justifyContent: 'flex-end',
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
   // marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    //marginBottom: 15,
    textAlign: "center",
  },
});
