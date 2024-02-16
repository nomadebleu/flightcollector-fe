import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const navigation = useNavigation();
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  function extractData(data) {
    const pattern = /\b\d{4}\b/;
    const match = data.match(pattern);
    return match ? match[0] : null;
  }
  const handleScan = ({ data }) => {
    if (!scannedData) {
      setScannedData(extractData(data));
    }
    console.log(scannedData);
  };

  const handleReset = () => {
    setScannedData(null);
  };
  handleClose = () => {
    if (user.isConnected) {
      navigation.navigate("TabNavigator");
    } else {
      navigation.navigate("Home");
    }
  };

  if (!hasPermission) {
    return <View />;
  }

  let scanContainer;
  if (scannedData) {
    scanContainer = (
      <View style={styles.menu}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleReset()} style={styles.button}>
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
            name="close"
            size={25}
            color={"#ffffff"}
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
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#002c82",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
  buttonClose: {
    marginTop: 15,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  buttonsHeader: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "75%",
  },
  menu: {
    display: "flex",
    alignItems: "center",
  },
});
