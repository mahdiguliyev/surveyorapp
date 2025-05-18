import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const isHeightHightThan720 = () => {
  if (height > 692) {
    return true;
  } else {
    return false;
  }
};

export {horizontalScale, verticalScale, moderateScale, isHeightHightThan720};
