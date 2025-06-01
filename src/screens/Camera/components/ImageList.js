import {useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppText from '@components/AppText';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import ImageListItem from './ImageListItem';
import Pagination from '../../Home/components/Pagination';

const test_data = [
  {
    id: 1,
    imgUrl: require('@assets/images/unusedimages/surveyor_images_1.jpg'),
  },
  {
    id: 2,
    imgUrl: require('@assets/images/unusedimages/surveyor_images_2.jpg'),
  },
  {
    id: 3,
    imgUrl: require('@assets/images/unusedimages/surveyor_image_3.jpg'),
  },
  {
    id: 4,
    imgUrl: require('@assets/images/unusedimages/surveyor_images_4.jpeg'),
  },
  {
    id: 5,
    imgUrl: require('@assets/images/unusedimages/surveyor_images_1.jpg'),
  },
  {
    id: 6,
    imgUrl: require('@assets/images/unusedimages/surveyor_images_2.jpg'),
  },
  {
    id: 7,
    imgUrl: require('@assets/images/unusedimages/surveyor_image_3.jpg'),
  },
  {
    id: 8,
    imgUrl: require('@assets/images/unusedimages/surveyor_images_4.jpeg'),
  },
  {
    id: 9,
    imgUrl: require('@assets/images/unusedimages/surveyor_images_1.jpg'),
  },
  {
    id: 10,
    imgUrl: require('@assets/images/unusedimages/surveyor_images_2.jpg'),
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ImageList({selectedImages}) {
  const scrollX = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleDotPress = idx => {
    flatListRef.current?.scrollToIndex({index: idx, animated: true});
  };
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    if (
      viewableItems &&
      viewableItems[0] &&
      viewableItems[0].index !== null &&
      viewableItems[0].index !== undefined
    ) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 5,
  }).current;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <AppText variant="medium" fontSize={14} color="#000">
          Şəkillər
        </AppText>
      </View>
      <View>
        <AnimatedFlatList
          ref={flatListRef}
          data={selectedImages}
          renderItem={({item}) => <ImageListItem item={item} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(_, i) => i.toString()}
        />

        <Pagination
          data={selectedImages}
          scrollX={scrollX}
          index={index}
          onDotPress={handleDotPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
});
