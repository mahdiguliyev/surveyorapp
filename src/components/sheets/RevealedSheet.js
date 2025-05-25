import React, {useImperativeHandle, useCallback, forwardRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const RevealedSheet = forwardRef(
  ({children, maxTranslateY, halfTranslateY, translateY}, ref) => {
    const context = useSharedValue({y: 0});

    const scrollTo = useCallback(
      destination => {
        'worklet';
        translateY.value = withSpring(destination, {damping: 50});
      },
      [translateY],
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          scrollTo,
          translateY,
        };
      },
      [scrollTo, translateY],
    );

    const panGesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(
          Math.min(translateY.value, 0),
          halfTranslateY,
        );
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 1.5) {
          scrollTo(maxTranslateY);
        }
      });

    const rSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [maxTranslateY, halfTranslateY],
        [25, 0],
        Extrapolation.CLAMP,
      );

      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, rSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

export default RevealedSheet;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT, // ekranın altından başlasın
    borderRadius: 30,
    zIndex: 100,
    paddingHorizontal: 20,
  },
  line: {
    width: 40,
    height: 4,
    backgroundColor: '#D7D7D7',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 2,
  },
});
