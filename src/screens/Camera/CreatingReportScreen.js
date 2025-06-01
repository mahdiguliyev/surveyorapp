import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AppText from '@components/AppText';
import HeaderLayout from '@components/general/HeaderLayout';
import LinearGradient from '@components/LinearGradient';
import ArrowCircle from '@assets/svg/ArrowCircle';
import ArrowIcon from '@assets/svg/ArrowIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {horizontalScale, verticalScale} from '../../common/Metrics';
import {useState} from 'react';
import {FONTS} from '../../components/styles/fonts';
import ImageList from './components/ImageList';

const window = Dimensions.get('window');
const check_list_items = [
  {type: 1, title: 'Yoxlama 1'},
  {type: 2, title: 'Yoxlama 2'},
  {type: 3, title: 'Yoxlama 3'},
];

const SectionTitle = ({children}) => (
  <AppText
    variant="medium"
    color="black"
    fontSize={15}
    style={styles.item_title}>
    {children}
  </AppText>
);

const CreatingReportScreen = ({navigation, route}) => {
  const {images} = route?.params;
  const [selectedCheckList, setSelectedCheckList] = useState(null);
  const [desc, setDesc] = useState('');
  const [chooseCheckList, setChooseCheckList] = useState(false);
  const [chooseImageType, setChooseImageType] = useState(false);
  const [selectedType, setSelectedType] = useState(check_list_items[0]);

  const [checkListError, setCheckListError] = useState('');
  const [inputErrors, setInputErrors] = useState({
    desc: '',
  });

  const insets = useSafeAreaInsets();
  const headerPaddingTop =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top;

  const goBack = () => {
    navigation.goBack();
  };
  const handleCreateReport = () => {
    Alert.alert(
      'Hesabat yaradıldı',
      'Hesabatınız uğurla yaradıldı.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleChooseCheckList = () => {
    setChooseCheckList(!chooseCheckList);
  };

  return (
    <HeaderLayout
      mainTitle={'Hesabat yarat'}
      scroll_padding={styles.scroll_padding}
      leftButton={
        <Pressable onPress={goBack}>
          <ArrowIcon color="#000" />
        </Pressable>
      }>
      <View style={styles.form_container}>
        <View style={styles.project_selection_container}>
          <View>
            <TouchableOpacity
              onPress={handleChooseCheckList}
              activeOpacity={0.7}
              style={styles.checklist_press_item}>
              {selectedCheckList ? (
                <View>
                  <AppText variant="medium" color="#A3A3A3" fontSize={13}>
                    {selectedCheckList.title}
                  </AppText>
                </View>
              ) : (
                <AppText variant="medium" color="black" fontSize={15}>
                  Ağdam-Kəlbəcər
                </AppText>
              )}
            </TouchableOpacity>
            <AppText
              variant="medium"
              color="red"
              fontSize={14}
              style={styles.error_text}>
              {checkListError}
            </AppText>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleChooseCheckList}
              activeOpacity={0.7}
              style={styles.checklist_press_item}>
              {selectedCheckList ? (
                <View>
                  <AppText variant="medium" color="#A3A3A3" fontSize={13}>
                    {selectedCheckList.title}
                  </AppText>
                </View>
              ) : (
                <AppText variant="medium" color="black" fontSize={15}>
                  Kəlbəcər-İstisu
                </AppText>
              )}
            </TouchableOpacity>
            <AppText
              variant="medium"
              color="red"
              fontSize={14}
              style={styles.error_text}>
              {checkListError}
            </AppText>
          </View>
        </View>
        <View>
          <ImageList selectedImages={images} />
        </View>
        <View style={styles.checklist_item}>
          <AppText
            variant="medium"
            color="#A3A3A3"
            fontSize={13}
            ml={20}
            mb={15}>
            {'Təsvir'}
          </AppText>
          <View styles={styles.input_item}>
            <TextInput
              placeholder="Mətn əlavə edin"
              value={desc}
              onChangeText={setDesc}
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
            {inputErrors.desc}
          </AppText>
        </View>
        <View style={styles.checklist_item}>
          <AppText
            variant="medium"
            color="#A3A3A3"
            fontSize={13}
            ml={20}
            mb={15}>
            {'Yoxlama siyahısı'}
          </AppText>
          <TouchableOpacity
            onPress={handleChooseCheckList}
            activeOpacity={0.7}
            style={styles.checklist_press_item}>
            {selectedCheckList ? (
              <View>
                <AppText variant="medium" color="#A3A3A3" fontSize={13}>
                  {selectedCheckList.title}
                </AppText>
              </View>
            ) : (
              <AppText variant="medium" color="black" fontSize={15}>
                Yoxlama siyahını seçin
              </AppText>
            )}
            <ArrowCircle />
          </TouchableOpacity>
          <AppText
            variant="medium"
            color="red"
            fontSize={14}
            style={styles.error_text}>
            {checkListError}
          </AppText>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleCreateReport();
          }}
          activeOpacity={0.7}
          style={styles.send_button}>
          <LinearGradient />
          <AppText variant="medium" color="#fff" fontSize={16}>
            Hesabat yarat
          </AppText>
        </TouchableOpacity>
        {/* <CheckListChoose
          data={check_list_items}
          modalVisible={chooseCheckList}
          onPress={handleChooseCheckList}
          setSelectedItem={setSelectedCheckList}
        /> */}
      </View>
    </HeaderLayout>
  );
};

export default CreatingReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  form_container: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  item_header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  item_header_2: {
    backgroundColor: '#fff',
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  item_title: {
    marginBottom: 20,
    paddingHorizontal: horizontalScale(20),
  },
  button_proces: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
  },
  project_selection_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checklist_item: {
    marginTop: 30,
  },
  checklist_press_item: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
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
  error_text: {
    paddingLeft: 20,
    marginTop: 10,
    position: 'absolute',
    bottom: -22,
  },
});
