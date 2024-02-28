import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import SeatMapModal from "./SeatMapModal/SeatMapModal";
//Redux
import { useSelector } from "react-redux";

export default function Plane() {
  //Utilisation du Redux
  const flightRedux = useSelector((state) => state.flights.value);

  //Les infos du flight
  const immatriculation = flightRedux[0].planes?.immatriculation;
  const plane = flightRedux[0].planes.type;
  const airline = flightRedux[0].planes.compagnie;
  const age = flightRedux[0].planes.age;

  return (
    <View style={styles.onglet}>
      <View style={styles.info}>
        <View style={styles.dep}>
          <Text style={styles.title}>IMMATRICULATION AIRCRAFT</Text>
          <Text style={styles.item}>{immatriculation}</Text>
          <Text style={styles.title}>PLANE TYPE</Text>
          <Text style={styles.item}>{plane}</Text>
        </View>
        <View style={styles.arr}>
          <Text style={styles.title}>AIRLINE</Text>
          <Text style={styles.item}>{airline}</Text>
          <Text style={styles.title}>AIRCRAFT AGE</Text>
          <Text style={styles.item}>{age}</Text>
        </View>
      </View>
      <View style={styles.btnModal}>
        {/* SEAT MAP MODAL */}
        <SeatMapModal />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onglet: {
    flex: 1,
    backgroundColor: "#75bbf4",
    padding: 5,
    paddingBottom: 25,
  },
  title: {
    fontFamily: "Cabin-Bold",
    color: "#002C82",
    paddingLeft: 10,
    paddingTop: 10,
  },
  item: {
    padding: 5,
    color: "#002C82",
    fontFamily: "Cabin-Regular",
    justifyContent: "center",
    width: "85%",
    marginLeft: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "80%",
  },
  dep: {
    width: "50%",
    height: "80%",
  },
  arr: {
    width: "50",
    height: "80%",
  },
  btModal: {
    alignItems: "flex-end",
    width: "60%",
    height: "10%",
    backgroundColor: "#002C82",
    borderRadius: 10,
    color: "#ffffff",
    textAlign: "center",
    paddingEnd: 20,
  },
});
