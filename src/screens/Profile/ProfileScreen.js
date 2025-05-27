import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AppText from '@components/AppText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../common/Metrics';
import ProfileIcon from '@assets/svg/ProfileIcon';
import EmailIcon from '@assets/svg/EmailIcon';
import ExitIcon from '@assets/svg/ExitIcon';
import {COLORS} from '../../components/styles/colors';
import {useAuthentication} from '../../common/context/LoginProvider';
import {useNavigation} from '@react-navigation/native';

const items = [
  {key: 'name', label: 'Mahdi Guliyev', Icon: ProfileIcon},
  {key: 'email', label: 'user@example.com', Icon: EmailIcon},
];

const ProfileScreen = () => {
  const {logout, setIsAuthenticated} = useAuthentication();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const headerPaddingTop =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top;

  const handleLogout = () => {
    logout();
    Alert.alert('Çıxış', 'Hesabdan çıxış etdiniz.');
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
          Profil
        </AppText>
        <Image
          source={{uri: 'https://i.pravatar.cc/150?img=12'}}
          style={styles.profileImage}
        />
        <View style={styles.item_header_2}></View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View style={styles.button_proces}>
          {items.map(({key, label, Icon}) => (
            <View key={key} style={styles.profile_item}>
              <View style={styles.profile_item_group}>
                <Icon color={COLORS.primary} />
                <AppText variant="medium" color="black" fontSize={14}>
                  {label}
                </AppText>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.profile_item}
            onPress={() => handleLogout()}>
            <View style={styles.profile_item_group}>
              <ExitIcon color={COLORS.primary} />
              <AppText variant="medium" color="black" fontSize={14}>
                Çıxış et
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
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
  button_proces: {
    flexDirection: 'column',
  },
  profile_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(10),
    borderColor: '#D7D7D7',
    borderWidth: 1,
    borderRadius: 20,
  },
  profile_item_group: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },
  profileImage: {
    width: horizontalScale(100),
    height: verticalScale(100),
    borderRadius: moderateScale(50), // Makes it a circle
    marginTop: verticalScale(50),
    borderColor: '#ddd',
  },
});
