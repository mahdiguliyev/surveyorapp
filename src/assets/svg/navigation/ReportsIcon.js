import Svg, {G, Path, Rect} from 'react-native-svg';

const ReportsIcon = ({color}) => {
  return (
    <Svg
      fill={color ? color : '#C2C2C2'}
      width="25"
      height="24"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color ? color : '#C2C2C2'}
      stroke-width="0.00032">
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <G
          id="Group_32"
          data-name="Group 32"
          transform="translate(-166 -321.048)">
          <Path
            id="Path_313"
            data-name="Path 313"
            d="M178,345.048h16a4,4,0,0,0,4-4v-16a4,4,0,0,0-4-4H178a4,4,0,0,0-4,4v20Zm16-4H178v-16h16Z"></Path>
          <Path
            id="Path_314"
            data-name="Path 314"
            d="M186,349.048H170v-20a4,4,0,0,0-4,4v16a4,4,0,0,0,4,4h16a4,4,0,0,0,4-4"></Path>
        </G>
      </G>
    </Svg>
  );
};

export default ReportsIcon;
