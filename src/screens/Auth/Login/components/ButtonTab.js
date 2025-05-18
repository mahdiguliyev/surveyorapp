import React, {useEffect, useRef} from 'react';
import {View,Pressable, StyleSheet, Animated} from 'react-native';
import style from '../style.login';
import {COLORS} from '@components/styles/colors';
import LinearGradient from '@components/LinearGradient';
import AppText from '@components/AppText';

const ButtonTab = ({label, isActive, onPress, Icon}) => {
  const gradientOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(gradientOpacity, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [gradientOpacity, isActive]);

  return (
    <Pressable onPress={onPress} style={style.flex_1}>
      <View
        style={[
          style.login_tab_main_button_group,
          style.login_tab_main_button_inactive,
        ]}>
        <Animated.View
          style={[StyleSheet.absoluteFill, {opacity: gradientOpacity}]}>
          <LinearGradient />
        </Animated.View>
        <View style={style.login_tab_main_button}>
          {Icon && (
            <Icon color={isActive ? COLORS.white : COLORS.loginButtonColor} />
          )}
          <AppText
            variant="medium"
            fontSize={14}
            pt={10}
            color="primary"
            style={[
              style.login_tab_main_button_text,
              {color: isActive ? COLORS.white : COLORS.black},
            ]}>
            {label}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};
export default ButtonTab;
