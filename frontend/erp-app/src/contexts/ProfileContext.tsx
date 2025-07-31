import React, { createContext, useContext, useState } from 'react';


const ProfileContext = createContext<any>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem("userRole"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <ProfileContext.Provider value={{ userRole, setUserRole, isAuthenticated, setIsAuthenticated }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  return context;
};
