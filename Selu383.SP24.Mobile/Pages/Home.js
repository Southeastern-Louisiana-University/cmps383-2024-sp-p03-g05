import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Home = ({ navigation }) => {
return (
<View style={styles.container}>
<Text style={styles.Text}>Welcome</Text>
</View>
);
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#65a30d',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Text: {
     fontSize: 20
    },

  });

export default Home;