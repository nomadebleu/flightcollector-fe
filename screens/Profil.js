import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
//Import de FontAwesome en React Native
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Profil() {
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(128, 201, 255, 1)', 'rgba(1, 45, 131, 1)']}
        start={[0, 1]} //Début du dégradé suivant x,y
        end={[1, 0]} //Fin du dégradé
        style={styles.header}
      ></LinearGradient>
      {/* Picture Profil */}
      <View style={styles.pictureProfil}></View>
      {/* Titles */}
      <Text style={styles.welcome}>Welcome back Anthony!</Text>
      {/* First Name */}
      <View style={styles.inputs}>
        <View style={styles.containerInput}>
          <Text style={styles.legend}> FIRST NAME</Text>
          <TextInput style={styles.text}></TextInput>
        </View>
      </View>
      {/* Last Name */}
      <View style={styles.inputs}>
        <View style={styles.containerInput}>
          <Text style={styles.legend}> LAST NAME</Text>
          <TextInput style={styles.text}></TextInput>
        </View>
      </View>

      {/* Inputs */}
      <View style={styles.inputs}>
        {/* Email address */}
        <View style={styles.containerInput}>
          <Text style={styles.legend}> Email address</Text>
          <TextInput style={styles.text}></TextInput>
        </View>

        {/* Password */}
        <View style={styles.containerInput}>
          <Text style={styles.legend}> Password</Text>
          <TextInput style={styles.text}></TextInput>
        </View>
        {/* Change your password */}
        <TouchableOpacity>
          <Text style={styles.forgotten}>Change your password?</Text>
        </TouchableOpacity>
      </View>

      {/* Mini Flights */}
      <View style={styles.containerMiniInput}>
        <TextInput style={styles.miniInput}>
          <FontAwesome
            name='star'
            size={25}
          />{' '}
          starred flights
        </TextInput>
        <TextInput style={styles.miniInput}>
          <FontAwesome
            name='map-marker'
            size={25}
          />{' '}
          place visited
        </TextInput>
        <TextInput style={styles.miniInput}>
          <FontAwesome
            name='plane'
            size={25}
          />{' '}
          Badges
        </TextInput>
        <TextInput style={styles.miniInput}>
          <FontAwesome
            name='plane'
            size={25}
          />{' '}
          Aircrafts saved
        </TextInput>
      </View>

      {/* Places I've visited */}
      <View style={styles.containerInput}>
          <Text style={styles.legend2}> PLACES I'VE VISITED</Text>
          <TextInput style={styles.text}></TextInput>
        </View>
        {/* My badges */}
        <View style={styles.containerInput}>
          <Text style={styles.legend2}>MY BADGES</Text>
          <TextInput style={styles.text}></TextInput>
        </View>
        {/* TOTAL POINTS */}
        <View style={styles.containerInput}>
          <Text style={styles.legend2}>TOTAL POINTS</Text>
          <TextInput style={styles.text}></TextInput>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Inputs
  body:{
    alignItems:'center',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 15,

    backgroundColor: '#F1F1F1',
    paddingHorizontal: 5,

    fontFamily: 'Cabin-Regular',
    fontSize:12,
    color: '#002C82',
    zIndex: 1, // Pour que la legend soit au-dessus du TextInput
  },
  legend2: {
    position: 'absolute',
    top: 2,
    left: 2,

    backgroundColor: '#F1F1F1',
    paddingHorizontal: 5,

    fontFamily: 'Cabin-Regular',
    fontSize:12,
    color: '#002C82',
    zIndex: 1, // Pour que la legend soit au-dessus du TextInput
  },
  text: {
    width: 345,
    height: 45,

    borderWidth: 1,
    borderColor: '#002C82',

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 0, // Pour que le TextInput soit en dessous du texte du label
  },
  containerInput: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  //Forgotten
  forgotten: {
    fontFamily: 'Farsan-Regular',
    fontSize: 15,
    color: '#002C82',

    position: 'absolute', //pour éviter qui gêne la répartition des 3 boutons
    marginTop: 10,
    marginLeft: 20,
  },
  //Titles
  welcome: {
    fontFamily: 'Farsan-Regular',
    fontSize: 32,
    color: '#002C82',
  },
  //Profil Picture
  pictureProfil: {
    width: 100,
    height: 100,

    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#002C82',
    backgroundColor: 'red',
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
  //MiniInputs
  containerMiniInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  miniInput: {
    width: '40%',
    height: 45,

    textAlign: 'center',
    textAlignVertical:'center',

    margin: 10,
    borderWidth: 1,
    borderColor: '#002C82',
    backgroundColor: '#80C9FF',
    borderRadius: 5,

    fontFamily: 'Farsan-Regular',
    fontSize: 20,
    color: '#002C82',
  },
});
