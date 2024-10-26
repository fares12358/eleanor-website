'use client';
import React, { createContext, useState } from "react";

// Create the Context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isLoged, setIsLoged] = useState(() =>false);
  const [userId, setUserId] = useState(() => null);
  return (
    <UserContext.Provider value={{isLoged, setIsLoged,userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
