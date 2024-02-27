import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
//Action lors de la navigation
import { useFocusEffect } from '@react-navigation/native';
//Redux
import { useSelector } from 'react-redux';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const FlagComponent = () => {
  //States
  const [flags, setFlags] = useState([]);

  //Redux
  const user = useSelector((state) => state.user.value);
  const userId = user._id;

  //Fonction pour accèder aux Flags des Airports d'ARRIVEE de l'ensemble des Flights du User
  async function fetchUserFlightAirports() {
    const response = await fetch(`${apiUrl}/airports/getUserFlightAirport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      console.error('Erreur lors de la récupération des données');
      return [];
    }
    const data = await response.json();
    return data.userFlightAirports.map(
      (flight) => flight?.arrivalAirport?.flag ?? 'Unknown'
    ); //Si chaque element de gauche est valide, j'accède au suivant
  }

  //Charge les Flags des Flights du User
  useFocusEffect(
    React.useCallback(() => {
      const fetchFlags = async () => {
        if (!user.flights) return; // Vérifie si le user a des flights
        try {
          const fetchedFlags = await fetchUserFlightAirports();
          setFlags([...new Set(fetchedFlags)]); //Permet d'éliminer les doublons
          console.log('Les Flags sont :', flags);
        } catch (error) {
          console.error('Erreur lors de la récupération des drapeaux :', error);
        }
      };
      fetchFlags();
    }, [user.flights])
  );

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.flagContainer}
    >
      {flags.map((flagUrl, index) => (
        <View
          key={index}
          style={styles.flagItem}
        >
          {flagUrl ? (
            <Image
              style={styles.flagImage}
              source={{ uri: flagUrl }}
            />
          ) : (
            <Text>No flags yet</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagItem: {
    marginRight: 10,
  },
  flagImage: {
    width: 30,
    height: 30,
  },
});

export default FlagComponent;
