import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientHome = ({colorTo, colorFrom}) => {
  return (
    <LinearGradient
      colors={[colorFrom, colorTo]}
      start={{x: 0.9, y: 0}}
      end={{x: 0, y: 1}}
      style={StyleSheet.absoluteFill}
    />
  );
};

export default LinearGradientHome;
