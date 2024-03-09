import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable} from 'react-native';


//const LoginPage = () => {
  export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const validUsername = 'User';
    const validPassword = 'Password';

    if (username === validUsername && password === validPassword) {
      setError('');
      //alert('Login successful!');
    } else {
      setError('Invalid username or password');
    }
   navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    })
  };

  const MakeAccount = () => {
    navigation.reset({
      index: 1,
      routes: [{ name: 'CreateScreen' }],
    })
  }

  return (
    <View style={styles.border}>
    <View style={styles.container}>
    <Text style={styles.title}>Let's Get You {"\n"} Back In Paradise</Text>
    <TextInput
      style={styles.input}
      placeholder="Username"
      value={username}
      onChangeText={(text) => setUsername(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={(text) => setPassword(text)}
    />
    <Pressable style={styles.Button} onPress={handleLogin}>
    <Text style={styles.Text}>Login</Text>
    </Pressable>
    <View style={styles.Space}/>
    <Pressable style={styles.Button} onPress={MakeAccount}>
    <Text style={styles.Text}>Create Account</Text>
    </Pressable>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
Text: {
 color: 'white'
},
Space: {
 width: 20,
 height: 20,
},
Button: {
 alignItems: 'center',
 justifyContent: 'center',
 paddingVertical: 20,
 paddingHorizontal: 32,
 borderRadius: 4,
 elevation: 3,
 backgroundColor: '#3c3f6b',
},
border: {
 flex: 1,
 backgroundColor: '#2F4F4F',
 alignItems: 'center',
 justifyContent: 'center',
},
container: {
 flex: 1,
 padding : 55,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#F3EFE0'
},
title: {
 fontSize: 24,
 marginBottom: 16,
},
input: {
   height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
 
},
errorText: {
 color: 'red',
 marginTop: 8,
},
});