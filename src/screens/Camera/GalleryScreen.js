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
import PlusIcon from '@assets/svg/PlusIcon';
import PhotoCameraIcon from '@assets/svg/navigation/PhotoCameraIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {horizontalScale, verticalScale} from '../../common/Metrics';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS} from '../../components/styles/colors';
import React, {useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import ReportsTypeChoose from '../Reports/components/ReportsTypeChoose';
import GalleryItem from './components/GalleryItem';

const window = Dimensions.get('window');
const image_types = [
  {type: 'all_images', title: 'Bütün şəkillər'},
  {type: 'used_images', title: 'İstifadə olunan şəkillər'},
  {type: 'unused_images', title: 'İstifadə olunmayan şəkillər'},
];

const images_data_1 = [
  {
    id: '1',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '2',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '3',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '4',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '5',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '6',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '7',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '8',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '9',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '10',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '11',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '12',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '13',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '14',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '15',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: false,
  },
  {
    id: '16',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '17',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '18',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
  {
    id: '19',
    uri: require('../../assets/images/unusedimages/surveyor_image_3.jpg'),
    isUsed: true,
  },
];

const images_data_2 = [];

const SectionTitle = ({children}) => (
  <AppText
    variant="medium"
    color="black"
    fontSize={15}
    style={styles.item_title}>
    {children}
  </AppText>
);

const GalleryScreen = ({navigation, route}) => {
  const [allImages, setAllImages] = useState([]);
  const [images, setImages] = useState([]);
  const [chooseImageType, setChooseImageType] = useState(false);
  const [selectedType, setSelectedType] = useState(image_types[0]);
  const [pagingLoading, setPagingLoading] = useState(false);
  const selectedImages = useRef([]);

  const currentPage = useRef(1);
  const totalPages = useRef(1);

  const insets = useSafeAreaInsets();
  const headerPaddingTop =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || insets.top
      : insets.top;

  const handleChooseImageType = () => {
    setChooseImageType(!chooseImageType);
  };

  const handleSelectImageType = item => {
    const filtered = allImages.filter(img => {
      if (item.type === 'used_images') return img.isUsed;
      if (item.type === 'unused_images') return !img.isUsed;
      return true;
    });

    setImages(filtered);

    setSelectedType(item);
    setChooseImageType(false);
  };

  const handleImagePress = image => {
    setImages(prevImages =>
      prevImages.map(img => {
        if (img.id === image.id) {
          const isNowSelected = !img.isSelected;

          // Update selectedImages ref
          if (isNowSelected) {
            selectedImages.current.push({...img, isSelected: true});
          } else {
            selectedImages.current = selectedImages.current.filter(
              selected => selected.id !== img.id,
            );
          }

          return {...img, isSelected: isNowSelected};
        }
        return img;
      }),
    );
  };

  const getImages = async () => {
    console.log('getImages called');
    const dataWithSelection = images_data_1.map(img => ({
      ...img,
      isSelected: false,
    }));
    setAllImages(dataWithSelection);
    setImages(dataWithSelection);
  };

  useFocusEffect(
    React.useCallback(() => {
      selectedImages.current = [];
      setSelectedType(image_types[0]);
      getImages();
    }, []),
  );

  const getMoreImages = () => {
    if (pagingLoading || currentPage.current >= totalPages.current) return;

    setPagingLoading(true);

    setTimeout(() => {
      setPagingLoading(false);
    }, 2000); // wait for 2 seconds
  };

  const makeReportWithSelectedImages = () => {
    navigation.navigate('CreatingReport', {
      images: selectedImages.current,
    });
    selectedImages.current = [];
  };

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  console.log('rendered...');
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
          Galeriya
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
            onPress={handleChooseImageType}>
            <ChangeIcon color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Galeriya',
                'Galeriya filter vermək üçün filterler açılır',
              )
            }>
            <FilterIcon color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: horizontalScale(15),
        }}>
        {images.length > 0 ? (
          <FlatList
            data={images}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <GalleryItem item={item} handleImagePress={handleImagePress} />
            )}
            numColumns={3}
            contentContainerStyle={styles.contentContainer}
            onEndReached={getMoreImages}
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
              Heç bir şəkil yoxdur
            </AppText>
          </View>
        )}
      </View>
      {selectedImages.current.length > 0 ? (
        <View style={styles.add_button_container}>
          <TouchableOpacity
            style={styles.add_button}
            onPress={makeReportWithSelectedImages}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.add_button_container}>
          <TouchableOpacity style={styles.add_button} onPress={openCamera}>
            <PhotoCameraIcon color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      <ReportsTypeChoose
        data={image_types}
        modalVisible={chooseImageType}
        onPress={handleChooseImageType}
        selectedType={selectedType.type}
        onSelectType={handleSelectImageType}
      />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'ios' ? 80 : 60,
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
