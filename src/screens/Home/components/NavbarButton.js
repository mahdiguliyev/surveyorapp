import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';
import AppText from '@components/AppText';

const TABS = ['Gözləyən (6)', 'Düzəliş gözələyən (4)'];

const NavbarButton = ({
  activeTab,
  onTabPress,
  highlightRef,
  animateHighlight,
}) => {
  const tabLayouts = useRef([]);
  const [layoutReady, setLayoutReady] = useState(false);

  const translateX = useSharedValue(0);
  const highlightWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    width: highlightWidth.value,
  }));

  const handleLayout = (e, index) => {
    const {x, width} = e.nativeEvent.layout;
    tabLayouts.current[index] = {x, width};

    if (tabLayouts.current.filter(Boolean).length === TABS.length) {
      setLayoutReady(true);
      if (highlightRef) {
        highlightRef.current = {
          translateX,
          highlightWidth,
          layouts: tabLayouts.current,
        };
      }
    }
  };

  useEffect(() => {
    if (!layoutReady || !tabLayouts.current[activeTab]) {
      return;
    }

    const {x, width} = tabLayouts.current[activeTab];

    if (animateHighlight) {
      translateX.value = withTiming(x, {duration: 300});
      highlightWidth.value = withTiming(width, {duration: 300});
    } else {
      runOnUI(() => {
        translateX.value = x;
        highlightWidth.value = width;
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, layoutReady, animateHighlight]);

  return (
    <View style={styles.container}>
      {layoutReady && (
        <Animated.View style={[styles.highlight, animatedStyle]} />
      )}
      {TABS.map((tab, index) => (
        <Pressable
          key={tab}
          onLayout={e => handleLayout(e, index)}
          onPress={() => onTabPress(index)}
          style={styles.tab}>
          <AppText variant="medium" fontSize={15} color={'#fff'}>
            {tab}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
};

export default NavbarButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 2,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  highlight: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
});
