import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useImperativeHandle, forwardRef} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 100;

const BottomSheet = forwardRef(({children, onShow}, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback(destination => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withSpring(destination, {damping: 17});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = useCallback(() => {
    return active.value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive]);

  const context = useSharedValue({y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 1.3) {
        runOnJS(closeModal)();
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolation.CLAMP,
    );

    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active.value ? 1 : 0),
    };
  });

  const rBackdropProps = useAnimatedProps(() => {
    return {
      pointerEvents: active.value ? 'auto' : 'none',
    };
  });

  function closeModal() {
    scrollTo(0);
    onShow && onShow();
  }

  return (
    <>
      <Animated.View
        onTouchStart={() => {
          closeModal();
        }}
        animatedProps={rBackdropProps}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
          },
          styles.bg,
          rBackdropStyle,
        ]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    right: 0,
    left: 0,
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
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
  bg: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default BottomSheet;
