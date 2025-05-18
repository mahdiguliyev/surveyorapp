import {View, TextInput, Pressable, StyleSheet, Animated,Platform} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {COLORS} from '../../components/styles/colors';
import EyeIcon from '../../assets/svg/EyeIcon';
import EyeOffIcon from '../../assets/svg/EyeOffIcon';

import {FONTS} from '../styles/fonts';

/**
 * FormInput component
 * @component
 * @param {string} label - The label for the input field
 * @param {string} placeholder - The placeholder text for the input field
 * @param {string} value - The current value of the input field
 * @param {function} onChangeText - Function to call when the text changes
 * @param {function} onBlur - Function to call when the input field loses focus
 * @param {boolean} secureTextEntry - Whether the input field is for a password
 * @param {ReactNode} Icon - Optional icon to display on the left side of the input field
 * @param {string} error - Error message to display below the input field
 * @param {boolean} touched - Whether the input field has been touched
 * @returns {JSX.Element}
 */

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  Icon,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animation, isFocused]);

  const handleFocus = () => setIsFocused(true);
  const handleInputBlur = e => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = secureTextEntry;

  const animatedBorderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.inputGray, COLORS.primary],
  });

  const animatedLabelColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.inputGray, COLORS.primary],
  });

  const animatedErrorColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.red, COLORS.red],
  });

  const iconColor = error
    ? COLORS.red
    : isFocused
    ? COLORS.primary
    : COLORS.inputGray;

  return (
    <View style={styles.mt_30}>
      <View style={styles.label_error_main}>
        {label && (
          <Animated.Text style={[styles.label, {color: animatedLabelColor}]}>
            {label}
          </Animated.Text>
        )}
        {error ? (
          <Animated.Text
            style={[styles.errorText, {color: animatedErrorColor}]}>
            {error}
          </Animated.Text>
        ) : null}
      </View>

      <Animated.View
        style={[
          styles.inputWrapper,
          {borderColor: error ? COLORS.red : animatedBorderColor},
        ]}>
        {Icon && (
          <View style={styles.iconLeft}>
            <Icon color={iconColor} />
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={handleInputBlur}
          secureTextEntry={isPasswordField && !showPassword}
          onFocus={handleFocus}
          autoCapitalize="none"
          style={[
            styles.input,
            Icon ? styles.pl_40 : {},
            isPasswordField ? styles.pr_45 : {},
          ]}
          placeholderTextColor={COLORS.inputGray}
        />
        {isPasswordField && (
          <Pressable
            onPress={togglePasswordVisibility}
            style={styles.iconRight}>
            {showPassword ? (
              <EyeOffIcon color={COLORS.inputGray} />
            ) : (
              <EyeIcon color={COLORS.inputGray} />
            )}
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
   mt_30: {
    marginTop: 30,
  },
  pl_40: {
    paddingLeft: 40,
  },
  pr_45: {
  paddingRight: 45,
  },
  label_error_main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontFamily: FONTS.sfProRoundedFontFamily,
    fontWeight: FONTS.fontWeight500,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    height: 60,
  },
  input: {
    fontFamily: FONTS.sfProRoundedFontFamily,
    fontWeight: FONTS.fontWeight500,
    flex: 1,
    paddingVertical: 12,
    fontSize: 17,
    color: COLORS.black,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
  },
  errorText: {
    fontFamily: FONTS.sfProRoundedFontFamily,
    fontSize: 14,
  },

});
