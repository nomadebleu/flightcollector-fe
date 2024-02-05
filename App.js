import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import Galery from './screens/galery';
import Reduction from './screens/Reductions'
import SignUp from './screens'
import Profil from './screens/Profil';
import SignUp from './screens/SignUp'

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator>
       <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Galery" component={Galery} />
        <Tab.Screen name="Reduction" component={Reduction} />
        <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="HomeStack" component={TabNavigator} />
        </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
