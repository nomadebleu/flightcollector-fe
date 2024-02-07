import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React from "react";

export default function Login({ navigation }) {
  const handleSignUp = () => {
    navigation.navigate('ProfilSignUp');//Pour arriver au screen ProfilSignUp
  };

  return (
    <SafeAreaView style={styles.body}>
      <Image
        source={require("../assets/GlobeTrajets.png")}
        style={styles.image}
      />
      <View style={styles.containerTitle}>
        {/* Titles */}
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.flight}>Flight Collector</Text>
      </View>

      {/* Email address */}
      <View style={styles.inputs}>
        <View style={styles.containerInput}>
          <Text style={styles.legend}> Email address</Text>
          <TextInput style={styles.text}></TextInput>
        </View>

        {/* Password */}
        <View style={styles.containerInput}>
          <Text style={styles.legend}> Password</Text>
          <TextInput style={styles.text}></TextInput>
        </View>
      </View>

      <View style={styles.containerButton}>
        {/* SIGN IN & forgottenpassword */}
        <View>
          <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}>
            <Text style={styles.textBtnSignIn}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotten}>Forgotten password?</Text>
          </TouchableOpacity>
        </View>

        {/* SIGN UP */}
        <View>
          <TouchableOpacity
            onPress={() => handleSignUp()}
            style={styles.buttonSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.textBtnSignUp}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        {/* USE WITHOUT ACCOUNT */}
        <View>
          <TouchableOpacity style={styles.buttonWithout} activeOpacity={0.8}>
            <Text style={styles.textBtnWithout}>USE WITHOUT ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Image */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#F1F1F1",
  },
  // Inputs
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
  containerInput: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  //Buttons
  textBtnSignUp: {
    color: "#80C9FF",
    fontFamily: "Cabin-Bold",
    letterSpacing: 5,
    fontSize: 20,
  },
  buttonSignUp: {
    width: 345,
    height: 55,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    backgroundColor: "#002C82",
    borderColor: "#80C9FF",
    borderWidth: "2px solid",
  },
  textBtnSignIn: {
    color: "#002C82",
    fontFamily: "Cabin-Bold",
    letterSpacing: 5,
    fontSize: 20,
  },
  buttonSignIn: {
    width: 345,
    height: 55,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    backgroundColor: "#80C9FF",
    borderColor: "#002C82",
    borderWidth: "2px solid",
  },
  textBtnWithout: {
    color: "#80C9FF",
    fontFamily: "Cabin-Bold",
    letterSpacing: 5,
    fontSize: 20,
  },
  buttonWithout: {
    width: 345,
    height: 55,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#80C9FF",
    borderWidth:2,
  },
  //Forgotten
  forgotten: {
    fontFamily: "Farsan-Regular",
    fontSize: 15,
    color: "#002C82",

    position: "absolute", //pour éviter qui gêne la répartition des 3 boutons
    marginTop: 10,
    marginLeft: 20,
  },
  //Titles
  welcome: {
    fontFamily: "Farsan-Regular",
    fontSize: 48,
    color: "#002C82",
  },
  flight: {
    fontFamily: "DancingScript-Regular",
    fontSize: 48,
    color: "#002C82",
  },
  //Image
  image: {
    width: "100%",
    height: "25%",
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },
  //Agencement des blocs
  containerButton: {
    width: "100%",
    height: "45%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  containerTitle: {
    width: "100%",
    height: "20%",

    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputs: {
    width: "100%",
    height: "25%",

    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
