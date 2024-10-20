'use client';
import React, { createContext, useState } from "react";

// Create the Context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isLoged, setIsLoged] = useState(false); // user state

  return (
    <UserContext.Provider value={{isLoged, setIsLoged}}>
      {children}
    </UserContext.Provider>
  );
};
