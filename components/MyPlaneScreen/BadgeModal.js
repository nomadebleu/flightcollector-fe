import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
//Navigation
import { useNavigation } from '@react-navigation/native';
//Composants
import Badge from './Badge';
//Icones
import Icon from 'react-native-vector-icons/EvilIcons';
import { FontAwesome5 } from '@expo/vector-icons';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addBadge } from '../../reducers/badge';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function BadgeModal() {
  //Utilisation du Redux
  const dispatch = useDispatch();
  const badge = useSelector((state) => state.badge.value);
  const user = useSelector((state) => state.user.value);
  console.log('badge:', badge);
  console.log('user:',user)

  //State de la Modal
  const [modalVisible, setModalVisible] = useState(true);

  //Navigation lors de la connection
  const navigation = useNavigation();

  //Close Modal
  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };

  //Data Provisoire
  const badgesUser = [
    { picture: 'https://emojicdn.elk.sh/😊' },
    { picture: 'https://emojicdn.elk.sh/🥵' },
    { picture: 'https://emojicdn.elk.sh/🥶' },
    { picture: 'https://emojicdn.elk.sh/🥶' },
    { picture: 'https://emojicdn.elk.sh/🤩' },
    { picture: 'https://emojicdn.elk.sh/🥵' },
    { picture: 'https://emojicdn.elk.sh/🥶' },
    { picture: 'https://emojicdn.elk.sh/🥶' },
    { picture: 'https://emojicdn.elk.sh/🤩' },
    { picture: 'https://emojicdn.elk.sh/🥵' },
    { picture: 'https://emojicdn.elk.sh/🥶' },
    { picture: 'https://emojicdn.elk.sh/🥶' },
    { picture: 'https://emojicdn.elk.sh/🤩' },
    { picture: 'https://emojicdn.elk.sh/🥵' },
    { picture: 'https://emojicdn.elk.sh/🥶' },
    { picture: 'https://emojicdn.elk.sh/🥶' },
  ];

//Pour récupérer le badge Discover
useEffect(() => {
  const getDiscover = async () => {
    try {
      const response = await fetch(`${apiUrl}/badges/65c25ff23511d200c07c0a95`);
      const data = await response.json();

      console.log('Les données sont :', data);

      // Envoie des éléments dans le REDUX
      dispatch(
        addBadge({
          picture: data.picture,
          name: data.name,
          description: data.description,
          points: data.points,
        })
      );
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des données du badge :',
        error
      );
    }
  };

  getDiscover(); 

}, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.icone}
                onPress={() => handleCloseModal()}
              >
                <Icon
                  name='close'
                  size={30}
                  color='#002C82'
                />
              </TouchableOpacity>

              {/* Master Badge */}
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name='award'
                  size={300}
                  color='#002C82'
                  style={styles.icon}
                />
                <FontAwesome5
                  name='award'
                  size={280}
                  color='#FFCA0C'
                  style={[styles.icon, styles.overlayIcon]}
                />
                <View style={styles.circle}></View>
                <Image
                  source={{ uri: badge[0].picture }}
                  style={styles.emoticonMaster}
                />
              </View>

              {/* Text */}
              <Text style={styles.title}>
                {`Congratulations, you win the "${badge[0].name} Badge" `}
              </Text>

              {/* Points */}
              <Text>
                <Text style={styles.boldText}>{badge[0].points}</Text>
                <Text style={styles.points}>points</Text>
              </Text>

              {/* Bagdes à débloquer */}
              <View style={styles.awards}>
                <FlatList
                  data={badgesUser}
                  renderItem={({ item }) => (
                    <View style={styles.badgeWon}>
                      <Image
                        source={{ uri: item.picture }}
                        style={styles.emoticon}
                      />
                      <Badge
                        size={10}
                        color='#002C82'
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={5} // Nombre de badges par ligne
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    height: '90%',

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
  //Icones
  icone: {
    width: 340,
    alignItems: 'flex-end',
  },
  //Text
  title: {
    textAlign: 'center',
    fontFamily: 'Farsan-Regular',
    fontSize: 28,
    color: '#002C82',
    fontWeight: 'bold',
    marginBottom: '3%',
    marginTop: '5%',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#002C82',
    fontSize: 28,
  },
  points: {
    fontFamily: 'Farsan-Regular',
    color: '#002C82',
    fontSize: 22,
  },
  //Awards
  awards: {
    width: 300,
    height: 300,
    marginTop: '5%',
  },
  //Master Badge
  iconContainer: {
    width: 300,
    height: 300,

    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
  },
  overlayIcon: {
    top: 7,
    left: 45,
  },
  emoticonMaster: {
    width: 110,
    height: 110,

    position: 'absolute',
    top: 50,
  },
  circle: {
    width: 110,
    height: 110,
    backgroundColor: '#002C82',
    borderRadius: 55,
    position: 'absolute',
    top: 50,
  },
  badgeWon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 15,
  },
  emoticon: {
    width: 25,
    height: 25,
  },
});
