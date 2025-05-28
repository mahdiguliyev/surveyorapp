import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AppText from '@components/AppText';

import UserHeaderIcon from '@assets/svg/UserHeaderIcon';
import NotificationIcon from '@assets/svg/NotificationIcon';
import ProjectsIcon from '@assets/svg/ProjectsIcon';
import ContractorIcon from '@assets/svg/ContractorIcon';
import {useAuthentication} from '../common/context/LoginProvider';
import {verticalScale} from '../common/Metrics';

const Header = () => {
  const navigation = useNavigation();
  const {user} = useAuthentication();

  return (
    <View style={styles.header_main}>
      <View style={styles.header_user}>
        <View style={styles.header_user_icon}>
          <UserHeaderIcon />
        </View>
        <View style={styles.header_user_text}>
          <AppText variant="regular" color="#fff" fontSize={13}>
            Xoş gördük!
          </AppText>
          <AppText variant="medium" color="#fff" fontSize={15}>
            {user.username}
          </AppText>
        </View>
      </View>
      <View style={styles.header_button}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Contractors')}>
          <ContractorIcon />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Projects')}>
          <ProjectsIcon />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Alert.alert('Notifications')}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header_main: {
    marginTop: Platform.OS === 'android' ? verticalScale(15) : verticalScale(0),
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  header_user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  header_user_icon: {
    padding: 9,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  header_user_text: {
    flexDirection: 'column',
    gap: 2,
  },
  header_button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    zIndex: 1,
  },
});
