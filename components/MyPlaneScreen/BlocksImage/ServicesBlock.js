import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';


export default function ServicesBlock(props) {
    
  return (
    <>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${props.movie.poster}` }}
      />

      <View style={styles.movieContainer}>
        <ScrollView
          style={styles.titleContainer}
          horizontal={true}
        >
          <Text style={styles.titleText}>{props.movie.title}</Text>
        </ScrollView>
        <ScrollView style={styles.descContainer}>
          <Text style={styles.descText}>{props.movie.description}</Text>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    width: '60%',
    height: '100%',

    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: '#002C82',

    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  poster: {
    width: '40%',
    height: '100%',

    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  descContainer: {
    width: '100%',
    height: '70%',

    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  descText: {
    fontFamily: 'Cabin-Regular',
    color: '#002C82',
    textAlign: 'center',
  },
  titleContainer: {
    width: '100%',
    height: '30%',

    borderColor: '#002C82',
    borderBottomWidth: 1,

    borderTopRightRadius: 10,
    borderBottomRightRadius: 50,
  },
  titleText: {
    fontFamily: 'Farsan-Regular',
    fontSize: 25,
    color: '#002C82',

    paddingTop: 10,
    paddingLeft: 10,
  },
});
