import React, { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
//Composant
import Header from '../components/shared/Header';
import FormButton from '../components/shared/FormButton';
//Icones
import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/EvilIcons';
//Gradient
import { LinearGradient } from 'expo-linear-gradient';
//Redux
import { useSelector } from 'react-redux';

export default function Reduction() {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);
  //States Coupon & Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coupon, setCoupon] = useState('NOT YET');

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

  //Fonction d'ouverture de la modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setCoupon(generateCouponCode(8));
  };
  return (
    <View style={styles.body}>
      {/* Header */}
      <Header title='Reductions' />
      {/* Medal */}
      <FontAwesome5
        name='medal'
        size={150}
        color='#06D6A0'
        style={styles.medal}
      />

      {/* Si le totalPoints est à 0 le message ne s'affiche pas */}
      {user.totalPoints === 0 && (
        <Text style={styles.textReduction}>Soon reductions</Text>
      )}

      <View style={styles.container}>
        {/* Bloc Gradient */}
        <LinearGradient
          colors={['rgba(0, 146, 255, 0.6)', 'rgba(6, 214, 160, 0.5)']}
          start={[1, 1]} //Début du dégradé suivant x,y
          end={[1, 0]} //Fin du dégradé
          style={styles.blocGradient}
        >
          {/* 20% */}
          <View style={styles.pourcent}>
            <Text style={styles.text}>20%</Text>
            <View style={styles.blocStar}>
              <FontAwesome
                name='star'
                size={65}
                color='#002C82'
                style={styles.starBorder}
              />
              <FontAwesome
                name='star'
                size={50}
                color='#FFCA0C'
                style={styles.star}
              />
            </View>
            <Text style={styles.text}>20000 pts</Text>
          </View>
          {/* 15% */}
          <View style={styles.pourcent}>
            <Text style={styles.text}>15%</Text>
            <View style={styles.blocStar}>
              <FontAwesome
                name='star'
                size={65}
                color='#002C82'
                style={styles.starBorder}
              />
              <FontAwesome
                name='star'
                size={50}
                color='#D3CACA'
              />
            </View>
            <Text style={styles.text}>10000 pts</Text>
          </View>
          {/* 10% */}
          <View style={styles.pourcent}>
            <Text style={styles.text}>10%</Text>
            <View style={styles.blocStar}>
              <FontAwesome
                name='star'
                size={65}
                color='#002C82'
                style={styles.starBorder}
              />
              <FontAwesome
                name='star'
                size={50}
                color='#D68A18'
              />
            </View>
            <Text style={styles.text}>5000 pts</Text>
          </View>
        </LinearGradient>
        {/* Money */}
        <FontAwesome5
          name='money-bill-wave'
          size={80}
          color='#06D6A0'
        />
      </View>
      {/* Si le totalPoints est à 0 le message ne s'affiche pas */}
      {user.totalPoints === 0 && (
        <Text style={styles.textReduction}>No usable reduction yet</Text>
      )}

      {user.totalPoints !== null && (
        <Text style={styles.points}>{user.totalPoints} points</Text>
      )}

      {/* Use reduction */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medal: {
    marginTop: '25%',
  },
  //Icones
  starBorder: {
    position: 'absolute',
    bottom: -7.5,
  },
  blocStar: {
    width: 100,
    alignItems: 'center',
  },
  //Ligne réduction
  pourcent: {
    width: 250,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    margin: 5,
  },
  blocGradient: {
    width: 300,
    height: 220,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
  },
  //Text
  text: {
    width: 75,
    textAlign: 'center',

    color: '#002C82',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Farsan-Regular',
  },
  size: {
    width: 250,
  },
  textReduction: {
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  points: {
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
    fontSize: 20,
  },
  //Modal
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
  couponCode: {
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
  },
});
