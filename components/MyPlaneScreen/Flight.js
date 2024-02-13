import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import MapView from 'react-native-maps';

export default function Flight() {
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
         <Text>Flight</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onglet: {
    backgroundColor: '#06D6A0',
    flex: 1,
  },
});
