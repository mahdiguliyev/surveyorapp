import Svg, {Defs, G, Path, ClipPath, Rect} from 'react-native-svg';

const ArrowIcon = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <G clip-path="url(#clip0_0_502)">
        <Path
          d="M10.3333 18.333L2 9.99967M2 9.99967L10.3333 1.66634M2 9.99967L18.6667 9.99967"
          stroke={color ? color : '#000'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_0_502">
          <Rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 20) rotate(-90)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ArrowIcon;
