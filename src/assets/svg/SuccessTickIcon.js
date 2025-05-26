import Svg, {G, Rect, Path} from 'react-native-svg';

const SuccessTickIcon = ({color}) => {
  return (
    <Svg
      fill={color ? color : '#74039e'}
      width="16"
      height="16"
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg">
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <Path
          class="clr-i-outline clr-i-outline-path-1"
          d="M13.72,27.69,3.29,17.27a1,1,0,0,1,1.41-1.41l9,9L31.29,7.29a1,1,0,0,1,1.41,1.41Z"></Path>
      </G>
    </Svg>
  );
};

export default SuccessTickIcon;
