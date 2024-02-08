import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from './FormInput';
import FormButton from './FormButton';

export default function SignInModal(props) {
  //State de la Modal
  const [modalVisible, setModalVisible] = useState(false);

  //State des Inputs
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  //Gestion des onChangeText
  const handleChange = (name, value) => {
    switch (name) {
      case 'mail':
        setMail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  //Gestion Navigation
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('TabNavigator');
  };

// //Connexion au compte
// const handleSubmit = async () => {
//   try{
//     const response = await fetch('http://localhost:3000/signin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         mail, 
//         password,
//       }),
//   });

//   const userData = await response.json();

//   if(userData.result) {
//     console.log('User Date SignIn', userData);
//     dispatch(login({mail:userData.mail, token:userData.token}))
//   }
  
 

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.inputs}>
              {/* Email address */}
              <FormInput
                label='Email Address'
                value={mail}
                name='mail'
                onChangeText={handleChange}
              />

              {/* Password */}
              <FormInput
                label='Password'
                value={password}
                name='password'
                onChangeText={handleChange}
              />
              <View>
                <TouchableOpacity>
                  <Text style={styles.forgotten}>Forgotten password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FormButton
              onPress={() => {
                handleSignUp();
                setModalVisible(!modalVisible);
              }}
              title='CONNECT'
              titleStyle={styles.textBtnSignIn}
              formStyle={styles.buttonSignIn}
            />
          </View>
        </View>
      </Modal>
      <FormButton
        onPress={() => setModalVisible(true)}
        title='SIGN IN'
        titleStyle={styles.textBtnSignIn}
        formStyle={styles.buttonSignIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '95%',
    height: '40%',

    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    padding: 35,

    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#0092FF',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  //Forgotten
  forgotten: {
    position: 'absolute',
    right: 20,
    bottom: 0,

    fontFamily: 'Farsan-Regular',
    fontSize: 15,
    color: '#002C82',
  },
  //Btn Sign In
  textBtnSignIn: {
    color: '#002C82',
    fontFamily: 'Cabin-Bold',
    letterSpacing: 5,
    fontSize: 20,
  },
  buttonSignIn: {
    width: 345,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    backgroundColor: '#80C9FF',
    borderColor: '#002C82',
    borderWidth: 2,
  },
});
