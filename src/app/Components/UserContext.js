'use client';
import React, { createContext, useState, useEffect } from "react";

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

  // Update localStorage whenever isLoged or userId changes
  useEffect(() => {
    localStorage.setItem('isLoged', JSON.stringify(isLoged));
  }, [isLoged]);

  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(userId));
  }, [userId]);

  return (
    <UserContext.Provider value={{ isLoged, setIsLoged, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
