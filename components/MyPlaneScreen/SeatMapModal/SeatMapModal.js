import {
  StyleSheet,
  Image,
  View,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
//Composants
import FormButton from "../../shared/FormButton";
//Redux
import { useSelector } from "react-redux";
//Icones
import Icon from "react-native-vector-icons/EvilIcons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SeatMapModal() {
  //Utilisation du Redux
  const flightRedux = useSelector((state) => state.flights.value);

  //L'image du flight
  const seatMap = flightRedux[0].planes.seatMap;
  console.log("here is the link seatmap:", seatMap);
  //Backend
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  //State de la Modal
  const [modalVisible, setModalVisible] = useState(false);
  //Close open Modal
  const handleConnect = () => {
    setModalVisible(true);
  };
  //Close Modal
  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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
                <Icon name="close" size={30} color="#002C82" />
              </TouchableOpacity>
              <View>
                {/* Photo Seat Map*/}
                <Image
                  source={{ uri: seatMap }}
                  style={{ width: 100, height: 100, resizeMode: "stretch" }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <FormButton
        onPress={() => setModalVisible(true)}
        title="Seat Map"
        titleStyle={styles.textBtnSignIn}
        formStyle={styles.buttonSignIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "70%",

    backgroundColor: "#F1F1F1",
    borderRadius: 30,
    padding: 10,

    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#002C82",
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
    backgroundColor: "rgba(0, 146, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  //Sign In
  textBtnSignIn: {
    color: "#002C82",
    fontFamily: "Cabin-Bold",
    letterSpacing: 5,
    fontSize: 20,
  },
  buttonSignIn: {
    width: 245,
    height: 55,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    backgroundColor: "#80C9FF",
    borderColor: "#002C82",
    borderWidth: 2,
  },
  //Connect
  size: {
    width: 200,
  },
  //Icone
  icone: {
    width: "100%",
    alignItems: "flex-end",
    position: "absolute",
    top: 20,
  },
  //Modal Password
  modal: {
    position: "absolute",
    right: 0,
    top: 135,
  },
  plane: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
});
