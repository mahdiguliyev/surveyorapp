import React, {useEffect} from 'react';

import {useAuthentication} from '../common/context/LoginProvider';

const SplashScreen = ({navigation}) => {
  const {isAuthenticated} = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      // Let MainNavigator redirect
    } else {
      navigation.replace('Login');
    }
  }, [isAuthenticated]);

  return null;
};

export default SplashScreen;
