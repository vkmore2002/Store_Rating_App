import React, { createContext, useState } from "react";
import { setToken, getToken, removeToken } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());

  const login = (token, userRole) => {
    setToken(token);
    setTokenState(token);
    setUser({ role: userRole });
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
