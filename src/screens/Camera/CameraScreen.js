import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {CommonActions, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera} from 'react-native-image-picker';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import ArrowIcon from '@assets/svg/ArrowIcon';
import DeviceInfo from 'react-native-device-info';
import {COLORS} from '../../components/styles/colors';
import PlusIcon from '@assets/svg/PlusIcon';
import {horizontalScale, verticalScale} from '../../common/Metrics';

const PHOTO_MODE = 'PHOTO';
const VIDEO_MODE = 'VIDEO';
const TEXT_MODE = 'TEXT';

const CameraScreen = () => {
  const navigation = useNavigation();
  const [isEmulator, setIsEmulator] = useState(false);
  const [currentMode, setCurrentMode] = useState(PHOTO_MODE);

  const [photoUri, setPhotoUri] = useState(null);
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState(null);
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(true);
  const translateX = useSharedValue(500);

  const checkAndSetCameraPermission = async () => {
    const permissionType =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const status = await check(permissionType);
    setCameraPermissionStatus(status);
  };

  const requestCameraPermission = async () => {
    const permissionType =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const result = await request(permissionType);
    setCameraPermissionStatus(result);
  };

  useEffect(() => {
    translateX.value = withTiming(0, {duration: 400});

    const initPermissions = async () => {
      DeviceInfo.isEmulator().then(setIsEmulator);
      setIsLoadingPermissions(true);
      await checkAndSetCameraPermission();
      setIsLoadingPermissions(false);
    };

    initPermissions();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const takePhotoOrVideo = async () => {
    if (cameraPermissionStatus !== RESULTS.GRANTED) {
      Alert.alert(
        'Permission Missing',
        'Camera access is required. Please grant it in settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => openSettings()},
        ],
      );
      return;
    }

    if (currentMode === PHOTO_MODE) {
      launchCamera(
        {
          mediaType: 'photo',
          cameraType: 'back',
          saveToPhotos: false,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.errorCode) {
            Alert.alert('Error', response.errorMessage || 'Camera error');
          } else {
            const uri = response.assets?.[0]?.uri;
            console.log('Photo captured:', uri);
            setPhotoUri(uri);
          }
        },
      );
    } else if (currentMode === VIDEO_MODE) {
      launchCamera(
        {
          mediaType: 'video',
          cameraType: 'back',
          saveToPhotos: true,
          videoQuality: 'high',
          durationLimit: parseInt(selectedVideoDuration) || 60,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled video capture');
          } else if (response.errorCode) {
            Alert.alert(
              'Error',
              response.errorMessage || 'Video capture error',
            );
          } else {
            const uri = response.assets?.[0]?.uri;
            setPhotoUri(uri);
            console.log('Video captured:', uri);
          }
        },
      );
    } else if (currentMode === TEXT_MODE) {
      Alert.alert('Text Mode', 'Switching to text input screen...');
      // Assuming 'TextInputScreen' is a route in your navigator
      navigation.navigate('TextInputScreen');
    }
  };

  const renderCameraUI = () => {
    return (
      <>
        {photoUri ? (
          <Image source={{uri: photoUri}} style={StyleSheet.absoluteFill} />
        ) : (
          <View style={styles.cameraPreviewPlaceholder}>
            <Text style={styles.cameraPreviewText}>Camera Preview</Text>
          </View>
        )}

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.bottomBarThumbnail}
            onPress={() => {
              //navigation.navigate('Test');
              /* if (photoUri) {
                console.log('Photo url:', photoUri);
                navigation.navigate('PhotoEdit', {
                  photoUrl: photoUri, // e.g. after taking a photo
                });
              } */
            }}>
            {photoUri ? (
              <Image
                source={{uri: photoUri}}
                style={styles.bottomBarThumbnailImage}
              />
            ) : (
              <Image
                source={require('../../assets/images/unusedimages/surveyor_image_3.jpg')} // Ensure this path is correct
                style={styles.bottomBarThumbnailImage}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePhotoOrVideo}>
            <View style={styles.innerButton} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomBarSpace}></TouchableOpacity>
        </View>
      </>
    );
  };

  const renderContent = () => {
    /* if (isEmulator) {
      return (
        <View style={styles.center}>
          <Text style={styles.infoText}>
            📵 Camera is not available on simulator. Please use a real device.
          </Text>
        </View>
      );
    } */

    if (cameraPermissionStatus == null || isLoadingPermissions) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.infoText}>Checking permissions...</Text>
        </View>
      );
    }

    if (cameraPermissionStatus === RESULTS.GRANTED) {
      return renderCameraUI();
    }

    if (cameraPermissionStatus === RESULTS.DENIED) {
      return (
        <View style={styles.center}>
          <Text style={styles.permissionText}>
            We need access to your camera.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={requestCameraPermission}>
            <Text style={styles.buttonText}>Grant Camera Access</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (
      cameraPermissionStatus === RESULTS.BLOCKED ||
      cameraPermissionStatus === RESULTS.UNAVAILABLE
    ) {
      return (
        <View style={styles.center}>
          <Text style={styles.permissionText}>
            Camera access is blocked or unavailable. Please enable it in
            settings.
          </Text>
          <TouchableOpacity style={styles.button} onPress={openSettings}>
            <Text style={styles.buttonText}>Open Settings</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <LinearGradient
      colors={['#b41cdd', '#c158dd']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <Animated.View style={[{flex: 1}, animatedStyle]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.closeButton}>
            <ArrowIcon color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.image_controls_button}
            onPress={() => {
              alert('Image saved');
            }}>
            <PlusIcon color={COLORS.black} />
          </TouchableOpacity>
        </View>
        {renderContent()}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(25),
    paddingTop: Platform.OS === 'ios' ? verticalScale(100) : verticalScale(70),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  closeButton: {
    padding: '4%',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginTop: 10, // Add some margin to the text below ActivityIndicator
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  permissionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  openSettingsButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openSettingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cameraPreviewPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cameraPreviewText: {
    color: '#fff',
    fontSize: 18,
    opacity: 0.7,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:
      Platform.OS === 'ios' ? verticalScale(30) : verticalScale(15),
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomBarThumbnail: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBarSpace: {
    width: horizontalScale(50),
    height: verticalScale(50),
  },
  bottomBarThumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  captureButton: {
    width: horizontalScale(70),
    height: verticalScale(70),
    borderRadius: 35,
    backgroundColor: '#ffffff88',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(10),
  },
  innerButton: {
    width: horizontalScale(50),
    height: verticalScale(50),
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  image_controls_button: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
});

export default CameraScreen;
