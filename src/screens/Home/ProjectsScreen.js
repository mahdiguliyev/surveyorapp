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
  {key: 'name', label: 'Layihə adı'},
];

const data = [
  {no: 'H-AK-001', date: '01.05.2025', name: 'Layihə-1'},
  {no: 'H-AK-002', date: '07.05.2025', name: 'Layihə-2'},
  {no: 'H-AK-003', date: '10.05.2025', name: 'Layihə-3'},
  {no: 'H-AK-004', date: '15.05.2025', name: 'Layihə-4'},
  {no: 'H-AK-005', date: '15.05.2025', name: 'Layihə-5'},
  {no: 'H-AK-006', date: '15.05.2025', name: 'Layihə-6'},
  {no: 'H-AK-007', date: '15.05.2025', name: 'Layihə-7'},
  {no: 'H-AK-008', date: '15.05.2025', name: 'Layihə-8'},
  {no: 'H-AK-009', date: '15.05.2025', name: 'Layihə-9'},
  {no: 'H-AK-0010', date: '15.05.2025', name: 'Layihə-10'},
];

const data2 = [
  {no: 'H-AK-0011', date: '01.05.2025', name: 'Layihə-11'},
  {no: 'H-AK-0012', date: '07.05.2025', name: 'Layihə-12'},
  {no: 'H-AK-0013', date: '10.05.2025', name: 'Layihə-13'},
  {no: 'H-AK-0014', date: '15.05.2025', name: 'Layihə-14'},
  {no: 'H-AK-0015', date: '15.05.2025', name: 'Layihə-15'},
  {no: 'H-AK-0016', date: '15.05.2025', name: 'Layihə-16'},
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

const ProjectsScreen = ({navigation, route}) => {
  //const {type, mainTitle} = route.params;
  const [projects, setProjects] = useState([]);
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

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getProjects = async () => {
      currentPage.current = 1;

      if (data.length + data2.length > 10) {
        totalPages.current = 2;
      }

      setProjects(data);
    };
    getProjects();
  }, []);

  const getMoreProjects = () => {
    if (pagingLoading || currentPage.current >= totalPages.current) return;

    setPagingLoading(true);

    setTimeout(() => {
      const nextPage = currentPage.current + 1;
      setProjects(prev => [...prev, ...data2]);
      currentPage.current = nextPage;
      setPagingLoading(false);
    }, 2000); // wait for 2 seconds
  };

  const toggleModal = () => {
    navigation.navigate('AddProject');
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
          Layihələr
        </AppText>
        <View style={styles.item_header_2}></View>
      </View>
      {projects.length > 0 && <SectionTitle>Layihələrin siyahısı</SectionTitle>}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: horizontalScale(15),
        }}>
        {projects.length > 0 ? (
          <FlatList
            data={projects}
            keyExtractor={item => item.no}
            renderItem={({item}) => <ListItem item={item} headers={headers} />}
            contentContainerStyle={styles.contentContainer}
            onEndReached={getMoreProjects}
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
        <TouchableOpacity style={styles.add_button} onPress={toggleModal}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProjectsScreen;

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
