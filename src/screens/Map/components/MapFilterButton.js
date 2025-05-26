import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../style.map';
import SuccessTickIcon from '@assets/svg/SuccessTickIcon';
import FailedTickIcon from '@assets/svg/FailedTickIcon';
import ResetIcon from '@assets/svg/ResetIcon';
import LocationIcon from '@assets/svg/LocationIcon';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {COLORS} from '../../../components/styles/colors';

const MapFilterButton = ({
  onFilter,
  maxTranslateY,
  halfTranslateY,
  value,
  onGoToCurrentLocation,
}) => {
  const animatedOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      value.value,
      [maxTranslateY, halfTranslateY + 40],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {opacity};
  });

  return (
    <Animated.View style={[styles.map_filter_group, animatedOpacityStyle]}>
      <View style={styles.map_filter_group_button}>
        <TouchableOpacity
          style={styles.map_filter_group_button_item}
          onPress={() => onFilter(3)}>
          <View style={styles.map_filter_group_button_item_icon}>
            <ResetIcon />
          </View>
          <Text style={styles.map_filter_group_button_item_text}>Bütün</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.map_filter_group_button_item}
          onPress={() => onFilter(1)}>
          <View style={styles.map_filter_group_button_item_icon}>
            <SuccessTickIcon color={COLORS.primary} />
          </View>
          <Text style={styles.map_filter_group_button_item_text}>
            İstifadə olunmuş
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.map_filter_group_button_2}>
        <TouchableOpacity
          style={styles.map_filter_group_button_item}
          onPress={() => onFilter(0)}>
          <View style={styles.map_filter_group_button_item_icon}>
            <FailedTickIcon />
          </View>
          <Text style={styles.map_filter_group_button_item_text}>
            İstifadə olunmamış
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.map_laction}>
        <TouchableOpacity
          style={styles.map_location_button}
          onPress={onGoToCurrentLocation}>
          <LocationIcon />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default MapFilterButton;
