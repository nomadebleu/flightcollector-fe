import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from './FormInput';
import FormButton from './FormButton';


export default function SignUpModal (props){
  //State de la Modal
  const [modalVisible, setModalVisible] = useState(false);

  //State des Inputs
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  //Navigation lors de la connection
  const handleSignUp = () => {
    navigation.navigate('TabNavigator');
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
                onChangeText={setFirstname}
              />

              {/* LAST NAME */}
              <FormInput
                label='Last Name'
                value={lastname}
                onChangeText={setLastname}
              />

              {/* Email address */}
              <FormInput
                label='Email Address'
                value={mail}
                onChangeText={setMail}
              />

              {/* Password */}
              <FormInput
                label='Password'
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <FormButton
              onPress={() => {
                handleSignUp();
                setModalVisible(!modalVisible);
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
};

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


