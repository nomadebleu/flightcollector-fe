import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Plane() {
  return (
    <View style={styles.onglet}>
      <Text>Plane</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  onglet: {
    backgroundColor: '#06D6A0',
    flex: 1,
  },
});
