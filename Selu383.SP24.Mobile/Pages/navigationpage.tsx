import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect, useCallback} from "react";
import Home from './Home';
import HotelList from './HotelList';
import AccountsPage from './Account';
import Trips from './Trips';
import HomeGuest from './HomeGuest';
import Guest from './Guest';
import { useFocusEffect } from 'expo-router';

const Tab = createBottomTabNavigator();











export default function NavigationPage({ navigation }) {
  const [login, setlogin] = useState(false);




  const me = async () => {
    try {
      const response = await fetch('https://selu383-sp24-p03-g05.azurewebsites.net/api/authentication/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        setlogin(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      //const data = await response.json();
      //console.log(data);
    setlogin(true);
    } catch (error) {
     // console.error('Error fetching user data:', error);
     // setLoading(false);
    }
  };

  
  me();
  

console.log(login);


  
  if(login == true){
     
 return (
  <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
  headerShown: false,
  headerTransparent: false,
  tabBarIcon: ({ focused, color, size }) => {
  let iconName;
  {/*-------------------------------*/}
  if (route.name === 'Home') {
   iconName = focused ? 'home' : 'home-outline';
  } 
  else if (route.name === 'Search') {
   iconName = focused ? 'search' : 'search-outline';
  } 
  else if (route.name === 'Account') {
   iconName = focused ? 'person' : 'person-outline';
  } 
  else if (route.name === 'Trips') {
   iconName = focused ? 'compass' : 'compass-outline';
  }
  {/*-------------------------------*/}
  return <Ionicons name={iconName} size={size} color={color}/>;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  })}>
  {/*-------------------------------*/}
  <Tab.Screen name="Home" component={Home}  />
  <Tab.Screen name="Search" component={HotelList} />
  <Tab.Screen name="Account" component={AccountsPage} />
  <Tab.Screen name="Trips" component={Trips} />
  </Tab.Navigator>
);
  
  }
  else if (login == false) {

return (
  <Tab.Navigator initialRouteName="home" screenOptions={({ route }) => ({
  headerShown: false,
  headerTransparent: false,
  tabBarIcon: ({ focused, color, size }) => {
  let iconName;
  {/*-------------------------------*/}
  if (route.name === 'home') {
    iconName = focused ? 'home' : 'home-outline';
   } 
   else if (route.name === 'Search') {
   iconName = focused ? 'search' : 'search-outline';
  } 
  else if (route.name === 'Guest') {
    iconName = focused ? 'person' : 'person-outline';
   } 
  else if (route.name === 'Trips') {
   iconName = focused ? 'compass' : 'compass-outline';
  }
  {/*-------------------------------*/}
  return <Ionicons name={iconName} size={size} color={color}/>;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  })}>
  {/*-------------------------------*/}
  <Tab.Screen name="home" component={HomeGuest}  />
  <Tab.Screen name="Search" component={HotelList} />
 <Tab.Screen name="Guest" component={Guest}/>
  <Tab.Screen name="Trips" component={Trips} />
  </Tab.Navigator>
);
  }
}