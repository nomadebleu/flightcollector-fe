import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
//Redux
import { useSelector } from 'react-redux';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function FlightBlock() {
  //Utilisation du Redux
  const flightRedux = useSelector((state) => state.flights.value);
  console.log('flightRedux in service :',flightRedux);

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
       setMapFlight(prevState => ({
          ...prevState,
          latA: iataDataA.data.latitude,
          longA: iataDataA.data.longitude
        }));
      } else {
        console.error('Error during connection', iataDataA.error);
      }
    } catch (error) {
      console.error('Error during connection:', error);
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
        setMapFlight(prevState => ({
          ...prevState,
          latD: iataDataD.data.latitude,
          longD: iataDataD.data.longitude
        }));
      } else {
        console.error('Error during connection', iataDataD.error);
      }
    } catch (error) {
      console.error('Error during connection:', error);
    }
  };
  return (
  <View  /*style={styles.mapContainer}*/>
      <MapView
          region={{
           latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
      >
        <Marker coordinate={{ latitude: mapFlight.latD, longitude: mapFlight.longD }} />
        <Marker coordinate={{ latitude: mapFlight.latA, longitude: mapFlight.longA }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden', //Pour voir le radius
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
