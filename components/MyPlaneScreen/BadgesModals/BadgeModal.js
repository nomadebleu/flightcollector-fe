import React, { useState } from 'react';
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
//Composants
import Badge from '../Badge';
//Icones
import Icon from 'react-native-vector-icons/EvilIcons';
import { FontAwesome5 } from '@expo/vector-icons';
//Redux
import { useSelector } from 'react-redux';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function BadgeModal(props) {
  //State
  const [modalVisible, setModalVisible] = useState(true);

  //Redux du user
  const user = useSelector((state) => state.user.value);

  //Modal
  const handleCloseModal = async () => {
    try {
      if (props.userBadges.length > 0) {
        const { points } = props.userBadges[0];
        const response = await fetch(
          `${apiUrl}/users/updatePoints/${user._id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pointsToAdd: points }),
          }
        );
        const data = await response.json();
        if (data.result) {
          console.log('Mis à jour avec succès');
        } else {
          console.error('Erreur lors de la mise à jour');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          handleCloseModal();
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.iconeClose}
                onPress={() => handleCloseModal()}
              >
                <Icon
                  name='close'
                  size={30}
                  color='#002C82'
                />
              </TouchableOpacity>
              {props.userBadges.map((e, i) => {
                return (
                  <View key={i}>
                    {/* Master Badge */}
                    <View style={styles.iconContainer}>
                      <FontAwesome5
                        name='award'
                        size={200}
                        color='#002C82'
                        style={styles.icon}
                      />
                      <FontAwesome5
                        name='award'
                        size={180}
                        color='#FFCA0C'
                        style={[styles.icon, styles.overlayIcon]}
                      />
                      <View style={styles.circle}></View>
                      <Image
                        source={{ uri: e.picture }}
                        style={styles.emoticonMaster}
                      />
                    </View>

                    {/* Description Badge */}
                    <View style={styles.blocText}>
                      <Text style={styles.title}>
                        {`Congratulations, you win the "${e.name} Badge" `}
                      </Text>
                    </View>

                    <View style={styles.blocText}>
                      <Text style={styles.desc}>{e.description}</Text>
                    </View>

                    <View
                      style={[
                        styles.blocText,
                        {
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          gap: 5,
                        },
                      ]}
                    >
                      <Text style={styles.boldText}>{e.points}</Text>
                      <Text style={styles.points}>points</Text>
                    </View>

                    {/* Bagdes débloqués */}
                    <View style={styles.awards}>
                      <FlatList
                        data={[
                          ...user.badges,
                          ...Array(5 - (user.badges.length % 5)).fill(null),
                        ]}
                        renderItem={({ item }) => (
                          <View style={styles.badgeWon}>
                            {item ? (
                              <>
                                <Image
                                  source={{ uri: item.picture }}
                                  style={styles.emoticon}
                                />
                                <Badge
                                  size={10}
                                  color='#002C82'
                                />
                              </>
                            ) : (
                                  <Badge
                                  size={25}
                                  color='#002C82'
                                />
                            )}
                          </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={5} // Nombre de badges par ligne
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  //Modal
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
  //Icones Close
  iconeClose: {
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
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
    fontSize: 28,
  },
  points: {
    fontFamily: 'Farsan-Regular',
    color: '#002C82',
    fontSize: 22,
  },
  blocText: {
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  desc: {
    fontFamily: 'Cabin-Regular',
    color: '#002C82',
    fontSize: 16,
    textAlign: 'center',
  },
  //Awards
  awards: {
    width: 300,
    height: 300,

    display:'flex',
    justifyContent:'center',
    alignItems:'center',
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
    top: -12,
  },
  overlayIcon: {
    top: -6,
    left: 82,
  },
  emoticonMaster: {
    width: 90,
    height: 90,

    position: 'absolute',
    top: 10,
  },
  circle: {
    width: 90,
    height: 90,
    backgroundColor: '#002C82',
    borderRadius: 55,
    position: 'absolute',
    top: 10,
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
