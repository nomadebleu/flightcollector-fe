import React, { useState, useEffect } from 'react';
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
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
//Redux
import { useSelector } from 'react-redux';
//Icones
import Icon from 'react-native-vector-icons/EvilIcons';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function ModalPassword(props) {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);

  //State de la Modal
  const [modalVisible, setModalVisible] = useState(false);

  //State des Inputs
  const [mail, setMail] = useState(user.mail);
  const [password, setPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState('');
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
      case 'newPassword':
        setNewPassword(value);
        break;
    }
  };
  //Submit
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mail,
          newPassword,
        }),
      });
      console.log('response', response);
      const newData = await response.json();
      console.log('newData is :', newData);
      if (newData.result) {
        setMail('');
        setPassword('');
        setNewPassword('');
        navigation.navigate('Profil');
      } else {
        console.error('Error during update', newData.error);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };
  return (
    <View style={[styles.centeredView, props.styleModal]}>
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
            <View style={styles.icone}>
            <Icon
              name='close'
              size={30}
              color='#002C82'
            />
            </View>
            <Text style={styles.titleModal}>Change your password</Text>

            <View style={styles.inputs}>
              {/* Email address */}
              <FormInput
                label='Email Address'
                value={mail}
                name='mail'
                onChangeText={handleChange}
              />

              {/* Password */}
              {/* <FormInput
                label='Password'
                value={password}
                name='password'
                onChangeText={handleChange}
              /> */}
              {/* NewPassword */}
              <FormInput
                label='New Password'
                value={newPassword}
                name='newPassword'
                onChangeText={handleChange}
              />
            </View>

            <FormButton
              onPress={() => {
                handleSubmit();
              }}
              title='SUBMIT'
              formStyle={styles.submit}
            />
          </View>
        </View>
      </Modal>
      <FormButton
        onPress={() => setModalVisible(true)}
        title='Change your password ?'
        titleStyle={styles.textChange}
        formStyle={styles.formChange}
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
    height: '65%',

    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    padding: 20,

    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#0092FF',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  //Change password
  textChange: {
    fontFamily: 'Farsan-Regular',
    fontSize: 15,
    color: '#002C82',
    letterSpacing: 0,
  },
  formChange: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: 150,
    height: 30,
  },
  //Submit
  submit: {
    width: 200,
  },
  titleModal: {
    fontFamily: 'DancingScript-Regular',
    fontSize: 30,
    color: '#002C82',
    paddingBottom: 30,
    shadowColor: '#0092FF',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  //Icone
  icone:{
    width:'100%',
    alignItems:'flex-end',
    position:'absolute',
    top:20,
  },
});
