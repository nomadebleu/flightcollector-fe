import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addFlight } from '../reducers/flight';

const apiKeyFlight = process.env.API_KEY_FLIGHTS;

export default function PassScreen() {
  //States
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedFlight, setScannedFlight] = useState(null);
  const [scannedFliIata, setScannedFliIata] = useState(null);
  const [scannedDep, setScannedDep] = useState(null);
  const [scannedArr, setScannedArr] = useState(null);
  const [date, setDate] = useState(null);

  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);
  const flightRedux = useSelector((state) => state.flights.value);
  const dispatch = useDispatch();

  //Navigation
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //Fonction de Scan du Boarding Pass
  const handleScan = ({ data }) => {
    if (scannedFlight) {
      return;
    }
    if (!data) {
      return null;
    }
    console.log('Data Boarding Pass:', data);
    //Répartition des données du BoardingPass
    const formattedStr = data
      .split(' ')
      .filter((e) => e !== '')
      .splice(2, 2);
    const depIata = formattedStr[0].slice(0, 3);
    const arrIata = formattedStr[0].slice(3, 6);
    const flightNumber = String(Number(formattedStr[1]));
    console.log(`depIata is :${depIata}, arrIata is :${arrIata}, flightNumber is:${flightNumber}`);
    // const flightIata = formattedStr[0].slice(6) + flightNumber;
    // console.log('Flight IATA is :', flightIata);
    // const today = new Date().toISOString().slice(0, 10);
    // setScannedFlight(flightNumber);
    // setScannedFliIata(flightIata);
    // setScannedDep(depIata);
    // setScannedArr(arrIata);
    // setDate(today);
    fetchDataToRedux(depIata, arrIata, flightNumber);
  };

  //Récupération des données pour le redux
  const fetchDataToRedux = (depIata, arrIata, flightNumber) => {
    fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${apiKeyFlight}&dep_iata=${depIata}&arr_iata=${arrIata}&flight_number=${flightNumber}`
    )
      .then((response) => response.json())
      .then((dataApi) => {
        console.log('ApiData:', dataApi);
        //On vérifie qu'il y a des data
        if (dataApi && dataApi.data && dataApi.data.length > 0) {
          const firstFlightData = dataApi.data[0]; //On dispatch uniquement le premier vol
          dispatch(
            addFlight({
            registrationNumber: firstFlightData.flight.number,
            airline: firstFlightData.airline.name,
            plane: firstFlightData.flight.iata,

            departure: firstFlightData.flight_date,
            departureScheduled: firstFlightData.departure.scheduled,
            departureEstimated: firstFlightData.departure.estimated,
            iataDep:firstFlightData.departure.iata,

            arrivalScheduled:firstFlightData.arrival.scheduled,
            arrivalEstimated: firstFlightData.arrival.estimated,
            iataArr:firstFlightData.arrival.iata,
            })
          );
        } else {
          console.log('No information for this flight.');
        }
      })
      .catch((error) => {
        console.error('Error with this flight:', error);
      });
  };
console.log('FlightRedux is :',flightRedux)

  // const handleReset = () => {
  //   setScannedFlight('');
  //   setScannedDep('');
  //   setScannedArr('');
  //   setScannedFliIata('');
  // };

  //Fermeture du Scan par l'icone
  const handleClose = () => {
    if (user.isConnected) {
      navigation.navigate('TabNavigator');
    } else {
      navigation.navigate('Home');
    }
  };

  if (!hasPermission) {
    return <View />;
  }

  let scanContainer;
  if (scannedFlight) {
    scanContainer = (
      <View style={styles.menu}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // onPress={() => handleReset()}
            style={styles.button}
          >
            <Text style={styles.text}>Scan again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsHeader}>
        <TouchableOpacity style={styles.buttonClose}>
          <FontAwesome
            name='close'
            size={25}
            color={'#ffffff'}
            onPress={() => handleClose()}
          />
        </TouchableOpacity>
      </View>
      <BarCodeScanner
        onBarCodeScanned={(e) => handleScan(e)}
        style={styles.scanner}
      />
      {scanContainer}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanner: {
    flex: 1,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#002c82',
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  buttonClose: {
    marginTop: 15,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  buttonsHeader: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '75%',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
});
