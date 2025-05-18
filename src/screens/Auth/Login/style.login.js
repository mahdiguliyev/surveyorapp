import {StyleSheet} from 'react-native';
import {COLORS} from '@components/styles/colors';
import {FONTS} from '@components/styles/fonts';

export default StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flex_15: {
    flex: 1.5,
  },
  login_tab_main_button_group: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  login_tab_main_button: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  login_tab_main_button_inactive: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D7D7D7',
  },
  login_forgot_password: {
    marginTop: 20,
    marginLeft: 10,
  },
  login_footer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'relative',
    paddingBottom: 70,
  },
  login_button_register: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.loginButtonColor,
  },
  login_helper_button: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 50,
    width: 60,
    height: 60,
    overflow: 'hidden',
  },
  gradientBackground: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
