import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//Gradient
import { LinearGradient } from 'expo-linear-gradient';

export default function Header(props) {
  return (
    <View style={styles.containerHeader}>
      <LinearGradient
        colors={['rgba(128, 201, 255, 1)', 'rgba(1, 45, 131, 1)']}
        start={[0, 1]} //Début du dégradé suivant x,y
        end={[1, 0]} //Fin du dégradé
        style={styles.header}
      >
        <Text style={styles.title}>{props.title}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end', // Centrer verticalement
    alignItems: 'center',
    paddingBottom:10,
  },
  containerHeader: {
    width: '100%',
    height: 100,

    position: 'absolute',
    top: 0,
    borderBottomWidth: 5,
    borderBottomColor: '#002C82',
  },
  title: {
    fontFamily: 'Farsan-Regular',
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
  },
});
