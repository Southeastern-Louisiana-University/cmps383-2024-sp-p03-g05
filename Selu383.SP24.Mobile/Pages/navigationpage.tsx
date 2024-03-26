//import {StyleSheet} from 'react-native';
//import { StatusBar } from "expo-status-bar";
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import AboutPage from './About';
import HotelList from './HotelList';
import CreateAccount from './CreateAccount';
import AccountsPage from './Account';
import Reservation from './Reservation';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function NavigationPage() {
  return (
  <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
    headerShown: false,
    headerTransparent: false,

    tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
    } else if 
    (route.name === 'Search') {
      iconName = focused ? 'search' : 'search-outline';
    } else if 
    (route.name === 'Account') {
      iconName = focused ? 'person' : 'person-outline';
    } else if 
    (route.name === 'about') {
      iconName = focused ? 'information-circle' : 'information-circle-outline'; 
    }
    
    
    return <Ionicons name={iconName} size={size} color={color} />;
    
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="Home" component={Home}  />
    <Tab.Screen name="Search" component={HotelList} />
    <Tab.Screen name="Account" component={AccountsPage} />
    {/* <Tab.Screen name="Res" component={Reservation} /> */}
    <Tab.Screen name="about" component={AboutPage} />
    </Tab.Navigator>
  );
}
