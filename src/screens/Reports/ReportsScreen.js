import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AppText from '@components/AppText';
import ChangeIcon from '@assets/svg/ChangeIcon';
import FilterIcon from '@assets/svg/FilterIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {horizontalScale, verticalScale} from '../../common/Metrics';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS} from '../../components/styles/colors';
import React, {useEffect, useRef, useState} from 'react';
import ListItem from '../Home/components/ListItem';
import ReportsTypeChoose from './components/ReportsTypeChoose';
import {useFocusEffect} from '@react-navigation/native';

const window = Dimensions.get('window');

const report_types = [
  {type: 'check_report', title: 'Yoxlama hesabatları'},
  {type: 'final_report', title: 'Yekun hesabatları'},
];

const headers_check_report = [
  {key: 'no', label: 'No'},
  {key: 'date', label: 'Tarix'},
  {key: 'name', label: 'Surveyor'},
];

const headers_final_report = [
  {key: 'no', label: 'No'},
  {key: 'date', label: 'Tarix'},
  {key: 'name', label: 'Menecer'},
];

const data_check_report = [
  {no: 'H-AK-001', date: '01.05.2025', name: 'Mahdi Guliyev'},
  {no: 'H-AK-002', date: '07.05.2025', name: 'Mahdi Guliyev'},
  {no: 'H-AK-003', date: '10.05.2025', name: 'Mahdi Guliyev'},
  {no: 'H-AK-004', date: '15.05.2025', name: 'Mahdi Guliyev'},
  {no: 'H-AK-005', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-006', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-007', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-008', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-009', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-0010', date: '15.05.2025', name: 'Yalçın Talıbov'},
];

const data_check_report_2 = [
  {no: 'H-AK-0011', date: '01.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-0012', date: '07.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-0013', date: '10.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-0014', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-0015', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-0016', date: '15.05.2025', name: 'Yalçın Talıbov'},
];

const data_final_report = [
  {no: 'H-AK-001', date: '01.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-002', date: '07.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-003', date: '10.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-004', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-005', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-006', date: '15.05.2025', name: 'Yalçın Talıbov'},
  {no: 'H-AK-007', date: '15.05.2025', name: 'Yalçın Talıbov'},
];

const data_final_report_2 = [];

const SectionTitle = ({children}) => (
  <AppText
    variant="medium"
    color="black"
    fontSize={15}
    style={styles.item_title}>
    {children}
  </AppText>
);

const ReportsScreen = ({navigation, route}) => {
  //const {type, mainTitle} = route.params;
  const [checkReports, setCheckReports] = useState([]);
  const [finalReports, setFinaleports] = useState([]);
  const [choseReportType, setChooseReportType] = useState(false);
  const [selectedType, setSelectedType] = useState(report_types[0]);
  const [pagingLoading, setPagingLoading] = useState(false);
  const [buttonPositionStatus, setButtonPositionStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const currentPage = useRef(1);
  const totalPages = useRef(1);

  const insets = useSafeAreaInsets();
  const headerPaddingTop =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top;

  const handleChooseReportType = () => {
    setChooseReportType(!choseReportType);
  };

  const handleSelectReportType = item => {
    setSelectedType(item);
    setChooseReportType(false);
  };

  const getCheckReports = async () => {
    currentPage.current = 1;

    if (data_check_report.length + data_check_report_2.length > 10) {
      totalPages.current = 2;
    }

    setCheckReports(data_check_report);
  };
  const getFinalReports = async () => {
    currentPage.current = 1;

    if (data_final_report.length + data_final_report_2.length > 10) {
      totalPages.current = 2;
    }

    setFinaleports(data_final_report);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCheckReports();
      getFinalReports();
    }, []),
  );

  const getMoreCheckReports = () => {
    if (pagingLoading || currentPage.current >= totalPages.current) return;

    setPagingLoading(true);

    setTimeout(() => {
      const nextPage = currentPage.current + 1;
      setCheckReports(prev => [...prev, ...data_check_report_2]);
      currentPage.current = nextPage;
      setPagingLoading(false);
    }, 2000); // wait for 2 seconds
  };

  const getMoreFinalReports = () => {
    if (pagingLoading || currentPage.current >= totalPages.current) return;

    setPagingLoading(true);

    setTimeout(() => {
      const nextPage = currentPage.current + 1;
      setFinaleports(prev => [...prev, ...data_final_report_2]);
      currentPage.current = nextPage;
      setPagingLoading(false);
    }, 2000); // wait for 2 seconds
  };

  const toggleModal = () => {
    alert('Modal açılır');
    setModalVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View
        style={[
          styles.item_header,
          {
            paddingTop: headerPaddingTop,
          },
        ]}>
        <AppText variant="medium" color="black" fontSize={17}>
          Hesabatlar
        </AppText>
        <View style={styles.item_header_2}></View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <SectionTitle>{selectedType.title}</SectionTitle>
        <View style={styles.button_proces}>
          <TouchableOpacity
            style={{marginRight: horizontalScale(20)}}
            onPress={handleChooseReportType}>
            <ChangeIcon color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Hesabatlar',
                'Hesabatlar filter vermək üçün modal açılır',
              )
            }>
            <FilterIcon color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      {selectedType.type === 'check_report' ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: horizontalScale(15),
          }}>
          {checkReports.length > 0 ? (
            <FlatList
              data={checkReports}
              keyExtractor={item => item.no}
              renderItem={({item}) => (
                <ListItem item={item} headers={headers_check_report} />
              )}
              contentContainerStyle={styles.contentContainer}
              onEndReached={getMoreCheckReports}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() =>
                pagingLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                    style={{marginTop: verticalScale(20)}}
                  />
                ) : null
              }
            />
          ) : (
            <View style={{marginBottom: window.height * 0.2}}>
              <AppText variant="medium" color="black" fontSize={17}>
                Heç bir hesabat yoxdur
              </AppText>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: horizontalScale(15),
          }}>
          {finalReports.length > 0 ? (
            <FlatList
              data={finalReports}
              keyExtractor={item => item.no}
              renderItem={({item}) => (
                <ListItem item={item} headers={headers_final_report} />
              )}
              contentContainerStyle={styles.contentContainer}
              onEndReached={getMoreFinalReports}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() =>
                pagingLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                    style={{marginTop: verticalScale(20)}}
                  />
                ) : null
              }
            />
          ) : (
            <View style={{marginBottom: window.height * 0.2}}>
              <AppText variant="medium" color="black" fontSize={17}>
                Heç bir hesabat yoxdur
              </AppText>
            </View>
          )}
        </View>
      )}

      <ReportsTypeChoose
        data={report_types}
        modalVisible={choseReportType}
        onPress={handleChooseReportType}
        selectedType={selectedType.type}
        onSelectType={handleSelectReportType}
      />
    </View>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'ios' ? 80 : 50,
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
  add_button_container: {
    position: 'relative',
  },
  add_button: {
    position: 'absolute',
    bottom: verticalScale(100),
    right: horizontalScale(20),
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // e
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
  button_proces: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
  },
});
