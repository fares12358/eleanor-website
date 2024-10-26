'use client';
import React, { createContext, useState } from "react";

// Create the Context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isLoged, setIsLoged] = useState(() => {
    const savedIsLoged = localStorage.getItem('isLoged');
    return savedIsLoged ? JSON.parse(savedIsLoged) : false;
  });
  const [userId, setUserId] = useState(() => {
    const savedUserId = localStorage.getItem('userId');
    return savedUserId ? JSON.parse(savedUserId) : null;
  });
  return (
    <UserContext.Provider value={{isLoged, setIsLoged,userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
