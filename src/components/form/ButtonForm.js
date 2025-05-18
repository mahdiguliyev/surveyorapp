import {Pressable, StyleSheet, View} from 'react-native';
import LinearGradient from '@components/LinearGradient';
import React from 'react';

/**
 * ButtonForm component
 * @component
 * @param {function} onPress - Function to call when the button is pressed
 * @param {ReactNode} children - The content to display inside the button
 *  */

const ButtonForm = ({onPress, children}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <LinearGradient />
        {children}
      </Pressable>
    </View>
  );
};

export default ButtonForm;

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  pressable: {
    width: '100%',
    height: 64,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
