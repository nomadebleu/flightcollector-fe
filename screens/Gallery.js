import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import React from 'react';
//Gradient
import { LinearGradient } from 'expo-linear-gradient';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Gallery() {
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(128, 201, 255, 1)', 'rgba(1, 45, 131, 1)']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.header}
      >
        <Text style={styles.title}>Gallery</Text>
      </LinearGradient>
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

  //Header
  header: {
    width: '100%',
    height: 100,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: 0,
  },
  title: {
    fontFamily: 'Farsan-Regular',
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
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
