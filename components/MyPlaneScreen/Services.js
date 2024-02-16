import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
//Composants
import ListInput from './ListInput';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Services(props) {
  //States
  const [resetList, setResetList] = useState(false);
  const [dataMovies, setDataMovies] = useState([]);



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

  //Mise à jour
  useEffect(() => {
    console.log('Ma selection de movies :', dataMovies);
  }, [dataMovies]);

  return (
    <View style={styles.onglet}>
      <Text style={styles.title}>YOUR MOVIES</Text>
      <ListInput
        resetList={resetList}
        movies={dataMovies}
      />
      {/* <Text style={styles.title}>YOUR MEALS</Text>
     <ListInput resetList={resetList}/>
     <Text style={styles.title}>YOUR MOVIES</Text>
     <ListInput resetList={resetList}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  onglet: {
    backgroundColor: '#75bbf4',
    flex: 1,
  },
  title: {
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
    paddingLeft: 20,
    paddingTop: 10,
  },
});
