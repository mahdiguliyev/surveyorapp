import React, {useEffect, useState, useCallback} from 'react';
import {View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AppText from '@components/AppText';

import UserHeaderIcon from '@assets/svg/UserHeaderIcon';
import NotificationIcon from '@assets/svg/NotificationIcon';
import MessagesIcon from '@assets/svg/MessagesIcon';
import {useAuthentication} from '../common/context/LoginProvider';

const Header = () => {
  const navigation = useNavigation();
  const {user} = useAuthentication();
  const [hasNotification, setHasNotification] = useState(false);

  const getUnreadNotificationsCount = async () => {
    // if unread notifications count more than 0
    setHasNotification(true);

    // if unread notifications count equal to 0
    //setHasNotification(false);
  };

  useFocusEffect(
    useCallback(() => {
      getUnreadNotificationsCount();
    }, []),
  );

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
          onPress={() => Alert.alert('Messages')}>
          <MessagesIcon />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Notification')}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header_main: {
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
