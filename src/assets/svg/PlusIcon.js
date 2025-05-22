import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const PlusIcon = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <G clip-path="url(#clip0_629_1289)">
        <Path
          d="M1.6665 9.99999H9.99984M9.99984 9.99999H18.3332M9.99984 9.99999V1.66666M9.99984 9.99999V18.3333"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_629_1289">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PlusIcon;
