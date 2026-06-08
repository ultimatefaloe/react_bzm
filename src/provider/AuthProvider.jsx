import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "../hooks/store.hook";

const AuthContext = createContext();

const AUTH_KEY = "king_auth";

export const AuthProvider = ({ children }) => {
  // Key is passes directly to useStore so it can manage the correct localStorage entry
  // setData change to setStoredData to avoid confusion with useState's setData and to clarify that this is the function that updates localStorage and syncs state.
  const { getData, setStoredData, updateData, removeData, clearData } = useStore(AUTH_KEY);
  const [auth, setAuth] = useState(null);
  const [role, setRole] = useState('admin');

  useEffect(() => {
    const storedAuth = getData();
    if (storedAuth && storedAuth.active) {
      setAuth(storedAuth);
    }
  }, []);


  const login = (userData) => {
    const storedAuth = getData(); //key removed since useStore already manages the correct key internally
    // Added checks to handle cases where storedAuth might be null or missing expected properties, preventing runtime errors and providing clearer feedback on login failures.
    if (!storedAuth) {
      return {message: "No user found. Please register first."};
    }
    if (storedAuth.email !== userData.email) {
      return {message: "Invalid credentials"};
    }
    if (storedAuth.password !== userData.password) {
      return {message: "Invalid credentials"};
    }
    setStoredData({userData, active: true});
    setAuth(userData);
  };

  const register = (userData) => {
    console.log("Registering user", userData);
    setStoredData({userData, active: true}); // Store the entire userData object along with active status in localStorage
    setAuth(userData);
    return {message: "Registration successful", success: true};
  };

  const logout = () => {
    setAuth(null);
    updateData({active: false});
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
