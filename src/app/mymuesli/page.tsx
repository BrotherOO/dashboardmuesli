"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBar, Leaf, Settings, ShieldQuestion, BrainCircuit, ChevronRight, TrendingUp, TrendingDown, Minus, Info, CheckCircle2, ArrowRight, Lightbulb, Target, User } from 'lucide-react';

export default function MyMuesliPresentation() {
  const [activeTab, setActiveTab] = useState('task1');
  const [editorMode, setEditorMode] = useState(false);

  // Tab definitions
  const tabs = [
    { id: 'task1', label: 'Aufgabe 1: Dashboard', icon: <ChartBar size={20} /> },
    { id: 'task2', label: 'Aufgabe 2: Merchandising', icon: <Leaf size={20} /> },
    { id: 'task3', label: 'Aufgabe 3: Praxisaufgabe', icon: <Settings size={20} /> },
    { id: 'cv', label: 'Lebenslauf', icon: <User size={20} /> },
    { id: 'qa', label: 'Q&A (Stress-Test)', icon: <ShieldQuestion size={20} /> },
    { id: 'spicker', label: 'Warum mymuesli?', icon: <Info size={20} /> }
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
              {activeTab === 'cv' && <CVProfile />}
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
function CVProfile() {
  const qaCards = [
    {
      q: "Warum möchten Sie sich beruflich verändern?",
      a: "Nach meinem Bachelor-Abschluss im Februar 2025 habe ich bei der PIXLIP GmbH wertvolle Erfahrungen in der eigenverantwortlichen Betreuung und Optimierung eines Shopify-Webshops gesammelt. Ich habe dort die Conversion Rate und UX erfolgreich vorangetrieben. Allerdings suche ich nun nach einer langfristigen Herausforderung in einem D2C-Unternehmen, das exakt mein akademisches Steckenpferd bedient: Hochgradig personalisierbare Produkte im Food-Sektor. mymuesli bietet genau die Schnittstelle aus komplexem E-Commerce und starkem Branding, für die ich brenne."
    },
    {
      q: "Was nehmen Sie aus Ihrer Zeit bei MaxViral mit?",
      a: "Bei MaxViral habe ich gelernt, was 'Performance-Design' wirklich bedeutet. Ich war fast 5 Jahre dort und habe das Unternehmen in einer frühen Phase begleitet. Ich habe über 1.000 Werbeanzeigen für Meta und TikTok gestaltet und optimiert sowie über 100 E-Mail-Marketingkampagnen in Klaviyo umgesetzt. Mein größtes Learning: Design darf nicht nur schön sein, es muss konvertieren und messbare Ergebnisse liefern. Diese datengetriebene Arbeitsweise bringe ich direkt in das On-Site Merchandising bei mymuesli ein."
    },
    {
      q: "Was ist Ihr USP (Alleinstellungsmerkmal)?",
      a: "Mein USP ist die Brücke zwischen Kreation und Daten. Ich bin studierter Kommunikationsdesigner, der gleichzeitig tief in Shopify, Klaviyo und Web-Analytics zu Hause ist. Ich muss nicht erst einen Entwickler oder Analysten fragen, wie eine Kampagne performt – ich kann die Daten selbst auswerten, das kreative Konzept anpassen und es direkt im CMS umsetzen. Mein Ziel ist immer ein funktionales, ästhetisch klares und stimmiges Online-Erlebnis, das Marke und Produkt optimal präsentiert."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header & Intro */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <User className="text-[#12504c]" size={28}/> Mein Profil & Werdegang
        </h2>
        
        <div className="bg-gradient-to-r from-[#12504c] to-[#1e7a74] rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex items-center gap-6">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
           <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0 shadow-inner">
             <span className="text-2xl font-black text-white tracking-widest">DD</span>
           </div>
           <div className="z-10 relative">
             <h3 className="text-2xl font-black mb-2">David Dubinskiy</h3>
             <p className="text-white/90 font-medium text-sm md:text-base leading-relaxed">
               B.A. Kommunikationsdesign.<br className="md:hidden"/>
               Fokus: E-Commerce, Shopify, Digitales Marketing.
             </p>
           </div>
        </div>
      </div>

      {/* Main Q&A Area */}
      <div className="space-y-6">
        {qaCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldQuestion className="text-[#C80050]" size={20}/> {card.q}
            </h4>
            <p className="text-sm font-medium text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
              {card.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <ChartBar className="text-[#C80050]" size={24}/> Performance Cockpit
          </h3>
          <div className="relative">
            <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-800 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f91f64]">
               📅 Zeitraum: Letzte 7 Tage <ChevronRight size={14} className="rotate-90 opacity-50"/>
            </button>
            <AnimatePresence>
              {editorMode && (
                <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="absolute top-14 right-0 w-[320px] bg-[#fff9e6] border-l-4 border-[#ffd000] p-4 rounded-xl shadow-xl z-50">
                  <p className="text-xs text-slate-800 font-bold italic flex items-start gap-2 leading-relaxed">
                    <Lightbulb size={16} className="shrink-0 mt-0.5 text-[#C80050]"/> 
                    {"\"Wie Sie sehen, habe ich das Dashboard standardmäßig auf die 'Letzten 7 Tage' im Vergleich zur 'Vorwoche' eingestellt. Ein Vergleich von gestern zu heute macht durch die natürlichen Schwankungen im E-Commerce keinen Sinn. Im operativen Merchandising schaue ich mir die Wochentrends an. Wenn wir allerdings in Aufgabe 2 über den Saisonwechsel sprechen, würde ich diesen Filter auf 'Year-over-Year' (Vorjahr) stellen, um die Saisonalität sauber abzubilden.\""}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
           
           {/* Row 1 */}
           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Gesamtumsatz</div>
             <div className="text-3xl font-black text-slate-800">128.450 €</div>
             <div className="text-xs text-green-600 font-bold mt-1 tracking-wide flex items-center gap-1"><TrendingUp size={14}/> +12% vs. Vorwoche</div>
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
             <div className="text-xs text-green-600 font-bold mt-1 tracking-wide flex items-center gap-1"><TrendingUp size={14}/> +2,4% vs. Vorwoche</div>
             <div className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest"><span className="text-blue-500">60% Mobile</span> / 40% Desktop</div>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Conversion Rate</div>
             <div className="text-3xl font-black text-slate-800">3,2 %</div>
             <div className="text-xs text-green-600 font-bold mt-1 tracking-wide flex items-center gap-1"><TrendingUp size={14}/> +0,2% vs. Vorwoche</div>
             <div className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Food D2C Benchmark</div>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Average Order Value</div>
             <div className="text-3xl font-black text-slate-800">44,80 €</div>
             <div className="text-xs text-[#C80050] font-bold mt-1 tracking-wide flex items-center gap-1"><TrendingDown size={14}/> -1,5% vs. Vorwoche</div>
             <div className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Ø 2-3 Dosen + Zubehör</div>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Retention Rate</div>
             <div className="text-3xl font-black text-slate-800">68 %</div>
             <div className="text-xs text-green-600 font-bold mt-1 tracking-wide flex items-center gap-1"><TrendingUp size={14}/> +2% vs. Vorwoche</div>
             <div className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Starkes Abo-Modell</div>
           </NeoCard>

           <NeoCard>
             <div className="text-xs text-slate-500 uppercase font-black mb-1 opacity-70">Retourenquote</div>
             <div className="text-3xl font-black text-slate-800">1,5 %</div>
             <div className="text-xs text-slate-500 font-bold mt-1 tracking-wide flex items-center gap-1"><Minus size={14}/> Stabil</div>
             <div className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Customized Food Standard</div>
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
  const [showHero, setShowHero] = useState(false);

  const pillars = [
    {
      title: 'Saisonale "Comfort Food" Produkte',
      subtitle: 'Produktauswahl & Platzierung',
      text: 'Priorisierung von warmen Optionen wie Porridge und herbstlichen Bio-Mischungen (z.B. Apfel-Zimt-Blend). Diese Produkte werden als "Hero-Produkte" auf der Startseite platziert und in einer dedizierten "Herbst-Kollektion" auf Kategorieseite 1 gehoben.',
      pitch: 'Strategie: Wenn die Tage kürzer werden, ändert sich das Frühstücksverhalten drastisch. Kalte Früchte-Müslis weichen warmen Bowls. Die Platzierung \'Above the Fold\' fängt diesen neuen Intent direkt ab.'
    },
    {
      title: 'Value-Add statt Rabatt',
      subtitle: 'Promotionen & Rabatte',
      text: 'Einführung von "Herbst-Probierpaketen" und eine Aktion: "Gratis Porridge-Becher ab 50€ Mindestbestellwert".',
      pitch: 'Warum keine 20%? Rabatte zerstören die Premium-Markenwahrnehmung und die Marge. Ein Gratis-Becher steigert den Average Order Value (AOV) und dient als täglicher Anker in der Küche des Kunden.'
    },
    {
      title: 'Atmosphärische UX',
      subtitle: 'Layout & User Experience',
      text: 'Anpassung der Farbwelt auf warme Erdtöne (Kupfer, Mymuesli-Beere). Bildsprache auf "Cozy Indoor" wechseln. Neue Kategorie "Herbst-Genuss" in der Main-Nav.',
      pitch: 'Farbpsychologie nutzen: Ein warmer visueller Übergang signalisiert dem Unterbewusstsein den Bedarf nach Comfort Food. Das senkt die Bounce-Rate.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header & Grid */}
      <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200">
         <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <Leaf className="text-[#C80050]" size={28}/> Strategie Saisonwechsel: Sommer ➔ Herbst
         </h3>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {pillars.map((pillar, idx) => (
             <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] font-black tracking-widest text-[#C80050] uppercase mb-2">{pillar.subtitle}</div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">{pillar.title}</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed flex-1">
                  {pillar.text}
                </p>
                
                <AnimatePresence>
                  {editorMode && (
                    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="mt-5 bg-[#fff9e6] border-l-4 border-[#ffd000] p-4 rounded-r-xl">
                      <p className="text-xs text-slate-800 font-bold italic flex items-start gap-2">
                        <Lightbulb size={14} className="shrink-0 mt-0.5 text-[#C80050]"/> 
                        {pillar.pitch}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
           ))}
         </div>
      </div>

      {/* 2. Interactive Hero Mockup Button */}
      <div className="flex justify-center">
         <button 
           onClick={() => setShowHero(!showHero)}
           className="bg-[#12504c] hover:bg-[#0d3b38] text-white px-8 py-4 rounded-full font-black shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
         >
           👁️ Beispiel Hero-Section {showHero ? 'einklappen' : 'aufklappen'}
         </button>
      </div>

      {/* 3. The Hero Mockup Display */}
      <AnimatePresence>
         {showHero && (
           <motion.div 
             initial={{ opacity: 0, height: 0, scale: 0.95 }} 
             animate={{ opacity: 1, height: 'auto', scale: 1 }} 
             exit={{ opacity: 0, height: 0, scale: 0.95 }}
             className="overflow-hidden pt-4"
           >
             <div className="flex flex-col lg:flex-row gap-8 items-center justify-center p-4">
               
               {/* URL bar & Browser Frame (Desktop Preview) */}
               <div className="w-full lg:w-2/3 bg-slate-100 rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
                  {/* Browser Header */}
                  <div className="h-10 bg-slate-200 flex items-center px-4 gap-2 border-b border-slate-300">
                     <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                     </div>
                     <div className="mx-auto bg-white/60 px-24 py-1 rounded-md text-[10px] text-slate-500 font-medium tracking-wide">mymuesli.com/herbst</div>
                  </div>
                  {/* Browser Content (Hero Section) */}
                  <div className="relative bg-gradient-to-r from-[#d97736] to-[#C80050] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center min-h-[400px]">
                     {/* Leaf Decorators */}
                     <Leaf className="absolute top-4 left-4 text-white/10 -rotate-45" size={80}/>
                     <Leaf className="absolute bottom-4 right-20 text-white/10 rotate-45" size={64}/>
                     
                     <div className="w-full md:w-[60%] z-10 text-white space-y-6">
                       <h1 className="text-4xl md:text-5xl font-black leading-tight drop-shadow-lg">Goldener Herbst <br/>im Löffel.</h1>
                       <p className="text-lg md:text-xl font-medium text-white/95">
                         Erlebe die neue Apfel-Zimt Bio-Mischung. Der perfekte Start in die kuschelige Saison.
                       </p>
                       <button className="bg-white text-[#C80050] px-8 py-4 rounded-xl font-black hover:bg-slate-50 transition-colors shadow-lg inline-block mt-4">
                         Jetzt probieren
                       </button>
                     </div>
                     <div className="w-full md:w-[40%] mt-8 md:mt-0 z-10 flex justify-center">
                        <div className="w-48 h-48 md:w-64 md:h-64 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex flex-col items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform">
                           <Leaf size={48} className="text-white opacity-90 mb-2"/>
                           <span className="text-white/90 font-bold text-sm uppercase tracking-widest text-center px-4 leading-tight">[Apfel-Zimt <br/>Bowl]</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Mobile Phone Frame (Mobile Preview) */}
               <div className="w-[300px] shrink-0 bg-slate-800 p-3 rounded-[2.5rem] shadow-2xl border-4 border-slate-700 relative">
                 {/* Notch */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
                 {/* Screen */}
                 <div className="bg-slate-100 w-full h-[600px] rounded-[2rem] overflow-hidden relative shadow-inner flex flex-col justify-start pt-4">
                    <img 
                      src="/mobile-mockup.jpg" 
                      alt="Mobile UI Preview" 
                      className="w-full h-auto object-contain rounded-t-xl"
                    />
                 </div>
               </div>

             </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}

function Task3({ editorMode }: { editorMode: boolean }) {
  const proposals = [
    {
      id: "Vorschlag 1",
      title: '"Guided Selling" Quiz vor dem Mixer',
      what: 'Ein vorgeschaltetes 3-Fragen-Quiz vor dem Mixer. (1. Basis: Hafer/Crunchy/Protein? 2. Geschmack: Fruchtig/Schoko/Nussig? 3. Diät: Vegan/Glutenfrei?).',
      why: 'Reduziert den "Choice Overload" (Entscheidungsparalyse) bei Neukunden, die von der großen Auswahl überfordert sind.',
      result: 'Höhere Conversion Rate (CR) beim Einstieg in den Mixer und geringere Bounce Rate.',
      pitch: "Mein Pitch: Das Quiz ist die perfekte Brücke zwischen Standard-Produkt und Milliarden Kombinationen. Das A/B-Test Setup wäre: Version A (Nutzer klickt auf 'Mixen' und landet direkt im leeren Mixer) vs. Version B (Nutzer klickt auf 'Mixen' und bekommt ein Pop-up mit 3 simplen Fragen zur Vorauswahl)."
    },
    {
      id: "Vorschlag 2",
      title: 'Native "One-Click Add-on" im Warenkorb-Layer',
      what: 'Integration eines "1-Klick-Hinzufügen" Buttons für Zubehör (z.B. mymuesli 2go Becher für 5€) direkt im seitlichen Warenkorb-Slide-out.',
      why: 'Der "mentale Checkout" ist bereits erfolgt. Da keine extra Versandkosten anfallen, ist die Kaufhürde minimal.',
      result: 'Direkte Steigerung des Average Order Value (AOV) pro Transaktion.',
      pitch: "Mein Pitch: Das ist eine 'Low Hanging Fruit' (schnell umsetzbar, großer Hebel). Warum im Layer und nicht im Checkout? Weil wir den Kunden im Checkout nicht mehr vom Bezahlen ablenken wollen. Der Warenkorb-Layer ist der perfekte Ort für Impulskäufe.",
      imageMockup: "/cart-mockup.png"
    },
    {
      id: "Vorschlag 3",
      title: '"Surprise Me" – Community-Mix Generator',
      what: 'Ein "Überrasch mich!" Button im Mixer, der die Röhre automatisch mit einem Mix aus aktuellen Bestseller-Zutaten der Community füllt.',
      why: 'Verbindet den Wunsch nach Individualität mit Bequemlichkeit. Nutzt Gamification und Social Proof ("Was andere gerade lieben").',
      result: 'Höhere Engagement-Time im Mixer und Upselling-Potenzial durch automatische Integration von Premium-Zutaten.',
      pitch: "Mein Pitch: Wir haben Unmengen an Daten, was gut zusammen schmeckt. Nutzen wir sie! Wenn der Generator z.B. gefriergetrocknete Himbeeren (Premium-Zutat) beimischt und der Kunde das behält, pushen wir spielerisch den Warenkorbwert (AOV)."
    }
  ];

  return (
    <div className="space-y-6">
       <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-800 mb-2">Der Optimierungs-Plan (A/B Testing)</h2>
          <p className="text-slate-500 font-medium">Ich habe drei Hebel identifiziert, die sich direkt auf unsere Kern-KPIs (CR und AOV) auswirken.</p>
       </div>

      {proposals.map((prop, idx) => (
         <ProposalCard key={idx} proposal={prop} editorMode={editorMode} />
      ))}
    </div>
  );
}

function ProposalCard({ proposal, editorMode }: { proposal: { id: string, title: string, what: string, why: string, result: string, pitch: string, imageMockup?: string }, editorMode: boolean }) {
   const [showImage, setShowImage] = useState(false);

   return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-all hover:shadow-md">
         <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-black tracking-widest text-[#f91f64] uppercase mb-2">{proposal.id}</div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Settings size={22} className="text-slate-400"/> {proposal.title}
                </h3>
              </div>
              
              {proposal.imageMockup && (
                <button 
                  onClick={() => setShowImage(!showImage)}
                  className="bg-[#12504c] hover:bg-[#0d3b38] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  👁️ Mockup {showImage ? 'ausblenden' : 'ansehen'}
                </button>
              )}
            </div>
            
            <AnimatePresence>
               {showImage && proposal.imageMockup && (
                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                    <div className="bg-slate-100 p-2 border border-slate-200 rounded-2xl flex justify-center mt-2 shadow-inner">
                       <img src={proposal.imageMockup} alt="UI Mockup" className="max-h-[500px] object-contain rounded-xl shadow-lg border border-slate-300" />
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <CheckCircle2 size={16} className="text-blue-500"/> Beschreibung (Was?)
                 </div>
                 <p className="text-sm font-medium text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 h-full">
                   {proposal.what}
                 </p>
               </div>

               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Info size={16} className="text-yellow-500"/> Begründung (Warum?)
                 </div>
                 <p className="text-sm font-medium text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 h-full">
                   {proposal.why}
                 </p>
               </div>

               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <Target size={16} className="text-green-500"/> Erwartetes Ergebnis
                 </div>
                 <p className="text-sm font-medium text-slate-700 leading-relaxed bg-green-50/50 p-4 rounded-xl border border-green-100 h-full text-green-900 border-l-4 border-l-green-400">
                   {proposal.result}
                 </p>
               </div>
            </div>
         </div>

         <AnimatePresence>
            {editorMode && (
               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                 <div className="bg-[#fff9e6] border-t border-[#ffd000]/30 p-6 md:p-8">
                    <h4 className="text-sm font-black text-[#f91f64] uppercase tracking-wide flex items-center gap-2 mb-3">
                      💡 A/B-Test Setup &amp; Mein Pitch
                    </h4>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed italic border-l-4 border-[#f91f64] pl-4">
                      {proposal.pitch}
                    </p>
                 </div>
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
