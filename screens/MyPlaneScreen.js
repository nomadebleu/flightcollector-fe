import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Button, Image, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapView from 'react-native-maps';

export default function MyPlaneScreen() {
    const [showModal, setShowModal] = useState(true);
    const [badge, setBadge] = useState(null);

    useEffect(() => {
        fetchBadge();
    }, []);

    const fetchBadge = async () => {
        try {
            const response = await fetch("https://flightcollector-be.vercel.app/badges/65c25ff23511d200c07c0a95");
            const data = await response.json();
            setBadge(data);
        } catch (error) {
            console.error("Erreur lors de la récupération du badge :", error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
      <LinearGradient
        colors={["rgba(128, 201, 255, 1)", "rgba(1, 45, 131, 1)"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.header}
        
      >
       <Text style={styles.title}>MyPlane</Text> 
      </LinearGradient>
       {/* Map */}
       <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0,
                        longitudeDelta: 0.01,
                    }}
                />
            </View>
            <Text style={styles.text}>Bienvenue sur MyPlane !</Text>
            <Modal visible={showModal} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {badge ? (
                            <>
                                <Text>Félicitations ! Voici le badge récupéré :</Text>
                                <Image
                                    source={{ uri: badge.picture }}
                                    style={{ width: 100, height: 100 }}
                                />
                                <Text>Nom: {badge.name}</Text>
                                <Text>Points : {badge.points} </Text>
                                <Text>Description: {badge.description}</Text>

                            </>
                        ) : (
                            <Text>Chargement des données...</Text> 
                        )}
                        <Button title="Fermer" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        width: '100%',
        paddingHorizontal: 20, // Ajoute de l'espace horizontal
        paddingVertical: 20, // Ajoute de l'espace vertical
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
      },
      mapContainer: {
        width: '70%',
        height: 200, // ou toute autre hauteur désirée
        marginTop: -200,
    },
    map: {
        flex: 1,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparence pour le fond du modal
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      alignItems: 'center',
    },
      title: {
        fontFamily: 'Farsan-Regular',
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%', // pour occuper toute la largeur
        marginBottom: 20,
        marginTop: 20,
      },
  });
    
