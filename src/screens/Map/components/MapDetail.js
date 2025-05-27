import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
  Image,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  getEstimatedDurationInMinutes,
  formatDuration,
} from '@utils/locationUtils';
import LinearGradient from '@components/LinearGradient';

import styles from '../style.map';
import SuccessTickIcon from '@assets/svg/SuccessTickIcon';
import FailedTickIcon from '@assets/svg/FailedTickIcon';
import {horizontalScale} from '../../../common/Metrics';

const MapDetail = ({detail, userLocation}) => {
  const [duration, setDuration] = useState(null);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    if (detail && userLocation) {
      const time = getEstimatedDurationInMinutes(
        userLocation,
        {
          latitude: detail.latitude,
          longitude: detail.longitude,
        },
        30,
      );
      setDuration(time);
    }

    if (detail) {
      opacity.value = withTiming(1, {duration: 400});
      translateY.value = withTiming(0, {duration: 400});
    } else {
      opacity.value = withTiming(0, {duration: 300});
      translateY.value = withTiming(20, {duration: 300});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail, userLocation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translateY.value}],
    };
  });

  const handleNavigate = () => {
    if (!detail) {
      return;
    }

    const {latitude, longitude, title} = detail;
    const label = title ?? 'Hədəf';
    const latLng = `${latitude},${longitude}`;

    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${latLng}&dirflg=d`,
      android: `geo:0,0?q=${latLng}(${label})`,
    });

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'Xəritə açıla bilmədi',
            'Cihazınız bu xəritə tətbiqini dəstəkləmir.',
          );
        }
      })
      .catch(err => console.error('Xəritə xətası:', err));
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <View style={styles.map_detail_header}>
        <View style={styles.map_detail_header_icon}>
          {detail.type === 1 ? <SuccessTickIcon /> : <FailedTickIcon />}
        </View>
        <View style={styles.map_detail_header_text_container}>
          <Text style={styles.map_detail_header_text_title}>
            {detail.project_name}
          </Text>
          <Text style={styles.map_detail_header_text_content}>
            {detail.sub_project_name}
          </Text>
        </View>
      </View>

      {/* <View>
        <TouchableOpacity
          style={styles.map_detail_button}
          activeOpacity={0.7}
          onPress={handleNavigate}>
          <View style={StyleSheet.absoluteFill}>
            <LinearGradient />
          </View>
          <View style={styles.map_detail_button_container}>
            <CarsIcon />
            <Text style={styles.map_detail_button_text}>
              {duration ? formatDuration(duration) : 'Hesablanır'}
            </Text>
          </View>
          <ArrowBack />
        </TouchableOpacity>
      </View> */}

      <View style={styles.image_container}>
        <Image
          source={detail.imageUrl}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.map_detail_card}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.map_detail_card_label}>Surveyor</Text>
            <Text style={styles.map_detail_card_text}>{detail.surveyor}</Text>
          </View>
          <View style={{marginRight: horizontalScale(15)}}>
            <Text style={styles.map_detail_card_label}>Tarix</Text>
            <Text style={styles.map_detail_card_text}>{detail.date}</Text>
          </View>
        </View>

        <View
          style={[
            styles.mt20,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <View>
            <Text style={styles.map_detail_card_label}>Hesabat nömrəsi</Text>
            <Text style={styles.map_detail_card_text}>
              {detail.report_number}
            </Text>
          </View>
          <View style={{marginRight: horizontalScale(15)}}>
            <Text style={styles.map_detail_card_label}>Status</Text>
            <Text style={styles.map_detail_card_text}>{detail.status}</Text>
          </View>
        </View>

        <View
          style={[
            styles.mt20,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <View>
            <Text style={styles.map_detail_card_label}>Kordinat</Text>
            <Text style={styles.map_detail_card_text}>
              {detail.latitude}-{detail.longitude}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default MapDetail;
