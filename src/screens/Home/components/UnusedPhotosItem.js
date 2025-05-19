import {View, Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const UnusedPhotosItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={item.imgUrl} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default UnusedPhotosItem;
