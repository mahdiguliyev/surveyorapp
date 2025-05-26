import {useRef, useState, useEffect} from 'react';
import {Platform, Alert} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSharedValue} from 'react-native-reanimated';
import {PROJECTS} from '../../../constants/coordinates';

const INITIAL_REGION = {
  latitude: 40.39856,
  longitude: 47.9,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

const useMapController = MAX_TRANSLATE_Y => {
  const mapRef = useRef(null);
  const sheetRef = useRef(null);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(MAX_TRANSLATE_Y);

  const [currentRegion, setCurrentRegion] = useState(INITIAL_REGION);
  const [filteredDataSource, setFilteredDataSource] = useState(PROJECTS);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [activeDetail, setActiveDetail] = useState(false);
  const [isFilterButtonVisible, setFilterButtonVisible] = useState(true);
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    const permissionType =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    let result = await check(permissionType);

    if (result === RESULTS.DENIED) {
      result = await request(permissionType);
    }

    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      Geolocation.getCurrentPosition(
        pos => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        err => {
          console.warn('Konum alınamadı:', err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        'Konum İzni Engellendi',
        'Lütfen ayarlardan konum iznini manuel olarak açın.',
        [
          {text: 'İptal', style: 'cancel'},
          {text: 'Ayarlar', onPress: () => openSettings()},
        ],
      );
    } else if (result === RESULTS.UNAVAILABLE) {
      console.warn('Konum hizmeti bu cihazda kullanılamıyor.');
    }
  };

  // Konum izni
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Zoom
  const zoom = factor => {
    const newRegion = {
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta * factor,
      longitudeDelta: currentRegion.longitudeDelta * factor,
    };
    mapRef.current?.animateToRegion(newRegion, 500);
    setCurrentRegion(newRegion);
  };

  const zoomIn = () => zoom(0.5);
  const zoomOut = () => zoom(2);

  // Filtreleme
  const handleFilterPress = type => {
    if (type === 3) {
      setFilteredDataSource(PROJECTS);
    } else {
      const filtered = PROJECTS.filter(item => item.type === type);
      setFilteredDataSource(filtered);
    }
  };

  // Harita üzerindeki branch'e tıklama
  const handleBranchPress = branch => {
    const region = {
      latitude: branch.latitude,
      longitude: branch.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current?.animateToRegion(region, 1000);
    setCurrentRegion(region);
    setSelectedBranch(branch);
    setActiveDetail(true);
    setFilterButtonVisible(false);
    handleFilterPress(branch.type);
    sheetRef.current?.scrollTo(MAX_TRANSLATE_Y);
  };

  // Geri butonuna tıklama ve sıfırla
  const handleBackPress = () => {
    if (activeDetail) {
      setSelectedBranch(null);
      setActiveDetail(false);
      setFilterButtonVisible(true);
      setFilteredDataSource(PROJECTS);
      mapRef.current?.animateToRegion(INITIAL_REGION, 1000);
      sheetRef.current?.scrollTo(MAX_TRANSLATE_Y);
    } /* else {
      navigation.goBack();
    } */
  };
  const goToCurrentLocation = () => {
    if (location) {
      const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(region, 1000);
      setCurrentRegion(region);
    } else {
      Alert.alert(
        'Konum bulunamadı',
        'Lütfen konum izni verdiğinizden emin olun.',
      );
    }
  };

  return {
    mapRef,
    sheetRef,
    insets,
    translateY,
    currentRegion,
    filteredDataSource,
    selectedBranch,
    activeDetail,
    isFilterButtonVisible,
    location,
    zoomIn,
    zoomOut,
    handleBranchPress,
    handleFilterPress,
    handleBackPress,
    goToCurrentLocation,
    setFilteredDataSource,
    setCurrentRegion,
  };
};

export default useMapController;
