import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
//Composants
import FormButton from './FormButton';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';
//Navigation
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  //Gestion Navigation
  const navigation = useNavigation();

  const handleWithout = () => {
    navigation.navigate('TabNavigator', {
      screen: 'TabNavigator',//Obligé de préciser sinon ca ne fonctionne pas
      params: { hideTabBar: true }, //définition de params pour gérer l'affichage de la tab
    });
  };

  return (
    <SafeAreaView style={styles.body}>
      <Image
        source={require('../assets/GlobeTrajets.png')}
        style={styles.image}
      />
      <View style={styles.containerTitles}>
        {/* Titles */}
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.flight}>Flight Collector</Text>
      </View>

      <View style={styles.containerButtons}>
        {/* SIGN IN */}
        <SignInModal />

        {/* SIGN UP */}
        <SignUpModal />

        {/* USE WITHOUT ACCOUNT */}
        <FormButton
          formStyle={styles.buttonWithout}
          titleStyle={styles.textBtnWithout}
          title='USE WITHOUT ACCOUNT'
          onPress={() => handleWithout()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F1F1F1',
    justifyContent: 'space-around',
  },
  //Buttons
  textBtnWithout: {
    color: '#80C9FF',
    fontFamily: 'Cabin-Bold',
    letterSpacing: 5,
    fontSize: 20,
  },
  buttonWithout: {
    width: 345,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#80C9FF',
    borderWidth: 2,
  },
  //Titles
  welcome: {
    fontFamily: 'Farsan-Regular',
    fontSize: 60,
    color: '#002C82',
  },
  flight: {
    fontFamily: 'DancingScript-Regular',
    fontSize: 65,
    color: '#002C82',
  },
  //Image
  image: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: -175,
    zIndex: -1,
  },
  //Agencement des blocs
  containerButtons: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  containerTitles: {
    width: '100%',
    height: '20%',

    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
