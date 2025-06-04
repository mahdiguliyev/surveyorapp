import {useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalSheet from '@components/sheets/ModalSheet';
import {moderateScale, verticalScale} from '../../common/Metrics';
import {COLORS} from '../styles/colors';
import AppText from '@components/AppText';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const ConfirmationModal = ({
  data,
  modalVisible,
  onPress,
  handleDelete,
  handleModify,
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const SIZE_MODAL_SHOW = Math.min(contentHeight + 90, SCREEN_HEIGHT * 0.9);

  const handleSelect = item => {
    setReportType(item.type);
    onSelectType(item);
    onPress();
  };

  return (
    <ModalSheet
      modalVisible={modalVisible}
      onShow={onPress}
      sizeModel={SIZE_MODAL_SHOW}>
      <View onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>
        <View
          style={{
            marginTop: verticalScale(15),
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => handleModify(data)}
            style={{
              padding: '5%',
              width: '100%',
              marginBottom: verticalScale(5),
              backgroundColor: COLORS.green,
              borderRadius: moderateScale(15),
            }}>
            <AppText
              variant="medium"
              fontSize={14}
              color="white"
              style={styles.textCenter}>
              Düzəliş et
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleDelete(data);
            }}
            style={{
              padding: '5%',
              width: '100%',
              backgroundColor: COLORS.red,
              borderRadius: moderateScale(15),
            }}>
            <AppText
              variant="medium"
              fontSize={14}
              color="white"
              style={styles.textCenter}>
              Sil
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ModalSheet>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialAccount: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialAccountItems: {
    flexDirection: 'row',
    padding: '7%',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(30),
    width: '90%',
  },
  logo: {
    paddingVertical: verticalScale(50),
  },
  textCenter: {
    textAlign: 'center',
  },
});
