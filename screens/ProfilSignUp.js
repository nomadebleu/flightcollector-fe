import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
//Utilisation du module d'expo pour les gradients
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfilSignUp({ navigation }) {
  //States Inputs
  const [formUser, setFormUser] = useState({
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
  });

  //Fonction pour naviguer vers la Tab & Home
  const handleNextHome = () => {
    navigation.navigate('TabNavigator');
  };

  return (
    <SafeAreaView style={styles.body}>
      <LinearGradient
        colors={['rgba(128, 201, 255, 1)', 'rgba(1, 45, 131, 1)']}
        start={[0, 1]} //Début du dégradé suivant x,y
        end={[1, 0]} //Fin du dégradé
        style={styles.header}
      ></LinearGradient>
      <View style={styles.pictureProfil}></View>

      {/* Titles */}
      <Text style={styles.welcome}>Welcome back !</Text>
      {/* First Name */}
      <View style={styles.inputs}>
        <View style={styles.containerInput}>
          <Text
            style={styles.legend}
            onChangeText={(value) =>
              setFormUser({ ...formUser, firstname: value })
            }
            value={formUser.firstname}
          >
            {' '}
            FIRST NAME
          </Text>
          <TextInput style={styles.text}></TextInput>
        </View>
      </View>
      {/* Last Name */}
      <View style={styles.inputs}>
        <View style={styles.containerInput}>
          <Text
            style={styles.legend}
            onChangeText={(value) =>
              setFormUser({ ...formUser, lastname: value })
            }
            value={formUser.lastname}
          >
            {' '}
            LAST NAME
          </Text>
          <TextInput style={styles.text}></TextInput>
        </View>
      </View>

      {/* Email address */}
      <View style={styles.inputs}>
        <View style={styles.containerInput}>
          <Text style={styles.legend}> Email address</Text>
          <TextInput
            style={styles.text}
            onChangeText={(value) => setFormUser({ ...formUser, mail: value })}
            value={formUser.mail}
          ></TextInput>
        </View>

        {/* Password */}
        <View style={styles.containerInput}>
          <Text style={styles.legend}> Password</Text>
          <TextInput
            style={styles.text}
            onChangeText={(value) =>
              setFormUser({ ...formUser, password: value })
            }
            value={formUser.password}
          ></TextInput>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotten}>Change your password?</Text>
        </TouchableOpacity>

        {/* SUBMIT */}
        <View>
          <TouchableOpacity
            onPress={() => handleSignUp()}
            style={styles.buttonSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.textBtnSubmit}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

        {/* Titles */}
        <Text style={styles.welcome}>
          Win your first badge by scan your first plane
        </Text>
        <Entypo
          name='camera'
          style={styles.camera}
          size={130}
          onPress={() => handleNextHome()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Inputs
  legend: {
    position: 'absolute',
    top: -10,
    left: 35,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 5,
    fontFamily: 'Cabin-Regular',
    color: '#002C82',
    zIndex: 1, // Pour que la legend soit au-dessus du TextInput
  },
  text: {
    width: 345,
    height: 55,

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

  //Buttons
  textBtnSubmit: {
    color: '#80C9FF',
    fontFamily: 'Cabin-Bold',
    letterSpacing: 5,
    fontSize: 20,
  },
  buttonSubmit: {
    width: 345,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    backgroundColor: '#002C82',
    borderColor: '#80C9FF',
    borderWidth: '2px solid',
  },
  //Icone
  camera: {
    color: '#80C9FF',
  },
  //Profil Picture
  pictureProfil: {
    width: 100,
    height: 100,

    borderRadius: 50,
    borderWidth: '2px solid',
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
});
