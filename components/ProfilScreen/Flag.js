import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import { useSelector } from 'react-redux'; // 

const FlagComponent = () => {
  const [flags, setFlags] = useState([]);
  const user = useSelector((state) => state.user.value);
  const urlBE = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const fetchedFlags = [];
        for (const flight of user.flights) { 
          const flag = await getFlagByArrivalPlace(flight.arrivalPlace); 
          fetchedFlags.push(flag);
        }
        setFlags(fetchedFlags);
      } catch (error) {
        console.error('Erreur lors de la récupération des drapeaux:', error);
        // Gérer l'erreur
      }
    };
    if (user.flights && user.flights.length > 0) {
      fetchFlags();
    }
  }, [user.flights]);



  async function getFlagByArrivalPlace(arrivalPlace) {
    try {
      const response = await fetch(`${urlBE}/airport/getFlagByArrivalPlace`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ arrivalPlace })
      });
      const data = await response.json();
      return data.flag;
    } catch (error) {
      console.error('Erreur lors de la récupération du drapeau:', error);
      // Gérer l'erreur
    }
  }

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
