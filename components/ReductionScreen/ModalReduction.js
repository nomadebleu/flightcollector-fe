import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
//Composants
import FormButton from '../../components/shared/FormButton';
//Icones
import Icon from 'react-native-vector-icons/EvilIcons';
import { FontAwesome5 } from '@expo/vector-icons';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addPoints } from '../../reducers/user';
import { UseDispatch } from 'react-redux';

export default function ModalReduction() {
  //States Coupon & Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coupon, setCoupon] = useState('NOT YET');
  const [couponMessage, setCouponMessage] = useState(0);


  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);
  const totalPoints = user.totalPoints
  const userId = user._id
  const dispatch = useDispatch();
  //Backend 
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;


  //Fonction d'ouverture de la modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setCoupon(generateCouponCode(8));
  };


  //Modifier les points après réductions 
  const updateUserPoints = async ( pointsToRemove) => {
    try {
      const response = await fetch(`${apiUrl}/users/updatePoints/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pointsToRemove })
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Update points request failed: ${errorMessage}`);
      }
      
      const data = await response.json();
      console.log(data)
      dispatch(addPoints(data.newTotalPoints))
      return data.newTotalPoints;
    } catch (error) {
      console.error('Error updating user points:', error);
      throw error;
    }
  };
  
  //fonction pour redistribué les points de Réductions 
  const handleUseReduction = async () => {
    let pointsToRemove = 0;
    if (totalPoints >= 20000) {
      pointsToRemove = 20000;
      setCouponMessage(20)
    }
    
    else if (totalPoints >= 10000) {
      pointsToRemove = 10000;
      setCouponMessage(15)
    } 
    else if (totalPoints >= 5000) {
      pointsToRemove = 5000;
      setCouponMessage(10)
    }
    
    console.log(pointsToRemove);
    
    try {
      await updateUserPoints(pointsToRemove); 
      toggleModal();
    } catch (error) {
      console.error('Failed to use reduction:', error);
    }
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

              <Text style={styles.modalText}>Your Code Reduction {couponMessage} %</Text>
              {/* Si le totalPoints est à 0 le code est switché par NOT YET */}
              {user.totalPoints < 5000 ? (
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
        onPress={() => handleUseReduction()}
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
