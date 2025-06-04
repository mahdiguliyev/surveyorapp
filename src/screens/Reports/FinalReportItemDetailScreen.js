import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  Text,
} from 'react-native';
import AppText from '@components/AppText';
import LinearGradient from '@components/LinearGradient';
import ArrowIcon from '@assets/svg/ArrowIcon';
import QRIcon from '@assets/svg/QRIcon';
import {useEffect, useState} from 'react';
import {FONTS} from '../../components/styles/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../components/styles/colors';

const {width} = Dimensions.get('window');

const FinalReportItemDetailScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState(null);

  const headerPaddingTop =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top;

  const getData = () => {
    setData({
      reportNumber: 'R-AK-0001',
      projectName: 'Layihə adı',
      subProjectName: 'Alt layihə adı',
      reportDate: '05.05.2025',
      date: '05.05.2026',
      manager: 'Vəli Əliyev',
      surveyor: 'Əli Əliyev',
      surveyorReportNumber: 'H-AK-002',
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSendPdf = () => {
    // Logic to handle sending the PDF report
    Alert.alert('Hesabat yaradıldı', 'PDF hesabatı uğurla yaradıldı!');
    // You can implement the actual PDF generation and sending logic here
  };

  const handleQRPress = () => {
    // Logic to handle QR code press
    Alert.alert('QR Kod', 'QR kodu skan edin və ya paylaşın.');
    // You can implement the actual QR code functionality here
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: headerPaddingTop}]}>
        <Pressable style={styles.header_back} onPress={() => goBack()}>
          <ArrowIcon />
        </Pressable>
        <Text style={styles.header_text}>Hesabat</Text>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.scroll_padding}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.card_body}>
          <View style={styles.card_body_info}>
            <View style={styles.card_body_info_item}>
              <AppText variant="medium" fontSize={16} color="#000">
                {data?.reportNumber}
              </AppText>
            </View>
            <View style={[styles.card_body_info_item, styles.flexEnd]}>
              <TouchableOpacity onPress={handleQRPress} activeOpacity={0.7}>
                <QRIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card_body_info}>
            <View style={styles.card_body_info_item}>
              <AppText variant="regular" fontSize={14} color="#000">
                Layihə
              </AppText>
              <AppText variant="medium" fontSize={16} color="#000">
                {data?.projectName}
              </AppText>
            </View>
            <View style={[styles.card_body_info_item, styles.flexEnd]}>
              <AppText variant="regular" fontSize={14} color="#000">
                Alt layihə
              </AppText>
              <AppText variant="medium" fontSize={16} color="#000">
                {data?.subProjectName}
              </AppText>
            </View>
          </View>
          <View style={styles.card_body_info}>
            <View style={styles.card_body_info_item}>
              <AppText variant="regular" fontSize={14} color="#000">
                Hesabat tarixi
              </AppText>
              <AppText variant="medium" fontSize={16} color="#000">
                {data?.reportDate}
              </AppText>
            </View>
            <View style={[styles.card_body_info_item, styles.flexEnd]}>
              <AppText variant="regular" fontSize={14} color="#000">
                Tarix
              </AppText>
              <AppText variant="medium" fontSize={16} color="#000">
                {data?.date}
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.card_body}>
          <AppText variant="medium" fontSize={18}>
            Layihə haqqında məlumat
          </AppText>
          <View style={styles.card_body_info}>
            <View style={styles.card_body_info_item}>
              <AppText variant="regular" fontSize={14} color="#000">
                Layihə haqqında statik məlumat
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.card_body}>
          <AppText variant="medium" fontSize={18}>
            Hesabat təsvirləri
          </AppText>
          <View style={styles.card_body_info}>
            <View style={styles.card_body_info_item}>
              <AppText variant="regular" fontSize={14} color="#000">
                Menecer: {data?.manager}
              </AppText>
              <AppText variant="regular" fontSize={14} color="#000">
                Hesabat haqqında təsvir
              </AppText>
            </View>
          </View>
          <View style={styles.card_body_info}>
            <View style={styles.card_body_info_item}>
              <AppText variant="regular" fontSize={14} color="#000">
                Surveyor:{' '}
                {data?.surveyor + '         ' + data?.surveyorReportNumber}
              </AppText>
              <AppText variant="regular" fontSize={14} color="#000">
                Yoxlama hesabatı haqqında təsvir
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.image_container}>
          <Image
            source={require('../../assets/images/unusedimages/surveyor_image_3.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          handleSendPdf();
        }}
        activeOpacity={0.7}
        style={styles.send_button}>
        <LinearGradient />
        <AppText variant="medium" color="#fff" fontSize={16}>
          PDF göndər
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default FinalReportItemDetailScreen;

const styles = StyleSheet.create({
  scroll_padding: {
    paddingTop: 20,
    paddingBottom: 130,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_back: {
    position: 'relative',
    marginRight: 'auto',
  },
  header_text: {
    fontSize: 17,
    fontWeight: FONTS.fontWeight500,
    fontFamily: FONTS.sfProRoundedFontFamily,
    color: COLORS.black,
    marginRight: 'auto',
  },
  card_body: {
    padding: 20,
    backgroundColor: '#F3F7FB',
    borderRadius: 20,
    marginBottom: 5,
  },
  card_body_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card_body_info_item: {
    flexDirection: 'column',
    gap: 5,
  },
  flexEnd: {
    alignItems: 'flex-end',
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
  image_container: {
    marginTop: 20,
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
