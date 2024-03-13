import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable} from 'react-native';

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
  <View style={styles.container}>
    <Text style={styles.title}>Create Your EnStay Account</Text>
  <Text>Email:</Text>
  <TextInput
   style={styles.input}
    placeholder="Email"
    value={email}
    onChangeText={setEmail}
  />
  <Text>Password:</Text>
  <TextInput
   style={styles.input}
    placeholder="Password"
    secureTextEntry
    value={password}
    onChangeText={setPassword}
  />
  <Text>First Name:</Text>
  <TextInput
   style={styles.input}
    placeholder="First Name"
    value={firstName}
    onChangeText={setFirstName}
  />
  <Text>Last Name:</Text>
  <TextInput
   style={styles.input}
    placeholder="Last Name"
    value={lastName}
    onChangeText={setLastName}
  />
  <Pressable style={styles.Button}>
  <Text style={styles.Text}>Sign Up</Text>
  </Pressable>
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
  
 