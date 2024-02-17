import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';


export default function FlightBlock() {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        // initialRegion={{
        //   // latitude: 37.78825,
        //   // longitude: -122.4324,
        //   latitudeDelta: 1,
        //   longitudeDelta: 1,
        // }}
      />
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
