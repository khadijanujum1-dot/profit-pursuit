<<<<<<< HEAD
import React, { createContext, useState, useContext } from 'react';
=======
import React, { createContext, useContext } from 'react';
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const navigateToLogin = () => {
    window.location.href = '/admin';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
=======
  return (
    <AuthContext.Provider value={{
      user: null,
      isAuthenticated: false,
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
      isLoadingAuth: false,
      isLoadingPublicSettings: false,
      authError: null,
      appPublicSettings: null,
      authChecked: true,
<<<<<<< HEAD
      logout,
      navigateToLogin,
=======
      logout: () => {},
      navigateToLogin: () => {},
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
      checkUserAuth: () => {},
      checkAppState: () => {}
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
<<<<<<< HEAD
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
=======
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
