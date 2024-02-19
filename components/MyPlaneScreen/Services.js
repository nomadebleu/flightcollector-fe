import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
//Composants
import ListInput from './ListInput';
import FormInput from '../../components/shared/FormInput';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Services() {
  //States
  const [dataMovies, setDataMovies] = useState([]);
  const [meals, setMeals] = useState('');

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
        <Text style={styles.title}>YOUR SEAT</Text>
        <TextInput
          style={styles.input}
          value={meals}
          onChangeText={(value) => setMeals(value)}
          editable={false}
        />
      </View>
      <View style={styles.otherService}>
        <Text style={styles.title}>YOUR MEALS</Text>
        <TextInput
          style={styles.input}
          value={meals}
          onChangeText={(value) => setMeals(value)}
          editable={false}
        />
      </View>

      <Text style={styles.title}>YOUR MOVIES</Text>
      <ListInput movies={dataMovies} />
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
  input: {
    flex: 1,
    width: 350,
    height: 10,
    borderWidth: 1,
    borderColor: '#002C82',
    borderRadius: 6,

    margin: 10,
  },
  otherService:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'pink'
  }
});
