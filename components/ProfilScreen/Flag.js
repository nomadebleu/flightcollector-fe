import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const FlagComponent = () => {
  const [flags, setFlags] = useState([]);
  const user = useSelector((state) => state.user.value);
  const userId = user._id;

  const urlBE = process.env.EXPO_PUBLIC_API_URL;

  async function fetchUserFlightAirports() {
    try {
      const response = await fetch(`${urlBE}/airports/getUserFlightAirport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      const airportFlags = data.userFlightAirports.map(flight => flight?.arrivalAirport?.flag ?? "Unknown");
      return airportFlags;

    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des vols de l\'utilisateur :', error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }

  // useEffect(() => {
  //   const fetchFlags = async () => {
  //     try {
  //       const fetchedFlags = await fetchUserFlightAirports();
  //       setFlags([...new Set(fetchedFlags)]);
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des drapeaux :', error);
  //       // Gérer l'erreur
  //     }
  //   };

  //   if (user.flights && user.flights.length > 0) {
  //     fetchFlags();
  //   }
  // }, [user.flights]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFlags = async () => {
        try {
          const fetchedFlags = await fetchUserFlightAirports();
          setFlags([...new Set(fetchedFlags)]);
          console.log(flags)
        } catch (error) {
          console.error('Erreur lors de la récupération des drapeaux :', error);
          // Gérer l'erreur
        }
      };
  
      if (user.flights ) {
        fetchFlags();
      }
    }, [user.flights])
  );
  

  return (
    <ScrollView horizontal contentContainerStyle={styles.flagContainer}>
      {flags.map((flagUrl, index) => (
        <View key={index} style={styles.flagItem}>
          {flagUrl ? (
            <Image
              style={styles.flagImage}
              source={{ uri: flagUrl }}
            />
          ) : (
            <Text>Drapeau non disponible</Text>
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
