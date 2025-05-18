import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const LockIcon = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <G clip-path="url(#clip0_0_514)">
        <Path
          d="M1.66666 13.3333C1.66666 10.9766 1.66666 9.79748 2.39916 9.06581C3.13082 8.33331 4.30999 8.33331 6.66666 8.33331H13.3333C15.69 8.33331 16.8692 8.33331 17.6008 9.06581C18.3333 9.79748 18.3333 10.9766 18.3333 13.3333C18.3333 15.69 18.3333 16.8691 17.6008 17.6008C16.8692 18.3333 15.69 18.3333 13.3333 18.3333H6.66666C4.30999 18.3333 3.13082 18.3333 2.39916 17.6008C1.66666 16.8691 1.66666 15.69 1.66666 13.3333Z"
          stroke={color}
          stroke-width="1.5"
        />
        <Path
          d="M5 8.33332V6.66666C5 5.34057 5.52678 4.0688 6.46447 3.13112C7.40215 2.19344 8.67392 1.66666 10 1.66666C11.3261 1.66666 12.5979 2.19344 13.5355 3.13112C14.4732 4.0688 15 5.34057 15 6.66666V8.33332"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <Path
          d="M6.66666 13.3333H6.67416M9.99249 13.3333H9.99999M13.3258 13.3333H13.3333"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_0_514">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LockIcon;
