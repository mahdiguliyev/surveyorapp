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
import ArrowCircle from '@assets/svg/ArrowCircle';
import LinearGradient from '@components/LinearGradient';
import {FONTS} from '../../components/styles/fonts';
import PersonChoose from '../../components/PersonChoose';

const dummy_contractors = [
  {
    id: 1,
    name: 'Ugur Cebeci',
  },
  {
    id: 2,
    name: 'Yalcin Talibov',
  },
];
const dummy_surveyors = [
  {
    id: 1,
    name: 'Mahdi Guliyev',
  },
  {
    id: 2,
    name: 'Saleh Nabiyev',
  },
];

export default function AddProjectScreen({navigation, route}) {
  const [amount, setAmount] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [surveyors, setSurveyors] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [selectedSurveyor, setSelectedSurveyor] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [inputErrors, setInputErrors] = useState({
    projectNameError: '',
    projectDescriptionError: '',
  });
  const [surveyorContractorError, setSurveyorContractorError] = useState('');

  const [chooseContractor, setChooseContractor] = useState(false);
  const [chooseSurveyor, setChooseSurveyor] = useState(false);

  const handleChooseSurveyor = () => {
    setChooseSurveyor(!chooseSurveyor);
  };

  const handleChooseContractor = () => {
    setChooseContractor(!chooseContractor);
  };

  const checkIsValid = async () => {
    setProjectName('');
    setProjectDescription('');

    Alert.alert('Uğurlu', 'Podratçı əlavə edildi.');
    navigation.goBack();
  };

  const getSurveyors = async () => {
    setSurveyors(dummy_surveyors);
  };

  const getContractors = async () => {
    setContractors(dummy_contractors);
  };

  function validateSurveyorContractorInputs() {
    return selectedContractor !== null && selectedSurveyor !== null;
  }

  const handleSend = () => {
    let hasError = false;

    // amount kontrolü
    if (projectName === '' || projectName === null) {
      setInputErrors(prev => ({
        ...prev,
        projectNameError: 'Layihə adı düzgün daxil edilməyib.',
      }));
      hasError = true;
    } else {
      setInputErrors(prev => ({
        ...prev,
        projectNameError: '',
      }));
    }

    if (projectDescription === '' || projectDescription === null) {
      setInputErrors(prev => ({
        ...prev,
        projectDescriptionError: 'Layihənin təsviri düzgün daxil edilməyib.',
      }));
      hasError = true;
    } else {
      setInputErrors(prev => ({
        ...prev,
        projectDescriptionError: '',
      }));
    }

    // hesap kontrolü
    if (!validateSurveyorContractorInputs()) {
      setSurveyorContractorError('Seçim edilməyib.');
      hasError = true;
    } else {
      setSurveyorContractorError('');
    }

    if (hasError) {
      return;
    }

    // başarıyla geçerse
    setAmount('');
    checkIsValid();
  };

  useEffect(() => {
    getSurveyors();
    getContractors();
  }, []);

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
              {'Layihə adı'}
            </AppText>
            <View styles={styles.input_item}>
              <TextInput
                placeholder="Layihə-1"
                value={projectName}
                onChangeText={setProjectName}
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
              {inputErrors.projectNameError}
            </AppText>
          </View>

          <View style={styles.payment_item}>
            <AppText
              variant="medium"
              color="#A3A3A3"
              fontSize={13}
              ml={20}
              mb={15}>
              {'Layihənin təsviri'}
            </AppText>
            <View styles={styles.input_item}>
              <TextInput
                placeholder="Layihənin təsviri-1"
                value={projectDescription}
                onChangeText={setProjectDescription}
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
              {inputErrors.projectDescriptionError}
            </AppText>
          </View>

          <View style={styles.payment_item}>
            <AppText
              variant="medium"
              color="#A3A3A3"
              fontSize={13}
              ml={20}
              mb={15}>
              {'Podratçı'}
            </AppText>
            <TouchableOpacity
              onPress={handleChooseContractor}
              activeOpacity={0.7}
              style={styles.account_info_item}>
              {selectedContractor ? (
                <View>
                  <AppText variant="medium" color="#A3A3A3" fontSize={13}>
                    {selectedContractor.name}
                  </AppText>
                </View>
              ) : (
                <AppText variant="medium" color="black" fontSize={15}>
                  Podratçı seçin
                </AppText>
              )}
              <ArrowCircle />
            </TouchableOpacity>
            {/* <AppText
                variant="medium"
                color="red"
                fontSize={14}
                style={styles.error_text}>
                {accountError}
              </AppText> */}
          </View>

          <View style={styles.payment_item}>
            <AppText
              variant="medium"
              color="#A3A3A3"
              fontSize={13}
              ml={20}
              mb={15}>
              {'Surveyor'}
            </AppText>
            <TouchableOpacity
              onPress={handleChooseSurveyor}
              activeOpacity={0.7}
              style={styles.account_info_item}>
              {selectedSurveyor ? (
                <View>
                  <AppText variant="medium" color="#A3A3A3" fontSize={13}>
                    {selectedSurveyor.name}
                  </AppText>
                </View>
              ) : (
                <AppText variant="medium" color="black" fontSize={15}>
                  Surveyor seçin
                </AppText>
              )}
              <ArrowCircle />
            </TouchableOpacity>
            <AppText
              variant="medium"
              color="red"
              fontSize={14}
              style={styles.error_text}>
              {surveyorContractorError}
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
            Göndər
          </AppText>
        </TouchableOpacity>
        <PersonChoose
          data={contractors}
          modalVisible={chooseContractor}
          onPress={handleChooseContractor}
          setSelectedItem={setSelectedContractor}
          //setCardNumber={setSenderAccount}
        />
        <PersonChoose
          data={surveyors}
          modalVisible={chooseSurveyor}
          onPress={handleChooseSurveyor}
          setSelectedItem={setSelectedSurveyor}
          //setCardNumber={setSenderAccount}
        />
        {/*         <PriceChose
          onSelect={setSelectedSection}
          modalVisible={chooseContractor}
          amounts={{
            min: 200,
            max: 350,
          }}
          selectedIndex={selectedSection}
          onClose={() => setChooseContractor(false)}
        /> */}
        {/* <PriceChose
          onSelect={setSelectedSection}
          modalVisible={chooseSurveyor}
          amounts={{
            min: 200,
            max: 350,
          }}
          selectedIndex={selectedSection}
          onClose={() => setChooseSurveyor(false)}
        /> */}
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
