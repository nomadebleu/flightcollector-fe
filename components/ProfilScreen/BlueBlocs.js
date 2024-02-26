import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import FlagComponent from './Flag';
import { useDispatch } from 'react-redux';
import { addPoints } from '../../reducers/user';

const BlueBloc = ({ urlBE, user }) => {
  const [userPoints, setUserPoints] = useState(0);
  const [favoris, setFavoris] = useState(0);
  const [planes, setPlanes] = useState(0);
  const [places, setPlaces] = useState(0);
  const [badges, setBadges] = useState(0);
  const [pictureOfBadges, setPictureOfBadges]= useState([])
  const dispatch = useDispatch();


 const fetchUserPoints = async () => {
    try {
      const response = await fetch(`${urlBE}/users/totalPoints/${user._id}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des points');
      }
      const data = await response.json();
      console.log(data)
      setUserPoints(data.totalPoints);
      dispatch(addPoints(data.totalPoints))
      
    } catch (error) {
      console.error('Erreur lors de la récupération des points :', error);
    }
  };

 async function fetchAircrafts() {
    try {
      const response = await fetch(`${urlBE}/planes/favoris/${user._id}`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      console.log(data)
      setFavoris(data.userFavoritePlanes);
      setPlanes(data.numberOfPlanes);
      return data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des avions :', error);
      throw error;
    }
  }

   async function fetchBadges() {
    try {
      const response = await fetch(`${urlBE}/badges/${user._id}`); // Assurez-vous d'ajuster l'URL en fonction de votre route backend
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des badges');
      }
      const data = await response.json();
      if (data.result){
      setBadges(data.CountBadges)
      setPictureOfBadges(data.badgePictures)
      }
      return data; 
    } catch (error) {
      console.error('Erreur lors de la récupération des badges :', error);
      // Gérer l'erreur ou renvoyer null si nécessaire
      return null;
    }
  }

  async function fetchPlaces() {
    try {
      const response = await fetch(`${urlBE}/flights/allFlights/${user._id}`); // Assurez-vous d'ajuster l'URL en fonction de votre route backend
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des lieux');
      }
      const data = await response.json();
      setPlaces(data.uniqueFlightsCount)
      return data; // Retourne les données récupérées
    } catch (error) {
      console.error('Erreur lors de la récupération des lieux :', error);
      // Gérer l'erreur ou renvoyer null si nécessaire
      return null;
    }
  }

  useFocusEffect(
  React.useCallback(() => {
    fetchUserPoints();
    fetchAircrafts();
    fetchBadges();
    fetchPlaces();
  }, []))




  return (
    <View style={styles.containerMiniInput}>
      <View style={styles.miniInput}>
        <FontAwesome
          name='star'
          size={25}
          color='#002C82'
        />
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
          {''}
        </Text>
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>{favoris}</Text>
        <Text style={styles.textMiniInput}>Favorites flights</Text>
      </View>
      <View style={styles.miniInput}>
        <FontAwesome
          name='map-marker'
          size={25}
          color='#002C82'
        />
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
          {''}
        </Text>
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>{places}</Text>
        <Text style={styles.textMiniInput}>Places visited</Text>
      </View>
      <View style={styles.miniInput}>
        <FontAwesome5
          name='award'
          size={25}
          color='#002C82'
        />
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
          {badges}
        </Text>
        <Text style={styles.textMiniInput}>Badges</Text>
      </View>
      <View style={styles.miniInput}>
        <FontAwesome
          name='plane'
          size={25}
          color='#002C82'
        />
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
          {planes}
        </Text>
        <Text style={styles.textMiniInput}>Aircrafts</Text>
      </View>

       <View style={styles.blocEmoticon}>
        <View style={styles.containerTitle}>
          <Text style={styles.titleEmoticon}>PLACES I'VE VISITED</Text>
          <View style={styles.flagContainer}>
            <FlagComponent />
          </View>
        </View>
      </View>
      <View>
      </View>

      <View style={styles.blocEmoticon}>
        <View style={styles.containerTitle}>
          <Text style={styles.titleEmoticon}>MY BADGES</Text>
        </View>

        <View style={styles.badgeContainer}>
        {pictureOfBadges.map((picture, index) => (
          <Image key={index} source={{ uri: picture}} style={{ width: 30, height: 30 }} />
        ))}
      </View>
        </View> 
      <View style={styles.blocEmoticon}>
  <View style={styles.containerTitle}>
    <Text style={styles.titleEmoticon}>TOTAL POINTS</Text>
    <View style={styles.points}>
      <Text>{userPoints}</Text>
    </View>
  </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Titles
  welcome: {
    position: 'absolute',
    top: 50,
    right: 70,
    fontFamily: 'Farsan-Regular',
    fontSize: 32,
    color: '#80C9FF',
  },
  //Profil Picture
  containerPicture: {
    width: '100%',
    height: 100,

    flexDirection: 'row',
    justifyContent: 'center',
  },
  pictureProfil: {
    width: 100,
    height: 100,

    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#002C82',
  },
  //Icone +
  iconContainer: {
    width: 35, // Largeur de l'icône
    height: 35, // Hauteur de l'icône
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#002C82',

    borderRadius: 20,
  },
  //LogOut
  logout: {
    width: 50,
    height: 50,

    position: 'absolute',
    right: 2,
    alignItems: 'center',
  },
  // Inputs
  inputs: {
    marginTop: 20,
  },
  legend: {
    position: 'absolute',
    top: 2,
    left: 2,

    backgroundColor: '#F1F1F1',
    paddingHorizontal: 5,

    fontFamily: 'Cabin-Regular',
    fontSize: 12,
    color: '#002C82',
    zIndex: 1, // Pour que la legend soit au-dessus du TextInput
  },
  size: {
    height: 42,
  },
  points: {
    backgroundColor: '#f0f0f0', // Couleur de fond
    borderRadius: 10, // Bord arrondi
    paddingHorizontal: 10, // Espace intérieur horizontal
    paddingVertical: 5, // Espace intérieur vertical
    fontFamily: 'Cabin-Bold',
  },
  // points: {
  //   height: 100,
  //   fontSize: 16,
  //   // textAlign: 'center',
  //   padding: 10,
  //   fontFamily: 'Cabin-Bold',
  //   color: '#002C82',
  // },
  //MiniInputs
  containerMiniInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  miniInput: {
    width: '40%',
    height: 45,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    margin: 10,
    borderWidth: 1,
    borderColor: '#002C82',
    backgroundColor: '#80C9FF',
    borderRadius: 5,
  },
  textMiniInput: {
    fontFamily: 'Farsan-Regular',
    fontSize: 20,
    color: '#002C82',
  },
  //Modal Password Change
  modal: {
    position: 'absolute',
    right: 0,
    top: 40,
  },
  //Emoticon
  emoticon: {
    width: 25,
    height: 25,
  },
  blocEmoticon: {
    width: 345,
    height: 42,

    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#002C82',

    marginBottom: 20,
    borderRadius: 5,
  },
  titleEmoticon: {
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
    color: '#002C82',
  },
  containerTitle: {
    position: 'absolute',
    top: -10,
    left: 35,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 5,
    borderRadius: 5,
    zIndex: 1, // Pour que la legend soit au-dessus du TextInput
  },
  //Flags
  flagContainer: {
    flexDirection: 'row', // Pour aligner les drapeaux horizontalement
  },
  flagItem: {
    marginRight: 10,
  },
  flagImage: {
    width: 30,
    height: 30,

  },
  badgeContainer: {
    flexDirection: 'row', // Alignement horizontal
    alignItems: 'center', // Centrer verticalement les badges
  },
  badge: {
    marginRight: 10, // Marge entre chaque badge
  },
})

export default BlueBloc;
