import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationPage from './Pages/navigationpage';
import Reservation from './Pages/Reservation';
import HomeSearch from './Pages/HomeSearch';
import HotelList from './Pages/HotelList';
import Home from './Pages/Home';

const Stack = createStackNavigator();

export default function App() {
  return (

   <NavigationContainer>
   <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
   <Stack.Screen name="HomeScreen" component={NavigationPage}/>
   <Stack.Screen name="Home" component={Home}/>
   <Stack.Screen name="HotelList" component={HotelList}/>
   <Stack.Screen name="Reservation" component={Reservation}/>
   <Stack.Screen name="HomeSearch" component={HomeSearch}/>
   </Stack.Navigator>
   </NavigationContainer>
   
  );
}