'use client';
import React, { createContext, useState } from "react";

// Create the Context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isLoged, setIsLoged] = useState(() =>false);
  const [userId, setUserId] = useState(() => null);
  const [viewUplImg, setViewUplImg] = useState(false);
  const [viewUpCat, setViewUpCat] = useState(false);
  return (
    <UserContext.Provider value={{isLoged, setIsLoged,userId, setUserId ,viewUplImg, setViewUplImg,viewUpCat, setViewUpCat}}>
      {children}
    </UserContext.Provider>
  );
};
