import React from "react";

interface HeaderProps {
  activeTab: "home" | "about" | "hobbies" | "projects" | "resume";
  setActiveTab: (tab: "home" | "about" | "hobbies" | "projects" | "resume") => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs: { id: "home" | "about" | "hobbies" | "projects" | "resume"; label: string }[] = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT ME" },
    { id: "hobbies", label: "HOBBIES" },
    { id: "projects", label: "PROJECTS" },
    { id: "resume", label: "RESUME" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md py-4 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side Emblem Logo */}
        <div 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-3 cursor-pointer group"
          id="mjs-logo-container"
        >
          {/* Black circle mascot emblem */}
          <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center shadow-sm select-none shrink-0 group-hover:scale-105 transition-transform duration-300">
            <span className="font-display font-black text-sm tracking-tight text-white">
              MJS
            </span>
          </div>
          <div>
            <h1 className="font-display font-bold text-sm tracking-wide text-slate-900 uppercase">
              Mohammad Jaffer Sameer
            </h1>
            <p className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
              AI, Data, and Innovation
            </p>
          </div>
        </div>

        {/* Right Side Rounded Tab Selectors */}
        <nav 
          className="bg-slate-100/70 p-1 rounded-full border border-slate-200/40 flex items-center gap-0.5 text-[10px] font-mono"
          id="mjs-main-nav"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full font-bold transition duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/30 font-black"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                id={`nav-tab-${tab.id}`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
