// context/auth-context.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useUSer } from "@/hooks/useUser";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isError: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { useGetProfileMe } = useUSer();
  const { data, isLoading, isError } = useGetProfileMe();
  console.log("AuthProvider user data:", data);

  return (
    <AuthContext.Provider value={{ user: data, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
