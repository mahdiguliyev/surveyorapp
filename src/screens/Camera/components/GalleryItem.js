import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {memo} from 'react';
import ChechkIcon from '@assets/svg/ChechkIcon';
import {horizontalScale, verticalScale} from '../../../common/Metrics';
import {COLORS} from '../../../components/styles/colors';

const GalleryItem = memo(({item, handleImagePress}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[
          styles.imageCover,
          {borderColor: item.isUsed ? COLORS.primary : COLORS.red},
        ]}
        onPress={() => {
          handleImagePress(item);
        }}>
        <Image source={item.uri} style={styles.image} />
        {item.isSelected && (
          <View style={styles.checkmarkContainer}>
            <ChechkIcon />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
});

const screenWidth = Dimensions.get('window').width;
const itemSize = (screenWidth - 20) / 3;

const styles = StyleSheet.create({
  itemContainer: {
    width: itemSize,
    height: itemSize,
    padding: 2,
  },
  imageCover: {
    width: horizontalScale(100),
    height: verticalScale(100),
    borderRadius: 8,
    borderWidth: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  checkmarkContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 4,
    right: 4,
    width: horizontalScale(20),
    height: verticalScale(20),
    backgroundColor: COLORS.green,
    borderRadius: 10,
  },
});

export default GalleryItem;
