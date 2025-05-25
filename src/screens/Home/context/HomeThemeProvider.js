import React, {createContext, useContext, useState} from 'react';

const HomeThemeContext = createContext();

export const HomeThemeProvider = ({children}) => {
  const [colors, setColors] = useState({
    colorFrom: '#b569d1',
    colorTo: '#74039e',
  });

  const changeToBlue = () =>
    setColors({colorFrom: '#005FA7', colorTo: '#061045'});

  const changeToYellow = () =>
    setColors({colorFrom: '#D5B576', colorTo: '#BB9357'});

  return (
    <HomeThemeContext.Provider value={{colors, changeToBlue, changeToYellow}}>
      {children}
    </HomeThemeContext.Provider>
  );
};

export const useHomeTheme = () => useContext(HomeThemeContext);
