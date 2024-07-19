// UserContext.js
import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};
