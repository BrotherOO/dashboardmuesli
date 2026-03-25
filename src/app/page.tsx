"use client";
import React, { useState, useEffect } from "react";
import { useAdmin } from "@/components/AdminProvider";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockData, performanceData } from "@/data";
import { motion, useSpring, useTransform } from "framer-motion";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, CartesianGrid } from 'recharts';

function Counter({ value }: { value: number }) {
  const spring = useSpring(0, { bounce: 0, duration: 1500 });
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString("de-DE")
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export default function Dashboard() {
  const { isAdmin, editMode } = useAdmin();
  const [funnelThreshold, setFunnelThreshold] = useState(15);
  const [currentCampaign, setCurrentCampaign] = useState("Vibrant Harvest Kampagne");

  if (!isAdmin) return null;

  const funnelCR = (mockData.funnel.purchased / mockData.funnel.totalVisitors) * 100;
  const showFunnelWarning = funnelCR < funnelThreshold;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 pb-16">
        {/* Column 1: Overview */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold mb-4 opacity-80">Shopify Overview</h2>
          <Card className="p-8 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Umsatz</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-4xl font-black text-foreground">€<Counter value={mockData.overview.revenue} /></span>
              <span className="text-sm font-bold text-secondary flex items-center bg-secondary/10 px-2 py-0.5 rounded-full"><TrendingUp size={16} className="mr-1"/>+{mockData.overview.revenueTrend}%</span>
            </div>
          </Card>
          <Card className="p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Conv. Rate (GA4)</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-4xl font-black text-foreground"><Counter value={mockData.overview.conversionRate} />%</span>
              <span className="text-sm font-bold text-primary flex items-center bg-primary/10 px-2 py-0.5 rounded-full"><TrendingDown size={16} className="mr-1"/>{mockData.overview.conversionTrend}%</span>
            </div>
          </Card>
          <Card className="p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Ø Bestellwert (AOV)</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-4xl font-black text-foreground">€<Counter value={mockData.overview.aov} /></span>
              <span className="text-sm font-bold text-secondary flex items-center bg-secondary/10 px-2 py-0.5 rounded-full"><TrendingUp size={16} className="mr-1"/>+{mockData.overview.aovTrend}%</span>
            </div>
          </Card>
          <Card className="p-8 h-80 flex flex-col pt-8">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Performance Timeline</p>
            <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={performanceData}>
                   <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false}/>
                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10}} dy={10} />
                   <Tooltip 
                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '9px 9px 16px rgba(163,177,198,0.6)', backgroundColor: '#fff' }}
                   />
                   <Line type="monotone" dataKey="revenue" stroke="#C80050" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
                 </LineChart>
               </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Column 2: Funnel */}
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-4 min-h-[40px]">
            <h2 className="text-xl font-bold opacity-80">Mixer Funnel (GA4)</h2>
            {editMode && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Warnschwelle (%)</span>
                <Input 
                  type="number" 
                  className="w-20 h-8 text-xs font-bold" 
                  value={funnelThreshold} 
                  onChange={e => setFunnelThreshold(Number(e.target.value))} 
                />
              </div>
            )}
          </div>
          <Card className={`p-8 transition-colors duration-500 overflow-hidden ${showFunnelWarning ? 'border-primary shadow-[inset_0_0_20px_rgba(200,0,80,0.15)] bg-primary/5' : ''}`}>
            {showFunnelWarning && (
              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 text-white font-bold text-sm mb-10 bg-primary p-4 rounded-xl shadow-neu-pressed">
                <AlertCircle size={20} />
                Action Needed: Conversion unter {funnelThreshold}%!
              </motion.div>
            )}
            <div className="space-y-10 relative">
              <div className="absolute left-4 top-4 bottom-4 w-1 bg-black/5 rounded-full" />
              <div className="relative pl-12 group">
                <div className="absolute left-2.5 top-2 w-4 h-4 rounded-full bg-black/20 -translate-x-1/2 transition-transform group-hover:scale-150" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Visit Mixer</p>
                <div className="flex items-end justify-between mt-1">
                    <p className="text-2xl font-black text-foreground">{mockData.funnel.totalVisitors.toLocaleString('de')}</p>
                    <p className="text-xs font-black opacity-40">100%</p>
                </div>
              </div>
              <div className="relative pl-12 group">
                <div className="absolute left-2.5 top-2 w-4 h-4 rounded-full bg-black/20 -translate-x-1/2 transition-transform group-hover:scale-150" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Start Customizing</p>
                <div className="flex items-end justify-between mt-1">
                    <p className="text-2xl font-black text-foreground">{mockData.funnel.startedMixing.toLocaleString('de')}</p>
                    <p className="text-xs font-bold text-primary">-31.3%</p>
                </div>
              </div>
              <div className="relative pl-12 group">
                <div className="absolute left-2.5 top-2 w-4 h-4 rounded-full bg-black/20 -translate-x-1/2 transition-transform group-hover:scale-150" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Add to Cart</p>
                <div className="flex items-end justify-between mt-1">
                    <p className="text-2xl font-black text-foreground">{mockData.funnel.addedToCart.toLocaleString('de')}</p>
                    <p className="text-xs font-bold text-primary">-75.3%</p>
                </div>
              </div>
              <div className="relative pl-12 group">
                <div className="absolute left-2.5 top-2 w-4 h-4 rounded-full bg-black/20 -translate-x-1/2 transition-transform group-hover:scale-150" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Checkout Started</p>
                 <div className="flex items-end justify-between mt-1">
                    <p className="text-2xl font-black text-foreground">{mockData.funnel.checkoutStarted.toLocaleString('de')}</p>
                </div>
              </div>
              <div className="relative pl-12 group">
                <div className="absolute left-2.5 top-2 w-5 h-5 rounded-full bg-primary -translate-x-1/2 shadow-[0_0_15px_rgba(200,0,80,0.6)] animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Purchased</p>
                <div className="flex items-end justify-between mt-1">
                    <p className="text-3xl font-black text-primary">{mockData.funnel.purchased.toLocaleString('de')}</p>
                    <p className="text-sm font-black text-primary">Final CR: {funnelCR.toFixed(1)}%</p>
                </div>
              </div>
            </div>
            {showFunnelWarning && (
                <button className="w-full mt-10 py-3 rounded-2xl bg-background border border-primary/40 text-primary font-bold shadow-neu-flat hover:shadow-neu-pressed transition-all active:scale-95">
                    A/B-Test Simulator starten
                </button>
            )}
          </Card>
        </div>

        {/* Column 3: Customers */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold mb-4 opacity-80">Customer Insights (Klaviyo)</h2>
          <Card className="p-8">
             <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Kundenbindung</p>
             <div className="flex items-center gap-8">
                <div className="w-28 h-28 rounded-full shadow-neu-pressed flex items-center justify-center border-[10px] border-primary/20 relative isolate">
                  <div className="absolute inset-0 rounded-full border-[10px] border-primary border-l-transparent border-b-transparent transform rotate-45 -z-10" />
                  <span className="text-2xl font-black text-foreground">{mockData.customers.retentionRate}%</span>
                </div>
                <div>
                  <p className="font-black text-lg text-foreground">Stammkunden</p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">Kaufen regelmäßig nach.<br/>Kohorte: Q3 / 24</p>
                </div>
             </div>
          </Card>
          <Card className="p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Aktuelle Kampagne</p>
            {editMode ? (
              <Input 
                value={currentCampaign} 
                onChange={(e) => setCurrentCampaign(e.target.value)}
                className="font-bold text-xl h-14"
              />
            ) : (
              <h3 className="text-3xl font-black text-primary leading-tight">{currentCampaign}</h3>
            )}
            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-bold text-secondary flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                Live-Auswertung
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-background shadow-neu-pressed rounded-full">ROAS: 4.1</span>
            </div>
          </Card>
          <Card className="p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Top Insights</p>
            <div className="space-y-6">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full shadow-neu-pressed flex items-center justify-center text-primary text-sm font-black bg-background border border-white/50">1</div>
                  <div>
                    <p className="text-sm font-black text-foreground">Beliebteste Zutat</p>
                    <p className="text-xs font-bold text-muted-foreground mt-1">{mockData.customers.topIngredient}</p>
                  </div>
               </div>
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full shadow-neu-pressed flex items-center justify-center text-primary text-sm font-black bg-background border border-white/50">2</div>
                  <div>
                    <p className="text-sm font-black text-foreground">Ø Lebenszeitwert</p>
                    <p className="text-xs font-bold text-muted-foreground mt-1">€{mockData.customers.clv.toFixed(2)} (Top 10%)</p>
                  </div>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
