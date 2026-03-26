"use client";
import React, { useState } from "react";
import { useAdmin } from "@/components/AdminProvider";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DropzoneUploader } from "@/components/DropzoneUploader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { AlertTriangle, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function Dashboard() {
  const { isAdmin, editMode, targetRevenue, setTargetRevenue, currentRevenue, csvData } = useAdmin();
  const [isBlurred, setIsBlurred] = useState(true);

  if (!isAdmin) return null;

  const isBelowTarget = currentRevenue < targetRevenue;

  let chartData: Array<{name: string, value: number}> = [];
  if (csvData.length > 0) {
    chartData = csvData.filter((r: Record<string, unknown>) => r.Datum || r.Date).map((r: Record<string, unknown>) => ({
      name: String(r.Datum || r.Date || "N/A"),
      value: Number(r.Umsatz || r.Revenue || r.revenue || 0)
    }));
  } else {
    chartData = [
      { name: '01. Okt', value: 4000 },
      { name: '05. Okt', value: 3000 },
      { name: '10. Okt', value: 12000 },
      { name: '15. Okt', value: 2780 },
      { name: '20. Okt', value: 1890 },
      { name: '25. Okt', value: 2390 },
      { name: '30. Okt', value: 3490 },
    ];
  }

  const blurClass = isBlurred ? "blur-md select-none opacity-40 transition-all duration-500" : "transition-all duration-500";

  return (
    <DashboardLayout>
      <div className="flex justify-between items-end mb-8">
         <div>
            <h2 className="text-2xl font-black text-foreground">Self-Service BI</h2>
            <p className="text-muted-foreground text-sm font-medium">CSV Upload Parsing in Echtzeit.</p>
         </div>
         
         <button 
           onClick={() => setIsBlurred(!isBlurred)}
           className="flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors text-slate-600"
         >
           {isBlurred ? <Eye size={16}/> : <EyeOff size={16}/>}
           {isBlurred ? "Zahlen anzeigen" : "Zahlen ausblenden"}
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <DropzoneUploader />
        <Card className={`p-8 flex flex-col justify-center transition-all ${isBelowTarget ? 'border-primary/50 shadow-[inset_0_0_20px_rgba(200,0,80,0.1)] bg-primary/5' : ''}`}>
          <div className="flex justify-between items-start mb-4">
             <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin KPI: Ziel-Umsatz</span>
             {isBelowTarget ? (
                 <span className="flex items-center gap-1.5 text-primary text-xs font-bold px-3 py-1 bg-primary/10 rounded-full"><AlertTriangle size={14}/> Warnung: Ziel verfehlt</span>
             ) : (
                 <span className="flex items-center gap-1.5 text-secondary text-xs font-bold px-3 py-1 bg-secondary/10 rounded-full"><CheckCircle size={14}/> Ziel erreicht</span>
             )}
          </div>
          <div className="flex items-end gap-6 min-h-[60px]">
            <div className={`text-5xl font-black text-foreground ${blurClass}`}>
              €{currentRevenue.toLocaleString('de')}
            </div>
            <div className={`pb-1 text-sm font-bold text-muted-foreground opacity-60 ${blurClass}`}>
              / €{targetRevenue.toLocaleString('de')} Target
            </div>
          </div>
          {editMode && (
            <div className="mt-6 flex items-center gap-4 bg-background p-4 rounded-xl shadow-neu-pressed">
              <span className="text-xs uppercase font-bold text-primary">Target (Edit Mode):</span>
              <Input 
                type="number" 
                value={targetRevenue} 
                onChange={e => setTargetRevenue(Number(e.target.value))}
                className="w-40 font-bold"
              />
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pb-16">
        <Card className="p-8 h-[400px] flex flex-col overflow-hidden">
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Umsatz Verlauf (Dynamisch Area)</p>
          <div className={`flex-1 w-full min-h-0 ${blurClass}`}>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <defs>
                   <linearGradient id="colorUmsatz" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#C80050" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#C80050" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false}/>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} dy={10} />
                 <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '9px 9px 16px rgba(163,177,198,0.6)', backgroundColor: '#fff' }} />
                 <Area type="monotone" dataKey="value" stroke="#C80050" strokeWidth={3} fillOpacity={1} fill="url(#colorUmsatz)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-8 h-[400px] flex flex-col overflow-hidden">
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Umsatz Segmentierung (Dynamisch Bar)</p>
          <div className={`flex-1 w-full min-h-0 ${blurClass}`}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false}/>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} dy={10} />
                 <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '9px 9px 16px rgba(163,177,198,0.6)', backgroundColor: '#fff' }} cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                 <Bar dataKey="value" fill="#0f766e" radius={[6, 6, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
