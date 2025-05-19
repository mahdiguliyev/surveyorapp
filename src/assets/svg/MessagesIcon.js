import Svg, {Path} from 'react-native-svg';

const MessagesIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none">
      <Path
        d="M8 9.5H16M8 13.5H14M18 4.5C18.7956 4.5 19.5587 4.81607 20.1213 5.37868C20.6839 5.94129 21 6.70435 21 7.5V15.5C21 16.2956 20.6839 17.0587 20.1213 17.6213C19.5587 18.1839 18.7956 18.5 18 18.5H13L8 21.5V18.5H6C5.20435 18.5 4.44129 18.1839 3.87868 17.6213C3.31607 17.0587 3 16.2956 3 15.5V7.5C3 6.70435 3.31607 5.94129 3.87868 5.37868C4.44129 4.81607 5.20435 4.5 6 4.5H18Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MessagesIcon;
