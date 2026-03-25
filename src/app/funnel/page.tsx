"use client";
import React, { useState } from "react";
import { useAdmin } from "@/components/AdminProvider";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockData } from "@/data";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function FunnelPage() {
  const { isAdmin, editMode } = useAdmin();
  const [funnelThreshold, setFunnelThreshold] = useState(15);

  if (!isAdmin) return null;

  const funnelCR = (mockData.funnel.purchased / mockData.funnel.totalVisitors) * 100;
  const showFunnelWarning = funnelCR < funnelThreshold;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center mb-4 min-h-[40px]">
            <h2 className="text-3xl font-black opacity-80">Mixer Sales Funnel (GA4)</h2>
            {editMode && (
              <div className="flex items-center gap-3 bg-background p-3 rounded-2xl shadow-neu-pressed">
                <span className="text-[10px] uppercase font-bold text-muted-foreground mr-2">Warnschwelle (%)</span>
                <Input 
                  type="number" 
                  step="0.1"
                  className="w-24 h-10 font-bold" 
                  value={funnelThreshold} 
                  onChange={e => setFunnelThreshold(Number(e.target.value))} 
                />
              </div>
            )}
          </div>
          <Card className={`p-10 transition-colors duration-500 overflow-hidden ${showFunnelWarning ? 'border-primary shadow-[inset_0_0_20px_rgba(200,0,80,0.15)] bg-primary/5' : ''}`}>
            {showFunnelWarning && (
              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 text-white font-bold text-sm mb-10 bg-primary p-4 rounded-2xl shadow-neu-pressed">
                <AlertCircle size={20} />
                Action Needed: Conversion Rate ({funnelCR.toFixed(1)}%) ist unter das definierte Target von {funnelThreshold}% gefallen!
              </motion.div>
            )}
            <div className="space-y-12 relative px-4">
              <div className="absolute left-8 top-4 bottom-4 w-1 bg-black/5 rounded-full" />
              <div className="relative pl-12 group">
                <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-black/20 -translate-x-1/2 transition-transform group-hover:scale-150" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Visit Mixer</p>
                <div className="flex items-end justify-between mt-1">
                    <p className="text-3xl font-black text-foreground">{mockData.funnel.totalVisitors.toLocaleString('de')}</p>
                    <p className="text-sm font-black opacity-40">100%</p>
                </div>
              </div>
              <div className="relative pl-12 group">
                <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-black/20 -translate-x-1/2 transition-transform group-hover:scale-150" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Start Customizing</p>
                <div className="flex items-end justify-between mt-1">
                    <p className="text-3xl font-black text-foreground">{mockData.funnel.startedMixing.toLocaleString('de')}</p>
                    <p className="text-sm font-bold text-primary">-31.3%</p>
                </div>
              </div>
              <div className="relative pl-12 group">
                <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-black/20 -translate-x-1/2 transition-transform group-hover:scale-150" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Add to Cart</p>
                <div className="flex items-end justify-between mt-1">
                    <p className="text-3xl font-black text-foreground">{mockData.funnel.addedToCart.toLocaleString('de')}</p>
                    <p className="text-sm font-bold text-primary">-75.3%</p>
                </div>
              </div>
              <div className="relative pl-12 group">
                <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-black/20 -translate-x-1/2 transition-transform group-hover:scale-150" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Checkout Started</p>
                 <div className="flex items-end justify-between mt-1">
                    <p className="text-3xl font-black text-foreground">{mockData.funnel.checkoutStarted.toLocaleString('de')}</p>
                </div>
              </div>
              <div className="relative pl-12 group">
                <div className="absolute left-4 top-3 w-5 h-5 rounded-full bg-primary -translate-x-1/2 shadow-[0_0_15px_rgba(200,0,80,0.6)] animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Purchased</p>
                <div className="flex items-end justify-between mt-1">
                    <p className="text-4xl font-black text-primary">{mockData.funnel.purchased.toLocaleString('de')}</p>
                    <p className="text-lg font-black text-primary">Final CR: {funnelCR.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </Card>
      </div>
    </DashboardLayout>
  );
}
