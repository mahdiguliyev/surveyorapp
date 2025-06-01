import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import AppText from '@components/AppText';
// import cardHelper from '@utils/functions/cardHelper';
import ChechkIcon from '@assets/svg/ChechkIcon';

const CheckListChooseItem = ({item, onSelect, selectedId}) => {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = () => {
    opacity.value = withTiming(0.5, {duration: 200}, () => {
      opacity.value = withTiming(1, {duration: 200});
    });

    setTimeout(() => {
      onSelect(item);
    }, 200);
  };

  const isSelected = item.type === selectedId;

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable onPress={handlePress} style={styles.account_body}>
        <View style={styles.account_info_left}>
          <AppText variant="medium" fontSize={15} color="black" mb={10}>
            {item.title}
          </AppText>
        </View>
        <View style={[styles.checkbox, isSelected && styles.checkbox_selected]}>
          {isSelected && <ChechkIcon />}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default CheckListChooseItem;

const styles = StyleSheet.create({
  account_body: {
    backgroundColor: '#F2F6FB',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  account_balance_body: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0B5AAE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox_selected: {
    backgroundColor: '#0B5AAE',
  },
});
