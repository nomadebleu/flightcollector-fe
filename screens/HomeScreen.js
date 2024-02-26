import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
//Icones
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Entypo } from "react-native-vector-icons";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
//Navigation
import { useNavigation } from "@react-navigation/native";
//Composants
import Header from "../components/shared/Header";
import SignUpModal from "../components/LoginScreen/SignUpModal";
import { addFlight } from "../reducers/flight";

//Local address
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function HomeScreen() {
  //Utilisation du Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  //States Inputs
  const[enterReservation, setEnterReservation]= useState('');
  const[enterImmat, setEnterImmat]= useState('');

  //Gestion Navigation
  const navigation = useNavigation();

  //Gestion LogOut
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  //Gestion du Scan Aicraft
  const handleScan = () => {
    navigation.navigate("Scan");
  };
  
  //Gestion du Boarding Pass
  const handlePass = () => {
    navigation.navigate("Pass");
  };

  //Fetch des data flights
  const handleFetchDataFlight = async() => {
  try {
    const response = await fetch(`${apiUrl}/flights/${enterReservation}`)
    const flightData = await response.json();

    if (flightData.result) {
      console.log('FlightData:', flightData.data);
      dispatch(
        addFlight({
          planes: flightData.data.planes,

          departure:flightData.data.departure,
          departureScheduled: flightData.data.departureScheduled,
          departureEstimated: flightData.data.departureEstimated,
          departureActual: flightData.data.departureActual,

          arrival:flightData.data.arrival,
          arrivalScheduled:flightData.data.arrivalScheduled,
          arrivalEstimated: flightData.data.arrivalEstimated,

          iataArrival:flightData.data.airportArr.iataCode,
          iataDep:flightData.data.airportDep.iataCode,

          nbrePlaces:flightData.data.nbrePlaces,
          meals:flightData.data.meals
          })
      );

      const flightId = flightData.data._id;
      const planeId = flightData.data.planes._id

      const associateResponse = await fetch(`${apiUrl}/users/associateFlights/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flightId, planeId })
      });
  

      const associateData = await associateResponse.json();
      console.log(associateData.message); // Affiche le message de la réponse
    
      navigation.navigate('MyPlane'); 
    } else {
      console.error('Error during connection', flightData.error);
    }
  } catch (error) {
    console.error('Error during connection:', error);
  }
};
  
const handleFetchDataFlightImmat = async() => {
  try {
    const response = await fetch(`${apiUrl}/planes/${enterImmat}`)
    const planeData = await response.json();

    if (planeData.result) {
      console.log('PlaneData:', planeData.data);
      dispatch(
        addFlight({
          planes: planeData.data,
          })
      );
      navigation.navigate('MyPlane', {screen: 'Plane'}); 
    } else {
      console.error('Error during connection', planeData.error);
    }
  } catch (error) {
    console.error('Error during connection:', error);
  }
};


  return (
    <SafeAreaView style={styles.body}>
      {/* Header */}
      <Header />
      {/* Logout */}
      {user.isConnected ? (
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Entypo name="log-out" size={30} color="#F1F1F1" />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      {/* Logo & titles*/}
      <View style={styles.containerImage}>
        <Image
          source={require("../assets/Flight Collector Logo.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Hi Collector!</Text>
        <Text style={styles.title}>Are you ready to take off?</Text>
      </View>

      {/* Scan Aircraft & scan BoardingPass */}
      <View style={styles.containerScans}>
        <ImageBackground
          source={require("../assets/trajetsAvion.png")}
          style={styles.imageBack}
        >
        
        
         {/* Immatriculation Aircraft */}

         {!user.isConnected ? (
         <View style={styles.scan}>
            
            <View style={styles.icones}>
             
              <TextInput
              placeholder='Immatriculation Aircraft'
              onChangeText={(value)=> setEnterImmat(value)}
              value={enterImmat}
              style={styles.enterReservation}
              >

              </TextInput>
              <FontAwesome
                name="check-circle"
                size={30}
                color="#80C9FF"
                onPress={() => handleFetchDataFlightImmat()}
              />
              
            </View>
          </View>
         ):(
          <>
             {/* Reservation Number */}
             <View style={styles.scan}>
            
             <View style={styles.icones}>
              
               <TextInput
               placeholder='Reservation Number'
               onChangeText={(value)=> setEnterReservation(value)}
               value={enterReservation}
               style={styles.enterReservation}
               >
 
               </TextInput>
               <FontAwesome
                 name="check-circle"
                 size={30}
                 color="#80C9FF"
                 onPress={() => handleFetchDataFlight()}
               />
               
             </View>
           </View>
 
           {/*Scan Boarding Pass */}
           <View style={styles.scan}>
             <View style={styles.icones}>
               <Text style={styles.label}>Scan Boarding Pass</Text>
               <FontAwesome
                 name="camera"
                 size={30}
                 color='#002C82'
                 onPress={() => handlePass()}
               />
             </View>
           </View>
           </>
         )}
       

        </ImageBackground>
      </View>
      {!user.isConnected ? (
        <View style={styles.createAccount}>
          <Text style={styles.title}>Create an account</Text>
          <SignUpModal />
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
  },
  //Logo Flight Collector & titles
  containerImage: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1, //car sinon il cache le logout et celui ci ne fonctionne pas
  },
  image: {
    width: "80%",
    height: "50%",
    marginTop: 50,
  },
  title: {
    fontFamily: "Farsan-Regular",
    fontSize: 28,
    color: "#002C82",
    fontWeight: "bold",
    marginBottom: "3%",
  },
  //Scans
  containerScans: {
    width: 370,
    height: 190,

    overflow: "hidden", //pour voir le border radius
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#002C82",
  },
  imageBack: {
    width: "100%",
    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Cabin-Regular",
    color: "#002C82",
    fontSize: 20,
  },
  label: {
    fontFamily: "Cabin-Regular",
    color: "#002C82",
    fontSize: 20,
  },
  //Inputs
  scan: {
    margin: 10,
  },
  input: {
    width: 250,
    backgroundColor: "#F1F1F1",
  },
  icones: {
    width: 300,
    height: 55,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#002C82",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F1F1F1",
  },
  enterReservation:{
    width:'70%',
 
   fontSize:20,
   fontFamily:'Cabin-Regular',
   color:'#002C82',
  },
  //LogOut
  logout: {
    width: 50,
    height: 50,

    position: "absolute",
    top: 50,
    right: 2,
  },
  //Create Account
  createAccount: {
    width: "100%",
    height: "20%",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 20,
  },
  signup: {
    width: 200,
  },
});
