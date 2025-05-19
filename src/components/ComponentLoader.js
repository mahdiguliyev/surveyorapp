import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import { verticalScale } from '../common/Metrics';
import { ICONS } from '../constants/icons';
import { COLORS } from './styles/colors';

const ComponentLoader = ({color, height}) => {
  return (
    <View style={[styles.container, {backgroundColor: color, height: verticalScale(height)}]}>
      <ActivityIndicator
        color={COLORS.blue}
        size="large"
      />
      {/* <Image source={ICONS.loading}/> */}
    </View>
  );
};

export default ComponentLoader;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    alignContent: 'center'
  }
});
