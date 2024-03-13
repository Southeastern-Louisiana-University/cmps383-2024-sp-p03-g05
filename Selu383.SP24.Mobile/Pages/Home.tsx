import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import SearchBar from './SearchBar';

export default function Home({ navigation }) {
 return (    
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
  enabled={Platform.OS === 'ios' || Platform.OS === 'android'}
    >
  <View style={styles.container}>
  <View style={styles.imageContainer}>
  <Image source={require('../assets/Enstay-Hotel1.jpg')} style={styles.image} />
  </View>
  <Text style={styles.text}>Welcome To The EnStay App</Text>
  <SearchBar navigation={undefined}/>
  </View>
  </KeyboardAvoidingView>
 );
};

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
 }
});