// AuthContext.js
import React, { createContext, useState } from 'react';

// 1. Create context
export const AuthContext = createContext();

// 2. Create provider
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
