import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
//Composants
import FormInput from '../shared/FormInput';
import FormButton from '../shared/FormButton';
import PasswordInput from '../shared/PasswordInput';
//Redux
import { useSelector } from 'react-redux';
//Icones
import Icon from 'react-native-vector-icons/EvilIcons';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function PasswordModal(props) {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);

  //State de la Modal
  const [modalVisible, setModalVisible] = useState(false);

  //State des Inputs
  const [mail, setMail] = useState(user.mail);
  const [newPassword, setNewPassword] = useState('');

  //Gestion des onChangeText
  const handleChange = (name, value) => {
    switch (name) {
      case 'mail':
        setMail(value);
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
        setNewPassword('');
        setModalVisible(!modalVisible);
      } else {
        console.error('Error during update', newData.error);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };
  //Close Modal
  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
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

            <Text style={styles.titleModal}>Change your password</Text>

            <View style={styles.inputs}>
              {/* Email address */}
              <FormInput
                label='Email Address'
                value={mail}
                name='mail'
                onChangeText={handleChange}
                editable={false}
              />
              {/* New Password */}
              <PasswordInput
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
              formStyle={styles.size}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.formChange}
      >
        <Text style={styles.textChange}>Change your password ?</Text>
      </TouchableOpacity>
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
    height: '50%',

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
    width: 150,
    height: 30,

    alignItems: 'center',
    paddingTop: 5,
  },
  titleModal: {
    fontFamily: 'DancingScript-Regular',
    fontSize: 40,
    textAlign: 'center',
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
  //Submit
  size: {
    width: 200,
  },
  //Icone
  icone: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
