import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "react-native-vector-icons";
//Gradient
import { LinearGradient } from "expo-linear-gradient";
//Icones
import FontAwesome from "react-native-vector-icons/FontAwesome";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";

export default function Home({ navigation }) {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const isLogged = user.isConnected;
  console.log(isLogged);
  //Gestion Scan
  const handleScan = () => {
    navigation.navigate("Scan"); //Navigation vers Scan
  };
  //Gestion LogOut
  const handleLogOut = () => {
    dispatch(logout());
    navigation.navigate("Login"); //Navigation vers Login
  };
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <LinearGradient
        colors={["rgba(128, 201, 255, 1)", "rgba(1, 45, 131, 1)"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.header}
      ></LinearGradient>
      {/* Log Out */}
      <TouchableOpacity
        style={styles.containerHeader}
        onPress={() => handleLogOut()}
      >
        <Entypo
          style={styles.logout}
          name="log-out"
          size={25}
          color="#F1F1F1"
        />
      </TouchableOpacity>
      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.image} />
      {/* Titles */}
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Hi Collector!</Text>
        <Text style={styles.title}>Are you ready to take off?</Text>
      </View>
      {/* Container Inputs: Scan Aircraft & scan BoardingPass */}
      <View style={styles.inputs}>
        <ImageBackground
          source={require("../assets/trajetsAvion.png")}
          resizeMode="cover"
          style={styles.imageBack}
        >
          {/* Input Scan Aircraft */}
          <View style={styles.containerInput}>
            <Text style={styles.legend}> Scan Aircraft</Text>
            <View style={styles.inputIcon}>
              <TextInput style={styles.text}></TextInput>
              <FontAwesome
                name="camera"
                size={25}
                color="#002C82"
                style={styles.camIcon}
                onPress={() => handleScan()}
              />
            </View>
          </View>
          {/* Input Scan Boarding Pass */}
          <View style={styles.containerInput}>
            <Text style={styles.legend}> Scan Boarding Pass</Text>
            <View style={styles.inputIcon}>
              <TextInput style={styles.text}></TextInput>
              <FontAwesome
                name="camera"
                size={25}
                color="#002C82"
                style={styles.camIcon}
                onPress={() => handleScan()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* USE WITHOUT ACCOUNT */}
      {!isLogged && (
        <View style={styles.containerSignIn}>
          <Text style={styles.title}>Create an account</Text>
          <TouchableOpacity
            onPress={() => handleSignUp()}
            style={styles.buttonSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.textBtnSignIn}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: "10%",
  },
  title: {
    fontFamily: "Farsan-Regular",
    fontSize: 28,
    color: "#002C82",
    fontWeight: "bold",
    marginBottom: "3%",
  },
  containerTitle: {
    width: "100%",
    height: "10%",
    marginTop: -30,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: "37%",
    marginTop: -45,
  },
  imageBack: {
    width: "98%",
    height: "100%",
  },
  containerInput: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    position: "relative",
  },
  inputContainer: {
    background: "#002C82",
    width: "100%",
    height: "50%",
  },
  legend: {
    position: "absolute",
    top: -10,
    left: 35,
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 5,
    fontFamily: "Cabin-Regular",
    color: "#002C82",
    zIndex: 1, // Pour que la legend soit au-dessus du TextInput
  },
  text: {
    width: 345,
    height: 55,

    borderWidth: 1,
    borderColor: "#002C82",

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 0, // Pour que le TextInput soit en dessous du texte du label
  },
  buttonSignIn: {
    width: 345,
    height: 55,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    backgroundColor: "#002C82",
    borderColor: "#80C9FF",
    borderWidth: 2,
  },
  inputs: {
    width: "100%",
    height: "25%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textBtnSignIn: {
    color: "#80C9FF",
    fontFamily: "Cabin-Bold",
    letterSpacing: 5,
    fontSize: 20,
  },
  containerSignIn: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  camIcon: {
    padding: 10,
  },
  //Header
  header: {
    width: "100%",
    height: 100,

    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    top: 0,
  },
  //LogOut
  logout: {
    width: 50,
    height: 50,

    position: "absolute",
    right: 2,
    alignItems: "center",
  },
  containerHeader: {
    width: "100%",
    height: 100,

    flexDirection: "row",
    justifyContent: "center",
  },
});
