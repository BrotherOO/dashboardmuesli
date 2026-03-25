"use client";
import React from "react";
import { useAdmin } from "@/components/AdminProvider";
import { LayoutDashboard, Filter, Users, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { editMode, setEditMode, logout } = useAdmin();
  const pathname = usePathname();

  const navItemClass = (href: string) => `flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all cursor-pointer ${pathname === href ? 'bg-background shadow-neu-pressed text-primary' : 'hover:shadow-neu-flat text-muted-foreground'}`;

  return (
    <div className="flex min-h-screen bg-background text-foreground font-body">
      <aside className="w-64 fixed left-0 top-0 h-screen bg-background border-r border-white/40 p-6 flex flex-col shadow-neu-flat z-40">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-foreground">Analytics Lab</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">David Dubinskiy BI</p>
        </div>
        <nav className="flex-1 space-y-4">
          <Link href="/" className={navItemClass("/")}>
            <LayoutDashboard size={20} />
            BI Übersicht
          </Link>
          <Link href="/funnel" className={navItemClass("/funnel")}>
            <Filter size={20} />
            Sales Funnel
          </Link>
          <Link href="/customers" className={navItemClass("/customers")}>
            <Users size={20} />
            Customer Insights
          </Link>
        </nav>
        <div className="mt-auto space-y-6">
          <Button variant="ghost" className="w-full justify-start gap-4 px-5 text-muted-foreground shadow-neu-flat hover:shadow-neu-pressed" onClick={logout}>
            <LogOut size={18} />
            Abmelden
          </Button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10 min-h-screen bg-background">
        <header className="flex justify-between items-center mb-12 pb-6 border-b border-black/5">
          <div />
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${editMode ? 'text-primary' : 'text-muted-foreground'}`}>
                Edit Mode {editMode ? 'ON' : 'OFF'}
              </span>
              <button 
                onClick={() => setEditMode(!editMode)}
                className={`w-14 h-8 rounded-full p-1 transition-all ${editMode ? 'bg-primary shadow-neu-pressed' : 'bg-background shadow-neu-flat border border-white/50'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-background shadow-neu-flat transition-transform ${editMode ? 'translate-x-6 border-none' : 'translate-x-0 border border-white/50'}`} />
              </button>
            </div>
            <div className="w-12 h-12 rounded-full shadow-neu-flat border border-white/60 overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-primary/10 flex items-center justify-center font-black text-primary">DD</div>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
