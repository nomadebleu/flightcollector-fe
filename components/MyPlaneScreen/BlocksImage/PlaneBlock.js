import { StyleSheet, Image, View } from 'react-native';
import React from 'react';

export default function PlaneBlock() {
  return (
    <View style={styles.planeContainer}>
      <Image
        source={require('../../../assets/planes/A220.jpg')}
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
