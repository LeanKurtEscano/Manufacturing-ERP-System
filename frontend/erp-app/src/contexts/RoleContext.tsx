import React, { createContext, useContext, useState } from 'react';

type RoleContextType = {
  userRole: string | null;
  setUserRole: (role: string | null) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem("userRole"));

  return (
    <RoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  return context;
};
