"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setuser(JSON.parse(stored));
    } catch (err) {
      localStorage.removeItem("user");
    } finally {
      setloading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, Login, SignUp, LogOut, loading, submitting, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
