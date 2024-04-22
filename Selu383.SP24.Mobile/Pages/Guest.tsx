import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
  useWindowDimensions,
} from "react-native";

export default function Guest({ navigation }) {
  const { width } = useWindowDimensions();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [causername, casetUsername] = useState("");
  const [password, setPassword] = useState("");
  const [capassword, casetPassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [siginmodal, setsigninmodal] = useState(false);
  const [camodal, casetmodal] = useState(false);

  const refreshData = useCallback(() => {
    //Fetch user data when screen comes into focus
    navigation.reset({
      index: 0,
      routes: [{ name: "Guest" }],
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
      //Update login state to true after successful login
      //setguest(false);
      //setlogin(true);
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
          body: JSON.stringify({ causername, capassword, firstname, lastname }),
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
      refreshData();
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
    <View style={styles.container}>
      <Image source={require("../assets/favicon.png")} style={styles.image} />
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>
        You don't have an account yet. Sign up now to unlock all features!
      </Text>
      <TouchableOpacity
        style={styles.buttonnm}
        onPress={() => casetmodal(true)}
      >
        <Text style={styles.buttonText}>Join EnStay</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonnm}
        onPress={() => setsigninmodal(true)}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

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
                value={causername}
                onChangeText={(text) => casetUsername(text)} />
              <TextInput
                style={[{ width: width * 0.7 }, styles.Input]}
                placeholder="Password"
                secureTextEntry
                value={capassword}
                onChangeText={(text) => casetPassword(text)} />
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
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3efe0",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
  },
  Input: {
    height: 40,
    borderColor: "black",
    borderWidth: 3,
    paddingHorizontal: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonnm: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#6AA30D",
    elevation: 2,
    marginBottom:5,
    justifyContent: 'flex-end',
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
  closebutton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closetext: {
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
