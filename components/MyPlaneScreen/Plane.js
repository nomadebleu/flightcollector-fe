import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Plane() {
  //Photo Provisoire
  const planeType = [
    { picture: "../../assets/planes/A220.jpg" },
    { picture: "../../assets/planes/A220.jpg" },
    { picture: "../../assets/planes/A220.jpg" },
    { picture: "../../assets/planes/A220.jpg" },
    { picture: "../../assets/planes/A220.jpg" },
    { picture: "../../assets/planes/A220.jpg" },
    { picture: "../../assets/planes/A220.jpg" },
  ];
  return (
    <View style={styles.onglet}>
      <Text style={styles.title}>REGISTRATION NUMBER</Text>
      <Text style={styles.item}>YRBAC</Text>
      <Text style={styles.title}>PLANE TYPE</Text>
      <Text style={styles.item}>A220</Text>
      <Text style={styles.title}>PLANE AGE</Text>
      <Text style={styles.item}>31</Text>
      <Text style={styles.title}>FIRST FLIGHT DATE</Text>
      <Text style={styles.item}>21-08-1993</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  onglet: {
    backgroundColor: "#75bbf4",
    flex: 1,
  },
  title: {
    fontFamily: "Cabin-Bold",
    color: "#002C82",
    paddingLeft: 20,
    paddingTop: 10,
  },
  item: {
    padding: 10,
    color: "#002C82",
    fontFamily: "Cabin-Regular",
    justifyContent: "center",
    width: "85%",
    marginLeft: 10,
  },
});
