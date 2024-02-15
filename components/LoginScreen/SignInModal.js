import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
//Navigation
import { useNavigation } from '@react-navigation/native';
//Composants
import FormInput from '../shared/FormInput';
import FormButton from '../shared/FormButton';
import PasswordInput from '../shared/PasswordInput';
//Redux
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/user';
//Icones
import Icon from 'react-native-vector-icons/EvilIcons';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function SignInModal(props) {
  //Utilisation du redux
  const dispatch = useDispatch();

  //State de la Modal
  const [modalVisible, setModalVisible] = useState(false);

  //State des Inputs
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  //Gestion Navigation
  const navigation = useNavigation();

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

  //Connect du user
  const handleConnect = async () => {
    try {
      const response = await fetch(`${apiUrl}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mail,
          password,
        }),
      });

      const userData = await response.json();

      if (userData.result) {
        console.log('UserData:', userData);
        dispatch(
          login({
            firstname: userData.data.firstname,
            lastname: userData.data.lastname,
            mail: userData.data.mail,
            password: userData.data.password,
            token: userData.data.token,
            totalPoints:userData.data.totalPoints,
            badges:userData.data.badges,
            flights:userData.data.flights,
            planes:userData.data.planes,
            _id:userData.data._id,
          })
        );
        navigation.navigate('TabNavigator'); //Navigation vers Home avec la Tab
        setMail('');
        setPassword('');
        setModalVisible(!modalVisible);
      } else {
        console.error('Error during connection', userData.error);
      }
    } catch (error) {
      console.error('Error during connection:', error);
    }
  };
  //Close Modal
  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };
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
        <View style={styles.modalBackground}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.icone}
                onPress={() => handleCloseModal()}
              >
                <Icon
                  name='close'
                  size={30}
                  color='#002C82'
                />
              </TouchableOpacity>
              <View style={styles.inputs}>
                {/* Email address */}
                <FormInput
                  label='Email Address'
                  value={mail}
                  name='mail'
                  onChangeText={handleChange}
                />

                {/* Password */}
                <PasswordInput
                  label='Password'
                  value={password}
                  name='password'
                  onChangeText={handleChange}
                  placeholder='8 caracters mini. with M/1/!'
                />

                <View>
                  <TouchableOpacity>
                    <Text style={styles.forgotten}>Forgotten password?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <FormButton
                onPress={() => {
                  handleConnect();
                }}
                title='CONNECT'
                formStyle={styles.size}
              />
            </View>
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
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '95%',
    height: '45%',

    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    padding: 20,

    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#002C82',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 146, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //Forgotten Password
  forgotten: {
    position: 'absolute',
    right: 20,
    bottom: 0,

    fontFamily: 'Farsan-Regular',
    fontSize: 15,
    color: '#002C82',
  },
  //Sign In
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
  //Connect
  size: {
    width: 200,
  },
  //Icone
  icone: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 20,
  },
  //Inputs
  inputs: {
    width: '100%',
    height: '60%',
    justifyContent: 'flex-end',
  },
});
