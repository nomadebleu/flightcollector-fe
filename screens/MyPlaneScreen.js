import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
//Composants
import Header from '../components/shared/Header';
import MapView from 'react-native-maps';
import BadgeModal from '../components/MyPlaneScreen/BadgeModal';

export default function MyPlaneScreen() {
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header title='My Plane' />

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
      </View>

      {/* Modal Badges */}
      <BadgeModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    width: '70%',
    height: '20%',
    borderRadius:12,
    overflow: 'hidden', //Pour voir le radius
    marginTop:100,
  },
  map: {
    flex: 1,
  },
});
