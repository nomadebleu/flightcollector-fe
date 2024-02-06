import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Galery() {
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <LinearGradient
        colors={["#80C9FF", "#012D83"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.header}
      >
        <Text style={styles.title}>Gallery</Text>
      </LinearGradient>
      {/* Search/filter/favorite container */}
      <View style={styles.IconsContainer}>
        <FontAwesome
          name="filter"
          size={25}
          color="#002C82"
          style={styles.icon}
        />
        <FontAwesome
          name="star"
          size={25}
          color="#002C82"
          style={styles.icon}
        />
        <TextInput inlineImageLeft="search1" style={styles.text} />
      </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Farsan-Regular",
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
  },
  IconsContainer: {
    margin: "3%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    width: 305,
    height: 25,

    borderWidth: 1,
    borderColor: "#002C82",

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 0, // Pour que le TextInput soit en dessous du texte du label
  },
});
