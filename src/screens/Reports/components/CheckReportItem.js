import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AppText from '@components/AppText';
import MenuDotsIcon from '@assets/svg/MenuDotsIcon';
import {useNavigation} from '@react-navigation/native';

const CheckReportItem = ({item, handleSelectedItem}) => {
  const navigation = useNavigation();
  const {no, date, user} = item;

  return (
    <View style={styles.product_account_item}>
      <TouchableOpacity
        onPress={() => handleSelectedItem(item)}
        activeOpacity={0.5}
        style={styles.card_body}>
        <View style={styles.colum_flex}>
          <AppText variant="medium" fontSize={15} color="black">
            {no}
          </AppText>
        </View>
        <View style={styles.colum_flex}>
          <AppText variant="medium" fontSize={15} color="black">
            {date}
          </AppText>
        </View>
        <View style={[styles.colum_flex, styles.colum_flex_balance]}>
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
    paddingHorizontal: '4%',
    marginBottom: 10,
    backgroundColor: '#F2F6FB',
  },
  card_body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  colum_flex: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  colum_flex_balance: {
    minWidth: 100,
    minHeight: 50,
  },
});

export default CheckReportItem;
