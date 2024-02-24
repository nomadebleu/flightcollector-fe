import { StyleSheet, View, Dimensions } from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';

export default function FlightBlock() {
 
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
        <Marker
        coordinate={{latitude:37.7, longitude:-122.49}}/>
         <Marker
        coordinate={{latitude:38.7, longitude:-110.49}}/>
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
