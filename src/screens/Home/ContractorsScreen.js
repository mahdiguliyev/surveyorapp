import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Pressable,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AppText from '@components/AppText';
import PlusIcon from '@assets/svg/PlusIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ArrowIcon from '../../assets/svg/ArrowIcon';
import ListItem from './components/ListItem';
import {horizontalScale, verticalScale} from '../../common/Metrics';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS} from '../../components/styles/colors';
import {useEffect, useRef, useState} from 'react';

const window = Dimensions.get('window');

const headers = [
  {key: 'no', label: 'No'},
  {key: 'date', label: 'Tarix'},
  {key: 'name', label: 'Podratçı adı'},
];

const data = [
  {no: 'H-AK-001', date: '01.05.2025', name: 'Podratçı-1'},
  {no: 'H-AK-002', date: '07.05.2025', name: 'Podratçı-2'},
  {no: 'H-AK-003', date: '10.05.2025', name: 'Podratçı-3'},
  {no: 'H-AK-004', date: '15.05.2025', name: 'Podratçı-4'},
  {no: 'H-AK-005', date: '15.05.2025', name: 'Podratçı-5'},
  {no: 'H-AK-006', date: '15.05.2025', name: 'Podratçı-6'},
  {no: 'H-AK-007', date: '15.05.2025', name: 'Podratçı-7'},
  {no: 'H-AK-008', date: '15.05.2025', name: 'Podratçı-8'},
  {no: 'H-AK-009', date: '15.05.2025', name: 'Podratçı-9'},
  {no: 'H-AK-0010', date: '15.05.2025', name: 'Podratçı-10'},
];

const data2 = [
  {no: 'H-AK-0011', date: '01.05.2025', name: 'Podratçı-11'},
  {no: 'H-AK-0012', date: '07.05.2025', name: 'Podratçı-12'},
  {no: 'H-AK-0013', date: '10.05.2025', name: 'Podratçı-13'},
  {no: 'H-AK-0014', date: '15.05.2025', name: 'Podratçı-14'},
  {no: 'H-AK-0015', date: '15.05.2025', name: 'Podratçı-15'},
  {no: 'H-AK-0016', date: '15.05.2025', name: 'Podratçı-16'},
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

const ContractorsScreen = ({navigation, route}) => {
  const [contractors, setContractors] = useState([]);
  const [pagingLoading, setPagingLoading] = useState(false);

  const currentPage = useRef(1);
  const totalPages = useRef(1);

  const insets = useSafeAreaInsets();
  const headerPaddingTop =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top;

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getContractors = async () => {
      currentPage.current = 1;

      if (data.length + data2.length > 10) {
        totalPages.current = 2;
      }

      setContractors(data);
    };
    getContractors();
  }, []);

  const getMoreContractors = () => {
    if (pagingLoading || currentPage.current >= totalPages.current) return;

    setPagingLoading(true);

    setTimeout(() => {
      const nextPage = currentPage.current + 1;
      setContractors(prev => [...prev, ...data2]);
      currentPage.current = nextPage;
      setPagingLoading(false);
    }, 2000); // wait for 2 seconds
  };

  const navigateAddNewContractor = () => {
    navigation.navigate('AddContractor');
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
        <Pressable onPress={goBack}>
          <ArrowIcon color="#000" />
        </Pressable>
        <AppText variant="medium" color="black" fontSize={17}>
          Podratçılar
        </AppText>
        <View style={styles.item_header_2}></View>
      </View>
      {contractors.length > 0 && (
        <SectionTitle>Podratçıların siyahısı</SectionTitle>
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: horizontalScale(15),
        }}>
        {contractors.length > 0 ? (
          <FlatList
            data={contractors}
            keyExtractor={item => item.no}
            renderItem={({item}) => <ListItem item={item} headers={headers} />}
            contentContainerStyle={styles.contentContainer}
            onEndReached={getMoreContractors}
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
              Heç bir Layihə yoxdur
            </AppText>
          </View>
        )}
      </View>
      {/* <ListItem /> */}
      <View style={styles.add_button_container}>
        <TouchableOpacity
          style={styles.add_button}
          onPress={navigateAddNewContractor}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContractorsScreen;

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: horizontalScale(20),
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
});
