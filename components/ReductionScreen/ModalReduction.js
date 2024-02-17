import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
//Composants
import FormButton from '../../components/shared/FormButton';
//Icones
import Icon from 'react-native-vector-icons/EvilIcons';
import { FontAwesome5 } from '@expo/vector-icons';
//Redux
import { useSelector } from 'react-redux';

export default function ModalReduction() {
  //States Coupon & Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coupon, setCoupon] = useState('NOT YET');

  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);

  //Fonction d'ouverture de la modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setCoupon(generateCouponCode(8));
  };

  //Pour générer un coupon de manière aléatoire
  function generateCouponCode(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let couponCode = '';
    for (let i = 0; i < length; i++) {
      couponCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return couponCode;
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => toggleModal()}>
                <Icon
                  name='close'
                  size={30}
                  color='#002C82'
                />
              </TouchableOpacity>

              <Text style={styles.modalText}>Your Code Reduction</Text>
              {/* Si le totalPoints est à 0 le code est switché par NOT YET */}
              {user.totalPoints === 0 ? (
                <Text>NOT YET</Text>
              ) : (
                <Text style={styles.couponCode}>{coupon}</Text>
              )}
              <FontAwesome5
                name='money-bill-wave'
                size={80}
                color='#002C82'
              />
            </View>
          </View>
        </View>
      </Modal>
      <FormButton
        onPress={() => toggleModal()}
        title='USE REDUCTION'
        formStyle={styles.size}
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
    height: '35%',

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
  modalText: {
    fontFamily: 'Cabin-Regular',
    color: '#002C82',
  },
  size: {
    width: 250,
  },
  couponCode: {
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
  },
});
