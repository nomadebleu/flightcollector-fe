import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import React from 'react';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Composant
import Header from '../components/shared/Header';

export default function GalleryScreen() {
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header title='Gallery'/>
      
      {/* Search/filter/favorite container */}
      <View style={styles.IconsContainer}>
        <FontAwesome
          name='filter'
          size={25}
          color='#002C82'
          style={styles.icon}
        />
        <FontAwesome
          name='star'
          size={25}
          color='#002C82'
          style={styles.icon}
        />
        <TextInput
          inlineImageLeft='search1'
          style={styles.text}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  IconsContainer: {
    margin: '3%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    width: 305,
    height: 25,

    borderWidth: 1,
    borderColor: '#002C82',

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 0, // Pour que le TextInput soit en dessous du texte du label
  },
});
