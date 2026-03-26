"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBar, Leaf, Settings, ShieldQuestion, BrainCircuit, ChevronRight, TrendingUp, AlertTriangle, Info, MousePointerClick, PlayCircle, Loader2, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';

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
  return (
    <div className="space-y-8">
      
      {/* KPI Section */}
      <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <ChartBar className="text-[#f91f64]" size={22}/> Die &quot;Strategic View&quot; (Live KPIs)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {/* Umsatz */}
           <div className="relative">
             <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 shadow-sm h-full flex flex-col justify-center">
               <div className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">Umsatz (Heute)</div>
               <div className="text-2xl font-black text-slate-800">128.450 €</div>
               <div className="text-xs text-green-600 font-bold mt-1">+12% vs. Vorwoche</div>
             </div>
           </div>
           
           {/* CR */}
           <div className="relative">
             <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 shadow-sm h-full flex flex-col justify-center">
               <div className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">Conversion Rate</div>
               <div className="text-2xl font-black text-green-600">3,2 %</div>
               <div className="text-xs text-slate-400 font-medium mt-1">D2C Food Benchmark</div>
             </div>
           </div>

           {/* AOV */}
           <div className="relative">
             <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 shadow-sm h-full flex flex-col justify-center">
               <div className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">Average Order Value</div>
               <div className="text-2xl font-black text-slate-800">44,80 €</div>
               <div className="text-xs text-slate-400 font-medium mt-1">Ø 2-3 Dosen + Zubehör</div>
             </div>
           </div>

           {/* Retention */}
           <div className="relative">
             <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 shadow-sm h-full flex flex-col justify-center">
               <div className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">Retention Rate</div>
               <div className="text-2xl font-black text-slate-800">68 %</div>
               <div className="text-xs text-[#f91f64] font-bold mt-1">Starkes Abo-Modell</div>
             </div>
           </div>
        </div>

        {/* Global Insight for KPIs in Editor Mode */}
        <AnimatePresence>
          {editorMode && (
             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-6 overflow-hidden flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-[#fff9e6] border-l-4 border-[#ffd000] p-5 rounded-r-xl shadow-sm">
                  <p className="text-sm font-black text-[#f91f64] uppercase tracking-wide mb-2 flex items-center gap-2"><Lightbulb size={16}/> CR / Umsatz</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    <strong>Pitch:</strong> &quot;Mein Daily Health Check.&quot;<br/>
                    <strong>Erklärung:</strong> &quot;CR zeigt die Shop-Effizienz auf. Der Fokus liegt bei mymuesli auf der Traffic-Qualität, statt purer Quantität.&quot;
                  </p>
                </div>
                <div className="flex-1 bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl shadow-sm">
                  <p className="text-sm font-black text-blue-600 uppercase tracking-wide mb-2 flex items-center gap-2"><Lightbulb size={16}/> AOV &amp; Thesis</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    <strong>Strategie:</strong> &quot;AOV-Steigerung durch Cross-Selling.&quot;<br/>
                    <strong>Bezug Bachelorarbeit:</strong> &quot;Wie können wir Up-Selling Potenziale bei hoch-personalisierten Produkten heben, ohne den Nutzer zu überfordern?&quot;
                  </p>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp className="text-[#f91f64]" size={22}/> Der Interaktive Mixer-Funnel (Deep-Dive)
        </h3>

        {/* Interactive Dashboard Sketch */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-inner flex flex-col md:flex-row gap-6 relative">
            <div className="flex-[2] bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden md:overflow-visible">
               <div className="w-full max-w-sm space-y-4">
                 
                 {/* Step 1 */}
                 <div className="relative group">
                   <div className="w-full bg-slate-800 text-white text-xs font-bold text-center py-3 rounded-lg shadow-sm">
                     Schritt 1: Basis (100%)
                   </div>
                 </div>
                 
                 {/* Step 2 */}
                 <div className="relative group">
                   <div className="w-[85%] mx-auto bg-[#C80050] text-white text-xs font-bold text-center py-3 rounded-lg shadow-sm relative">
                     Schritt 2: Zutaten (62%)
                   </div>
                   <AnimatePresence>
                     {editorMode && (
                       <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="absolute md:left-[105%] left-0 top-[110%] md:top-0 w-64 bg-[#fff9e6] border-l-4 border-[#C80050] p-4 rounded-r-xl shadow-lg z-20">
                          <p className="text-xs font-black text-[#C80050] uppercase tracking-wide mb-1 flex items-center gap-1"><AlertTriangle size={14}/> Kritischer Punkt</p>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            <strong>Choice Overload Gefahr.</strong> Hier verlieren wir 38% der User.<br/>
                            <strong className="text-slate-900 mt-1 block">Lösung: Guided Selling Quiz.</strong>
                          </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
                 
                 {/* Step 3 */}
                 <div className="relative group mt-8 md:mt-0">
                   <div className="w-[50%] mx-auto bg-[#12504c] text-white text-xs font-bold text-center py-3 rounded-lg shadow-sm">
                     Checkout (28%)
                   </div>
                 </div>

               </div>
            </div>

            <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="text-xs text-slate-400 uppercase font-black mb-4 tracking-wider">Alert Center</div>
              <button 
                onClick={() => setActiveTab('task3')}
                className="group flex flex-col items-center gap-2 text-xs bg-red-50 hover:bg-red-100 transition-colors text-red-700 p-4 rounded-xl border-2 border-red-200 cursor-pointer w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                <AlertTriangle size={24} className="animate-pulse text-red-600" />
                <span className="font-bold text-sm">Drop-off in Step 2 kritisch</span>
                <span className="text-xs mt-2 flex items-center gap-1 text-red-500 font-bold group-hover:text-red-700">Lösung ansehen <ArrowRight size={12}/></span>
              </button>
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
