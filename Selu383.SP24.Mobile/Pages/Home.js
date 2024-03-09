import React from 'react';
import { View, Text, StyleSheet, Image, TextInput} from 'react-native';

export default function Home({ navigation }) {
 return (    
 <View style={styles.container}>
 <View style={styles.imageContainer}>
 <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.image} />
 </View>
 <Text style={styles.text}>Welcome To The EnStay App</Text>
 <TextInput style={styles.searchbar} placeholder="Look For A Hotel"/>
 </View>
  );
}

const styles = StyleSheet.create({
  border: {
    flex: 1,
    backgroundColor: '#2F4F4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#65a30d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // half of the width and height to create a circle
    overflow: 'hidden', // clip the image to the circle
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
  },
  searchbar: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white', // Set white background
    borderRadius: 25, // Adjust the borderRadius to make it round
    padding: 10, // Add some padding for better appearance
    marginLeft: 10,
    width: "90%",
 },
});