import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import SkillsExperience from "./components/SkillsExperience";
import Hobbies from "./components/Hobbies";
import ProjectsView from "./components/ProjectsView";
import Resume from "./components/Resume";

// Live Interactive Demo Components
import NlpSummarizer from "./components/NlpSummarizer";
import ObjectDetectionTelemetry from "./components/ObjectDetectionTelemetry";
import PredictiveGameSolver from "./components/PredictiveGameSolver";

import { Sparkles, ArrowRight, FileText, Github, Linkedin, Instagram, X, Terminal, Cpu } from "lucide-react";

type TabId = "home" | "about" | "hobbies" | "projects" | "resume";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [activeDemo, setActiveDemo] = useState<"summarizer" | "detection" | "game-solver" | null>(null);

  // Quick helper to route buttons to tabs
  const handleNavigate = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-blue-605/10 selection:text-blue-700 font-sans blueprint-grid text-slate-800">
      
      {/* Top Navbar Header Section */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Primary Workspace Node Area */}
      <main className="max-w-6xl mx-auto w-full px-6 md:px-12 py-10 flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
          >
            {/* 1. HOME VIEW */}
            {activeTab === "home" && (
              <div 
                className="flex flex-col items-center justify-center text-center py-16 md:py-24 space-y-8 max-w-4xl mx-auto"
                id="home-view-container"
              >
                {/* Sparkle Badge at the Top */}
                <div 
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 border border-slate-205/60 text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest rounded-full shadow-2xs"
                  id="platform-badge"
                >
                  <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                  Portfolio Platform
                </div>

                {/* Massive Centered Headings */}
                <div className="space-y-4">
                  <h1 className="font-display font-black text-slate-900 tracking-tight text-5xl md:text-7xl leading-none">
                    Mohammad Jaffer Sameer
                  </h1>
                  <p className="text-xl md:text-3xl font-sans tracking-tight text-slate-650 max-w-2xl mx-auto">
                    Exploring <span className="text-blue-600 font-extrabold">AI</span>, <span className="text-blue-600 font-extrabold">Data</span>, and <span className="text-blue-600 font-extrabold">Innovation</span>
                  </p>
                </div>

                {/* Professional Statement Taglines */}
                <p className="font-mono text-slate-400 text-[10.5px] md:text-xs font-semibold tracking-wider uppercase max-w-3xl leading-relaxed">
                  COMPUTER SCIENCE SCHOLAR • ARTIFICIAL INTELLIGENCE ARCHITECT • FULLSTACK CRAFTSMAN
                </p>

                {/* Two modern buttons matching picture 1 */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-xs sm:max-w-none">
                  <button
                    onClick={() => handleNavigate("projects")}
                    className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-sans font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 group cursor-pointer transitionduration-300"
                    id="explore-projects-cta"
                  >
                    Explore Projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
                  </button>

                  <button
                    onClick={() => handleNavigate("resume")}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm font-sans font-bold text-xs tracking-wide rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors duration-350"
                    id="interactive-resume-cta"
                  >
                    <FileText className="h-4 w-4 text-slate-500" />
                    Interactive Resume
                  </button>
                </div>

                {/* Bottom External Connections at footer of Home */}
                <div className="flex items-center justify-center gap-6 pt-16 text-[9.5px] font-mono font-bold tracking-widest text-slate-400 uppercase select-none">
                  <a 
                    href="https://github.com/25a35a4305" 
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-1.5 hover:text-slate-900 transition-colors text-slate-600 font-medium"
                  >
                    <Github className="h-3.5 w-3.5 text-slate-900" />
                    GITHUB
                  </a>
                  <span className="text-slate-200">|</span>
                  <a 
                    href="https://www.linkedin.com/in/jaffersameer?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-1.5 hover:text-[#0b58a8] transition-colors text-slate-600 font-medium"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-[#0a66c2]" />
                    LINKEDIN
                  </a>
                  <span className="text-slate-200">|</span>
                  <a 
                    href="https://www.instagram.com/randomcreativity__?igsh=MTA5NWpscWxwa2YyMA==" 
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-1.5 hover:text-[#b01e4e] transition-colors text-slate-600 font-medium"
                  >
                    <Instagram className="h-3.5 w-3.5 text-[#e1306c]" />
                    INSTAGRAM
                  </a>
                </div>
              </div>
            )}

            {/* 2. ABOUT ME VIEW */}
            {activeTab === "about" && <SkillsExperience />}

            {/* 3. HOBBIES VIEW */}
            {activeTab === "hobbies" && <Hobbies />}

            {/* 4. PROJECTS VIEW */}
            {activeTab === "projects" && (
              <ProjectsView onOpenDemo={(tech) => setActiveDemo(tech)} />
            )}

            {/* 5. RESUME VIEW */}
            {activeTab === "resume" && <Resume onNavigate={handleNavigate} />}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* High Integrity Footer block */}
      <footer className="border-t border-slate-200/80 bg-white/50 py-8 px-6 font-mono text-[9px] uppercase font-bold text-slate-400 flex items-center justify-center relative z-10 text-center tracking-widest">
        <div className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>M. Jaffer Sameer Portfolio • Compiled: June 2026</span>
          </div>
          <div>
            <span>SYSTEM ENGINES PARSING ONLINE_STATUS OK</span>
          </div>
        </div>
      </footer>

      {/* FULLSTAGE INTERACTIVE DEMO SANDBOX MODAL OVERLAY */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            id="global-interactive-sandbox-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Console Nav top Header */}
              <div className="bg-slate-950 px-6 py-4 border-b border-slate-850 flex items-center justify-between font-mono">
                <div className="flex items-center gap-3">
                  {/* Glowing execution node indicator */}
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-blue-400" />
                    AI Telemetry Sandbox Workstation // Active Node: {activeDemo.toUpperCase()}
                  </span>
                </div>
                
                {/* Exit button */}
                <button
                  onClick={() => setActiveDemo(null)}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-md text-xs border border-slate-800 transition duration-300 cursor-pointer"
                  id="close-sandbox-node-btn"
                >
                  <X className="h-3.5 w-3.5" />
                  Close Sandbox
                </button>
              </div>

              {/* Sandbox component sandbox container */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950 bg-slate-900/40 text-slate-100">
                {activeDemo === "summarizer" && <NlpSummarizer />}
                {activeDemo === "detection" && <ObjectDetectionTelemetry />}
                {activeDemo === "game-solver" && <PredictiveGameSolver />}
              </div>

              {/* Status info bar */}
              <div className="bg-slate-950 px-6 py-3 border-t border-slate-850 text-[10px] text-slate-550 font-mono flex flex-col sm:flex-row justify-between gap-2">
                <span>Node Compiled Target: WebGL Matrix Canvas Threading</span>
                <span className="flex items-center gap-1">
                  <Cpu className="h-3 w-3 text-slate-650" />
                  Direct Execution via Sandboxed Web Engine
                </span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
