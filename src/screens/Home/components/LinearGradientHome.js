import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useHomeTheme} from '../context/HomeThemeProvider';

const LinearGradientHome = () => {
  const {colors} = useHomeTheme();
  return (
    <LinearGradient
      colors={[colors.colorFrom, colors.colorTo]}
      start={{x: 0.9, y: 0}}
      end={{x: 0, y: 1}}
      style={StyleSheet.absoluteFill}
    />
  );
};

export default LinearGradientHome;
