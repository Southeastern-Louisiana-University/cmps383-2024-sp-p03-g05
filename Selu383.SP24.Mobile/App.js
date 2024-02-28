import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text} from 'react-native';
import Home from './Pages/Home';
import LoginPage from './Pages/Auth';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {

  return(
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={LoginPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65a30d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
