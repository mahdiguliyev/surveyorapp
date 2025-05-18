import { Text, StyleSheet } from 'react-native';
import { FONTS } from '@components/styles/fonts';

export const Colors = {
  primary: '#0B5AAE',
  black: '#000000',
  gray: '#757575',
  grayA3: '#A3A3A3',
  danger: '#FF0004',
};

const AppText = ({
  children,
  variant = 'regular',
  color = 'black',
  fontSize,
  style,
  // yeni eklenenler:
  m, mt, mb, ml, mr, mx, my,
  p, pt, pb, pl, pr, px, py,
  ...props
}) => {
  const textColor = { color: Colors[color] || color };
  const textFontSize = fontSize ? { fontSize } : {};
  const spacing = {
    ...(m !== undefined && { margin: m }),
    ...(mx !== undefined && { marginHorizontal: mx }),
    ...(my !== undefined && { marginVertical: my }),
    ...(mt !== undefined && { marginTop: mt }),
    ...(mb !== undefined && { marginBottom: mb }),
    ...(ml !== undefined && { marginLeft: ml }),
    ...(mr !== undefined && { marginRight: mr }),

    ...(p !== undefined && { padding: p }),
    ...(px !== undefined && { paddingHorizontal: px }),
    ...(py !== undefined && { paddingVertical: py }),
    ...(pt !== undefined && { paddingTop: pt }),
    ...(pb !== undefined && { paddingBottom: pb }),
    ...(pl !== undefined && { paddingLeft: pl }),
    ...(pr !== undefined && { paddingRight: pr }),
  };

  return (
    <Text
      style={[styles[variant], textColor, textFontSize, spacing, style]}
      {...props}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  regular: {
    fontWeight: FONTS.fontWeight400,
    fontFamily: FONTS.sfProRoundedFontFamily,
     includeFontPadding: false,
  },
  medium: {
    fontWeight: FONTS.fontWeight500,
    fontFamily: FONTS.sfProRoundedFontFamily,
     includeFontPadding: false,
  },
  semıbold: {
    fontWeight: FONTS.fontWeight600,
    fontFamily: FONTS.sfProRoundedFontFamily,
     includeFontPadding: false,
  },
  bold: {
    fontWeight: FONTS.fontWeight700,
    fontFamily: FONTS.sfProRoundedFontFamily,
     includeFontPadding: false,
  },
});
