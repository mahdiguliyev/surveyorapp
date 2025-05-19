import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AppText from '@components/AppText';
import MenuDotsIcon from '@assets/svg/MenuDotsIcon';
import {useNavigation} from '@react-navigation/native';

const ReportItem = ({item, headers}) => {
  const navigation = useNavigation();
  const {no, date, user} = item;

  const handleAccount = item => {
    navigation.navigate('AccountDetail', {
      data: item,
    });
  };
  return (
    <View style={styles.product_account_item}>
      <TouchableOpacity
        onPress={() => handleAccount(item)}
        activeOpacity={0.5}
        style={styles.card_body}>
        <View style={styles.colum_flex}>
          <AppText variant="medium" fontSize={12} color="black">
            {headers[0].label}
          </AppText>
          <AppText variant="medium" fontSize={15} color="black">
            {no}
          </AppText>
        </View>
        <View style={styles.colum_flex}>
          <AppText variant="regular" fontSize={12} color="black">
            {headers[1].label}
          </AppText>
          <AppText variant="medium" fontSize={15} color="black">
            {date}
          </AppText>
        </View>
        <View style={[styles.colum_flex, styles.colum_flex_balance]}>
          <AppText variant="regular" fontSize={12} color="black">
            {headers[2].label}
          </AppText>
          <AppText variant="medium" fontSize={15} color="black">
            {user}
          </AppText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <MenuDotsIcon color="#0B5AAE" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  product_account_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: '4%',
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#F2F6FB',
  },
  card_body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  colum_flex: {
    flexDirection: 'column',
    gap: 10,
  },
  colum_flex_balance: {
    minWidth: 100,
    minHeight: 50,
  },
  price_btn_eye: {
    position: 'absolute',
    right: 0,
    top: -13,
    padding: 10,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReportItem;
