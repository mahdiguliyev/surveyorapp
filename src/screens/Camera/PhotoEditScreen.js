import React, {useRef, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {
  Canvas,
  Path,
  Skia,
  useImage,
  Image as SkImage,
} from '@shopify/react-native-skia';
import {horizontalScale, verticalScale} from '../../common/Metrics';
import ArrowIcon from '@assets/svg/ArrowIcon';
import PlusIcon from '@assets/svg/PlusIcon';
import {COLORS} from '../../components/styles/colors';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const PhotoEditScreen = ({navigation, route}) => {
  const {photoUrl} = route?.params;

  const currentPath = useRef(null);
  const [paths, setPaths] = useState([]);
  const skiaImage = useImage(photoUrl);

  const updatePaths = useCallback(newPath => {
    setPaths(prev => [...prev, newPath]);
  }, []);

  const drawGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(({x, y}) => {
      currentPath.current = Skia.Path.Make();
      currentPath.current.moveTo(x, y);
      runOnJS(updatePaths)(currentPath.current);
    })
    .onUpdate(({x, y}) => {
      if (currentPath.current) {
        currentPath.current.lineTo(x, y);
        // Force re-render to show updated path
        setPaths(prev => [...prev]);
      }
    });

  // Calculate scaled image size to cover screen (like resizeMode 'cover')
  const getScaledSize = () => {
    if (!skiaImage) return {width: 0, height: 0};

    const imageWidth = skiaImage.width();
    const imageHeight = skiaImage.height();

    const widthScale = SCREEN_WIDTH / imageWidth;
    const heightScale = SCREEN_HEIGHT / imageHeight;
    const scale = Math.max(widthScale, heightScale); // cover logic

    return {
      width: imageWidth * scale,
      height: imageHeight * scale,
    };
  };

  const {width: imgW, height: imgH} = getScaledSize();
  const x = (SCREEN_WIDTH - imgW) / 2;
  const y = (SCREEN_HEIGHT - imgH) / 2;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.closeButton}>
          <ArrowIcon color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.image_controls_button}
          onPress={() => {
            alert('Image saved');
          }}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
      {skiaImage && (
        <GestureDetector gesture={drawGesture}>
          <Canvas style={styles.canvas}>
            <SkImage image={skiaImage} x={x} y={y} width={imgW} height={imgH} />
            {paths.map((path, index) => (
              <Path
                key={index}
                path={path}
                color="red"
                style="stroke"
                strokeWidth={4}
              />
            ))}
          </Canvas>
        </GestureDetector>
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.captureButton} onPress={() => {}}>
          <View style={styles.innerButton} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={() => {}}>
          <View style={styles.innerButton} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={() => {}}>
          <View style={styles.innerButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhotoEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(25),
    paddingTop: Platform.OS === 'ios' ? verticalScale(100) : verticalScale(70),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:
      Platform.OS === 'ios' ? verticalScale(30) : verticalScale(15),
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  captureButton: {
    width: horizontalScale(70),
    height: verticalScale(70),
    borderRadius: 35,
    backgroundColor: '#ffffff88',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(10),
  },
  innerButton: {
    width: horizontalScale(50),
    height: verticalScale(50),
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  image_controls_button: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
});
