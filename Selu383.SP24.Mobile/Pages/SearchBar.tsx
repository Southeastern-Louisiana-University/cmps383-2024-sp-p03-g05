import { View, StyleSheet, TextInput} from 'react-native';

export default function SearchBar({ navigation }) {
 return (    
  <View>
  <TextInput style={styles.searchbar} placeholder="Look For A Hotel"/>
  </View>
 );
};

const styles = StyleSheet.create({
 searchbar: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white', 
    borderRadius: 25, // Adjust the borderRadius to make it round
    padding: 10, // Add some padding for better appearance
    marginLeft: 20, // Adjust margin as needed
    marginRight: 20, // Adjust margin as needed
    width: '90%', // Adjust width percentage to make it wider
 }
});