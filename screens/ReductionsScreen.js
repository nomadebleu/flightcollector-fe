import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Composant
import Header from '../components/shared/Header';
//Icones
import { FontAwesome5 } from '@expo/vector-icons';

export default function Reduction() {
  const [totalPoints, setTotalPoints] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('COUPON.Test');
  
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetchTotalPoints(); // Appel de la fonction pour récupérer le nombre total de points au montage du composant
  }, []);

  const fetchTotalPoints = async () => {
    try {
      const response = await fetch('https://flightcollector-be.vercel.app/users/userInfos/65c63d47333fb6f14d799355');
      const data = await response.json();
      setTotalPoints(data.user.pointsTotal); // Mise à jour de l'état avec le nombre total de points récupéré
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre total de points : ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title='Reductions'/>
      
      <View style={styles.iconContainer}>
        <FontAwesome5 name='medal'style={styles.icon}size={30} color='#06D6A0'/>
       
        {totalPoints !== null && <Text style={styles.points}>{totalPoints} points</Text>}
        <Text style={styles.soon}>Soon Reduction</Text>
      </View>
    
        <View style={styles.reduction}>
        <Text style={[styles.text, { color: 'yellow' }]}>20%</Text>
          <FontAwesome name='star' size={30} color='gold'  />
          <Text style={styles.text}>20000 Points</Text>
        </View>
        <View style={styles.reduction}>
          <Text style={[styles.text, { color: 'blue' }]}>15%</Text>
          <FontAwesome name='star' size={30} color='blue'  />
          <Text style={styles.text}>10000 Points</Text>
        </View>
        <View style={styles.reduction}>
          <Text style={[styles.text, { color: 'green' }]}>10%</Text>
          <FontAwesome name='star' size={30} color='green'  style={styles.star}/>
          <Text style={styles.text}>5000 Points</Text>
        </View>
     
      <View style={styles.dollar}>
        <FontAwesome name='dollar' size={50} color='green'/>
        <Text style={styles.text}>No usable reduction yet</Text>
      </View>
      <View>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Use Reduction</Text>
      </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Votre code de réduction :</Text>
            <Text style={styles.couponCode}>{couponCode}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Farsan-Regular',
    fontSize: 28,
    color: '#002C82',
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    fontSize: 150,
  },
  points: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
    fontFamily: "Cabin-Regular",
  },
  soon: {
    fontSize: 16,
    color: 'gray',
    fontFamily: "Cabin-Regular",
  },
  reductionsContainer: {
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50
  },
  text: {
    fontSize: 20,
    fontFamily: "Cabin-Regular",
    alignSelf: 'center',
  },
  reduction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  star: {
    marginRight: 10,
  },
  dollar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 50,
    marginLeft: 50
  
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  couponCode: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

