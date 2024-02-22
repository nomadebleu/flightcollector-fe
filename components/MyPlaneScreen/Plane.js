import { StyleSheet, Text, View } from "react-native";
import React from "react";
//Redux
import { useSelector } from "react-redux";

export default function Plane() {
  //Utilisation du Redux
  const flightRedux = useSelector((state) => state.flights.value);

  //Les infos du flight
  const registrationNumber = flightRedux[0].registrationNumber;
  const plane = flightRedux[0].plane;
  const airline = flightRedux[0].airline;

  //Photo Provisoire
  const planeType = [
    { picture: "../../assets/planes/A220.jpg" },
    { picture: "../../assets/planes/A320.jpg" },
    { picture: "../../assets/planes/A321.jpg" },
    { picture: "../../assets/planes/A350.jpg" },
    { picture: "../../assets/planes/A380.jpg" },
    { picture: "../../assets/planes/B747.jpg" },
    { picture: "../../assets/planes/B777.jpg" },
  ];
  return (
    <View style={styles.onglet}>
      <Text style={styles.title}>REGISTRATION NUMBER</Text>
      <Text style={styles.item}>{registrationNumber}</Text>
      <Text style={styles.title}>PLANE TYPE</Text>
      <Text style={styles.item}>{plane}</Text>
      <Text style={styles.title}>AIRLINE</Text>
      <Text style={styles.item}>{airline}</Text>
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
