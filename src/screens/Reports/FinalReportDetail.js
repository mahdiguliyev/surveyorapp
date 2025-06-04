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
  ScrollView,
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
import {COLORS} from '../../components/styles/colors';
import CheckReportItem from './components/CheckReportItem';
import ConfirmationModal from '../../components/sheets/ConfirmationModal';

const {width, height} = Dimensions.get('window');
const check_list_items = [
  {type: 1, title: 'NCR'},
  {type: 2, title: 'NCR 2'},
  {type: 3, title: 'NCR 3'},
];

const ncr_list_items = [
  {type: 1, title: 'R-NCR-AK-002'},
  {type: 2, title: 'R-NCR-AK-003'},
  {type: 3, title: 'R-NCR-AK-004'},
];

const headers_1 = [
  {key: 'no', label: 'No'},
  {key: 'date', label: 'Tarix'},
  {key: 'user', label: 'Surveyor'},
];

const data_1 = [
  {no: 'H-AK-001', date: '01.05.2025', user: 'Mahdi Guliyev'},
  {no: 'H-AK-002', date: '07.05.2025', user: 'Ugur Cebeci'},
  {no: 'H-AK-003', date: '10.05.2025', user: 'Saleh Nabiyev'},
  {no: 'H-AK-004', date: '15.05.2025', user: 'Yalchin Talibov'},
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

const FinalReportDetailScreen = ({navigation, route}) => {
  const {image, item} = route?.params;
  const [selectedCheckList, setSelectedCheckList] = useState(null);
  const [selectedNSRList, setSelectedNSRList] = useState(null);
  const [desc, setDesc] = useState('');
  const [chooseCheckList, setChooseCheckList] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [selectedType, setSelectedType] = useState(check_list_items[0]);
  const [selectedNCR, setSelectedNCR] = useState(ncr_list_items[0]);

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

  const handleChooseItem = () => {
    setItemModal(!itemModal);
  };

  const handleDeleteItem = item => {
    Alert.alert('Item', 'Item silindi.');
    navigation.goBack();
  };

  const handleModifyItem = item => {
    Alert.alert('Item', 'Item dəyişdirildi.');
    navigation.goBack();
  };

  const handleSelectedItem = item => {
    setItemModal(true);
    // Alert.alert('Hesabat', 'Hesabat detallarını görmək üçün bu bölməyə keçin.');
  };

  const handleConfirmReport = () => {
    Alert.alert(
      'Hesabat',
      'Hesabatınız uğurla təstiq edildi.',
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

  const handleRejectReport = () => {
    Alert.alert(
      'Hesabat',
      'Hesabatınız uğurla imtina edildi.',
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
      mainTitle={'H-AK-001'}
      scroll_padding={styles.scroll_padding}
      leftButton={
        <Pressable onPress={goBack}>
          <ArrowIcon color="#000" />
        </Pressable>
      }>
      <View style={styles.form_container}>
        <View style={styles.checklist_item}>
          <AppText
            variant="medium"
            color="#A3A3A3"
            fontSize={13}
            ml={20}
            mb={15}>
            {'Yoxlama hesabatları'}
          </AppText>
          <TouchableOpacity
            onPress={handleChooseCheckList}
            activeOpacity={0.7}
            style={[styles.checklist_press_item]}>
            {selectedCheckList ? (
              <View>
                <AppText variant="medium" color="#A3A3A3" fontSize={13}>
                  {selectedCheckList.title}
                </AppText>
              </View>
            ) : (
              <AppText variant="medium" color="black" fontSize={15}>
                H-AK-002, H-AK-0043, H-AK-0023
              </AppText>
            )}
            <ArrowCircle />
          </TouchableOpacity>
        </View>
        <View style={{height: height * 0.2}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              <View style={{marginTop: 20}}>
                {data_1.map((item, index) => {
                  const indexKey = index + 1;
                  return (
                    <CheckReportItem
                      key={indexKey}
                      item={item}
                      handleSelectedItem={handleSelectedItem}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
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
            {'Hesabat tipi'}
          </AppText>
          <TouchableOpacity
            onPress={handleChooseCheckList}
            activeOpacity={0.7}
            style={[styles.checklist_press_item, {marginBottom: 20}]}>
            {selectedCheckList ? (
              <View>
                <AppText variant="medium" color="#A3A3A3" fontSize={13}>
                  {selectedCheckList.title}
                </AppText>
              </View>
            ) : (
              <AppText variant="medium" color="black" fontSize={15}>
                NCR
              </AppText>
            )}
            <ArrowCircle />
          </TouchableOpacity>
          <AppText
            variant="medium"
            color="#A3A3A3"
            fontSize={13}
            ml={20}
            mb={15}>
            {'NCR hesabat'}
          </AppText>
          <TouchableOpacity
            onPress={handleChooseCheckList}
            activeOpacity={0.7}
            style={styles.checklist_press_item}>
            {selectedNSRList ? (
              <View>
                <AppText variant="medium" color="#A3A3A3" fontSize={13}>
                  {selectedNSRList.title}
                </AppText>
              </View>
            ) : (
              <AppText variant="medium" color="black" fontSize={15}>
                R-NCR-AK-002
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
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              handleRejectReport();
            }}
            activeOpacity={0.7}
            style={[styles.send_button, {backgroundColor: COLORS.red}]}>
            <AppText variant="medium" color="#fff" fontSize={16}>
              İmtina
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleConfirmReport();
            }}
            activeOpacity={0.7}
            style={[styles.send_button, {backgroundColor: COLORS.green}]}>
            <AppText variant="medium" color="#fff" fontSize={16}>
              Təsdiq
            </AppText>
          </TouchableOpacity>
        </View>

        {/* <CheckListChoose
          data={check_list_items}
          modalVisible={chooseCheckList}
          onPress={handleChooseCheckList}
          setSelectedItem={setSelectedCheckList}
        /> */}
        <ConfirmationModal
          data={null}
          modalVisible={itemModal}
          onPress={handleChooseItem}
          handleDelete={handleDeleteItem}
          handleModify={handleModifyItem}
        />
      </View>
    </HeaderLayout>
  );
};

export default FinalReportDetailScreen;

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
    marginTop: 15,
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
    overflow: 'hidden',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
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
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    width: width - 40,
    aspectRatio: 1.9,
    overflow: 'hidden',
    paddingRight: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
