import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MapView from "react-native-maps";

export default function Flight() {
  return (
    <View style={styles.onglet}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          // initialRegion={{
          //   latitude: 37.78825,
          //   longitude: -122.4324,
          //   latitudeDelta: 0.0,
          //   longitudeDelta: 0.01,
          // }}
        />
        <View style={styles.info}>
          <View style={styles.dep}>
            <Text style={styles.title}>DEPARTURE</Text>
            <Text style={styles.item}>Scheduled 10:00AM</Text>
            <Text style={styles.item}>Actual 10:20AM</Text>
          </View>
          <View style={styles.arr}>
            <Text style={styles.title}>ARRIVAL</Text>
            <Text style={styles.item}>Scheduled 19:40PM</Text>
            <Text style={styles.item}>Estimated 20:00PM</Text>
          </View>
        </View>
      </View>
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
    padding: 3,
    paddingLeft: 10,
    color: "#002C82",
    fontFamily: "Cabin-Regular",
    justifyContent: "center",
    width: "100%",
    margin: 2,
    color: "#e1e5f2",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
});
