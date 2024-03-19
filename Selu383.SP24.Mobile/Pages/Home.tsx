import React from 'react';

import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform} from 'react-native';
import SearchBar from './SearchBar';

export default function Home({ navigation }) {
  return (    
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios' || Platform.OS === 'android'}
    >
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.image} />
        </View>
        <Text style={styles.text}>Welcome To The EnStay App</Text>
        <SearchBar navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65a30d',
  },
  innerContainer: {
    flex: 1,
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
    marginBottom: 20, // Add some space after the text
  },
});
