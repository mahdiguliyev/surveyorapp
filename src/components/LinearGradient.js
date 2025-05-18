import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientOverlay = () => {
  return (
    <LinearGradient
      colors={['#534EE0', '#0B5AAE']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={StyleSheet.absoluteFill}
    />
  );
};

export default GradientOverlay;
