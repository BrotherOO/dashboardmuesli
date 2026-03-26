"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBar, Leaf, Settings, ShieldQuestion, BrainCircuit, ChevronRight, TrendingUp, Info, MousePointerClick, PlayCircle, Loader2, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';

export default function MyMuesliPresentation() {
  const [activeTab, setActiveTab] = useState('task1');
  const [editorMode, setEditorMode] = useState(false);

  // Tab definitions
  const tabs = [
    { id: 'task1', label: 'Aufgabe 1: Dashboard', icon: <ChartBar size={20} /> },
    { id: 'task2', label: 'Aufgabe 2: Merchandising', icon: <Leaf size={20} /> },
    { id: 'task3', label: 'Aufgabe 3: Praxisaufgabe', icon: <Settings size={20} /> },
    { id: 'qa', label: 'Q&A (Stress-Test)', icon: <ShieldQuestion size={20} /> },
    { id: 'spicker', label: 'Edit', icon: <Info size={20} /> }
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* SIDEBAR */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <h1 className="text-3xl font-black tracking-tight text-[#f91f64]">mymuesli</h1>
        </div>
        <div className="flex-1 overflow-y-auto py-6">
          <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Präsentation</p>
          <nav className="space-y-1">
            {tabs.map(tab => {
              if ((tab.id === 'spicker' || tab.id === 'qa') && !editorMode) return null;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-[#f91f64]/10 text-[#f91f64] border-r-4 border-[#f91f64]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-r-4 border-transparent'
                  }`}
                >
                  <div className={`${activeTab === tab.id ? 'text-[#f91f64]' : 'text-gray-400'}`}>
                    {tab.icon}
                  </div>
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden shadow-inner">
               DD
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">David Dubinskiy</p>
              <p className="text-xs text-gray-500 font-medium">Data-Driven UX &amp; Strategy</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen bg-slate-50 relative">
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-30 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          
          <div className="flex items-center gap-3 bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => {
                const toggled = !editorMode;
                setEditorMode(toggled);
                if (!toggled && (activeTab === 'spicker' || activeTab === 'qa')) {
                  setActiveTab('task1');
                }
              }}>
            <BrainCircuit size={18} className={editorMode ? 'text-[#f91f64]' : 'text-slate-400'} />
            <span className={`text-sm font-bold ${editorMode ? 'text-slate-800' : 'text-slate-500'}`}>
              Editor
            </span>
            <button 
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#f91f64] focus:ring-offset-2 ${
                editorMode ? 'bg-[#f91f64]' : 'bg-slate-300'
              }`}
            >
              <span 
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  editorMode ? 'translate-x-6' : 'translate-x-1'
                } shadow-sm`}
              />
            </button>
          </div>
        </header>

        {/* SCROLLABLE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl mx-auto pb-12"
            >
              {activeTab === 'task1' && <Task1 editorMode={editorMode} setActiveTab={setActiveTab} />}
              {activeTab === 'task2' && <Task2 editorMode={editorMode} />}
              {activeTab === 'task3' && <Task3 editorMode={editorMode} />}
              {activeTab === 'qa' && <Faq editorMode={editorMode} />}
              {activeTab === 'spicker' && <Spicker editorMode={editorMode} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// ------ SUBCOMPONENTS ------
function Task1({ editorMode, setActiveTab }: { editorMode: boolean, setActiveTab: (t:string)=>void }) {
  // Helper form Neumorphism Card
  const NeoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-5 rounded-2xl bg-[#f8fafc] shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff] border border-slate-100 h-full flex flex-col justify-center relative overflow-hidden ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="space-y-8">
      
      {/* 1. EXTENDED KPI GRID */}
      <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200 relative">
        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <ChartBar className="text-[#C80050]" size={24}/> Performance Cockpit
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
           
           {/* Row 1 */}
           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Gesamtumsatz (Heute)</div>
             <div className="text-3xl font-black text-slate-800">128.450 €</div>
             <div className="text-xs text-green-600 font-bold mt-1 tracking-wide">+12% vs. Vorwoche</div>
             {/* Wellenlinie */}
             <svg className="absolute bottom-0 left-0 w-full h-12 opacity-20" viewBox="0 0 100 20" preserveAspectRatio="none">
               <motion.path 
                 d="M0,10 Q25,20 50,10 T100,10 L100,20 L0,20 Z" 
                 fill="#C80050"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
             </svg>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Sitzungen (Traffic)</div>
             <div className="text-3xl font-black text-slate-800">42.000</div>
             <div className="text-xs text-slate-500 font-bold mt-1 tracking-wide"><span className="text-blue-500">60% Mobile</span> / <span className="text-slate-400">40% Desktop</span></div>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Conversion Rate</div>
             <div className="text-3xl font-black text-green-600">3,2 %</div>
             <div className="text-xs text-slate-400 font-bold mt-1 tracking-wide">Food D2C Benchmark</div>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Average Order Value</div>
             <div className="text-3xl font-black text-slate-800">44,80 €</div>
             <div className="text-xs text-slate-400 font-bold mt-1 tracking-wide">Ø 2-3 Dosen + Zubehör</div>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Retention Rate</div>
             <div className="text-3xl font-black text-slate-800">68 %</div>
             <div className="text-xs text-[#C80050] font-bold mt-1 tracking-wide">Starkes Abo-Modell</div>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Retourenquote</div>
             <div className="text-3xl font-black text-green-600">1,5 %</div>
             <div className="text-xs text-slate-400 font-bold mt-1 tracking-wide">Customized Food Standard</div>
           </NeoCard>

           {/* OVERLAYS FOR KPIs */}
           <AnimatePresence>
             {editorMode && (
               <>
                 <motion.div initial={{opacity:0, backdropFilter:"blur(0px)"}} animate={{opacity:1, backdropFilter:"blur(4px)"}} exit={{opacity:0, backdropFilter:"blur(0px)"}} className="absolute inset-0 z-10 p-6 rounded-3xl flex flex-col justify-center items-center bg-white/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                      {/* Overlay 1: Traffic/Revenue */}
                      <motion.div initial={{y:20}} animate={{y:0}} className="bg-[#12504c]/95 text-white p-6 rounded-2xl shadow-2xl border border-[#12504c] backdrop-blur-md">
                        <div className="text-xs font-black uppercase tracking-widest text-[#f4b8c8] mb-2 flex items-center gap-2"><Lightbulb size={16}/> Umsatz &amp; Sitzungen</div>
                        <p className="text-sm font-medium leading-relaxed">
                          <strong>Messmethode:</strong> Google Analytics 4 (GA4).<br/>
                          <strong>Pitch:</strong> &quot;Überwachung der Traffic-Qualität. Hohe Sitzungen bei sinkendem Umsatz deuten auf schlechte Landingpage-UX hin.&quot;
                        </p>
                      </motion.div>
                      {/* Overlay 2: Retention */}
                      <motion.div initial={{y:20}} animate={{y:0}} transition={{delay:0.1}} className="bg-[#C80050]/95 text-white p-6 rounded-2xl shadow-2xl border border-[#C80050] backdrop-blur-md">
                        <div className="text-xs font-black uppercase tracking-widest text-[#ffedc2] mb-2 flex items-center gap-2"><Lightbulb size={16}/> Retention Rate</div>
                        <p className="text-sm font-medium leading-relaxed">
                          <strong>Messmethode:</strong> Shopify / Klaviyo Kohorten-Analyse.<br/>
                          <strong>Wichtig:</strong> &quot;Die Loyalität senkt die Customer Acquisition Costs (CAC).&quot;
                        </p>
                      </motion.div>
                    </div>
                 </motion.div>
               </>
             )}
           </AnimatePresence>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. BESTSELLER SECTION */}
        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200 lg:col-span-1">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-[#12504c]" size={24}/> Bestseller Top 3
          </h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-2xl shadow-[inset_4px_4px_8px_#e2e8f0,inset_-4px_-4px_8px_#ffffff]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C80050]/10 flex items-center justify-center text-[#C80050] font-black">1</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Individueller Mix</div>
                    <div className="text-[10px] font-black tracking-wider text-slate-400 uppercase">Der Mixer</div>
                  </div>
                </div>
                <div className="text-lg font-black text-[#C80050]">45%</div>
             </div>
             
             <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-2xl shadow-[inset_4px_4px_8px_#e2e8f0,inset_-4px_-4px_8px_#ffffff]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-black">2</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Beeren-Müsli</div>
                    <div className="text-[10px] font-black tracking-wider text-slate-400 uppercase">Fertig-Mix</div>
                  </div>
                </div>
                <div className="text-lg font-black text-slate-600">20%</div>
             </div>

             <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-2xl shadow-[inset_4px_4px_8px_#e2e8f0,inset_-4px_-4px_8px_#ffffff]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-black">3</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Adventskalender</div>
                    <div className="text-[10px] font-black tracking-wider text-slate-400 uppercase">Saison-Treiber</div>
                  </div>
                </div>
                <div className="text-lg font-black text-slate-600">15%</div>
             </div>
          </div>
        </div>

        {/* 3. INTERACTIVE FUNNEL */}
        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200 lg:col-span-2 flex flex-col">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-[#C80050]" size={24}/> Mixer-Funnel Analyse
          </h3>

          <div className="flex-1 bg-[#f8fafc] shadow-[inset_6px_6px_12px_#e2e8f0,inset_-6px_-6px_12px_#ffffff] rounded-2xl p-6 relative flex flex-col md:flex-row gap-8 items-center justify-center border border-slate-50 overflow-hidden">
              <div className="w-full max-w-sm space-y-4 relative z-0">
                 
                 {/* Step 1 */}
                 <div className="w-full bg-slate-800 text-white text-xs font-bold text-center py-4 rounded-xl shadow-[4px_4px_10px_#cbd5e1]">
                   Schritt 1: Basis (100%)
                 </div>
                 
                 {/* Step 2 */}
                 <div className="w-[85%] mx-auto bg-[#C80050] text-white text-xs font-bold text-center py-4 rounded-xl shadow-[4px_4px_10px_#f4b8c8] relative">
                   Schritt 2: Zutaten (62%)
                 </div>
                 
                 {/* Step 3 */}
                 <div className="w-[50%] mx-auto bg-[#12504c] text-white text-xs font-bold text-center py-4 rounded-xl shadow-[4px_4px_10px_#a7f3d0] mt-8 md:mt-0">
                   Checkout (28%)
                 </div>

              </div>

              {/* OVERLAY FOR FUNNEL IN EDITOR MODE */}
              <AnimatePresence>
                {editorMode && (
                   <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center p-6">
                      <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-slate-900/95 text-white p-6 rounded-2xl shadow-2xl border border-slate-800 max-w-sm w-full text-center">
                        <div className="w-12 h-12 bg-[#C80050] rounded-full mx-auto flex items-center justify-center mb-4"><TrendingUp size={24}/></div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#f4b8c8] mb-3">Deep-Dive Analyse</h4>
                        <p className="text-sm font-medium leading-relaxed">
                          &quot;Hier identifiziere ich <strong>Reibungspunkte</strong>. Der extrem hohe Drop-off in Schritt 2 deutet auf kognitive Überlastung (&apos;Decision Fatigue&apos;) hin.&quot;
                        </p>
                        <button onClick={() => setActiveTab('task3')} className="mt-5 w-full bg-[#f4b8c8] text-[#C80050] font-black text-xs py-2 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                           Ziele auf Guided Selling Quiz <ArrowRight size={14}/>
                        </button>
                      </motion.div>
                   </motion.div>
                )}
              </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

function Task2({ editorMode }: { editorMode: boolean }) {
  const [season, setSeason] = useState<'summer'|'autumn'>('summer');
  const [activeCard, setActiveCard] = useState<number|null>(null);

  const points = [
    {
      title: 'Porridge Fokus',
      standard: 'Warme Müslis rücken in die Hero-Section.',
      learning: '"Herbst ist \'Comfort Food\'-Zeit. Wenn es draußen ungemütlich wird, konvertieren warme Breakfast-Bowls am besten."'
    },
    {
      title: 'Adventskalender',
      standard: 'Frühzeitige Teaser & Pre-Sales implementieren.',
      learning: '"Adventskalender sind massive Umsatztreiber im Q4. Wir müssen diese früh anteasern, um Vorbestellungen und Cashflow zu generieren, bevor die Konkurrenz im November startet."'
    },
    {
      title: 'Gratis Porridge-Becher',
      standard: 'Add-on ab Mindestbestellwert (statt -20% Rabatt).',
      learning: '"Warum Gratis-Produkte statt Rabatte? Rabatte zerstören die Premium-Markenwahrnehmung und killen unsere Marge. Ein Gratis-Becher als \'Add-on\' steigert den Average Order Value (AOV), ohne das Müsli abzuwerten."'
    }
  ];

  return (
    <div className={`p-8 rounded-2xl shadow-sm border transition-colors duration-700 ${season === 'summer' ? 'bg-[#ffedc2] border-[#ffd000]/30' : 'bg-[#f4b8c8]/20 border-[#f91f64]/20'}`}>
       <div className="flex justify-between items-center mb-8">
         <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Leaf className={season === 'summer' ? "text-yellow-600" : "text-[#f91f64]"} size={28}/> Saison-Strategie
         </h3>
         
         {/* Slider Toggle */}
         <div className="flex items-center gap-3 bg-white p-1.5 rounded-full shadow-sm">
            <button onClick={() => setSeason('summer')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${season==='summer'?'bg-yellow-400 text-yellow-900 shadow-sm':'text-slate-400 hover:bg-slate-50'}`}>Sommer</button>
            <button onClick={() => setSeason('autumn')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${season==='autumn'?'bg-[#f91f64] text-white shadow-sm':'text-slate-400 hover:bg-slate-50'}`}>Herbst / Q4</button>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {points.map((pt, idx) => (
            <button key={idx} onClick={() => setActiveCard(activeCard === idx ? null : idx)} className="bg-white p-7 rounded-2xl shadow-sm border border-white hover:border-[#f91f64]/30 transition-all flex flex-col h-full text-left focus:outline-none">
               <h4 className="text-lg font-bold text-slate-800 mb-3 flex justify-between items-center">
                  {pt.title}
                  <MousePointerClick size={16} className="text-slate-300"/>
               </h4>
               <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4">
                 {pt.standard}
               </p>
               
               <AnimatePresence>
                 {(editorMode || activeCard === idx) && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className="overflow-hidden mt-auto pt-4 border-t border-slate-100"
                   >
                     <div className="bg-[#fff9e6] border-l-4 border-[#f91f64] p-4 rounded-r-xl">
                       <p className="text-xs text-slate-800 font-bold italic">
                         {pt.learning}
                       </p>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </button>
         ))}
       </div>

       <AnimatePresence>
         {editorMode && (
           <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-8 bg-white/80 p-5 rounded-xl border border-white shadow-sm font-bold text-sm text-[#12504c] flex gap-3 items-center">
              <Info size={20} className="shrink-0"/>
              &quot;Visuelle Identität anpassen: Durch meinen Background im Kommunikationsdesign weiß ich, dass Farbpsychologie die Kaufbereitschaft stark beeinflusst. Ein warmer Übergang signalisiert dem Unterbewusstsein den Bedarf nach Comfort Food.&quot;
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}

function Task3({ editorMode }: { editorMode: boolean }) {
  const ideas = [
    {
      title: 'Experiment A: "Guided Selling"',
      test: 'Vorgeschaltetes Mini-Quiz vor dem Mixer vs. direkte Auswahl.',
      reason: 'Reduziert "Choice Overload" bei Erstkäufern.',
      result: 'Conversion Rate (CR) +15%',
      impactMsg: '&quot;Warum? Wegen dem \'Choice Overload\'. Ein 3-Klick Quiz nimmt den Kunden psychologisch an die Hand.&quot;'
    },
    {
      title: 'Experiment B: "One-Click Add-on"',
      test: 'mymuesli-Dose/Löffel nativ ins Warenkorb-Layer integrieren.',
      reason: 'Mentaler Checkout ist bereits erfolgt. Sehr geringe Kaufhürde.',
      result: 'Average Order Value (AOV) +€ 4.50',
      impactMsg: '&quot;Der perfekte Zeitpunkt für Cross-Selling, da keine neuen Versandangst-Barrieren entstehen.&quot;'
    },
    {
      title: 'Experiment C: "Prominenter Social Proof"',
      test: 'Kundenbewertungen & Sterne auf Kategorie-Ebene anzeigen.',
      reason: 'Vertrauensaufbau im ersten Kontakt.',
      result: 'Bounce Rate -8%',
      impactMsg: '&quot;Soziale Bestätigung baut sofort Risiko-Assoziationen bei teureren Food-Produkten ab.&quot;'
    }
  ];

  return (
    <div className="space-y-6">
       <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-800 mb-2">Der Optimierungs-Plan (A/B Testing)</h2>
          <p className="text-slate-500 font-medium">Mit klickbaren A/B-Test Simulationen, um datengetriebenes UX-Design zu demonstrieren.</p>
       </div>

      {ideas.map((idea, idx) => (
         <ExperimentCard key={idx} idea={idea} editorMode={editorMode} />
      ))}
    </div>
  );
}

function ExperimentCard({ idea, editorMode }: { idea: { title: string, test: string, reason: string, result: string, impactMsg: string }, editorMode: boolean }) {
   const [testState, setTestState] = useState<'idle'|'loading'|'done'>('idle');

   const handleStart = () => {
      setTestState('loading');
      setTimeout(() => {
         setTestState('done');
      }, 1800);
   };

   return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
         <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-[#f91f64] flex items-center gap-2">
              <Settings size={20} className={testState==='loading'?'animate-spin':''}/> {idea.title}
            </h3>
            {testState === 'idle' && (
               <button onClick={handleStart} className="flex items-center gap-2 bg-[#12504c] hover:bg-[#0b3330] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-transform active:scale-95">
                  <PlayCircle size={16}/> Test starten
               </button>
            )}
            {testState === 'loading' && (
               <div className="flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2 rounded-lg font-bold text-sm">
                  <Loader2 size={16} className="animate-spin"/> Sammle Daten...
               </div>
            )}
            {testState === 'done' && (
               <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-black text-sm border border-green-200">
                  <CheckCircle2 size={16}/> {idea.result}
               </div>
            )}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
               <div className="text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">Hypothese &amp; Aufbau</div>
               <div className="text-sm font-medium text-slate-700 mb-2">{idea.test}</div>
               <div className="text-xs text-slate-500 italic border-l-2 border-slate-300 pl-2">{idea.reason}</div>
            </div>

            {/* Test Simulation Area */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center relative overflow-hidden">
               {testState === 'idle' && (
                  <div className="text-center text-slate-400 font-bold text-xs uppercase tracking-widest">Warte auf Test-Start</div>
               )}
               {testState === 'loading' && (
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                     <motion.div initial={{width: '0%'}} animate={{width: '100%'}} transition={{duration: 1.8, ease: "linear"}} className="h-full bg-[#f91f64]"/>
                  </div>
               )}
               {testState === 'done' && (
                  <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="text-center text-[#12504c] font-black text-lg">
                     {idea.result}
                     <div className="text-xs text-slate-500 font-medium mt-1">Signifikanz erreicht (99%)</div>
                  </motion.div>
               )}
            </div>
         </div>

         <AnimatePresence>
            {(editorMode && testState === 'done') && (
               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden mt-4">
                 <div dangerouslySetInnerHTML={{__html: `<div class="bg-[#fff9e6] border-l-4 border-[#ffd000] p-4 rounded-r-xl shadow-inner text-sm text-slate-800 font-bold italic">${idea.impactMsg} <br/><br/><span class="text-xs text-[#f91f64] uppercase tracking-wide">Brand-Fit: Authentic, Modern, Playful</span></div>`}} />
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

function Faq({ editorMode }: { editorMode: boolean }) {
  const faqs = [
    {
      category: 'Kategorie 1: Verteidigung (Stress-Test)',
      items: [
        {
          q: '1. Die Margen-Frage',
          ask: '"Dein Vorschlag mit dem Gratis-Becher ab 50€ frisst unsere Marge auf. Warum sollten wir das tun?"',
          ans: '"Wir tauschen kurzfristige Marge gegen langfristigen Customer Lifetime Value (CLV). Wenn der Kunde durch das Add-on von 40€ auf über 50€ Warenkorbwert kommt, sinkt unser prozentualer Anteil an den Versand- und Fulfillmentkosten. Außerdem ist ein mymuesli-Becher ein physischer Anker in der Küche des Kunden – er erinnert ihn jeden Morgen daran, sein Abo zu erneuern."'
        },
        {
          q: '2. Die IT-Frage (Ressourcen-Mangel)',
          ask: '"Das \'Guided Selling\' Quiz im Mixer dauert 3 Monate zu bauen. Was machen wir stattdessen?"',
          ans: '"Wir bauen ein MVP (Minimum Viable Product). Bevor wir die IT blockieren, testen wir die Hypothese mit einem \'Fake Door Test\'. Wenn wir sehen, dass 30% der Nutzer das Quiz anklicken, haben wir den Daten-Beweis, dass sich die 3 Monate IT-Entwicklung lohnen."'
        },
        {
          q: '3. Die Priorisierungs-Frage',
          ask: '"Wir haben nur Kapazität für EINE deiner 3 Optimierungs-Ideen. Welche setzen wir morgen um?"',
          ans: '"Ganz klar: Das \'One-Click Add-on\' im Warenkorb. Das ist der tiefste Punkt im Funnel. Der Kunde hat das Portemonnaie quasi schon in der Hand. Die technische Umsetzung ist extrem simpel (Low Hanging Fruits), und der direkte Impact auf den Average Order Value ist sofort messbar."'
        }
      ]
    },
    {
      category: 'Kategorie 2: Die "Fallen" zu deinem Lebenslauf',
      items: [
        {
          q: '4. Die "Design vs. Daten"-Falle',
          ask: '"Du hast einen Bachelor in Kommunikationsdesign. Wird dir bei Excel und Analytics nicht langweilig?"',
          ans: '"Design ohne Daten ist Kunst. Im E-Commerce mache ich aber keine Kunst, sondern Conversion-Design. Mich motiviert nicht, ob ein Button \'schön\' aussieht, sondern ob ein A/B-Test zeigt, dass die neue Farbe 2% mehr Umsatz bringt. Die Zahlen sagen mir, wo das Problem liegt, und Design ist meine Lösung dafür."'
        },
        {
          q: '5. Die Shopify-Falle',
          ask: '"Du bist Shopify-Experte. Unser mymuesli-Mixer läuft aber über ein komplexes Custom-Backend. Problem?"',
          ans: '"Überhaupt nicht. Shopify war für mich das Werkzeug, um die Logik des E-Commerce von der Pike auf zu lernen. Das Prinzip der Customer Journey bleibt gleich. Ich freue mich darauf zu lernen, wie ihr diese massive Komplexität gelöst habt."'
        }
      ]
    }
  ];

  if (!editorMode) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <h2 className="text-3xl font-black text-[#f91f64]">Stress-Test Vorbereitung</h2>
      
      {faqs.map((cat, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-xl font-black text-slate-800 mb-5 pb-3 border-b border-slate-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f91f64]"></div> {cat.category}
          </h2>
          <div className="space-y-5">
            {cat.items.map((item, j) => (
              <div key={j} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2 text-lg">{item.q}</h4>
                <div className="bg-slate-50 p-3 rounded-lg text-sm font-medium text-slate-600 mb-4 border border-slate-100 italic">
                  {item.ask}
                </div>
                <div className="flex items-start gap-4 bg-[#12504c]/5 p-4 rounded-xl border border-[#12504c]/10">
                  <div className="shrink-0 mt-1 bg-[#12504c]/10 p-1 rounded-full text-[#12504c]">
                     <ChevronRight size={16} strokeWidth={3} />
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed">
                    {item.ans}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function Spicker({ editorMode }: { editorMode: boolean }) {
  if (!editorMode) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-[#f91f64] mb-6 tracking-tight">Culture Fit &amp; Management Summary</h2>
        <div className="space-y-8">
          
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">1. &quot;Warum wollen Sie bei mymuesli arbeiten?&quot;</h3>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 italic text-slate-700 leading-relaxed shadow-sm">
              &quot;Für mich ist mymuesli nicht einfach nur ein Onlineshop, sondern eine echte Pionier-Marke, die bereits seit 2007 den Markt für personalisierbare Bio-Lebensmittel prägt. Genau diese Individualität ist mein absolutes Steckenpferd: Ich habe meine Bachelorarbeit tiefgehend über individuelle Produkte im E-Commerce geschrieben. Euer Leitsatz &apos;MY WAY. MY MUESLI.&apos; bringt genau das auf den Punkt, woran ich glaube: Der Kunde möchte nicht irgendein Produkt, er möchte <strong>sein Produkt.</strong><br/><br/>
              Darüber hinaus identifiziere ich mich stark mit euren Markenwerten. E-Commerce ist oft sehr schnelllebig und rein konsumgetrieben. Bei mymuesli fasziniert mich, dass Wirtschaftlichkeit Hand in Hand mit Werten wie 100% Bio-Qualität, Nachhaltigkeit und dem klaren Ziel von &apos;Zero Food Waste&apos; geht. Ich möchte meine Energie für ein Unternehmen einsetzen, das nicht nur wachsen will, sondern auch verantwortungsvoll handelt.&quot;
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">2. &quot;Wie passen Sie in unser Team und zu unserer Marke?&quot;</h3>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 italic text-slate-700 leading-relaxed shadow-sm">
              &quot;Als Kommunikationsdesigner betrachte ich E-Commerce immer durch die Linse der Markenidentität. Ich sehe mymuesli als eine Marke, die extrem modern, lebendig (&apos;vibrant&apos;) und spielerisch (&apos;playful&apos;) auftritt, dabei aber immer clean und authentisch bleibt. Genau das ist mein Ansatz im Design: Ich sorge für saubere, intuitive Nutzeroberflächen, die Spaß machen und konvertieren.<br/><br/>
              Wenn es um die Zusammenarbeit im Team geht, spiegele ich genau euren &apos;Tone of Voice&apos; wider: Ich arbeite enthusiastisch, schätze den persönlichen Austausch auf Augenhöhe und übernehme verantwortungsvoll meine Aufgaben (&apos;Responsible&apos;).&quot;
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">3. &quot;Was reizt Sie an unserem Produktportfolio?&quot;</h3>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 italic text-slate-700 leading-relaxed shadow-sm">
              &quot;Was mich am meisten reizt, ist die Balance aus höchster Qualität und enormer Komplexität. Aus Sicht eines On-Site Merchandisers ist das die Königsklasse: Wie präsentiere ich diese massive Auswahl an gesunden, nachhaltigen Zutaten so, dass der Kunde inspiriert und nicht überfordert wird? Diese Brücke zwischen einem komplexen, 100% biologischen Produkt im Backend und einem völlig mühelosen, personalisierten Kauferlebnis im Frontend zu schlagen, ist genau die Herausforderung, für die ich brenne.&quot;
            </div>
          </div>

        </div>
      </div>

    </motion.div>
  );
}
