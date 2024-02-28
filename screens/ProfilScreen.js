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
import PasswordModal from '../components/shared/PasswordModal';
import Header from '../components/shared/Header';
import BlueBloc from '../components/ProfilScreen/BlueBlocs';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Entypo } from 'react-native-vector-icons';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout, addPhoto } from '../reducers/user';
//Picker
import * as ImagePicker from 'expo-image-picker';
//Navigation
import { useNavigation } from '@react-navigation/native';


export default function ProfilScreen() {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);
  const userBadges = useSelector((state) => state.badge.value);
  const dispatch = useDispatch();

  //LocalHost
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  //State des Inputs
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  //State Image Profil
  const [selectedImage, setSelectedImage] = useState(null);

  //Gestion Navigation
  const navigation = useNavigation();

  // Chargement des données utilisateur
  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setMail(user.mail);
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
    formData.append('photoFromFront', {
      uri: result?.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    fetch(`${apiUrl}/users/upload`, {
      method: 'POST',
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
          <PasswordModal
            styleModal={styles.modal}
            title='Change your password'
          />
        </View>
      </View>
      {/* Mini Flights */}
      <View>
        <BlueBloc
          userBadges={userBadges}
          user={user}
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
    width: 35, 
    height: 35,

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
  size: {
    height: 42,
  },
  //Modal Password Change
  modal: {
    position: 'absolute',
    right: 0,
    top: 40,
  },
});
