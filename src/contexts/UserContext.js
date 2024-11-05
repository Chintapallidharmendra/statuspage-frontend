// src/contexts/UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a UserContext
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // State to hold the user data
  const [user, setUser] = useState(null);

  // Function to login a user (mock example)
  const login = (userData) => {
    setUser(userData);
  };

  // Function to logout the user
  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    // Check if the user is already logged in
    const authData = localStorage.getItem("auth");
    if (authData) {
      setUser(JSON.parse(authData));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
