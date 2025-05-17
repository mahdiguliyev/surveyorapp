import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';

import Loader from '../components/Loader';
import Error from '../components/Error';
import {COLORS} from '../components/styles/colors';

const SplashScreen = ({navigation}) => {
  const [isCompatible, setIsCompatible] = useState(true);
  const [errorDetail, setErrorDetail] = useState({
    title: null,
    desc: null,
  });

  const checkCredentials = () => {
    const isAuthenticated = false;
    if (isAuthenticated) {
      navigation.navigate('Pincode');
    } else {
      resetCredentials();
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    checkCredentials();
  }, []);

  return isCompatible ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <Error errorDetail={errorDetail} />
    </SafeAreaView>
  );
};

export default SplashScreen;
