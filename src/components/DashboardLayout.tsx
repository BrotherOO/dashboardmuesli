"use client";
import React from "react";
import { useAdmin } from "@/components/AdminProvider";
import { LayoutDashboard, Filter, Users, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { editMode, setEditMode, logout } = useAdmin();

  return (
    <div className="flex min-h-screen bg-background text-foreground font-body">
      <aside className="w-64 fixed left-0 top-0 h-screen bg-background border-r border-white/40 p-6 flex flex-col shadow-neu-flat z-40">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-foreground">Analytics Lab</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Dubinskiy Edition</p>
        </div>
        <nav className="flex-1 space-y-4">
          <div className="flex items-center gap-4 px-5 py-3.5 bg-background shadow-neu-pressed rounded-2xl text-primary font-bold transition-all">
            <LayoutDashboard size={20} />
            Übersicht
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5 hover:shadow-neu-flat rounded-2xl cursor-pointer text-muted-foreground transition-all">
            <Filter size={20} />
            Verkaufstrichter
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5 hover:shadow-neu-flat rounded-2xl cursor-pointer text-muted-foreground transition-all">
            <Users size={20} />
            Kundenanalyse
          </div>
        </nav>
        <div className="mt-auto space-y-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex gap-3 grayscale opacity-50 px-2">
            <span>Shopify</span>
            <span>GA4</span>
            <span>Klaviyo</span>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-4 px-5 text-muted-foreground shadow-neu-flat hover:shadow-neu-pressed" onClick={logout}>
            <LogOut size={18} />
            Abmelden
          </Button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10 min-h-screen bg-background">
        <header className="flex justify-between items-center mb-12 pb-6 border-b border-black/5">
          <div>
            <h1 className="text-4xl font-black">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-2 font-medium">Live Übersicht & Merchandising Insights.</p>
          </div>
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
