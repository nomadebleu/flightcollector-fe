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

  //Redux du user
  const user = useSelector((state) => state.user.value);
  console.log('user:',user)

  //State de la Modal
  const [modalVisible, setModalVisible] = useState(true);

  //Navigation lors de la connection
  const navigation = useNavigation();

  //Close Modal
  const handleCloseModal = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/addPoints`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId:user._id,
          pointsToAdd:user.badges[0].points,
        }),
      });
      console.log('response', response);
      const data = await response.json();
      console.log('Data is :', data);
      if (data.result) {
        setModalVisible(!modalVisible);
      } else {
        console.error('Error during update');
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };
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
                style={styles.iconeClose}
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
                  source={{ uri:user.badges[0].picture}}
                  style={styles.emoticonMaster}
                />
              </View>

              {/* Text */}
              <View  style={styles.blocText}>
              <Text style={styles.title}>
                {`Congratulations, you win the "${user.badges[0].name} Badge" `}
              </Text>
              </View>
              <View  style={styles.blocText}>
              <Text style={styles.desc}>
               {user.badges[0].description}
              </Text>
              </View>
              

              {/* Points */}
              <View  style={[styles.blocText,{flexDirection:'row',alignItems:'flex-end',gap:5}]}>
                <Text style={styles.boldText}>{user.badges[0].points}</Text>
                
                <Text style={styles.points}>points</Text>
              
               
              </View>

              {/* Bagdes à débloquer */}
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
