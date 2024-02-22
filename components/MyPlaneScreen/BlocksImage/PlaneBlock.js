import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
//Redux
import { useSelector } from 'react-redux';

export default function PlaneBlock() {

  //Utilisation du Redux
  const flightRedux = useSelector((state) => state.flights.value);

  //L'image du flight
  const picture = flightRedux[0].planes.picture;

  return (
    <View style={styles.planeContainer}>
      <Image
        source={{ uri: picture }}
        style={styles.plane}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  planeContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
    borderRadius: 10,
    overflow: 'hidden', //Pour voir le radius
  },
  plane: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
