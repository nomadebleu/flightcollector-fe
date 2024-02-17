import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
//Camera
import { Camera, CameraType, FlashMode } from 'expo-camera';
//Icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Navigation
import { useIsFocused, useNavigation } from '@react-navigation/native';
//Redux
import { useSelector } from 'react-redux';

export default function ScanScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  //Utilisation du Redux
  const user = useSelector((state) => state.user.value);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleClose = () => {
    if (user.isConnected) {
      navigation.navigate('TabNavigator');
    } else {
      navigation.navigate('Home');
    }
  };
  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();
    console.log(photo);
    formData.append('photoFromFront', {
      uri: photo?.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    // fetch('https://flightcollector-be.vercel.app/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.result);
    //   });
    // Naviguer vers MyPlane après avoir pris la photo
    navigation.navigate('MyPlane');
  };

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef = ref)}
      style={styles.camera}
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
          style={styles.button}
        >
          <FontAwesome
            name='rotate-right'
            size={25}
            color='#ffffff'
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
            )
          }
          style={styles.button}
        >
          <FontAwesome
            name='flash'
            size={25}
            color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome
            name='close'
            size={25}
            color={'#ffffff'}
            onPress={() => handleClose()}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome
            name='circle-thin'
            size={95}
            color='#ffffff'
          />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
});
