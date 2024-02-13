import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
//Composants
import Header from '../components/shared/Header';
import Flight from '../components/MyPlaneScreen/Flight';
import Plane from '../components/MyPlaneScreen/Plane';
import Services from '../components/MyPlaneScreen/Services';
import BadgeModal from '../components/MyPlaneScreen/BadgeModal';
import MapView from 'react-native-maps';


//Icones
import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Redux
import { useSelector } from 'react-redux';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

//Définition de la navigation indépendante
const Tab = createMaterialTopTabNavigator();

export default function MyPlaneScreen() {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);

  //State pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState('Services');

  // Création d'une fonction pour personnaliser le onPress de la Tab & la navigation
  function CustomTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
        {state.routes.map((route, index) => {
          //On map chaque route & on extrait les descriptors(options)
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;

          const onPress = () => {
            //Fonction onPress sur chaque onglet
            navigation.navigate(route.name);
            setActiveTab(route.name);
          };

          return (
         
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 15,
                backgroundColor:
                  activeTab === route.name ? '#06D6A0' : '#002C82',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderStyle: 'solid',
                borderColor: activeTab === route.name ? '#06D6A0' : '#fff',
              }}
            >
             
              <Text
                style={{
                  color: activeTab === route.name ? '#002C82' : '#fff',
                  fontSize: 16,
                  fontFamily: 'Cabin-Bold',
                }}
              >
                {label}
              </Text>
             
            </TouchableOpacity>
           
          );
        })}
      </View>
    );
  }

  //Gestion Navigation
  const navigation = useNavigation();

  //Navigation vers Home
  const handleClickToHome = () => {
    if (user.isConnected) {
      navigation.navigate('TabNavigator');
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header title='My Plane' />

      <View style={styles.blocImage}>
        {/* Bloc Amovible */}
        {activeTab === 'Flight' && <FlightBlock />}
        {activeTab === 'Plane' && <PlaneBlock />}
        {activeTab === 'Services' && <ServicesBlock />}
      </View>

      {/* Iata */}
      <View style={styles.blocIata}>
        <Text style={styles.iata}>CDG</Text>
        <FontAwesome
          name='plane'
          size={45}
          color='#002C82'
          style={{ transform: [{ rotate: '45deg' }] }}
        />
        <Text style={styles.iata}>DXB</Text>
      </View>

      {/* Nav Onglets */}
      <View style={styles.blocOnglets}>
        {/* props independent pour détacher de la nav globale */}
        <NavigationContainer independent={true}>
          <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen
              name='Flight'
              component={Flight}
              options={{ tabBarLabel: 'Flight' }}
            />
            <Tab.Screen
              name='Plane'
              component={Plane}
              options={{ tabBarLabel: 'Plane' }}
            />
            <Tab.Screen
              name='Services'
              component={Services}
              options={{ tabBarLabel: 'Services' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>

      {/* Bloc Points & Nav */}
      <View style={styles.blocPoints}>
        <Text style={styles.text}>This scan will give you 150 pts</Text>
        <TouchableOpacity onPress={() => handleClickToHome()}>
          <FontAwesome5
            name='chevron-circle-left'
            size={50}
            color='#002C82'
          />
        </TouchableOpacity>
      </View>
      {/* Modal Badges */}
      <BadgeModal />
    </SafeAreaView>
  );
}

//Les Blocs Image
const FlightBlock = () => (
  
    <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0,
            longitudeDelta: 0.01,
          }}
        />
      </View>
  
);

const PlaneBlock = () => (
  <>
    <Text>Plane Block Content</Text>
  </>
);

const ServicesBlock = () => (
  <>
    <View style={styles.poster}></View>
    <View style={styles.movie}>
      <View style={styles.title}></View>
      <View style={styles.desc}></View>
    </View>
  </>
);
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blocOnglets: {
    width: '95%',
    height: '40%',
    marginTop: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  blocImage: {
    width: '80%',
    height: '20%',

    flexDirection: 'row',
    marginTop: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#002C82',
  },
  blocPoints: {
    width: '95%',
    height: '20%',
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  blocIata: {
    width: '60%',
    height: '%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    marginTop: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 10, // Pour s'adapter au bloc
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#06D6A0',
  },
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
    color: '#002C82',
  },
  iata: {
    fontFamily: 'Cabin-Bold',
    fontSize: 35,
  },
  //Movie
  poster: {
    width: '40%',
    height: '100%',
    backgroundColor: 'red',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  movie: {
    backgroundColor: 'pink',
    width: '60%',
    height: '100%',

    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: '#002C82',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  desc: {
    backgroundColor: 'green',
    width: '100%',
    height: '70%',
    borderBottomRightRadius: 10,
  },
  title: {
    backgroundColor: 'violet',
    width: '100%',
    height: '30%',

    borderTopRightRadius: 10,
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    borderRadius:10,
    overflow: 'hidden', //Pour voir le radius
   
  },
  map: {
    flex: 1,
  },
});

