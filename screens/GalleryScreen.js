import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
//Redux
import { useSelector } from 'react-redux';
//Action lors de la navigation
import { useFocusEffect } from '@react-navigation/native';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Composant
import Header from '../components/shared/Header';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function GalleryScreen() {
  //States
  const [userPlanes, setUserPlanes] = useState([]);
  const [originalUserPlanes, setOriginalUserPlanes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  //Redux
  const user = useSelector((state) => state.user.value);
  const userId = user._id;

  //L'ensemble des Planes du User à la navigation
  useFocusEffect(
    React.useCallback(() => {
      fetchPlanesByUserId();
    }, [])
  );
  const fetchPlanesByUserId = async () => {
    try {
      const response = await fetch(`${apiUrl}/planes/allPlanes/${userId}`);
      if (!response.ok) {
        throw new Error(
          'Erreur lors de la récupération des avions - Erreur HTTP : ' +
            response.status
        );
      }
      const planes = await response.json();
      setUserPlanes(planes);
      setOriginalUserPlanes(planes);
    } catch (error) {
      console.error('Erreur lors de la récupération des avions :', error);
    }
  };

  //ADD d'un Plane en Favoris
  const addPlaneToFavorites = async (planeId) => {
    try {
      await fetch(`${apiUrl}/planes/addFavoris/${userId}/${planeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUserPlanes(prevPlanes => {
        return prevPlanes.map(plane => {
          if (plane._id === planeId) {
            return { ...plane, isFavorite: true };
          }
          return plane;
        });
      });
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  //REMOVE d'un Plane en Favoris
  const removePlaneFromFavorites = async (planeId) => {
    try {
      await fetch(`${apiUrl}/planes/removeFavoris/${userId}/${planeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUserPlanes(prevPlanes => {
        return prevPlanes.map(plane => {
          if (plane._id === planeId) {
            return { ...plane, isFavorite: false };
          }
          return plane;
        });
      });
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  //Tri des Planes en fonction des Favoris
  const sortPlanesByFavorite = () => {
    const favoritePlanes = userPlanes.filter((plane) => plane.isFavorite);
    const nonFavoritePlanes = userPlanes.filter((plane) => !plane.isFavorite);
    setUserPlanes([...favoritePlanes, ...nonFavoritePlanes]);
  };

  //Restaure les Planes non triés
  const restoreOriginalOrder = () => {
    setUserPlanes(originalUserPlanes);
  };

  //Fonction pour filtrer par type de Plane
  const filterPlanesByType = () => {
    return userPlanes.filter((plane) =>
      plane.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header title='Gallery' />

      {/* Search Container */}
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
            color='#FFCA0C'
            onPress={() => {
              if (userPlanes !== originalUserPlanes) {
                restoreOriginalOrder(); // Restaurer l'ordre original
              } else {
                sortPlanesByFavorite(); // Trier les avions par favoris
              }
            }}
          />
        </View>

        <View>
          <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1 }}
          >
            <TextInput
              inlineImageLeft='search'
              style={styles.searchBar}
              value={searchQuery}
              size={25}
              onChangeText={(text) => setSearchQuery(text)}
              placeholder='Search by Plane Type'
            />
          </KeyboardAvoidingView>
        </View>
      </View>

      <ScrollView>
        <View style={styles.containerPlanes}>
          {searchQuery === ''
            ? userPlanes.map(
                (
                  plane,
                  index //Mets les Planes si l'input Search est vide
                ) => (
                  <View
                    key={index}
                    style={[
                      styles.plane,
                      index !== 0 && styles.planeMarginTop,
                      { marginLeft: 40 },
                    ]}
                  >
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
                          color={plane.isFavorite ? '#FFCA0C' : '#002C82'}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.descPlane}>
                      <Text style={styles.text}>{plane.type}</Text>
                      <Text style={styles.descText}>{plane.description}</Text>
                    </View>
                  </View>
                )
              )
            : filterPlanesByType().map((plane, index) => (
                <View
                  key={index}
                  style={[
                    styles.plane,
                    index !== 0 && styles.planeMarginTop,
                    { marginLeft: 20 },
                  ]}
                >
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
                        color={plane.isFavorite ? 'yellow' : 'blue'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.descPlane}>
                    <Text style={styles.text}>{plane.type}</Text>
                    <Text style={styles.descText}>{plane.description}</Text>
                  </View>
                </View>
              ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  //Search
  containerSearch: {
    width: '90%',
    height: '10%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: '15%',
    padding: 10,
  },
  searchBar: {
    width: 200,
    height: '80%',

    borderWidth: 1,
    borderColor: '#002C82',

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  //Planes
  containerPlanes: {
    width: '90%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icones: {
    height: '100%',

    flexDirection: 'row',
    alignItems: 'center',

    gap: 20,
  },
  plane: {
    width: 335,
    height: 120,

    flexDirection: 'row',
    alignItems: 'center',

    fontFamily: 'Cabin-Regular',
    color: '#002C82',

    borderWidth: 1,
    borderColor: '#002C82',
    borderStyle: 'solid',
    borderRadius: 6,

    margin: 5,
    padding: 10,
  },
  //Picture,Desc, Plane
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
    fontFamily: 'Cabin-Bold',
  },

  //Icone dans Picture
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,

    backgroundColor: '#0092FF',
    borderRadius: 5,

    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});
