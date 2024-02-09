import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
//Navigation
import { useNavigation } from '@react-navigation/native';
//Redux
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
//Composants
import FormInput from './FormInput';
import FormButton from './FormButton';

export default function SignUpModal() {
  //Utilisation du redux
  const dispatch = useDispatch();

  //State de la Modal
  const [modalVisible, setModalVisible] = useState(false);

  //State des Inputs
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  //Navigation lors de la connection
  const navigation = useNavigation();

  //Gestion des onChangeText
  const handleChange = (name, value) => {
    switch (name) {
      case 'firstname':
        setFirstname(value);
        break;
      case 'lastname':
        setLastname(value);
        break;
      case 'mail':
        setMail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  //Register du user
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'https://flightcollector-be.vercel.app/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname,
            lastname,
            mail,
            password,
          }),
        }
      );

      const userData = await response.json();

      if (userData.result) {
        dispatch(
          login({
            firstname: userData.userData.firstname,
            lastname: userData.userData.lastname,
            mail: userData.userData.mail,
            password: userData.userData.password,
            token: userData.token,
          })
        );
        setModalVisible(false);
        setFirstname('');
        setLastname('');
        setMail('');
        setPassword('');
        navigation.navigate('TabNavigator'); //Navigation vers Home avec la Tab
      } else {
        console.error('Error during register', userData.error);
      }
    } catch (error) {
      console.error('Error during register:', error);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
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
              {/* FIRST NAME */}
              <FormInput
                label='First Name'
                value={firstname}
                name='firstname'
                onChangeText={handleChange}
              />

              {/* LAST NAME */}
              <FormInput
                label='Last Name'
                value={lastname}
                name='lastname'
                onChangeText={handleChange}
              />

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
            </View>

            <FormButton
              onPress={() => {
                handleSubmit();
              }}
              title='REGISTER'
            />
          </View>
        </View>
      </Modal>
      <FormButton
        onPress={() => setModalVisible(true)}
        title='SIGN UP'
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
    height: '55%',

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
});
