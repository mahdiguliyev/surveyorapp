import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AppText from '@components/AppText';
import MenuDotsIcon from '@assets/svg/MenuDotsIcon';
import {useNavigation} from '@react-navigation/native';
import {memo} from 'react';

const ListItem = memo(({item, headers, handleReportDetail}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.product_account_item}>
      <TouchableOpacity
        onPress={() => handleReportDetail(item)}
        activeOpacity={0.5}
        style={styles.card_body}>
        <View style={styles.colum_flex}>
          <AppText variant="medium" fontSize={12} color="black">
            {headers[0].label}
          </AppText>
          <AppText variant="medium" fontSize={15} color="black">
            {item.no}
          </AppText>
        </View>
        <View style={styles.colum_flex}>
          <AppText variant="regular" fontSize={12} color="black">
            {headers[1].label}
          </AppText>
          <AppText variant="medium" fontSize={15} color="black">
            {item.date}
          </AppText>
        </View>
        <View style={[styles.colum_flex, styles.colum_flex_balance]}>
          <AppText variant="regular" fontSize={12} color="black">
            {headers[2].label}
          </AppText>
          <AppText variant="medium" fontSize={15} color="black">
            <AppText color="#000" fontSize={15} style={styles.not_see}>
              {item.name}
            </AppText>
          </AppText>
        </View>
        {/* <View
                style={styles.menudots}>
                <MenuDotsIcon color="#0B5AAE" />
              </View> */}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  product_account_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#F2F6FB',
  },
  card_body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  menudots: {
    alignItems: 'center',
    alignSelf: 'center',
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

export default ListItem;
