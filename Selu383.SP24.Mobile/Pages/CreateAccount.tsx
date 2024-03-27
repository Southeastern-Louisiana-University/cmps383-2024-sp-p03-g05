import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

export default function CreateAccount({ navigation }) {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your EnStay Account</Text>
      <Text style={styles.Text}>Email:</Text>
      <TextInput
        style={{
          width: width * 0.7,
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 10,
        backgroundColor: '#F3EFE0',
        textAlign: 'center',
        marginBottom: 20
      }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.Text}>Password:</Text>
      <TextInput
        style={{
          width: width * 0.7,
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 10,
        backgroundColor: '#F3EFE0',
        textAlign: 'center',
        marginBottom: 20
      }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.Text}>First Name:</Text>
      <TextInput
        style={{
          width: width * 0.7,
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 10,
        backgroundColor: '#F3EFE0',
        textAlign: 'center',
        marginBottom: 20
      }}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.Text}>Last Name:</Text>
      <TextInput
        style={{
          width: width * 0.7,
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        backgroundColor: '#F3EFE0',
        paddingHorizontal: 10,
        textAlign: 'center',
        marginBottom: 20
      }}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Pressable style={styles.Button} onPress={handleSignUp}>
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    color: '#CCCCCC',
    fontWeight: 'bold',
    fontSize: 20
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
  container: {
    flex: 1,
    padding: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F'
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
    color: '#CCCCCC',
  },
});
