import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationPage from './Pages/navigationpage';
import Reservation from './Pages/Reservation';
import HotelList from './Pages/HotelList';
import Home from './Pages/Home';
import HomeGuest from './Pages/HomeGuest';
import Book from './Pages/Book'

const Stack = createStackNavigator();

export default function App() {

 return (
  <NavigationContainer>
  <Stack.Navigator initialRouteName="Back" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Back" component={NavigationPage}/>
  <Stack.Screen name="home" component={HomeGuest}/>
  <Stack.Screen name="Home" component={Home}/>
  <Stack.Screen name="HotelList" component={HotelList}/>
  <Stack.Screen name="Reservation" component={Reservation} options={{ headerShown: true, headerTitle: "", headerTransparent: true}}/>
  <Stack.Screen name="Book" component={Book} options={{ headerShown: true, headerTitle: "", headerTransparent: true}}/>
  </Stack.Navigator>
  </NavigationContainer> 
 ); 
}