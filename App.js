import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Home from "./screens/Home";
import Galery from "./screens/Galery";
import Reduction from "./screens/Reductions";
import Login from "./screens/Login";
import Scan from "./screens/Scan";
import Profil from "./screens/Profil";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profil") {
            iconName = "user";
          } else if (route.name === "Galery") {
            iconName = "image";
          } else if (route.name === "Reduction") {
            iconName = "tag";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2196f3",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Galery" component={Galery} />
      <Tab.Screen name="Reduction" component={Reduction} />
    </Tab.Navigator>
  );
};

export default function App() {
  //Chargement de la font dans le composant racine
  let [fontsLoaded] = useFonts({
    "DancingScript-Regular": require("./assets/fonts/DancingScript-Regular.ttf"),
    "Farsan-Regular": require("./assets/fonts/Farsan-Regular.ttf"),
    "Cabin-Bold": require("./assets/fonts/Cabin-Bold.ttf"),
    "Cabin-Regular": require("./assets/fonts/Cabin-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="tabNavigator" component={TabNavigator} />
        <Stack.Screen name="Scan" component={Scan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
