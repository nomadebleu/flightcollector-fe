import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
//Icones
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
//Composants
import FlagComponent from './Flag';
//Redux
import { useDispatch } from 'react-redux';
import { addPoints } from '../../reducers/user';


  //Local address
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const BlueBloc = ({user}) => {
  //States
  const [userData, setUserData] = useState({
    userPoints: 0,
    favoris: 0,
    planes: 0,
    places: 0,
    badges: 0,
    pictureOfBadges: [],
  });

  //Redux
  const dispatch = useDispatch();

  // Récupère les données du User
  const fetchUserData = async () => {
    try {
      // Récupère le total des points du User
      const pointsResponse = await fetch(
        `${apiUrl}/users/totalPoints/${user._id}`
      );
      if (!pointsResponse.ok) {
        throw new Error('Erreur lors de la récupération des points');
      }
      const pointsData = await pointsResponse.json();

      // Récupère le nbre de Favoris et de Planes du User
      const aircraftsResponse = await fetch(
        `${apiUrl}/planes/favoris/${user._id}`
      );
      if (!aircraftsResponse.ok) {
        throw new Error('La requête a échoué');
      }
      const aircraftsData = await aircraftsResponse.json();

      // Récupère le nbre de Badges et leurs visuels du User
      const badgesResponse = await fetch(`${apiUrl}/badges/${user._id}`);
      if (!badgesResponse.ok) {
        throw new Error('Erreur lors de la récupération des badges');
      }
      const badgesData = await badgesResponse.json();

      // Récupère tous les Flights du User
      const placesResponse = await fetch(
        `${apiUrl}/flights/allFlights/${user._id}`
      );
      if (!placesResponse.ok) {
        throw new Error('Erreur lors de la récupération des lieux');
      }
      const placesData = await placesResponse.json();

      // MAJ avec les nouvelles valeurs
      setUserData({
        userPoints: pointsData.totalPoints,
        favoris: aircraftsData.userFavoritePlanes,
        planes: aircraftsData.numberOfPlanes,
        places: placesData.uniqueFlightsCount,
        badges: badgesData.CountBadges,
        pictureOfBadges: badgesData.badgePictures,
      });

      // Dispatch pour ajouter les points
      dispatch(addPoints(pointsData.totalPoints));
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des données du User :',
        error
      );
    }
  };

  // Pour charger les données du User au chargement du composant
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <View style={styles.containerMiniInput}>
      
      {/* Favorites */}
      <View style={styles.miniInput}>
        <FontAwesome
          name='star'
          size={25}
          color='#002C82'
        />
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
          {userData.favoris}
        </Text>
        <Text style={styles.textMiniInput}>Favorites flights</Text>
      </View>
      
      {/* Places Visited */}
      <View style={styles.miniInput}>
        <FontAwesome
          name='map-marker'
          size={25}
          color='#002C82'
        />
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
          {userData.places}
        </Text>
        <Text style={styles.textMiniInput}>Places visited</Text>
      </View>

      {/* Badges */}
      <View style={styles.miniInput}>
        <FontAwesome5
          name='award'
          size={25}
          color='#002C82'
        />
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
          {userData.badges}
        </Text>
        <Text style={styles.textMiniInput}>Badges</Text>
      </View>

      {/* Aircrafts */}
      <View style={styles.miniInput}>
        <FontAwesome
          name='plane'
          size={25}
          color='#002C82'
        />
        <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
          {userData.planes}
        </Text>
        <Text style={styles.textMiniInput}>Aircrafts</Text>
      </View>

      {/* PLACES I'VE VISITED */}
      <View style={styles.blocEmoticon}>
        <View style={styles.containerTitle}>
          <Text style={styles.titleEmoticon}>PLACES I'VE VISITED</Text>
          <View style={styles.flagContainer}>
            <FlagComponent />
          </View>
        </View>
      </View>
    
      {/* MY BADGES */}
      <View style={styles.blocEmoticon}>
        <View style={styles.containerTitle}>
          <Text style={styles.titleEmoticon}>MY BADGES</Text>
        </View>
        <View style={styles.badgeContainer}>
          {userData.pictureOfBadges.map((picture, index) => (
            <Image
              key={index}
              source={{ uri: picture }}
              style={{ width: 30, height: 30 }}
            />
          ))}
        </View>
      </View>

       {/* TOTAL POINTS */}
      <View style={styles.blocEmoticon}>
        <View style={styles.containerTitle}>
          <Text style={styles.titleEmoticon}>TOTAL POINTS</Text>
          <View style={styles.points}>
            <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>{userData.userPoints}</Text>
          </View>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
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
    zIndex: 1,
  },
  flagContainer: {
    flexDirection: 'row',
  },
  flagItem: {
    marginRight: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: 10,
  },
  points:{
    alignItems:'center',
    justifyContent:'center',
  }
});

export default BlueBloc;
