import React, { useEffect } from 'react';
import { useState} from "react";
import { Button, Overlay } from 'react-native-elements';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, SafeAreaView, Pressable, useWindowDimensions, Modal, Alert, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { ScreenHeight } from 'react-native-elements/dist/helpers';

export default function Home({ navigation }) {
 const { width } = useWindowDimensions();
 const [error, setError] = useState('');
 const [guest, setguest] = useState(true);
 const [loading, setLoading] = useState(false);
 const [login, setlogin] = useState(false);
 const [userData, setUserData] = useState(null);
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [modalVisible, setModalVisible] = useState(false);
 const [cAmodalVisible, cAsetModalVisible] = useState(false);
 const [isLoggingIn, setIsLoggingIn] = useState(false);
 

 const gotosearch = () => {
  navigation.navigate('HomeSearch');
 };

 const load = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
}


 const CheckLogin = async () => {
  //Prevent multiple presses
  if (isLoggingIn) return; 
  try {
    //Set login in progress
    setIsLoggingIn(true); 
    const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
     
    });

    if (!response.ok) {
      setModalVisible(true);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Reset login state
    setIsLoggingIn(false); 
    setLoading(true);
    // Update login state to true after successful login
    setguest(false);
    setlogin(true);
    
    // Fetch user data
    fetchUserData();
  } catch (error) {
    setError('Invalid username or password');
    // Reset login state in case of error
    setIsLoggingIn(false); 
  } finally {
    setModalVisible(false);
  }
};



 const fetchUserData = async () => {
  try {
  const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/me', {
   method: 'GET',
   headers: {'Content-Type': 'application/json'},
  });
  if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
   setUserData(data);
   setLoading(false);
   console.log("home", data);
  } 
  catch (error) {
  console.error('Error fetching user data:', error);
  setError('Error fetching user data');
  }
 };
 //Then call fetchUserData when needed, for example in a useEffect hook or a button press event
 //For example, you can call it when the component mounts using useEffect with an empty dependency array:
//  useEffect(() => {
//   fetchUserData();
//  },[]);
if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
} else{


 return (    
  <SafeAreaView style={styles.con1}>
  {guest && (
  <>
  <SafeAreaView style={styles.con1}>
    <View style={styles.con1}>
         <View>
           <Text style={styles.Title}>EnStay</Text>
         </View>
         {/* <Text style={styles.headerText}>EnStay</Text>  */}
       </View>
       <View style={styles.Bar}>
        <Pressable onPress={gotosearch}>
        <Text style={styles.searchBarText}>Where can we take you?</Text>
        </Pressable>
        </View> 
        <View style={styles.con3}>
  <View style={styles.imageContainer}>
   <Image source={require('../assets/GuestIcon.jpg')} style={styles.image} />
  </View>
   <Text style={styles.text}>Travel With Us</Text>
   <Text style={styles.text}>Join for the benefits,stay for the rewards</Text>
  <Pressable
   style={[styles.buttonOpen, styles.button]}
   onPress={() => cAsetModalVisible(true)}>
   <Text style={styles.textStyle}>Join EnStay</Text>
  </Pressable>
   <Text style={styles.text}>Have an account?</Text>
  <Pressable
   style={[styles.buttonOpen, styles.button]}
   onPress={() => setModalVisible(true)}>
   <Text style={styles.textStyle}>Sign in</Text>
  </Pressable>
  </View>
   </SafeAreaView>
  </>
  )}
  {login && (
    <>
    <SafeAreaView style={styles.con1}>
    <View style={styles.con1}>
     <View>
      <Text style={styles.Title}>EnStay</Text>
      </View>
        
       </View>
       <View style={styles.Bar}>
        <Pressable onPress={gotosearch}>
        <Text style={styles.searchBarText}>Where can we take you?</Text>
        </Pressable>
        </View> 
        <View style={styles.con3}>
  <View style={styles.imageContainer}>
   <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.image} />
  </View>
  <Text style={styles.text}>Welcome Back To The EnStay {userData ? `${userData.userName}` : 'No user data available'}</Text>
  </View>
  </SafeAreaView>
  </>
  )}
  
  {/*-------------------------------*/}
  <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={{
                width: width * 0.7,
                height: 40,
                borderColor: 'black',
                borderWidth: 3,
                paddingHorizontal: 10,
                textAlign: 'center',
                marginBottom: 20,
              }}
              autoCapitalize="none"
              autoComplete="off"
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={{
                width: width * 0.7,
                height: 40,
                borderColor: 'black',
                borderWidth: 3,
                paddingHorizontal: 10,
                textAlign: 'center',
                marginBottom: 20,
              }}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={CheckLogin}>
              <Text style={styles.textStyle}>Login</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  {/*CREATE ACCOUNT MODAL*/}
  {/*-------------------------------*/}
  <View style={styles.centeredView}>
  <Modal
   animationType="fade"
   transparent={true}
   visible={cAmodalVisible}
   onRequestClose={() => {
   Alert.alert('Modal has been closed.');
   setModalVisible(!cAmodalVisible);
  }}>
  {/*-------------------------------*/}
  <View style={styles.centeredView}>
  <View style={styles.modalView}>
   <TextInput
    style={{ 
    width: width * 0.7, 
    height: 40, 
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10, 
    textAlign:'center',
    marginBottom: 20
    }}
    autoCapitalize="none"
   autoComplete='off'
    placeholder="Email"
    value={username}
    onChangeText={(text) => setUsername(text)}
   />
   <TextInput
    style={{ 
    width: width * 0.7, 
    height: 40, 
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10, 
    textAlign:'center',
    marginBottom: 20
    }}
    placeholder="First Name"
    value={password}
    onChangeText={(text) => setPassword(text)}
   />
   <TextInput
    style={{ 
    width: width * 0.7, 
    height: 40, 
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10, 
    textAlign:'center',
    marginBottom: 20
    }}
    placeholder="Last Name"
    value={password}
    onChangeText={(text) => setPassword(text)}
   />
   <TextInput
    style={{ 
    width: width * 0.7, 
    height: 40, 
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10, 
    textAlign:'center',
    marginBottom: 20
    }}
    placeholder="UserName"
    value={password}
    onChangeText={(text) => setPassword(text)}
   />
   <TextInput
    style={{ 
    width: width * 0.7, 
    height: 40, 
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10, 
    textAlign:'center',
    marginBottom: 20
    }}
    placeholder="Password"
    secureTextEntry
    value={password}
    onChangeText={(text) => setPassword(text)}
   />
  <Pressable
   style={[styles.button, styles.buttonClose]}  onPress={() => cAsetModalVisible(false)}>
   <Text style={styles.textStyle}>Create Account</Text>
  </Pressable>
  </View>
  </View>
  </Modal>
  </View>
  </SafeAreaView>
 );
}
};

{/*-------------------------------*/}
const styles = StyleSheet.create({
 
  Title:{
    textAlign: 'center',
  fontSize: 24, // You can adjust this value based on your design
  color: '#6AA30D',
  paddingBottom: 5, // You can adjust this value based on your design

  },
  
 searchBarText:{ 
  fontSize: 16,
  color: '#555', 
 }, 
 Bar:{ 

  //position: 'absolute',
  //left: 0,
  top: 25,
  //right: 0,
  alignSelf: "center",
  width: '70%', 
  height: 40, 
  borderColor: 'gray',
  borderWidth: 2,
  paddingHorizontal: 20, 
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 25,
  zIndex: 1,      
 }, 
 safecon:{ 
  flexDirection: 'column',
  backgroundColor: 'grey',
  //flex: 1,
  // marginBottom: -95,
 },
 con1:{
  flexDirection: 'column',
  backgroundColor: '#211f20',
  flex: 1,
  //marginBottom: -95,
  //padding: 20,
  
 },
 
 con3:{
  flex: 10,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#c8c8c8a6',
  marginLeft:-50,
  marginRight:-50,
  marginBottom:-50
 },


  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 100, 
    overflow: 'hidden', 
    marginBottom: 5,
    marginTop:5,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  text: {
    fontSize: 20,
    marginBottom: 20, // Add some space after the text
  },
  centeredView: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    backgroundColor: '#6AA30D',
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#151617',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});