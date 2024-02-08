import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Import des screens concernés
import Home from './screens/Home';
import Gallery from './screens/Gallery';
import Reduction from './screens/Reductions';
import Login from './screens/Login';
import Scan from './screens/Scan';
import Profil from './screens/Profil';

import { useFonts } from 'expo-font';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          //On rajoute focused pour changer le style de la view qui encadre l'icone
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profil') {
            iconName = 'user';
          } else if (route.name === 'Gallery') {
            iconName = 'image';
          } else if (route.name === 'Reduction') {
            iconName = 'tag';
          }
          //Const de style pour mettre une condition
          const iconContainerStyle = focused
            ? styles.activeIconContainer
            : null;
          return (
            <View style={styles.tab}>
              <View style={[styles.iconContainer, iconContainerStyle]}>
                <FontAwesome
                  name={iconName}
                  size={size}
                  color={color}
                />
              </View>

              <Text style={styles.label}>{route.name}</Text>
            </View>
          );
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarShowLabel: false,
        headerShown: false, // Enlever les libellés par default de l'icone
        tabBarStyle: {
          // Styles de la barre tab
          height: 100,
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={Home}
      />
      <Tab.Screen
        name='Profil'
        component={Profil}
      />
      <Tab.Screen
        name='Gallery'
        component={Gallery}
      />
      <Tab.Screen
        name='Reduction'
        component={Reduction}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  //Chargement de la font dans le composant racine
  let [fontsLoaded] = useFonts({
    'DancingScript-Regular': require('./assets/fonts/DancingScript-Regular.ttf'),
    'Farsan-Regular': require('./assets/fonts/Farsan-Regular.ttf'),
    'Cabin-Bold': require('./assets/fonts/Cabin-Bold.ttf'),
    'Cabin-Regular': require('./assets/fonts/Cabin-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Login'
          component={Login}
        /> 
          <Stack.Screen
          name='TabNavigator'
          component={TabNavigator}
        />
        <Stack.Screen
          name='Scan'
          component={Scan}
        /> 
     </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',

    borderTopLeftRadius: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 5,

    marginTop: 25,

    backgroundColor: '#002C82',
  },
  // Style lors du focused
  activeIconContainer: {
    backgroundColor: '#06D6A0',
    borderWidth: 1,
    borderColor: '#002C82',
  },
  tab: {
    alignItems: 'center',
  },

  label: {
    color: '#002C82',
    fontSize: 10,
    fontFamily: 'Cabin-Regular',
  },
});
