import {View, StyleSheet, StatusBar, Platform} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppText from '@components/AppText';
import LinearGradientHome from '@components/general/LinearGradientHome';

const HeaderLayout = ({
  children,
  mainTitle,
  scroll_padding,
  leftButton = null,
  rightButton = null,
  colorFrom = '#FFF',
  colorTo = '#FFF',
}) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const headerPaddingTop =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const paddingBottom = interpolate(
      scrollY.value,
      [0, 200],
      [10, 5],
      Extrapolation.CLAMP,
    );

    return {
      paddingBottom,
    };
  });
  return (
    <View style={styles.container_full}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        hidden={false}
      />
      <Animated.View
        style={[
          styles.header,
          {paddingTop: headerPaddingTop},
          headerAnimatedStyle,
        ]}>
        <LinearGradientHome
          colorFrom={colorFrom}
          colorTo={colorTo}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.headerContent}>
          <View style={styles.side}>
            {leftButton ?? <View style={styles.placeholder} />}
          </View>

          <View style={styles.center}>
            <AppText
              variant="medium"
              color="black"
              fontSize={17}
              numberOfLines={1}>
              {mainTitle}
            </AppText>
          </View>

          <View style={styles.side}>
            {rightButton ?? <View style={styles.placeholder} />}
          </View>
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[{flexGrow: 1}, scroll_padding]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={{flex: 1}}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
};

export default HeaderLayout;

const styles = StyleSheet.create({
  container_full: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  side: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});
