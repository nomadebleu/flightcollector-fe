import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
//Gradient
import { LinearGradient } from 'expo-linear-gradient';
//Composants
import FormInput from './FormInput';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from 'react-native-vector-icons';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
//Picker
import * as ImagePicker from "expo-image-picker";
//Navigation
import { useNavigation } from '@react-navigation/native';

export default function Profil() {
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  //State des Inputs
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

    //Gestion Navigation
    const navigation = useNavigation();

  // Chargement des données utilisateur
  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setMail(user.mail);
    setPassword(user.password.length > 6 ? '******' : user.password.replace(/./g, '*'));//Remplace le password hashé par 6* car password demandé de 8 caractères
  }, [user]); //Mise à jour au chgt du user

  //State Image Profil
  const [selectedImage, setSelectedImage] = useState(null);

  //Gestion Picker
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);

      console.log(result);
    } else {
      alert("You did not select any image.");
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
  navigation.navigate('Login');//Navigation vers Login
};


  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(128, 201, 255, 1)', 'rgba(1, 45, 131, 1)']}
        start={[0, 1]} //Début du dégradé suivant x,y
        end={[1, 0]} //Fin du dégradé
        style={styles.header}
      ></LinearGradient>

      {/* Picture Profil & Log Out */}
      <View style={styles.containerPicture}>
        <View>
      
        {!selectedImage && (
          <Image
            style={styles.pictureProfil}
            source={require("../assets/user.png")}
          />
        )}
        {selectedImage && (//Ajoute la possibilité de cliquer sur l'image quand on l'a déjà
          <TouchableOpacity onPress={pickImageAsync}>
          <Image
            style={styles.pictureProfil}
            source={{
              uri: selectedImage,
            }}
          />
          </TouchableOpacity>
        )}
        {!selectedImage && (//Supprime l'icone + lorsque le user à mis une photo
        <View style={styles.iconContainer}>
        <FontAwesome
          name="plus-circle"
          size={30}
          color="#F1F1F1"
          onPress={pickImageAsync}
        />
        </View>
        )}

        </View>
        <TouchableOpacity style={styles.logout} onPress={()=>handleLogOut()}>
        <Entypo name="log-out" size={30} color="#F1F1F1"/>
        </TouchableOpacity>
      
      </View>
      {/* Titles */}
      <Text style={styles.welcome}>{`Welcome back ${user.firstname}`}!</Text>
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
        <FormInput
          label='Password'
          value={password}
          name='password'
          formStyle={styles.size}
          editable={false}
        />
      </View>

      {/* Change your password */}
      <TouchableOpacity>
        <Text style={styles.forgotten}>Change your password?</Text>
      </TouchableOpacity>

      {/* Mini Flights */}
      <View style={styles.containerMiniInput}>
        <TextInput style={styles.miniInput}>
          <FontAwesome
            name='star'
            size={25}
          />{' '}
          starred flights
        </TextInput>
        <TextInput style={styles.miniInput}>
          <FontAwesome
            name='map-marker'
            size={25}
          />{' '}
          place visited
        </TextInput>
        <TextInput style={styles.miniInput}>
          <FontAwesome5
            name='award'
            size={25}
          />{' '}
          Badges
        </TextInput>
        <TextInput style={styles.miniInput}>
          <FontAwesome
            name='plane'
            size={25}
          />{' '}
          Aircrafts saved
        </TextInput>
      </View>

      {/* Places I've visited */}
      <FormInput
        label={`PLACE I'VE VISITED`}
        titleStyle={styles.legend}
        formStyle={styles.size}
      />
      {/* My badges */}
      <FormInput
        label='MY BADGES'
        titleStyle={styles.legend}
        formStyle={styles.size}
      />

      {/* TOTAL POINTS */}
      <FormInput
        label='TOTAL POINTS'
        titleStyle={styles.legend}
        formStyle={styles.size}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
  },
  //Header
  header: {
    width: '100%',
    height: 100,

    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: 0,
  },
  //Titles
  welcome: {
    fontFamily: 'Farsan-Regular',
    fontSize: 32,
    color: '#002C82',
  },
  //Profil Picture
  containerPicture: {
    width:'100%',
    height:100,

    flexDirection:'row',
    justifyContent:'center',
  },
  pictureProfil: {
    width: 100,
    height: 100,
 
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#002C82',
    backgroundImage: 'url("../assets/user.png")',
  },
  //Icone +
  iconContainer:{
    width: 35, // Largeur de l'icône
    height: 35, // Hauteur de l'icône
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    backgroundColor: '#002C82',
   
    borderRadius: 20,
 
  },
  //LogOut
  logout:{
    width:50,
    height:50,

    position:'absolute',
    right:2,
    alignItems:'center',
  },
  // Inputs
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
  //Forgotten
  forgotten: {
    fontFamily: 'Farsan-Regular',
    fontSize: 15,
    color: '#002C82',

    position: 'absolute', //pour éviter qui gêne la répartition des 3 boutons
    marginTop: 10,
    marginLeft: 20,
  },
  //MiniInputs
  containerMiniInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  miniInput: {
    width: '40%',
    height: 45,

    textAlign: 'center',
    textAlignVertical: 'center',

    margin: 10,
    borderWidth: 1,
    borderColor: '#002C82',
    backgroundColor: '#80C9FF',
    borderRadius: 5,

    fontFamily: 'Farsan-Regular',
    fontSize: 20,
    color: '#002C82',
  },
});
