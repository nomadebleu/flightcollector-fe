import React, {useState, useEffect } from 'react';
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
import Badge from '../Badge';
//Icones
import Icon from 'react-native-vector-icons/EvilIcons';
import { FontAwesome5 } from '@expo/vector-icons';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addPoints } from '../../../reducers/user';

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function BadgeModal({userBadges}) {

  //Redux du user
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  //State de la Modal
  const [modalVisible, setModalVisible] = useState(true);

  //Navigation lors de la connection
  const navigation = useNavigation();
  
 
  //Close Modal
  const handleCloseModal = async () => {
    try {
      if (userBadges.length > 0) {
        let totalPointsToAdd = userBadges[0].points;
      const response = await fetch(`${apiUrl}/users/updatePoints/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pointsToAdd : totalPointsToAdd,
        }),
      });
      const data = await response.json();
      if (data.result){
      console.log('Mis à jour avec succes')
      } else {
        console.error('Error during update');
      }
    }
    } catch (error) {
      console.error('Error during update:', error);
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
              {userBadges.map((e, i) => {
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
                  source={{ uri: e.picture}}
                  style={styles.emoticonMaster}
                />
              </View>

                <View  style={styles.blocText}>
                <Text style={styles.title}>
                  {`Congratulations, you win the "${e.name} Badge" `}
                </Text>
                </View>
                <View  style={styles.blocText}>
                <Text style={styles.desc}>
                 {e.description}
                </Text>
                </View>
                <View  style={[styles.blocText,{flexDirection:'row',alignItems:'flex-end',gap:5}]}>
                <Text style={styles.boldText}>{e.points}</Text>
                <Text style={styles.points}>points</Text>
              </View> 
              <View style={styles.awards}> 
                <FlatList
                  data={user.badges}
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
                      
                )
              })}
              {/* ANCIEN BADGES DEBLOQUER */}
              <View style={styles.bottomBadgesContainer}>
            {user.badges.map((badge, index) => (
              <View key={index} style={styles.bottomBadge}>
                <Image
                  source={{ uri: badge.picture }}
                  style={styles.bottomBadgeImage}
                />
              </View>
            ))}
            </View>

              {/* Master Badge */}
              {/* <View style={styles.iconContainer}>
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
                  source={{ uri: userBadges.picture}}
                  style={styles.emoticonMaster}
                />
              </View> */}

              {/* Text */}
              {/* <View  style={styles.blocText}>
              <Text style={styles.title}>
                {`Congratulations, you win the "${userBadges.name} Badge" `}
              </Text>
              </View>
              <View  style={styles.blocText}>
              <Text style={styles.desc}>
               {userBadges.description}
              </Text>
              </View>
               */}

              {/* Points */}
              {/* <View  style={[styles.blocText,{flexDirection:'row',alignItems:'flex-end',gap:5}]}>
                <Text style={styles.boldText}>{userBadges.points}</Text>
                
                <Text style={styles.points}>points</Text>
              
               
              </View> */}

              {/* Bagdes à débloquer */}
              <View style={styles.awards}>
                {/* <FlatList
                  data={user.badges}
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
                /> */}
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
  blocText:{
    margin:5,
  },
  desc:{
    fontFamily: 'Cabin-Regular',
    color: '#002C82',
    fontSize: 16,
    textAlign:'center',
  },
  //Awards
  awards: {
    width: 300,
    height: 300,
  
  },
  //Master Badge
  iconContainer: {
    width: 300,
    height: 300,

    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position:'absolute',
   top:-12,

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
