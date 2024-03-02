import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgressBar from "react-native-progress/Bar";

import MapView from "react-native-maps";
//Composants
//Redux
import { useSelector } from "react-redux";

export default function Flight() {
  //Utilisation du Redux
  const flightRedux = useSelector((state) => state.flights.value);

  //Conversion des heures
  const timeDScheduled = flightRedux[0].departureScheduled; //Departure Scheduled
  const departureScheduled = new Date(timeDScheduled);
  const timeDepartureScheduled = departureScheduled.toLocaleTimeString(
    "en-US",
    { hour12: true, hour: "numeric", minute: "2-digit" }
  );
  console.log("timeDepartureScheduled is:", timeDepartureScheduled);

  const timeDEstimated = flightRedux[0].departureEstimated; //Departure Estimated
  const departureEstimated = new Date(timeDEstimated);
  const timeDepartureEstimated = departureEstimated.toLocaleTimeString(
    "en-US",
    { hour12: true, hour: "numeric", minute: "2-digit" }
  );
  console.log("timeDepartureEstimated is:", timeDepartureEstimated);

  const timeAScheduled = flightRedux[0].arrivalScheduled; //Arrival Scheduled
  const arrivalScheduled = new Date(timeAScheduled);
  const timeArrivalScheduled = arrivalScheduled.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });
  console.log("timeArrivalScheduled is:", timeArrivalScheduled);

  const timeAEstimated = flightRedux[0].arrivalEstimated; //Arrival Estimated
  const arrivalEstimated = new Date(timeAEstimated);
  const timeArrivalEstimated = arrivalEstimated.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });
  console.log("timeArrivalEstimated is:", timeArrivalEstimated);

  return (
    <View style={styles.onglet}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0,
            longitudeDelta: 0.01,
          }}
        />
        <View style={styles.info}>
          <View style={styles.dep}>
            <Text style={styles.title}>DEPARTURE</Text>
            <Text style={styles.item}>Scheduled {timeDepartureScheduled}</Text>
            <Text style={styles.item}>Estimated {timeDepartureEstimated}</Text>
          </View>
          <View style={styles.arr}>
            <Text style={styles.title}>ARRIVAL</Text>
            <Text style={styles.item}>Scheduled {timeArrivalScheduled}</Text>
            <Text style={styles.item}>Estimated {timeArrivalEstimated}</Text>
          </View>
        </View>
        {/*<View style={styles.progressBar}></View>*/}
        <ProgressBar progress={0.5} width={300} style={styles.bar} />
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
  progressBar: {
    height: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
  bar: {
    justifyContent: "center",
    borderColor: "#000",
    marginStart: 35,
    color: "#f8c555",
  },
});
