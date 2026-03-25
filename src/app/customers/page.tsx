"use client";
import React, { useState } from "react";
import { useAdmin } from "@/components/AdminProvider";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockData } from "@/data";

export default function CustomersPage() {
  const { isAdmin, editMode } = useAdmin();
  const [currentCampaign, setCurrentCampaign] = useState("Vibrant Harvest Kampagne");

  if (!isAdmin) return null;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10">
         <div className="mb-4 min-h-[40px]">
            <h2 className="text-3xl font-black opacity-80 mb-2">Customer Insights (Klaviyo)</h2>
            <p className="text-muted-foreground text-sm font-medium">Customer Lifetime Value und Kohortenanalyse in Echtzeit.</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Card className="p-10">
             <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-8">Kundenbindung</p>
             <div className="flex items-center gap-10">
                <div className="w-32 h-32 rounded-full shadow-neu-pressed flex items-center justify-center border-[12px] border-primary/20 relative isolate">
                  <div className="absolute inset-0 rounded-full border-[12px] border-primary border-l-transparent border-b-transparent transform rotate-45 -z-10" />
                  <span className="text-3xl font-black text-foreground">{mockData.customers.retentionRate}%</span>
                </div>
                <div>
                  <p className="font-black text-2xl text-foreground">Stammkunden</p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">Kaufen regelmäßig nach.<br/>Kohorte: Q3 / 24</p>
                </div>
             </div>
          </Card>
          <Card className="p-10">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Aktuelle Kampagne</p>
            {editMode ? (
              <Input 
                value={currentCampaign} 
                onChange={(e) => setCurrentCampaign(e.target.value)}
                className="font-bold text-2xl h-16 w-full"
              />
            ) : (
               <h3 className="text-3xl font-black text-primary leading-tight min-h-[64px] flex items-center">{currentCampaign}</h3>
            )}
            <div className="mt-8 flex items-center justify-between">
                <p className="text-sm font-bold text-secondary flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                Live-Auswertung
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-background shadow-neu-pressed rounded-full">ROAS: 4.1</span>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
