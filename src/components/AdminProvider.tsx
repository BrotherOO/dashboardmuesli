"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { mockData } from "@/data";

interface AdminContextProps {
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  login: (pw: string) => boolean;
  logout: () => void;
  
  targetRevenue: number;
  setTargetRevenue: (val: number) => void;
  csvData: Record<string, unknown>[];
  setCsvData: (data: Record<string, unknown>[]) => void;
  
  currentRevenue: number;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [targetRevenue, setTargetRevenue] = useState(150000);
  const [csvData, setCsvData] = useState<Record<string, unknown>[]>([]);
  
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

  // Compute Revenue based on CSV data or mock
  const currentRevenue = csvData.length > 0 
    ? csvData.reduce((acc, row) => acc + (Number((row as Record<string, unknown>).Umsatz || (row as Record<string, unknown>).Revenue || (row as Record<string, unknown>).revenue || 0)), 0)
    : mockData.overview.revenue;

  return (
    <AdminContext.Provider value={{ isAdmin, editMode, setEditMode, login, logout, targetRevenue, setTargetRevenue, csvData, setCsvData, currentRevenue }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
}
