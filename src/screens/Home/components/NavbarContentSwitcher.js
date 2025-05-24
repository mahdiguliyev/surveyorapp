import {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import AppText from '../../../components/AppText';
import Table from '../../../components/general/ReportList';
import ReportList from '../../../components/general/ReportList';
import {verticalScale} from '../../../common/Metrics';

const headers_1 = [
  {key: 'no', label: 'No'},
  {key: 'date', label: 'Tarix'},
  {key: 'user', label: 'Surveyor'},
];

const headers_2 = [
  {key: 'no', label: 'No'},
  {key: 'date', label: 'Tarix'},
  {key: 'user', label: 'Menecer'},
];

const data_1 = [
  {no: 'H-AK-001', date: '01.05.2025', user: 'Mahdi Guliyev'},
  {no: 'H-AK-002', date: '07.05.2025', user: 'Ugur Cebeci'},
  {no: 'H-AK-003', date: '10.05.2025', user: 'Saleh Nabiyev'},
  {no: 'H-AK-004', date: '15.05.2025', user: 'Yalchin Talibov'},
];

const {width} = Dimensions.get('window');

const NavbarContentSwitcher = ({activeTab}) => {
  const cardTranslateX = useSharedValue(0);
  const accountsTranslateX = useSharedValue(width);

  useEffect(() => {
    if (activeTab === 0) {
      cardTranslateX.value = withTiming(0, {duration: 300});
      accountsTranslateX.value = withTiming(width, {duration: 300});
    } else if (activeTab === 1) {
      cardTranslateX.value = withTiming(-width, {duration: 300});
      accountsTranslateX.value = withTiming(-width + 40, {duration: 300});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{translateX: cardTranslateX.value}],
  }));

  const accountsStyle = useAnimatedStyle(() => ({
    transform: [{translateX: accountsTranslateX.value}],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.slide, cardStyle]}>
        <ReportList data={data_1} headers={headers_1} />
      </Animated.View>
      <Animated.View style={[styles.slide, accountsStyle]}>
        <ReportList data={data_1} headers={headers_2} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    minHeight: verticalScale(280),
  },
  slide: {
    width: '100%',
  },
});

export default NavbarContentSwitcher;
