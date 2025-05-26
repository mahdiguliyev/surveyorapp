import {View, TouchableOpacity, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {COLORS} from '@components/styles/colors';
import styles from './style.map';

import MarkerMapIcon from '@assets/svg/MarkerMapIcon';
import ArrowIcon from '@assets/svg/ArrowIcon';
import PlusIcon from '@assets/svg/PlusIcon';
import MinusIcon from '@assets/svg/MinusIcon';

import MapItem from './components/MapItem';
import MapFilterButton from './components/MapFilterButton';
import useMapController from './hooks/useMapController';
import BottomInfoSheet from '../../components/sheets/BottomInfoSheet';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 600;
const HALF_TRANSLATE_Y = -SCREEN_HEIGHT / 1.3;

const MapScreen = () => {
  const {
    mapRef,
    sheetRef,
    insets,
    location,
    translateY,
    currentRegion,
    filteredDataSource,
    selectedBranch,
    activeDetail,
    isFilterButtonVisible,
    zoomIn,
    zoomOut,
    handleBranchPress,
    handleFilterPress,
    handleBackPress,
    goToCurrentLocation,
    setFilteredDataSource,
    setCurrentRegion,
  } = useMapController(MAX_TRANSLATE_Y);
  return (
    <View style={styles.container}>
      {activeDetail && (
        <View style={[styles.map_header, {top: insets.top}]}>
          <TouchableOpacity
            style={styles.map_header_back}
            onPress={handleBackPress}>
            <ArrowIcon />
          </TouchableOpacity>
        </View>
      )}

      <MapView
        ref={mapRef}
        style={styles.container}
        initialRegion={currentRegion}
        onRegionChangeComplete={setCurrentRegion}
        loadingIndicatorColor={COLORS.primaryBlue}>
        {filteredDataSource.map((branch, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: branch.latitude,
              longitude: branch.longitude,
            }}
            title={branch.title}
            onPress={() => handleBranchPress(branch)}
            pinColor={COLORS.primary}>
            <MarkerMapIcon width={36} height={36} />
          </Marker>
        ))}
      </MapView>

      <View style={styles.map_main}>
        <View style={[styles.map_controls, {bottom: SCREEN_HEIGHT / 2}]}>
          <TouchableOpacity style={styles.map_controls_button} onPress={zoomIn}>
            <PlusIcon color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.map_controls_button}
            onPress={zoomOut}>
            <MinusIcon />
          </TouchableOpacity>
        </View>

        <BottomInfoSheet
          ref={sheetRef}
          maxTranslateY={MAX_TRANSLATE_Y}
          halfTranslateY={HALF_TRANSLATE_Y}
          translateY={translateY}>
          {isFilterButtonVisible && (
            <MapFilterButton
              onFilter={handleFilterPress}
              maxTranslateY={MAX_TRANSLATE_Y}
              halfTranslateY={HALF_TRANSLATE_Y}
              value={translateY}
              onGoToCurrentLocation={goToCurrentLocation}
            />
          )}
          <MapItem
            filteredDataSource={filteredDataSource}
            handleBranchPress={handleBranchPress}
            setFilteredDataSource={setFilteredDataSource}
            activeDetail={activeDetail}
            selectedBranch={selectedBranch}
            userLocation={location}
          />
        </BottomInfoSheet>
      </View>
    </View>
  );
};

export default MapScreen;
