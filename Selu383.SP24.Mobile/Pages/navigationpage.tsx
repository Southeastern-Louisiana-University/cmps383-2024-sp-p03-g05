//import {StyleSheet} from 'react-native';
//import { StatusBar } from "expo-status-bar";
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import AboutPage from './About';
import HotelList from './HotelList';
import CreateAccount from './CreateAccount';

const Drawer = createDrawerNavigator();

//export default function NavigationPage({ navigation }) {
export default function NavigationPage() {
 return (
  <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: true, headerTransparent:false, drawerStyle: {backgroundColor: '#708090',width: 240,},}}>
  <Drawer.Screen name="Home" component={Home}/>
  {/* <Drawer.Screen name="Booking" component={Home}/> */}
  <Drawer.Screen name="Search For Hotel" component={HotelList}/>
  <Drawer.Screen name="Create Account" component={CreateAccount}/>
  {/* <Drawer.Screen name="Settings" component={Home}/> */}
  <Drawer.Screen name="About" component={AboutPage} />
  </Drawer.Navigator>
 );
}


