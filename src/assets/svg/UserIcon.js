import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const UserIcon = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <G clip-path="url(#clip0_0_506)">
        <Path
          d="M0.999268 16.752C0.999268 15.5584 1.47341 14.4138 2.31738 13.5698C3.16136 12.7258 4.30603 12.2517 5.49959 12.2517H14.5002C15.6938 12.2517 16.8385 12.7258 17.6825 13.5698C18.5264 14.4138 19.0006 15.5584 19.0006 16.752C19.0006 17.3488 18.7635 17.9211 18.3415 18.3431C17.9195 18.7651 17.3472 19.0022 16.7504 19.0022H3.24943C2.65265 19.0022 2.08031 18.7651 1.65832 18.3431C1.23634 17.9211 0.999268 17.3488 0.999268 16.752Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <Path
          d="M10 7.75049C11.8641 7.75049 13.3753 6.23934 13.3753 4.37524C13.3753 2.51115 11.8641 1 10 1C8.13593 1 6.62479 2.51115 6.62479 4.37524C6.62479 6.23934 8.13593 7.75049 10 7.75049Z"
          stroke={color}
          stroke-width="1.5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_0_506">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default UserIcon;
