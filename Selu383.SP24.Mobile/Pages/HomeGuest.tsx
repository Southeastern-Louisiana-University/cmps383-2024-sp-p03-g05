import { useState, useEffect, useCallback} from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, SafeAreaView, Pressable, useWindowDimensions, Modal, Alert, TextInput, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { Button, Overlay } from 'react-native-elements';

export default function HomeGuest({ navigation }) {
 const { width } = useWindowDimensions();
 const [error, setError] = useState('');
 //const [guest, setguest] = useState(true);
 const [loading, setLoading] = useState(false);
 //const [login, setlogin] = useState(false);
 const [userData, setUserData] = useState(null);
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [firstname, setfirstname] = useState('');
 const [lastname, setlastname] = useState('');
 const [modalVisible, setModalVisible] = useState(false);
 const [cAmodalVisible, cAsetModalVisible] = useState(false);
 const [isLoggingIn, setIsLoggingIn] = useState(false);

 const gotosearch = () => {
    navigation.navigate('HomeSearch');
 };

{/*-------------------------------*/}

 const refreshData = useCallback(() => {
  //Fetch user data when screen comes into focus
  navigation.reset({
  index: 0,
  routes: [{ name: 'home' }],
  });
  me();
 },[]);

{/*-------------------------------*/}

 //Fetch user data when the screen mounts initially
 useEffect(() => {
 },[]);

{/*-------------------------------*/}

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
  //Reset login state
  setIsLoggingIn(false); 
  setLoading(true);
  //Update login state to true after successful login
  //setguest(false);
  //setlogin(true);
  //Refresh user data when the screen comes into focus
  //useFocusEffect(refreshData);
  refreshData();
  } 
  catch (error) {
   setError('Invalid username or password');
   //Reset login state in case of error
   setIsLoggingIn(false); 
  } 
  finally {
   setModalVisible(false);
  }
 };


 const Signup = async () => {
  if (isLoggingIn) return; 
  try {
  //Set login in progress
  setIsLoggingIn(true); 
  const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/users/signup', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ username, password, firstname, lastname })
  });
  if (!response.ok) {
    cAsetModalVisible(true);
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
  } 
  catch (error) {
   setError('Invalid username or password');
   //Reset login state in case of error
   setIsLoggingIn(false); 
  } 
  finally {
    cAsetModalVisible(false);
  }
 };

 













{/*-------------------------------*/}

 const me = async () => {
  try {
  const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/me', {
   method: 'GET',
   headers: {'Content-Type': 'application/json'},
  });
  if (!response.ok) {
   //setIsLoggingIn(false); 
   throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
   setUserData(data);
  } 
  catch (error) {
   //console.error('Error fetching user data:', error);
   setError('Error fetching user data');
  }
 };

 return(
  <><SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={styles.container}>
         <KeyboardAvoidingView
             behavior={Platform.OS === "ios" ? "padding" : "height"}
             style={styles.container}
         ></KeyboardAvoidingView>
         <View style={styles.con1}>
             <Text style={styles.Title}>EnStay</Text>
         </View>
         {/* <View style={styles.Bar}>
             <Pressable onPress={gotosearch}>
                 <Text style={styles.searchBarText}>Where can we take you?</Text>
             </Pressable>
         </View> */}
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

         <View style={styles.centeredView}>




             <Modal
                 animationType="fade"
                 transparent={true}
                 visible={modalVisible}
                 onRequestClose={() => {
                     Alert.alert('Modal has been closed.');
                     setModalVisible(!modalVisible);
                 } }>
                 <View style={styles.centeredView}>
                     <View style={styles.modalView}>
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
                             onPress={CheckLogin}>
                             <Text style={styles.textStyle}>Login</Text>
                         </Pressable>
                     </View>
                 </View>
             </Modal>
         </View>
         </ScrollView>
      </SafeAreaView>
      <SafeAreaView>
        <View style={styles.centeredView}>





             <Modal
                 animationType="fade"
                 transparent={true}
                 visible={cAmodalVisible}
                 onRequestClose={() => {
                     Alert.alert('Modal has been closed.');
                     setModalVisible(!cAmodalVisible);
                 } }>
                 {/*-------------------------------*/}
                 <View style={styles.centeredView}>
                     <View style={styles.modalView}>
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
                             style={[styles.button, styles.buttonClose]} onPress={Signup}>
                             <Text style={styles.textStyle}>Create Account</Text>
                         </Pressable>
                     </View>
                 </View>
             </Modal>
         </View>
         </SafeAreaView></>
 
 );
}


const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#211f20',
      },



 Input:{
    height: 40,
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginBottom: 20
 },
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
   

   safe: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#211f20',
    flex: 1,
     //marginBottom: -98,
   },
   con1:{
    backgroundColor: '#211f20',
    flexDirection: 'column',
    
    flex: 1,    
   },
   
   con3:{
    flex: 12,
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