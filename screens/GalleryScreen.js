import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Composant
import Header from '../components/shared/Header';


//Data des flights
// const arrayFlights = [
//   {
//     numeroReservation: '4528DF85',
//     planes: ['142563256322'],
//     departure: '12-02-2024',
//     arrival: '14-02-2024',
//     airport: 'ABC Airport',
//     arrivalPlace: 'Russia',
//     departurePlace: 'Canada',
//     iataArrival: 'ABC',
//     iataDep: 'XYZ',
//     services: [
//       {
//         nbredeplance: 120,
//         movie: ['a', 'b', 'c'],
//         meals: 'Breakfast & Lunch',
//       }],
//   },
//   {
//     numeroReservation: '7528DF85',
//     planes: ['742563256322'],
//     departure: '18-02-2024',
//     arrival: '19-02-2024',
//     airport: 'SBC Airport',
//     arrivalPlace: 'France',
//     departurePlace: 'Canada',
//     iataArrival: 'CDG',
//     iataDep: 'CAN',
//     services: [
//       {
//         nbredeplance: 120,
//         movie: ['c', 'f', 'g'],
//         meals: 'Breakfast',
//       }],
//   },
// ];


export default function GalleryScreen() {
  //State plane
  const [userPlanes, setUserPlanes] = useState([]);
  //state Original Favoris 
  const [originalUserPlanes, setOriginalUserPlanes] = useState([]);
  //Filtré avion par recherche
  const [searchQuery, setSearchQuery] = useState('');



  //utilisation ReduxStore
  const user = useSelector((state) => state.user.value);
  const userId = user._id

  useFocusEffect(
    React.useCallback(() => {
      fetchPlanesByUserId();
    }, [])
  );

  //trié les planes par favorits
  const sortPlanesByFavorite = () => {
    const favoritePlanes = userPlanes.filter(plane => plane.isFavorite);
    const nonFavoritePlanes = userPlanes.filter(plane => !plane.isFavorite);
    setUserPlanes([...favoritePlanes, ...nonFavoritePlanes]);
  };

  //réstauré les planes par favorits 
  const restoreOriginalOrder = () => {
    setUserPlanes(originalUserPlanes);
  };

  //filtré les planes par recherches
  const filterPlanesByType = () => {
    return userPlanes.filter(plane => plane.type.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  //mettre à jour l'input
  const handleSearchInputChange = (text) => {
    setSearchQuery(text);
  };

  //Data des planes
  function fetchPlanesByUserId() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    fetch(`${apiUrl}/planes/allPlanes/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des avions - Erreur HTTP : ' + response.status);
        }
        return response.json();
      })
      .then(planes => {
        setUserPlanes(planes)
        setOriginalUserPlanes(planes)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des avions :', error);
      });
  }


  //add un plane en Fav
  const addPlaneToFavorites = async (planeId) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(`${apiUrl}/planes/addFavoris/${userId}/${planeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'avion aux favoris');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Erreur lors de la requête pour ajouter un avion aux favoris :', error);
      // Gérez l'erreur
    }
  };

  //remove Plane en Fav
  const removePlaneFromFavorites = async (planeId) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(`${apiUrl}/planes/removeFavoris/${userId}/${planeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'avion des favoris');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Erreur lors de la requête pour supprimer un avion des favoris :', error);
      // Gérez l'erreur
    }
  };


  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header title='Gallery' />

      {/* Search/filter/favorite container */}
      <View style={styles.containerSearch}>
        <View style={styles.icones}>
          <FontAwesome
            name='filter'
            size={25}
            color='#002C82'
          />
          <FontAwesome
            name='star'
            size={25}
            color='yellow'
            onPress={() => {
              if (userPlanes !== originalUserPlanes) {
                restoreOriginalOrder(); // Restaurer l'ordre original
              } else {
                sortPlanesByFavorite(); // Trier les avions par favoris
              }
            }}
          />
          <FontAwesome
            name='search'
            size={25}
            color='#002C82'
          />
        </View>

        <View style={styles.searchBar}>
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
          <TextInput
            inlineImageLeft='search'
            style={styles.text}
            value={searchQuery}
            size={25}
            onChangeText={handleSearchInputChange}
            placeholder="Rechercher par type d'avion..."
          />
          </KeyboardAvoidingView>
        </View>
        </View>

    <ScrollView>
      <View style={styles.containerPlanes}>
  {searchQuery === '' // Vérifie si la recherche est vide
    ? userPlanes.map((plane, index) => ( // Affiche tous les avions
      <View key={index} style={[styles.plane, index !== 0 && styles.planeMarginTop, { marginLeft: 40 }]}>
        {/* Contenu de l'avion */}
        <View style={styles.img}>
                <Image
                  style={styles.imgPlane}
                  source={{ uri: plane.picture }}

                />
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => {
                    plane.isFavorite
                      ? removePlaneFromFavorites(plane._id)
                      : addPlaneToFavorites(plane._id);
                  }}
                >
                  <FontAwesome
                    name='star'
                    size={10}
                    color={plane.isFavorite ? 'yellow' : 'blue'} />
                </TouchableOpacity>
              </View>
              <View style={styles.descPlane}>
                <Text style={{ fontFamily: 'Cabin-Bold' }}>{plane.type}</Text>
                <Text style={styles.descText}>{plane.description}</Text>
      </View>
      </View>
    ))
    : filterPlanesByType().map((plane, index) => ( 
      <View key={index} style={[styles.plane, index !== 0 && styles.planeMarginTop, { marginLeft: 20 }]}>
        {/* Contenu de l'avion */}
        <View style={styles.img}>
                <Image
                  style={styles.imgPlane}
                  source={{ uri: plane.picture }}

                />
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => {
                    plane.isFavorite
                      ? removePlaneFromFavorites(plane._id)
                      : addPlaneToFavorites(plane._id);
                  }}
                >
                  <FontAwesome
                    name='star'
                    size={10}
                    color={plane.isFavorite ? 'yellow' : 'blue'} />
                </TouchableOpacity>
              </View>
              <View style={styles.descPlane}>
                <Text style={{ fontFamily: 'Cabin-Bold' }}>{plane.type}</Text>
                <Text style={styles.descText}>{plane.description}</Text>                

      </View>
      </View>
    ))
  }
</View>
</ScrollView>
    </SafeAreaView>



  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearch: {
    width: '90%',
    height: '10%',

    marginTop: '15%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icones: {
    width: '30%',
    height: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  searchBar: {
    width: '70%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  containerPlanes: {
    width: '90%',
    height: '80%',

    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: 'pink',
  },
  plane: {
    width: 335,
    height: 120,

    fontFamily: 'Cabin-Regular',
    color: '#002C82',

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#002C82',
    borderStyle: 'solid',
    borderRadius: 6,

    margin: 5,
    padding: 10,
  },
  img: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  imgPlane: {
    width: 100,
    height: 100,
  },
  descPlane: {
    width: 220,
    height: 100,

    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    height: '80%',

    borderWidth: 1,
    borderColor: '#002C82',

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 0, // Pour que le TextInput soit en dessous du texte du label
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  favoriteText: {
    color: '#ffffff',
  },
  containerSearch: {
    width: '90%',
    height: '10%',
    marginTop: '25%', // Modifiez la valeur de marginTop selon vos besoins
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
