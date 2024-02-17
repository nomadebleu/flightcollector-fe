import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
//Composant
import Header from '../components/shared/Header';
import ModalReduction from '../components/ReductionScreen/ModalReduction';
//Icones
import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Redux
import { useSelector } from 'react-redux';
//Gradient
import { LinearGradient } from 'expo-linear-gradient';

export default function Reduction() {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);

  return (
    <SafeAreaView style={styles.body}>
      <Header title='Reductions' />
      {/* Header */}

      <View style={styles.containerMedal}>
        {/* Medal */}
        <FontAwesome5
          name='medal'
          size={150}
          color='#06D6A0'
        />

        {/* Message en fonction du nbre de points */}
        <Text style={styles.textReduction}>
          {user.totalPoints === 0 || user.totalPoints < 5000
            ? 'Soon reductions'
            : user.totalPoints >= 20000
            ? '20%'
            : user.totalPoints >= 10000
            ? '15%'
            : user.totalPoints >= 5000
            ? '10%'
            : ''}
        </Text>
      </View>

      <View style={styles.containerPercent}>
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

      <View style={styles.containerFooter}>
        {/* Si le totalPoints est à 0 le message ne s'affiche pas */}
        {user.totalPoints === 0 || user.totalPoints < 5000 
        ? <Text style={styles.textReduction}>No usable reduction yet</Text>
        :''
        }

        {user.totalPoints !== null && (
          <Text style={styles.points}>{user.totalPoints} points</Text>
        )}

        {/* Use reduction */}
        <ModalReduction />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  containerMedal: {
    width: '100%',
    height: 200,
    alignItems: 'center',

    marginTop: '15%',
  },
  containerPercent: {
    width: '100%',
    height: 300,

    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFooter: {
    width: '100%',
    height: 135,

    alignItems: 'center',
    background: 'green',
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
});
