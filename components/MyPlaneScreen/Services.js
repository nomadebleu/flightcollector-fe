import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
//Composants
import ListInput from './ListInput';
//Redux
import { useSelector } from "react-redux";

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Services() {
  //States
  const [dataMovies, setDataMovies] = useState([]);
 
  //Utilisation du Redux
  const flightRedux = useSelector((state) => state.flights.value);

  // Chargement des movies
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${apiUrl}/flights/movies`);
      const data = await response.json();
      if (!data || !data.movies) {
        console.log('No movies');
        return;
      }
      setDataMovies(data.movies);
    } catch (error) {
      console.error('Error during Fetch:', error);
    }
  };

  return (
    <View style={styles.onglet}>
      
      <View style={styles.otherService}>
        <Text style={styles.title2}>YOUR MEALS</Text>
        <TextInput
          style={styles.input}
          value={flightRedux[0].meals}
          editable={false}
        />
      </View>

      <View style={styles.movie}>
        <Text style={styles.title}>YOUR MOVIES</Text>
        <ListInput movies={dataMovies} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onglet: {
    backgroundColor: '#75bbf4',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
    paddingLeft: 20,
    paddingTop: 10,
  },
  title2: {
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
    paddingLeft: 20,
  },
  input: {
    
    width: 190,
    height: 30,
    borderWidth: 1,
    borderColor: '#002C82',
    borderRadius: 6,
   
    margin: 10,
  },
  otherService: {
    width: '95%',
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
 
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#002C82',

  },
  movie: {
    width: '95%',
    height: '60%',

  },
});
