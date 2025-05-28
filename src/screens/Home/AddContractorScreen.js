import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  View,
  Alert,
} from 'react-native';
// News link
import HeaderLayout from '@components/general/HeaderLayout';
import AppText from '@components/AppText';
import ArrowIcon from '@assets/svg/ArrowIcon';
import LinearGradient from '@components/LinearGradient';
import {FONTS} from '../../components/styles/fonts';

export default function AddContractorScreen({navigation, route}) {
  const [companyName, setCompanyName] = useState('');
  const [companyHead, setCompanyHead] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inputErrors, setInputErrors] = useState({
    companyNameError: '',
    companyHeadError: '',
    emailError: '',
    phoneNumberError: '',
  });

  const checkIsValid = async () => {
    setCompanyName('');
    setCompanyHead('');

    Alert.alert('Uğurlu', 'Podratçı əlavə edildi.');
    navigation.goBack();
  };

  const handleSend = () => {
    let hasError = false;

    if (companyName === '' || companyName === null) {
      setInputErrors(prev => ({
        ...prev,
        companyNameError: 'Şirkət adı daxil edilməyib.',
      }));
      hasError = true;
    } else {
      setInputErrors(prev => ({
        ...prev,
        companyNameError: '',
      }));
    }

    if (companyHead === '' || companyHead === null) {
      setInputErrors(prev => ({
        ...prev,
        companyHeadError: 'Şirkət rəhbəri daxil edilməyib.',
      }));
      hasError = true;
    } else {
      setInputErrors(prev => ({
        ...prev,
        companyHeadError: '',
      }));
    }

    if (email === '' || email === null) {
      setInputErrors(prev => ({
        ...prev,
        emailError: 'E-mail daxil edilməyib.',
      }));
      hasError = true;
    } else {
      setInputErrors(prev => ({
        ...prev,
        emailError: '',
      }));
    }

    if (phoneNumber === '' || phoneNumber === null) {
      setInputErrors(prev => ({
        ...prev,
        phoneNumberError: 'Mobil nömrə düzgün daxil edilməyib.',
      }));
      hasError = true;
    } else {
      setInputErrors(prev => ({
        ...prev,
        phoneNumberError: '',
      }));
    }

    if (hasError) {
      return;
    }

    setCompanyName('');
    setCompanyHead('');
    setEmail('');
    setPhoneNumber('');
    checkIsValid();
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <HeaderLayout
      mainTitle={'Yeni podratçı əlavə et'}
      scroll_padding={styles.scroll_padding}
      leftButton={
        <Pressable onPress={goBack}>
          <ArrowIcon color="#000" />
        </Pressable>
      }>
      <View style={styles.creditcard_payment_container}>
        <View style={styles.payment_top}>
          <View style={styles.payment_item}>
            <AppText
              variant="medium"
              color="#A3A3A3"
              fontSize={13}
              ml={20}
              mb={15}>
              {'Şirkət adı'}
            </AppText>
            <View styles={styles.input_item}>
              <TextInput
                placeholder="Şirkət-1"
                value={companyName}
                onChangeText={setCompanyName}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="done"
                style={styles.input_control}
              />
            </View>
            <AppText
              variant="medium"
              color="red"
              fontSize={14}
              style={styles.error_text}>
              {inputErrors.companyNameError}
            </AppText>
          </View>

          <View style={styles.payment_item}>
            <AppText
              variant="medium"
              color="#A3A3A3"
              fontSize={13}
              ml={20}
              mb={15}>
              {'Şirkət rəhbəri'}
            </AppText>
            <View styles={styles.input_item}>
              <TextInput
                placeholder="Şirkət rəhbəri-1"
                value={companyHead}
                onChangeText={setCompanyHead}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="done"
                style={styles.input_control}
              />
            </View>
            <AppText
              variant="medium"
              color="red"
              fontSize={14}
              style={styles.error_text}>
              {inputErrors.companyHeadError}
            </AppText>
          </View>

          <View style={styles.payment_item}>
            <AppText
              variant="medium"
              color="#A3A3A3"
              fontSize={13}
              ml={20}
              mb={15}>
              {'Email'}
            </AppText>
            <View styles={styles.input_item}>
              <TextInput
                placeholder="user@gmail.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="done"
                style={styles.input_control}
              />
            </View>
            <AppText
              variant="medium"
              color="red"
              fontSize={14}
              style={styles.error_text}>
              {inputErrors.emailError}
            </AppText>
          </View>

          <View style={styles.payment_item}>
            <AppText
              variant="medium"
              color="#A3A3A3"
              fontSize={13}
              ml={20}
              mb={15}>
              {'Telefon nömrəsi'}
            </AppText>
            <View styles={styles.input_item}>
              <TextInput
                placeholder="+994 50 123 45 67"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                style={styles.input_control}
              />
            </View>
            <AppText
              variant="medium"
              color="red"
              fontSize={14}
              style={styles.error_text}>
              {inputErrors.phoneNumberError}
            </AppText>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSend();
          }}
          activeOpacity={0.7}
          style={styles.send_button}>
          <LinearGradient />
          <AppText variant="medium" color="#fff" fontSize={16}>
            Təsdiq et
          </AppText>
        </TouchableOpacity>
      </View>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  creditcard_payment_container: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input_control: {
    paddingLeft: 20,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    height: 60,
    fontFamily: FONTS.sfProRoundedFontFamily,
    fontWeight: FONTS.fontWeight500,
  },
  payment_item: {
    marginBottom: 25,
  },
  input_icon: {
    position: 'absolute',
    right: 20,
    top: 25,
  },
  account_info_item: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  komissiya_container: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  send_button: {
    borderRadius: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: '100%',
  },
  error_text: {
    paddingLeft: 20,
    marginTop: 10,
    position: 'absolute',
    bottom: -22,
  },
});
