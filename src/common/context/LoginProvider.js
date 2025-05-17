import React, {createContext, useContext, useState} from 'react';

const LoginContext = createContext();

const LoginProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <LoginContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </LoginContext.Provider>
  );
};

export const useAuthentication = () => useContext(LoginContext);

export default LoginProvider;
