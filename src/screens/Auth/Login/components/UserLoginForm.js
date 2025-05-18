import React from 'react';
import {Formik} from 'formik';
import {View, Pressable} from 'react-native';
import FormInput from '@components/form/FormInput';
import ButtonForm from '@components/form/ButtonForm';
import ArrowUpIcon from '@assets/svg/ArrowUpIcon';
import LockIcon from '@assets/svg/LockIcon';
import UserIcon from '@assets/svg/UserIcon';
import styles from '../style.login';
import {userValidationSchema} from '../validation.login';
import AppText from '@components/AppText';

const UserLoginForm = ({onSubmit, onForgotPassword}) => {
  return (
    <Formik
      initialValues={{userName: '', password: ''}}
      validationSchema={userValidationSchema}
      onSubmit={onSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        submitCount,
      }) => (
        <View>
          <FormInput
            label="İstifadəçi adı"
            placeholder="İstifadəçi adı"
            value={values.userName}
            onChangeText={handleChange('userName')}
            onBlur={handleBlur('userName')}
            error={submitCount > 0 && touched.userName && errors.userName}
            Icon={UserIcon}
          />
          <FormInput
            label="Şifrə"
            placeholder="Şifrə"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={submitCount > 0 && touched.password && errors.password}
            secureTextEntry
            Icon={LockIcon}
          />
          <Pressable
            onPress={onForgotPassword}
            style={styles.login_forgot_password}>
            <AppText variant="medium" fontSize={16} color="black">
              Şifrəni unutmusunuz?
            </AppText>
          </Pressable>
          <ButtonForm onPress={handleSubmit}>
            {/* <ArrowUpIcon /> */}
            <AppText
              variant="medium"
              fontSize={14}
              color="white"
              style={styles.textCenter}>
              Daxil ol
            </AppText>
          </ButtonForm>
        </View>
      )}
    </Formik>
  );
};

export default UserLoginForm;
