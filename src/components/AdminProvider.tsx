"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminContextProps {
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  login: (pw: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("isAdmin");
    if (auth === "true") {
      setIsAdmin(true);
    } else if (pathname !== "/login") {
      router.push("/login");
    }
  }, [router, pathname]);

  const login = (pw: string) => {
    // Basic password challenge: admin/admin logic requested
    if (pw === "admin" || pw === "admin/admin") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setEditMode(false);
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, editMode, setEditMode, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
}
