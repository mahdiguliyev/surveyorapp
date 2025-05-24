import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
//import Loader from '@components/Loader';
import style from './style.login';
//import {useLocale} from '@utils/localization/useLocale';
import {CommonActions} from '@react-navigation/native';
//import Alert from '@common/Alert';
import LoginUserIcon from '@assets/svg/LoginUserIcon';
import ButtonTab from './components/ButtonTab';
import LoginIdentityIcon from '@assets/svg/LoginIdentityIcon';
//import HomeSettingModal from '@components/HomeSettingModal';
import UserLoginForm from './components/UserLoginForm';
import AppText from '@components/AppText';
import AuthLayout from '../_AuthLayout';
import {useAuthentication} from '../../../common/context/LoginProvider';

export default function LoginScreen({navigation}) {
  //const {getLocale} = useLocale();
  const {login} = useAuthentication();
  const [activeTab, setActiveTab] = useState('user');
  const [loading, setLoading] = useState(false);

  const handleLogin = async values => {
    setLoading(true);

    const {userName, password} = values;
    if (userName === 'test' && password === 'test123') {
      setLoading(false);
      login({username: 'mahdiguliyev', role: 'manager'});
      //navigation.navigate('Bottom');
    } else {
      setLoading(false);
      /* Alert.alert(getLocale('messages.error.title'), 'Login failed!', [
        {text: 'OK'},
      ]); */
    }
  };

  const handleForgotPassword = () => {
    //navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{name: 'Login'}, {name: 'Register'}],
    });
    navigation.dispatch(resetAction);
  };

  const goBack = () => {
    navigation.navigate('Welcome');
  };

  const onPressTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    /*     <>
      {loading ? (
        <Loader />
      ) : ( */
    <AuthLayout
      headerTitle="Daxil ol"
      goBackHandler={goBack}
      backButton={false}>
      <View style={style.flex_1}>
        <View style={style.flex_15}>
          <UserLoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
          />
        </View>
        {/* <View style={style.login_footer}>
          <View>
            <AppText variant="medium" mb={15} fontSize={16} color="gray">
              Qeydiyyatdan keçin
            </AppText>
            <Pressable
              style={style.login_button_register}
              onPress={handleRegister}>
              <AppText variant="semıbold" fontSize={16} color="primary">
                Qeydiyyatdan keçin
              </AppText>
            </Pressable>
          </View>
          <HomeSettingModal />
        </View> */}
      </View>
    </AuthLayout>
    /*    )}
    </> */
  );
}
