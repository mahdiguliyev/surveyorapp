import React, {useEffect} from 'react';
import {Text, View, Pressable, StyleSheet, Platform} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const hiddenTabRoutes = [
  'Camera',
  'PhotoEdit',
  'Contractors',
  'Projects',
  'AddProject',
  'AddContractor',
  'CreatingReport',
  'CheckReportDetail',
  'FinalReportDetail',
];

const getTabVisibility = state => {
  const route = state.routes[state.index];
  const nestedRouteName = getFocusedRouteNameFromRoute(route) ?? route.name;
  console.log('Current nested route:', nestedRouteName);
  return hiddenTabRoutes.includes(nestedRouteName) ? 'none' : 'flex';
};

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedIconWrapper = Animated.createAnimatedComponent(View);

const CustomTabBar = ({state, descriptors, navigation}) => {
  const animations = state.routes.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSharedValue(index === state.index ? 1 : 0),
  );

  useEffect(() => {
    animations.forEach((anim, i) => {
      anim.value = withTiming(i === state.index ? 1 : 0, {duration: 300});
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index]);

  return (
    <View style={[styles.main_tab, {display: getTabVisibility(state)}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel;
        const Icon = options.tabBarIcon;
        const isFocused = state.index === index;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const animatedColorStyle = useAnimatedStyle(() => {
          const color = interpolateColor(
            animations[index].value,
            [0, 1],
            ['#C2C2C2', '#0B5AAE'],
          );
          return {color};
        });

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.main_button}>
            <AnimatedIconWrapper style={[animatedColorStyle]}>
              {Icon && Icon({focused: isFocused})}
            </AnimatedIconWrapper>
            {/* <AnimatedText style={[styles.main_text, animatedColorStyle]}>
              {label}
            </AnimatedText> */}
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  main_tab: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 4,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 35 : 18,
    paddingHorizontal: 18,
    bottom: 0,
    position: 'absolute',
  },
  main_button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_text: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'SF-Pro-Rounded-Medium',
    marginTop: 5,
  },
});
