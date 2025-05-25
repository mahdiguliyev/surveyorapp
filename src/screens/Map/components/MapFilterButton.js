import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../style.map';
import AtmMapIcon from '@assets/svg/AtmMapIcon';
import BankMapIcon from '@assets/svg/BankMapIcon';
import LocationIcon from '@assets/svg/LocationIcon';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

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
          onPress={() => onFilter(1)}>
          <View style={styles.map_filter_group_button_item_icon}>
            <BankMapIcon />
          </View>
          <Text style={styles.map_filter_group_button_item_text}>
            Filiallar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.map_filter_group_button_item}
          onPress={() => onFilter(0)}>
          <View style={styles.map_filter_group_button_item_icon}>
            <AtmMapIcon />
          </View>
          <Text style={styles.map_filter_group_button_item_text}>
            Bankomatlar
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
