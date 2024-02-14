import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
//Composants
import FormInput from '../components/shared/FormInput';
import PasswordModal from '../components/ProfilScreen/PasswordModal';
import Header from '../components/shared/Header';

//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from 'react-native-vector-icons';
//Redux
import { useSelector, useDispatch } from "react-redux";
import { logout, addPhoto } from "../reducers/user";
//Picker
import * as ImagePicker from 'expo-image-picker';
//Navigation
import { useNavigation } from '@react-navigation/native';

export default function ProfilScreen() {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);
  console.log('userRedux:', user);
  const dispatch = useDispatch();

  //State des Inputs
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [points, setPoints] = useState('');
  const [badges, setBadges] = useState('');

  //State Image Profil
  const [selectedImage, setSelectedImage] = useState(null);

  //Gestion Navigation
  const navigation = useNavigation();

  // Chargement des données utilisateur
  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setMail(user.mail);
    setPoints(user.totalPoints);
    setBadges(user.badges);
    if (user.badges && user.badges.length > 0) {
      // Affichage des pictures des badges
      const badgesImages = user.badges.map((badge, index) => {
        return (
          <Image
            key={index}
            source={{ uri: badge.picture }}
            style={styles.emoticon}
          />
        );
      });

      setBadges(badgesImages);
    }
    setPassword(
      user.password.length > 8 ? '******' : user.password.replace(/./g, '*')
    ); //Remplace le password hashé par 8* car password demandé de 8 caractères
  }, [user]); //Mise à jour au chgt du user

  //Gestion Picker
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    const formData = new FormData();
    console.log(result);
    formData.append("photoFromFront", {
      uri: result?.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    fetch("http://192.168.1.65:3000/users/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.result && dispatch(addPhoto(data.url));
      });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };
  console.log(selectedImage);

  //Gestion LogOut
  const handleLogOut = () => {
    dispatch(logout());
    setFirstname('');
    setLastname('');
    setMail('');
    setPassword('');
    navigation.navigate('Login'); //Navigation vers Login
  };

  //Pour afficher 0 au lieu de l'erreur à cause de null
  const badgesLength = user.badges ? user.badges.length : 0;
  const planesLength = user.planes ? user.planes.length : 0;

  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header title='Welcome                                  ' />

      {/* Picture Profil & Log Out */}
      <View style={styles.containerPicture}>
        <View>
          {!selectedImage && (
            <Image
              style={styles.pictureProfil}
              source={require('../assets/user.png')}
            />
          )}
          {selectedImage && ( //Ajoute la possibilité de cliquer sur l'image quand on l'a déjà
            <TouchableOpacity onPress={pickImageAsync}>
              <Image
                style={styles.pictureProfil}
                source={{
                  uri: selectedImage,
                }}
              />
            </TouchableOpacity>
          )}
          {!selectedImage && ( //Supprime l'icone + lorsque le user à mis une photo
            <View style={styles.iconContainer}>
              <FontAwesome
                name='plus-circle'
                size={30}
                color='#F1F1F1'
                onPress={pickImageAsync}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.logout}
          onPress={() => handleLogOut()}
        >
          <Entypo
            name='log-out'
            size={30}
            color='#F1F1F1'
          />
        </TouchableOpacity>
      </View>
      {/* Titles */}
      <Text style={styles.welcome}>{user.firstname}</Text>
      <View style={styles.inputs}>
        {/* FIRST NAME */}
        <FormInput
          label='First Name'
          value={firstname}
          name='firstname'
          formStyle={styles.size}
          editable={false}
        />

        {/* LAST NAME */}
        <FormInput
          label='Last Name'
          value={lastname}
          name='lastname'
          formStyle={styles.size}
          editable={false}
        />

        {/* Email address */}
        <FormInput
          label='Email Address'
          value={mail}
          name='mail'
          formStyle={styles.size}
          editable={false}
        />

        {/* Password */}
        <View>
          <FormInput
            label='Password'
            value={password}
            name='password'
            formStyle={styles.size}
            editable={false}
          />
          <PasswordModal styleModal={styles.modal} />
        </View>
      </View>

      {/* Mini Flights */}
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
          <Text style={styles.textMiniInput}>Places visited</Text>
        </View>
        <View style={styles.miniInput}>
          <FontAwesome5
            name='award'
            size={25}
            color='#002C82'
          />
          <Text style={[styles.textMiniInput, { fontFamily: 'Cabin-Bold' }]}>
            {badgesLength}
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
            {planesLength}
          </Text>
          <Text style={styles.textMiniInput}>Aircrafts</Text>
        </View>
      </View>

      {/* Places I've visited */}
      <View>
        <FormInput
          label={`PLACE I'VE VISITED`}
          titleStyle={styles.legend}
          formStyle={styles.points}
        />
      </View>

      {/* My badges */}
      <View style={styles.blocEmoticon}>
        <View style={styles.containerTitle}>
          <Text style={styles.titleEmoticon}>MY BADGES</Text>
        </View>

        <Text>{badges}</Text>
      </View>
      {/* TOTAL POINTS */}
      <View>
        <FormInput
          label='TOTAL POINTS'
          value={points.toLocaleString()}
          name='totalPoints'
          editable={false}
          titleStyle={styles.legend}
          formStyle={styles.points}
        />
      </View>
    </SafeAreaView>
  );
}

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
    height: 42,
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Cabin-Bold',
    color: '#002C82',
  },
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

    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#002C82',

    marginBottom: 20,
    paddingHorizontal: 10,
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
});
