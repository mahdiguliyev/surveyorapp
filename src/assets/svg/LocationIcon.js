import Svg, {Path} from 'react-native-svg';

const LocationIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none">
      <Path
        d="M3.16354 7.87629L15.0722 2.20636C16.8084 1.37915 18.6202 3.19186 17.794 4.92899L12.1236 16.8356C11.3484 18.4625 8.99938 18.3624 8.36616 16.6743L7.31828 13.8771C7.21589 13.6042 7.05628 13.3564 6.85018 13.1503C6.64407 12.9442 6.39624 12.7846 6.12333 12.6823L3.32491 11.6334C1.63769 11.0003 1.53658 8.65141 3.16354 7.87629Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LocationIcon;
