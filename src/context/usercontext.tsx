"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser phải được sử dụng bên trong UserProvider");
  }
  return context;
};
