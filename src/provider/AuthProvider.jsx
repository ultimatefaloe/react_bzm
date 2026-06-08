import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "../hooks/store.hook";

const AuthContext = createContext();

const AUTH_KEY = "king_auth";

export const AuthProvider = ({ children }) => {
  const { getData, setData, updateData, removeData, clearData } = useStore();
  const [auth, setAuth] = useState(null);
  const [role, setRole] = useState('admin');

  useEffect(() => {
    const storedAuth = getData(AUTH_KEY);
    if (storedAuth && storedAuth.active) {
      setAuth(storedAuth);
    }
  }, []);


  const login = (userData) => {
    const storedAuth = getData(AUTH_KEY);
    if (storedAuth.password !== userData.password) {
      return {message: "Invalid credentials"};
    }
    setData(AUTH_KEY, {userData, active: true});
    setAuth(userData);
  };

  const register = (userData) => {
    console.log("Registering user", userData);
    setData(AUTH_KEY, userData);
    setAuth(userData);
    return {message: "Registration successful", success: true};
  };

  const logout = () => {
    setAuth(null);
    updateData(AUTH_KEY, {active: false});
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
