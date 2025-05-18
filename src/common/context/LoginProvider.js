import React, {createContext, useContext, useState} from 'react';

const LoginContext = createContext();

const LoginProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // will contain role and other user info

  const login = userData => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <LoginContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useAuthentication = () => useContext(LoginContext);

export default LoginProvider;
