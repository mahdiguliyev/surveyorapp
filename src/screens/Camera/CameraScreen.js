import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';

export default function CameraScreen() {
  const [isEmulator, setIsEmulator] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    console.log('CameraScreen mounted');
    // Check if running on emulator/simulator
    DeviceInfo.isEmulator().then(setIsEmulator);
  }, []);

  const takePhoto = async () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Camera error');
        } else {
          console.log('test');
          const uri = response.assets?.[0]?.uri;
          console.log('Photo URI:', JSON.stringify(uri));
          setPhotoUri(uri);
          //Alert.alert('📸 Photo Taken!');
        }
      },
    );
  };

  /* if (isEmulator) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>
          📵 Camera is not available on simulator. Please use a real device.
        </Text>
      </View>
    );
  } */

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image source={{uri: photoUri}} style={StyleSheet.absoluteFill} />
      ) : (
        <View style={styles.center}>
          <Text style={styles.infoText}>📷 Tap the button to take a photo</Text>
        </View>
      )}

      <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
        <View style={styles.innerButton} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
});
