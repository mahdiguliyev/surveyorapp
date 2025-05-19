import {StyleSheet, View, Dimensions, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {COLORS} from '../../../components/styles/colors';

const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, index, onDotPress}) => {
  return (
    <View style={styles.container}>
      {data?.map((_, idx) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const animatedDotStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [(idx - 1) * width, idx * width, (idx + 1) * width],
            [8, 20, 8],
            Extrapolation.CLAMP,
          );

          return {
            width: dotWidth,
          };
        });

        return (
          <Pressable key={idx.toString()} onPress={() => onDotPress(idx)}>
            <Animated.View
              style={[
                styles.dot,
                animatedDotStyle,
                idx === index && styles.dotActive,
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 130,
  },
  dot: {
    height: 8,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#d7d7d7',
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
});
