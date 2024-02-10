import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Button, Image } from "react-native";

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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
});
