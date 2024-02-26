import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
//Redux
import { useSelector } from "react-redux";
//Calcul distance
const { calculateDistance } = require("../../../module/Distance");

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function FlightBlock() {
  //Utilisation du Redux
  const flightRedux = useSelector((state) => state.flights.value);
  console.log("flightRedux in service :", flightRedux);

  // State local pour stocker les coordonnées des aéroports
  const [mapFlight, setMapFlight] = useState({
    latA: 0,
    latD: 0,
    longA: 0,
    longD: 0,
  });

  //useEffect pour charger les markers au lancement du screen
  useEffect(() => {
    handleFetchDataIataDep();
    handleFetchDataIataArr();
  }, []);

  //Calcul des points
  const pointsCercle = calculateDistance(
    mapFlight.latA,
    mapFlight.longA,
    mapFlight.latD,
    mapFlight.longD
  );
  console.log("pointsCercle:", pointsCercle);
  const points = Math.ceil(pointsCercle);
  console.log("points:", points);

  //Calcul delta longitude
  const deltaLongitude = Math.abs(mapFlight.longA - mapFlight.longD);
  const deltaLatitude = Math.abs(mapFlight.latA - mapFlight.latD);
  //Fetch des long et lat du flight en fonction des iataCode
  const handleFetchDataIataArr = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/flights/map/${flightRedux[0].iataArrival}`
      );
      const iataDataA = await response.json();

      if (iataDataA.result) {
        console.log(
          `IataDataArr: lat is ${iataDataA.data.latitude} and long is ${iataDataA.data.longitude}`
        );
        setMapFlight((prevState) => ({
          ...prevState,
          latA: iataDataA.data.latitude,
          longA: iataDataA.data.longitude,
        }));
      } else {
        console.error("Error during connection", iataDataA.error);
      }
    } catch (error) {
      console.error("Error during connection:", error);
    }
  };
  const handleFetchDataIataDep = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/flights/map/${flightRedux[0].iataDep}`
      );
      const iataDataD = await response.json();

      if (iataDataD.result) {
        console.log(
          `IataDataADep: lat is ${iataDataD.data.latitude} and long is ${iataDataD.data.longitude}`
        );
        setMapFlight((prevState) => ({
          ...prevState,
          latD: iataDataD.data.latitude,
          longD: iataDataD.data.longitude,
        }));
      } else {
        console.error("Error during connection", iataDataD.error);
      }
    } catch (error) {
      console.error("Error during connection:", error);
    }
  };

  //Fetch pour le calcul des points et l'affectation au vol
  const handleUpDatePoints = async () => {
    try {
      const response = await fetch(`${apiUrl}/flights/points`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightId: flightRedux[0]._id,
          pointsFlight: points,
        }),
      });
      const pointsData = await response.json();
      if (pointsData.result) {
        console.log("pointData:", pointsData.message);
      } else {
        console.error("Error during connection", pointsData.error);
      }
    } catch (error) {
      console.error("Error during connection:", error);
    }
  };
  handleUpDatePoints();
  return (
    <View style={styles.mapContainer}>
      <MapView
        region={{
          latitude: mapFlight.latD,
          longitude: mapFlight.longA,
          latitudeDelta: deltaLatitude,
          longitudeDelta: deltaLongitude,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{ latitude: mapFlight.latD, longitude: mapFlight.longD }}
        />
        <Marker
          coordinate={{ latitude: mapFlight.latA, longitude: mapFlight.longA }}
        />
        <Polyline
          coordinates={[
            { latitude: mapFlight.latA, longitude: mapFlight.longA },
            { latitude: mapFlight.latD, longitude: mapFlight.longD },
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={["#002C82"]}
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden", //Pour voir le radius
  },
  map: {
    flex: 1,
  },
});
