import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {COLORS} from '@components/styles/colors';
import {FONTS} from '@components/styles/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ArrowIcon from '@assets/svg/ArrowIcon';

/**
 * AuthLayout component
 * @param {Object} props - Component props
 * @param {string} props.headerTitle - Title to display in the header
 * @param {function} props.goBackHandler - Function to call when the back button is pressed
 * @param {ReactNode} props.children - Child components to render inside the layout
 * @returns {JSX.Element} AuthLayout component
 * */

const AuthLayout = ({
  headerTitle,
  backButton = true,
  goBackHandler,
  children,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.login_main_container}>
      <View style={styles.login_header_bage}>{/* <AsbLogoIcon /> */}</View>
      <View style={[styles.login_header, {marginTop: insets.top}]}>
        {backButton && (
          <Pressable style={styles.login_header_back} onPress={goBackHandler}>
            <ArrowIcon />
          </Pressable>
        )}
        <Text style={styles.login_header_text}>{headerTitle}</Text>
      </View>
      {children}
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  login_main_container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  login_header_bage: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  login_header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_header_back: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  login_header_text: {
    fontSize: 17,
    fontWeight: FONTS.fontWeight500,
    fontFamily: FONTS.sfProRoundedFontFamily,
    color: COLORS.black,
  },
});
