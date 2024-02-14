import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Entypo } from 'react-native-vector-icons';
//Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
//Navigation
import { useNavigation } from "@react-navigation/native";
//Composants
import Header from '../components/shared/Header';
import SignUpModal from '../components/LoginScreen/SignUpModal';

export default function HomeScreen() {

  //Utilisation du Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  //Gestion Navigation
  const navigation = useNavigation();

  //Gestion LogOut
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  //Gestion du Scan Aicraft
  const handleScan = () => {
    navigation.navigate("Scan");
  };
  //Gestion du Boarding Pass
  const handlePass = () => {
    navigation.navigate("Pass");
  };

  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header />
      {/* Logout */}
      {user.isConnected ? (
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Entypo name="log-out" size={30} color="#F1F1F1" />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      {/* Logo & titles*/}
      <View style={styles.containerImage}>
        <Image
          source={require("../assets/Flight Collector Logo.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Hi Collector!</Text>
        <Text style={styles.title}>Are you ready to take off?</Text>
      </View>

      {/* Scan Aircraft & scan BoardingPass */}
      <View style={styles.containerScans}>
        <ImageBackground
          source={require("../assets/trajetsAvion.png")}
          style={styles.imageBack}
        >
          {/* Scan Aircraft */}
          <View style={styles.scan}>
            <View style={styles.icones}>
              <Text style={styles.label}>Scan Aircraft</Text>
              <FontAwesome
                name='camera'
                size={30}
                color='#80C9FF'
                onPress={() => handleScan()}
              />
            </View>
          </View>
          {/*Scan Boarding Pass */}
          <View style={styles.scan}>
            <View style={styles.icones}>
              <Text style={styles.label}>Scan Boarding Pass</Text>
              <FontAwesome
                name='camera'
                size={30}
                color='#002C82'
                onPress={() => handlePass()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      {!user.isConnected ? (
        <View style={styles.createAccount}>
          <Text style={styles.title}>Create an account</Text>
          <SignUpModal />
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
  },
  //Logo Flight Collector & titles
  containerImage: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1, //car sinon il cache le logout et celui ci ne fonctionne pas
  },
  image: {
    width: "80%",
    height: "50%",
    marginTop: 50,
  },
  title: {
    fontFamily: "Farsan-Regular",
    fontSize: 28,
    color: "#002C82",
    fontWeight: "bold",
    marginBottom: "3%",
  },
  //Scans
  containerScans: {
    width: 370,
    height: 190,

    overflow: "hidden", //pour voir le border radius
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#002C82",
  },
  imageBack: {
    width: "100%",
    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: 'Cabin-Regular',
    color: '#002C82',
    fontSize: 20,
  },
  label: {
    fontFamily: 'Cabin-Regular',
    color: '#002C82',
    fontSize: 20,
  },
  //Inputs
  scan: {
    margin:10,
  },
  input: {
    width: 250,
    backgroundColor: "#F1F1F1",
  },
  icones: {
    width: 300,
    height: 55,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: "#002C82",
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F1F1F1',
  },
  //LogOut
  logout: {
    width: 50,
    height: 50,

    position: "absolute",
    top: 50,
    right: 2,
  },
  //Create Account
  createAccount: {
    width: "100%",
    height: "20%",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 20,
  },
  signup: {
    width: 200,
  },
});
