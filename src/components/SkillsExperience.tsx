import React from "react";
import { GraduationCap, Code, FileCode, Database, Palette } from "lucide-react";

export default function SkillsExperience() {
  const programmingSkills = [
    {
      name: "Python",
      level: 90,
      desc: "Advanced automation, data systems modelling, and deep learning architectures."
    },
    {
      name: "JavaScript",
      level: 85,
      desc: "Modern ES6+, interactive web frameworks, async server protocols, and DOM engine design."
    },
    {
      name: "C Programming",
      level: 78,
      desc: "Memory structures, embedded engineering logic, and algorithm optimizations."
    }
  ];

  const frameworkSkills = [
    {
      name: "HTML & CSS",
      level: 95,
      desc: "Semantic layout generation, modern flex layouts, responsive typography pairings."
    }
  ];

  const databaseSkills = [
    {
      name: "MySQL / relational SQL",
      level: 85,
      desc: "Relational design, entity schemas, query optimizer execution, and relational constraints."
    }
  ];

  const designSkills = [
    {
      name: "Canva Design",
      level: 90,
      desc: "Interactive layout comps, professional wireframes, slides deck architecture."
    },
    {
      name: "Adobe Photoshop",
      level: 82,
      desc: "High-end asset generation, smart-layer templates, digital image manipulation, mock-ups."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="about-me-section">
      
      {/* breadcrumb title bar helper */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <p className="font-mono text-xs font-bold text-blue-600 tracking-widest uppercase">
            01 / DISCIPLINARY STRENGTH
          </p>
          <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 mt-1">
            About Me & Professional Arsenal
          </h2>
        </div>
        <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200/50 self-start md:self-center">
          CS SCHOLAR • DATA CRITICAL
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LHS: Biography Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-slate-200/60 bg-white p-8 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-display font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
              Biography Summary
            </h3>
            
            <p className="text-sm text-slate-600 leading-relaxed font-sans text-justify">
              I am a highly motivated Computer Science professional passionate about structural algorithms, fullstack development, and deep learning. I specialize in designing streamlined digital answers to complex systems bottlenecks.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed font-sans text-justify">
              Through bridging clean technical code (Python, C, JavaScript) with highly structured systems deployment, I construct software that is beautiful, secure, and user-centric.
            </p>

            {/* Education Highlight sub-panel */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="font-mono text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                EDUCATION HIGHLIGHT
              </span>
              
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-200/50">
                  <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-sm text-slate-900">
                      B.Tech in Artificial Intelligence
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-normal">
                      Focus on AI models, machine learning systems, and data science.
                    </p>
                    <p className="font-mono text-[9px] font-bold text-blue-600 uppercase tracking-wider pt-1">
                      EXPECTED GRADUATION: 2028
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-200/50">
                  <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-sm text-slate-900">
                      Diploma in Computer Engineering
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-normal">
                      Core software fundamentals, systems, and algorithms.
                    </p>
                    <p className="font-mono text-[9px] font-bold text-blue-600 uppercase tracking-wider pt-1">
                      COMPLETED: 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RHS: Skill Matrix Indicators Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-slate-200/60 bg-white p-8 rounded-2xl shadow-sm space-y-6">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                Skill Matrix Indicators
              </h3>
              <p className="font-mono text-[9px] text-slate-400 tracking-wider uppercase mt-1">
                ACCORDING TO PROJECT DEPLOYMENT WEIGHTS & PRODUCTION FLUENCY
              </p>
            </div>

            {/* Programming Category */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Code className="h-4 w-4 text-blue-600" />
                <span className="font-mono text-[10px] font-bold text-slate-700 tracking-widest uppercase">
                  PROGRAMMING & LOGIC
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programmingSkills.map((skill, idx) => (
                  <div key={idx} className="border border-slate-200 bg-white p-4 rounded-xl space-y-2 hover:border-blue-200/60 transition duration-300">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span className="font-sans font-extrabold">{skill.name}</span>
                      <span className="font-mono text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-800 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 font-sans leading-normal">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Web Technologies Category */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileCode className="h-4 w-4 text-emerald-600" />
                <span className="font-mono text-[10px] font-bold text-slate-700 tracking-widest uppercase">
                  WEB SCAFFOLDING & FRAMEWORKS
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {frameworkSkills.map((skill, idx) => (
                  <div key={idx} className="border border-slate-200 bg-white p-4 rounded-xl space-y-2 hover:border-emerald-200/60 transition duration-300">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span className="font-sans font-extrabold">{skill.name}</span>
                      <span className="font-mono text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-800 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 font-sans leading-normal">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Database & Storage Category */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Database className="h-4 w-4 text-sky-600" />
                <span className="font-mono text-[10px] font-bold text-slate-700 tracking-widest uppercase">
                  DATABASE & DATA STORAGE
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {databaseSkills.map((skill, idx) => (
                  <div key={idx} className="border border-slate-200 bg-white p-4 rounded-xl space-y-2 hover:border-sky-200/60 transition duration-300">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span className="font-sans font-extrabold">{skill.name}</span>
                      <span className="font-mono text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-800 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 font-sans leading-normal">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Creative Asset Design Category */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Palette className="h-4 w-4 text-purple-600" />
                <span className="font-mono text-[10px] font-bold text-slate-700 tracking-widest uppercase">
                  CREATIVE ASSET DESIGN
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {designSkills.map((skill, idx) => (
                  <div key={idx} className="border border-slate-200 bg-white p-4 rounded-xl space-y-2 hover:border-purple-200/60 transition duration-300">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span className="font-sans font-extrabold">{skill.name}</span>
                      <span className="font-mono text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-800 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 font-sans leading-normal">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
