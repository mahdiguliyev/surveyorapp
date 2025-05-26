import Svg, {G, Rect, Path} from 'react-native-svg';

const FailedTickIcon = ({color}) => {
  return (
    <Svg
      fill={color ? color : '#74039e'}
      width="16"
      height="16"
      viewBox="0 0 64 64"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <G id="Icons1">
          <Path
            id="times"
            d="M32.033,29.19l15.55,-15.55l2.863,2.863l-15.55,15.55l15.55,15.55l-2.863,2.863l-15.55,-15.55l-15.55,15.55l-2.863,-2.863l15.55,-15.55l-15.55,-15.55l2.863,-2.863l15.55,15.55Z"></Path>
          <Path d="M32.033,29.19l15.55,-15.55l2.863,2.863l-15.55,15.55l15.55,15.55l-2.863,2.863l-15.55,-15.55l-15.55,15.55l-2.863,-2.863l15.55,-15.55l-15.55,-15.55l2.863,-2.863l15.55,15.55Z"></Path>
        </G>
      </G>
    </Svg>
  );
};

export default FailedTickIcon;
