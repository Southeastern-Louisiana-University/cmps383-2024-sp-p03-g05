import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import HotelList from './HotelList';
import AccountsPage from './Account';
import Trips from './Trips';

const Tab = createBottomTabNavigator();

export default function NavigationPage() {
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