import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {horizontalScale, verticalScale} from './src/common/Metrics';
import {useNetInfo} from '@react-native-community/netinfo';

import MainNavigator from './src/navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import LoginProvider from './src/common/context/LoginProvider';
import BootSplash from 'react-native-bootsplash';

import Error from './src/components/Error';
import UpdateAvailable from './src/components/UpdateAvailable';
import Loader from './src/components/Loader';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const checkConnection = useNetInfo();
  const [loading, setLoading] = useState(false);
  const [updateRequired, setUpdateRequired] = useState(false);
  const [versionInfo, setVersionInfo] = useState({version: '1.1.1'});

  useEffect(() => {
    BootSplash.hide({fade: true, duration: 300});
  }, []);

  return !loading ? (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.container]}>
        {!updateRequired ? (
          <>
            {checkConnection.isConnected ||
            checkConnection.isConnected === null ? (
              <LoginProvider>
                <NavigationContainer>
                  <MainNavigator />
                  {/*  <Toast config={toastConfig} /> */}
                </NavigationContainer>
              </LoginProvider>
            ) : (
              <Error
                errorDetail={{
                  title: 'messages.notification.internet_connection.title',
                  desc: 'messages.notification.internet_connection.desc',
                }}
              />
            )}
          </>
        ) : (
          <UpdateAvailable version={versionInfo.version} />
        )}
      </View>
    </GestureHandlerRootView>
  ) : (
    <Loader />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
});

export default App;
