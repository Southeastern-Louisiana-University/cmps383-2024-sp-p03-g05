import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, TextInput, Pressable, Modal, useWindowDimensions } from 'react-native';

export default function Guest({ navigation }) {
  const { width } = useWindowDimensions();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
 const [isLoggingIn, setIsLoggingIn] = useState(false);
 const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [cAmodalVisible, cAsetModalVisible] = useState(false);

  const refreshData = useCallback(() => {
    //Fetch user data when screen comes into focus
    navigation.reset({
    index: 0,
    routes: [{ name: 'Guest' }],
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

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/favicon.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>You don't have an account yet. Sign up now to unlock all features!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => cAsetModalVisible(true)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={[{ width: width * 0.7 }, styles.Input]}
              autoCapitalize="none"
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={[{ width: width * 0.7 }, styles.Input]}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={cAmodalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          cAsetModalVisible(!cAmodalVisible);
        }}
      >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#211f20',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  Input:{
    height: 40,
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginBottom: 20
 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6AA30D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
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
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 20,
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
  input: {
    marginBottom: 10,
  },
});
