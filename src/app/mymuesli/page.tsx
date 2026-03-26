"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBar, Leaf, Settings, ShieldQuestion, BrainCircuit, ChevronRight, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

export default function MyMuesliPresentation() {
  const [activeTab, setActiveTab] = useState('task1');
  const [learningMode, setLearningMode] = useState(false);

  // Tab definitions
  const tabs = [
    { id: 'task1', label: 'Aufgabe 1: Dashboard', icon: <ChartBar size={20} /> },
    { id: 'task2', label: 'Aufgabe 2: Merchandising', icon: <Leaf size={20} /> },
    { id: 'task3', label: 'Aufgabe 3: Praxisaufgabe', icon: <Settings size={20} /> },
    { id: 'qa', label: 'Q&A (Stress-Test)', icon: <ShieldQuestion size={20} /> }
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* SIDEBAR */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <h1 className="text-3xl font-black tracking-tight text-[#C80050]">mymuesli</h1>
        </div>
        <div className="flex-1 overflow-y-auto py-6">
          <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Präsentation</p>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-[#C80050]/10 text-[#C80050] border-r-4 border-[#C80050]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-r-4 border-transparent'
                }`}
              >
                <div className={`${activeTab === tab.id ? 'text-[#C80050]' : 'text-gray-400'}`}>
                  {tab.icon}
                </div>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden shadow-inner">
               DD
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">David Dubinskiy</p>
              <p className="text-xs text-gray-500 font-medium">Data-Driven UX & Strategy</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen bg-slate-50">
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          
          <div className="flex items-center gap-3 bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200 shadow-sm">
            <BrainCircuit size={18} className={learningMode ? 'text-[#C80050]' : 'text-slate-400'} />
            <span className={`text-sm font-bold ${learningMode ? 'text-slate-800' : 'text-slate-500'}`}>
              Lern-Modus
            </span>
            <button 
              onClick={() => setLearningMode(!learningMode)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C80050] focus:ring-offset-2 ${
                learningMode ? 'bg-[#C80050]' : 'bg-slate-300'
              }`}
            >
              <span 
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  learningMode ? 'translate-x-6' : 'translate-x-1'
                } shadow-sm`}
              />
            </button>
          </div>
        </header>

        {/* SCROLLABLE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl mx-auto pb-12"
            >
              {activeTab === 'task1' && <Task1 learningMode={learningMode} />}
              {activeTab === 'task2' && <Task2 learningMode={learningMode} />}
              {activeTab === 'task3' && <Task3 learningMode={learningMode} />}
              {activeTab === 'qa' && <Faq learningMode={learningMode} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// ------ SUBCOMPONENTS ------

function Task1({ learningMode }: { learningMode: boolean }) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <ChartBar className="text-[#C80050]" size={22}/> 1. KPIs & Messmethoden
        </h3>
        <p className="text-slate-600 leading-relaxed font-medium">
          Conversion Rate (CR), Average Order Value (AOV), Retention Rate, Bounce Rate. Messung via Google Analytics 4 (GA4) und Shopify/Klaviyo.
        </p>
        
        <AnimatePresence>
          {learningMode && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
               <div className="bg-[#fff9e6] border-l-4 border-[#ffd000] p-5 rounded-r-xl shadow-inner">
                 <p className="text-sm text-slate-800 font-medium leading-relaxed">
                   <strong className="text-slate-900">CR:</strong> Wie viel % der Besucher kaufen? (Zeigt Effizienz des Shops).<br/>
                   <strong className="text-slate-900">AOV:</strong> Durchschnittlicher Warenkorbwert (Wichtig für Profitabilität).<br/>
                   <strong className="text-slate-900">Retention Rate:</strong> Wiederkäufer-Quote (Extrem wichtig für das mymuesli-Abo-Modell).<br/>
                   <strong className="text-slate-900">Bounce Rate:</strong> Absprungrate, besonders kritisch im Müsli-Mixer.
                 </p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-[#C80050]" size={22}/> 2. Visualisierung
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
          High-Level-Kacheln (Umsatz, CR, AOV) ganz oben. Darunter Sales-Funnel als Trichtermotiv.
        </p>

        {/* Dashboard Sketch */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-4 shadow-inner">
          <div className="flex gap-4 mb-6">
             <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
               <div className="text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">Umsatz (Heute)</div>
               <div className="text-3xl font-black text-slate-800">€ 24.5k</div>
             </div>
             <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
               <div className="text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">Conv. Rate</div>
               <div className="text-3xl font-black text-green-600">3.8%</div>
             </div>
             <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
               <div className="text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">AOV</div>
               <div className="text-3xl font-black text-slate-800">€ 42.50</div>
             </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-[2] bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-56 flex flex-col items-center justify-center">
               <div className="w-full max-w-sm space-y-3">
                 <div className="bg-slate-800 text-white text-xs font-bold text-center py-2.5 rounded-lg shadow-sm">Schritt 1: Basis wählen (100%)</div>
                 <div className="bg-slate-600 text-white text-xs font-bold text-center py-2.5 rounded-lg w-[85%] mx-auto shadow-sm">Schritt 2: Zutaten (65%)</div>
                 <div className="bg-slate-400 text-white text-xs font-bold text-center py-2.5 rounded-lg w-[50%] mx-auto shadow-sm">Checkout (25%)</div>
               </div>
               <div className="text-xs text-slate-400 mt-6 font-bold uppercase tracking-widest">Müsli-Mixer Funnel</div>
            </div>
            <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-slate-100 h-56">
              <div className="text-xs text-slate-400 uppercase font-bold mb-4 tracking-wider">Alert Center</div>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs bg-red-50 text-red-700 p-3 rounded-lg border border-red-100 font-medium">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  Drop-off in Step 2 über 40% (Kritisch im Vergleich zur Vorwoche)
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {learningMode && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
               <div className="bg-[#fff9e6] border-l-4 border-[#ffd000] p-5 rounded-r-xl shadow-inner">
                 <p className="text-sm text-slate-800 font-medium italic">
                   "Ein Funnel (Trichter) zeigt genau, an welchem Schritt Kunden den Mixer verlassen (z.B. von 'Zutat wählen' zu 'In den Warenkorb'). So wissen wir genau, wo wir A/B-Tests ansetzen müssen."
                 </p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Task2({ learningMode }: { learningMode: boolean }) {
  const points = [
    {
      title: '1. Produktauswahl',
      standard: 'Fokus auf warme Müslis (Porridge), Herbst-Sorten (Apfel-Zimt) und erste Adventskalender-Teaser. Prominente Hero-Section.',
      learning: '"Herbst ist \'Comfort Food\'-Zeit. Adventskalender sind Umsatztreiber im Q4. Wir müssen diese früh anteasern, um Vorbestellungen (Cashflow) zu generieren."'
    },
    {
      title: '2. Promotionen',
      standard: '"Herbst-Probierpakete" und "Gratis-Porridge-Becher" ab Mindestbestellwert statt harter %. Rabatte zerstören.',
      learning: '"Warum Gratis-Produkte statt Rabatte? Rabatte zerstören die Premium-Markenwahrnehmung und die Marge. Ein Gratis-Becher als \'Add-on\' steigert den Average Order Value (AOV), ohne das Hauptprodukt abzuwerten."'
    },
    {
      title: '3. Layout & UX',
      standard: 'Warme Erdtöne, atmosphärische Lifestyle-Bilder (z.B. Tee & Müsli an Regentagen). Anpassung der Hero Banner.',
      learning: '"Visuelle Identität anpassen: Durch meinen Background im Kommunikationsdesign weiß ich, dass Farbpsychologie die Kaufbereitschaft stark beeinflusst."'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {points.map((pt, idx) => (
         <div key={idx} className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{pt.title}</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed flex-1">
              {pt.standard}
            </p>
            <AnimatePresence>
              {learningMode && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#fff9e6] border-l-4 border-[#C80050] p-4 rounded-r-xl mt-4 shadow-inner">
                    <p className="text-sm text-slate-800 font-medium italic">
                      {pt.learning}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
         </div>
      ))}
    </div>
  );
}

function Task3({ learningMode }: { learningMode: boolean }) {
  const ideas = [
    {
      title: 'Idee 1: "Guided Selling" im Mixer',
      standard: 'Vorgeschaltetes Mini-Quiz zur Vorauswahl (z.B. Fruchtig oder Schoko?).',
      test: 'A/B-Test des Mini-Quiz vs. direkter Mixer-Einstieg',
      reasoning: 'Reduziert "Choice Overload" bei Neukunden.',
      result: 'Höhere Conversion Rate im Mixer.',
      learning: '"Warum? Wegen dem \'Choice Overload\' (Überforderung durch zu viel Auswahl). Erwartetes Ergebnis: Höhere Conversion Rate im Mixer, da der Einstieg erleichtert wird (Bezug zu meiner Bachelorarbeit!)."'
    },
    {
      title: 'Idee 2: "One-Click Add-on" im Warenkorb',
      standard: 'Passendes Zubehör (Löffel, mymuesli-Dose) kurz vor dem Checkout als 1-Klick-Option anbieten.',
      test: 'Integration ins native Warenkorb-Layer',
      reasoning: 'Geringe Hürde da keine Zusatz-Versandkosten anfallen.',
      result: 'Direkte Steigerung des AOV.',
      learning: '"Warum? Der Kunde ist bereits kaufbereit. Ein kleines Extra ohne Zusatz-Versandkosten ist ein No-Brainer. Erwartetes Ergebnis: Direkte Steigerung des Average Order Value (AOV)."'
    },
    {
      title: 'Idee 3: Social Proof Integration',
      standard: 'Kundenbewertungen und "Live-Kauf-Ticker" auf Produktseiten.',
      test: 'Anzeige von Sternen/Zitaten direkt auf Kategorie-Ebene',
      reasoning: 'Soziale Bestätigung baut sofort Vertrauen auf.',
      result: 'Senkung der Bounce Rate.',
      learning: '"Warum? Soziale Bestätigung baut Vertrauen ab der ersten Sekunde auf. Erwartetes Ergebnis: Senkung der Bounce Rate auf den Landingpages."'
    }
  ];

  return (
    <div className="space-y-6">
      {ideas.map((idea, idx) => (
        <div key={idx} className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-[#C80050] mb-3 flex items-center gap-2">
            <Lightbulb size={20} /> {idea.title}
          </h3>
          <p className="text-slate-800 font-medium mb-5">{idea.standard}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
               <div className="text-xs text-slate-400 uppercase font-bold mb-2 tracking-wider">Test</div>
               <div className="text-sm font-medium text-slate-700">{idea.test}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
               <div className="text-xs text-slate-400 uppercase font-bold mb-2 tracking-wider">Begründung</div>
               <div className="text-sm font-medium text-slate-700">{idea.reasoning}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm relative overflow-hidden">
               <div className="absolute -right-2 -bottom-2 opacity-10"><TrendingUp size={48} /></div>
               <div className="text-xs text-green-600 uppercase font-bold mb-2 tracking-wider">Ergebnis</div>
               <div className="text-sm text-green-800 font-bold relative z-10">{idea.result}</div>
            </div>
          </div>

          <AnimatePresence>
            {learningMode && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#fff9e6] border-l-4 border-[#ffd000] p-5 rounded-r-xl mt-5 shadow-inner">
                  <p className="text-sm text-slate-800 font-medium italic leading-relaxed">
                    {idea.learning}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function Faq({ learningMode }: { learningMode: boolean }) {
  const faqs = [
    {
      category: 'Kategorie 1: Verteidigung (Stress-Test)',
      items: [
        {
          q: '1. Die Margen-Frage (Der Klassiker)',
          ask: '"Dein Vorschlag mit dem Gratis-Porridge-Becher ab 50€ klingt gut für den Kunden, aber das frisst unsere Marge auf. Warum sollten wir das tun?"',
          ans: '"Wir tauschen kurzfristige Marge gegen langfristigen Customer Lifetime Value (CLV). Wenn der Kunde durch das Add-on von 40€ auf über 50€ Warenkorbwert kommt, sinkt unser prozentualer Anteil an den Versand- und Fulfillmentkosten. Außerdem ist ein mymuesli-Becher ein physischer Anker in der Küche des Kunden – er erinnert ihn jeden Morgen daran, sein Abo zu erneuern."'
        },
        {
          q: '2. Die IT-Frage (Ressourcen-Mangel)',
          ask: '"Das \'Guided Selling\' Quiz im Mixer ist eine tolle Idee, aber unsere IT sagt, das dauert 3 Monate zu bauen. Was machen wir stattdessen?"',
          ans: '"Wir bauen ein MVP (Minimum Viable Product). Bevor wir die IT blockieren, testen wir die Hypothese mit einem \'Fake Door Test\' oder binden ein simples Tool wie Typeform als Pop-up ein. Wenn wir sehen, dass 30% der Nutzer das Quiz anklicken, haben wir den Daten-Beweis (Proof of Concept), dass sich die 3 Monate IT-Entwicklung lohnen. Im E-Commerce testen wir erst, bevor wir teuer bauen."'
        },
        {
          q: '3. Die Priorisierungs-Frage',
          ask: '"Wir haben nur Kapazität für EINE deiner 3 Optimierungs-Ideen. Welche setzen wir morgen um und warum?"',
          ans: '"Ganz klar: Das \'One-Click Add-on\' im Warenkorb. Das ist der tiefste Punkt im Funnel (Trichter). Der Kunde hat das Portemonnaie quasi schon in der Hand. Die technische Umsetzung ist bei Shopify extrem simpel (geringer Aufwand), und der direkte Impact auf den Average Order Value (AOV) ist sofort messbar."'
        }
      ]
    },
    {
      category: 'Kategorie 2: Die "Fallen" zu deinem Lebenslauf',
      items: [
        {
          q: '4. Die "Design vs. Daten"-Falle',
          ask: '"Du hast gerade deinen Bachelor in Kommunikationsdesign gemacht. Ein On-Site Merchandiser wühlt aber den halben Tag in Excel-Tabellen und Google Analytics. Wird dir da nicht langweilig?"',
          ans: '"Design ohne Daten ist Kunst. Im E-Commerce mache ich aber keine Kunst, sondern Conversion-Design. Mich motiviert nicht, ob ein Button \'schön\' aussieht, sondern ob ein A/B-Test zeigt, dass die neue Farbe 2% mehr Umsatz bringt. Bei MaxViral und PIXLIP habe ich genau an dieser Schnittstelle gearbeitet: Die Zahlen sagen mir, wo das Problem liegt, und das Design ist meine Lösung dafür."'
        },
        {
          q: '5. Die Shopify-Falle',
          ask: '"Du bist Shopify-Experte. Unser mymuesli-Mixer mit seinen Millionen Kombinationen läuft aber über ein komplexes Custom-Backend. Ist das ein Problem für dich?"',
          ans: '"Überhaupt nicht. Shopify war für mich das Werkzeug, um die Logik des E-Commerce (Warenkörbe, Checkouts, Kundenbindung) von der Pike auf zu lernen. Das Prinzip der Customer Journey bleibt gleich, egal auf welchem System. Ich freue mich darauf zu lernen, wie ihr diese massive Komplexität headless oder im Custom-Backend gelöst habt."'
        }
      ]
    },
    {
      category: 'Kategorie 3: Das "Mindset" (Wenn du die Antwort nicht weißt)',
      items: [
        {
          q: '6. Der "Notfall-Satz" für unbekannte Metriken',
          ask: 'z.B.: "Wie hoch schätzt du unsere aktuelle Conversion Rate?"',
          ans: '"Aus dem Stegreif kann ich Ihnen die exakte Zahl nicht nennen, da sie im D2C-Food-Bereich stark von Faktoren wie Mobile-Traffic und Saisonalität abhängt. Ich würde aber schätzen, sie liegt zwischen X und Y. Um das fundiert zu beantworten, wäre mein erster Schritt morgen früh, mir den GA4-Report für die letzten 30 Tage aufzurufen und die Checkout-Abbrüche zu analysieren."'
        }
      ]
    }
  ];

  if (!learningMode) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[450px]">
        <ShieldQuestion size={64} strokeWidth={1.5} className="text-slate-300 mb-6" />
        <h3 className="text-2xl font-bold text-slate-800 mb-3">Interne Vorbereitung gesperrt</h3>
        <p className="text-slate-500 max-w-lg font-medium">
          Bitte aktiviere den <strong className="text-slate-700">Lern-Modus</strong> oben rechts, um die tiefgreifenden Antworten für das Interview-Sparring ("Stress-Test") und Verteidigungsstrategien freizuschalten.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      <div className="bg-[#fff9e6] border-l-4 border-[#C80050] p-5 rounded-r-xl mb-8 shadow-sm">
        <p className="text-sm text-slate-800 font-medium leading-relaxed">
          <strong className="text-[#C80050] uppercase tracking-wide block mb-1">Dein stärkster Anker:</strong> Wenn sie dich in die Mangel nehmen, verweise immer auf deine Bachelorarbeit. 
          <br/><em>"Das ist ein hervorragender Einwand. Genau diesen Punkt ('Choice Overload' bei individuellen Produkten) habe ich in meiner Thesis ausführlich analysiert..."</em> 
          <br/>Das gibt dir sofortige wissenschaftliche Autorität.
        </p>
      </div>

      {faqs.map((cat, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-xl font-black text-slate-800 mb-5 pb-3 border-b border-slate-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C80050]"></div> {cat.category}
          </h2>
          <div className="space-y-5">
            {cat.items.map((item, j) => (
              <div key={j} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 text-lg">{item.q}</h4>
                <div className="bg-slate-50 p-4 rounded-xl text-sm font-medium text-slate-600 mb-4 border border-slate-100 italic relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-300 rounded-l-xl"></div>
                  {item.ask}
                </div>
                <div className="flex items-start gap-4 bg-green-50/50 p-4 rounded-xl border border-green-100/50">
                  <div className="shrink-0 mt-1 bg-green-100 p-1 rounded-full text-green-600">
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
