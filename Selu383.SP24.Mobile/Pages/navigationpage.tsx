import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import AboutPage from './About';
import { StatusBar } from "expo-status-bar";



const Drawer = createDrawerNavigator();

//export default function NavigationPage({ navigation }) {
export default function NavigationPage() {
 return (
  <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: true, drawerStyle: {backgroundColor: '#708090',width: 240,},}}>
  <Drawer.Screen name="Home" component={Home} />
  <Drawer.Screen name="Booking" component={Home}/>
  <Drawer.Screen name="Settings" component={Home}/>
  <Drawer.Screen name="About" component={AboutPage} />
  </Drawer.Navigator>
  
 );
}


