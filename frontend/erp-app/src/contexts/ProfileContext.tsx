import React, { createContext, useContext, useState } from 'react';


const ProfileContext = createContext<any>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem("userRole"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 
  const [toggle, setToggle] = useState<boolean>(true); // Assuming toggle is used for sidebar visibility
  return (
    <ProfileContext.Provider value={{ userRole, setUserRole, isAuthenticated, setIsAuthenticated, toggle, setToggle }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  return context;
};
