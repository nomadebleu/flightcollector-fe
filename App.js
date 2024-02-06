import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from './screens/Home';
import Galery from './screens/Galery';
import Reduction from './screens/Reductions';
import Login from './screens/Login';
import Profil from './screens/Profil';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profil') {
          iconName = 'user';
        } else if (route.name === 'Galery') {
          iconName = 'image'
        } else if (route.name === 'Reduction'){
          iconName = 'tag'
        }
 
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2196f3',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profil" component={Profil} /> 
      <Tab.Screen name="Galery" component={Galery} />
      <Tab.Screen name="Reduction" component={Reduction} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isReady ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeStack" component={TabNavigator} />
          </>
        ) : (
          <Stack.Screen name="Splash" component={Splash} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
