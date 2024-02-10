import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Entypo } from 'react-native-vector-icons';
import { AntDesign } from '@expo/vector-icons';
//Composants
import Header from '../components/shared/Header';
import FormInput from '../components/shared/FormInput';

export default function HomeScreen({ navigation }) {
  //State des Inputs
  const [boardingPass, setBoardingPass] = useState('');
  const [aircraft, setAircraft] = useState('');

  const handleScan = () => {
    navigation.navigate('Scan');
  };

  //Gestion des onChangeText
  const handleChange = (name, value) => {
    switch (name) {
      case 'boardingPass':
        setBoardingPass(value);
        break;
      case 'aircraft':
        setAircraft(value);
        break;
    }
  };
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header />
      {/* Logout */}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => handleLogOut()}
      >
        <Entypo
          name='log-out'
          size={30}
          color='#F1F1F1'
        />
      </TouchableOpacity>

      {/* Logo & titles*/}
      <View style={styles.containerImage}>
        <Image
          source={require('../assets/Flight Collector Logo.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Hi Collector!</Text>
        <Text style={styles.title}>Are you ready to take off?</Text>
      </View>

      {/* Scan Aircraft & scan BoardingPass */}
      <View style={styles.containerScans}>
        <ImageBackground
          source={require('../assets/trajetsAvion.png')}
          style={styles.imageBack}
        >
          {/* Scan Aircraft */}
          <View style={styles.scan}>
            <FormInput
              label='Scan Aircraft'
              value={aircraft}
              name='aircraft'
              onChangeText={handleChange}
              formStyle={styles.input}
            />
            <View style={styles.icones}>
              <AntDesign
                name='checkcircle'
                size={25}
                color='#80C9FF'
              />
              <Text style={styles.title}>or</Text>
              <FontAwesome
                name='camera'
                size={25}
                color='#80C9FF'
                onPress={() => handleScan()}
              />
            </View>
          </View>
          {/*Scan Boarding Pass */}
          <View style={styles.scan}>
            <FormInput
              label='Scan Boarding Pass'
              value={boardingPass}
              name='boardingPass'
              onChangeText={handleChange}
              formStyle={styles.input}
            />
            <View style={styles.icones}>
              <AntDesign
                name='checkcircle'
                size={25}
                color='#002C82'
              />
              <Text style={styles.title}>or</Text>
              <FontAwesome
                name='camera'
                size={25}
                color='#002C82'
                onPress={() => handleScan()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  //Logo Flight Collector & titles
  containerImage: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '50%',
    marginTop: 50,
  },
  title: {
    fontFamily: 'Farsan-Regular',
    fontSize: 28,
    color: '#002C82',
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  //Scans
  containerScans: {
    width: 370,
    height: 190,

    overflow: 'hidden', //pour voir le border radius
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#002C82',
  },
  imageBack: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  //Inputs
  scan: {
    flexDirection: 'row',
  },
  input: {
    width: 250,
    backgroundColor: '#F1F1F1',
  },
  icones: {
    width: 90,
    height: 55,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#002C82',
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: '#F1F1F1',
  },
  //LogOut
  logout: {
    width: 50,
    height: 50,

    position: 'absolute',
    top: 50,
    right: 2,
    alignItems: '',
  },
});