import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Gradient
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <View>
      <LinearGradient
        colors={['rgba(128, 201, 255, 1)', 'rgba(1, 45, 131, 1)']}
        start={[0, 1]} //Début du dégradé suivant x,y
        end={[1, 0]} //Fin du dégradé
        style={styles.header}
      >
        <Text>Reductions</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  //Header
  header: {
    width: '100%',
    height: 100,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: 0,
  },
});
