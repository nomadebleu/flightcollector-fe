import { StyleSheet, Text, View } from "react-native";
import React from "react";
//Redux
import { useSelector } from "react-redux";

export default function Plane() {
    //Utilisation du Redux
    const flightRedux = useSelector((state) => state.flights.value);

    //Les infos du flight
    const immatriculation = flightRedux[0].planes.immatriculation;
    const plane = flightRedux[0].planes.type;
    const airline = flightRedux[0].planes.compagnie;
    const age = flightRedux[0].planes.age;

  return (
    <View style={styles.onglet}>
      <Text style={styles.title}>IMMATRICULATION AIRCRAFT</Text>
      <Text style={styles.item}>{immatriculation}</Text>
      <Text style={styles.title}>PLANE TYPE</Text>
      <Text style={styles.item}>{plane}</Text>
      <Text style={styles.title}>AIRLINE</Text>
      <Text style={styles.item}>{airline}</Text>
      <Text style={styles.title}>AIRCRAFT AGE</Text>
      <Text style={styles.item}>{age}</Text>
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
