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
import React from "react";

export default function Home() {
  return (
    <SafeAreaView style={styles.body}>
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
          <View style={styles.containerInput}>
            <Text style={styles.legend}> Scan Aircraft</Text>
            <TextInput style={styles.text}></TextInput>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.legend}> Scan Boarding Pass</Text>
            <TextInput style={styles.text}></TextInput>
          </View>
        </ImageBackground>
      </View>
      {/* USE WITHOUT ACCOUNT */}
      <View style={styles.containerSignIn}>
        <Text style={styles.title}>Create an account</Text>
        <TouchableOpacity
          onPress={() => handleSignUp()}
          style={styles.buttonSignIn}
          activeOpacity={0.8}
        >
          <Text style={styles.textBtnSignIn}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  title: {
    fontFamily: "Farsan-Regular",
    fontSize: 28,
    color: "#002C82",
    fontWeight: "bold",
    marginBottom: "5%",
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
    height: "40%",
    padding: "5%",
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
    borderWidth: "2px solid",
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
});
