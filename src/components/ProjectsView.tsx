import React from "react";
import { Brain, Layers, Gamepad, Github, ExternalLink, Workflow } from "lucide-react";

interface ProjectsViewProps {
  onOpenDemo: (tech: "summarizer" | "detection" | "game-solver") => void;
}

export default function ProjectsView({ onOpenDemo }: ProjectsViewProps) {
  const projects = [
    {
      id: "summarizer",
      category: "NATURAL LANGUAGE PROCESSING",
      title: "Summarize-AI NLP Tool",
      description: "An advanced text analysis system designed to synthesize key conceptual insights and structural theses from complex, high-density documents using intelligent neural architectures.",
      bullets: [
        "Abstractive Summarization",
        "Factual Highlights Extraction",
        "Academic Document Parsing"
      ],
      icon: <Brain className="h-5 w-5 text-[#4f46e5]" />,
      iconBg: "bg-[#e0e7ff] border-[#c7d2fe]",
      categoryColor: "text-[#4f46e5] border-[#c7d2fe] bg-[#f5f3ff]/80",
      githubUrl: "https://github.com/25a35a4305/summarize-AI.git",
      demoUrl: "https://summarize-ai-790131353620.us-west1.run.app/",
      accentBorder: "border-t-[#4f46e5]",
      hoverStyle: "hover:border-[#4f46e5]/45 hover:shadow-[#e0e7ff]/60",
      demoBtnBg: "bg-[#4f46e5] hover:bg-[#4338ca] hover:shadow-md hover:shadow-indigo-100"
    },
    {
      id: "detection",
      category: "COMPUTER VISION & DEEP LEARNING",
      title: "YOLO Object Detection Cockpit",
      description: "A robust computer vision telemetry dashboard utilizing deep convolutional networks (YOLO) to scan, categorize, and track multiple objects within active live surveillance feeds with absolute precision.",
      bullets: [
        "Real-time Object Recognition",
        "Multi-class Telemetry Overlay",
        "Confidence Boundary Adjustment"
      ],
      icon: <Layers className="h-5 w-5 text-[#2563eb]" />,
      iconBg: "bg-[#dbeafe] border-[#bfdbfe]",
      categoryColor: "text-[#2563eb] border-[#bfdbfe] bg-[#eff6ff]/80",
      githubUrl: "https://github.com/25a35a4305/Object-Detection.git",
      demoUrl: "https://visionary-ai-790131353620.us-west1.run.app/",
      accentBorder: "border-t-[#2563eb]",
      hoverStyle: "hover:border-[#2563eb]/45 hover:shadow-[#dbeafe]/60",
      demoBtnBg: "bg-[#2563eb] hover:bg-[#1d4ed8] hover:shadow-md hover:shadow-blue-100"
    },
    {
      id: "game-solver",
      category: "HEURISTIC GAMEPLAY & AUTOMATION",
      title: "Sky_Bird Game with Autonomous Heuristics",
      description: "An interactive browser-based arcade physics platform integrated with a real-time predictive auto-pilot solver that calculates optimal trajectories against incoming obstacles.",
      bullets: [
        "Continuous Physics Simulator",
        "Predictive Solver Autopilot",
        "Interactive Keyboard Interface"
      ],
      icon: <Gamepad className="h-5 w-5 text-[#059669]" />,
      iconBg: "bg-[#d1fae5] border-[#a7f3d0]",
      categoryColor: "text-[#059669] border-[#a7f3d0] bg-[#ecfdf5]/80",
      githubUrl: "https://github.com/25a35a4305/sky_bird.git",
      demoUrl: "https://flappy-bird-clone-790131353620.us-west1.run.app/",
      isHighlighted: true,
      accentBorder: "border-t-[#059669]",
      hoverStyle: "hover:border-[#059669]/65 hover:shadow-[#d1fae5]/60",
      demoBtnBg: "bg-[#059669] hover:bg-[#047857] hover:shadow-md hover:shadow-emerald-100"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in" id="portfolio-projects-matrix">
      
      {/* Upper breadcrumb titles */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-2 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <p className="font-mono text-xs font-bold text-blue-600 tracking-widest uppercase flex items-center gap-1.5">
            <Workflow className="h-3.5 w-3.5 text-blue-600" />
            03 / PRODUCT PORTFOLIO
          </p>
          <h2 className="font-display font-black text-4xl tracking-tight text-slate-900 leading-none">
            Innovative Technical Work
          </h2>
        </div>
        <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-semibold pb-1 hidden md:block">
          PRODUCTION READY PRODUCTS
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-slate-500 font-sans tracking-normal pb-3">
        <p>
          Direct access to production repositories and active live demo endpoints.
        </p>
      </div>

      {/* 3 Columns Responsive Grid matching layout and highlight exactly */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {projects.map((proj) => (
          <div 
            key={proj.id} 
            className={`bg-white rounded-3xl p-7 flex flex-col justify-between transition-all duration-350 border-t-4 ${proj.accentBorder} ${proj.hoverStyle} ${
              proj.isHighlighted 
                ? "border-x-2 border-b-2 border-x-[#059669]/50 border-b-[#059669]/50 shadow-md shadow-emerald-50/60 transform -translate-y-1" 
                : "border-x border-b border-slate-100 hover:border-slate-300/85 shadow-xs"
            }`}
            id={`project-card-${proj.id}`}
          >
            <div className="space-y-5">
              
              {/* Card visual header */}
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-2xl border flex items-center justify-center shadow-3xs ${proj.iconBg}`}>
                  {proj.icon}
                </div>
                <span className={`font-mono text-[9px] font-bold tracking-wider border px-2.5 py-1 rounded-md uppercase leading-none ${proj.categoryColor}`}>
                  {proj.category}
                </span>
              </div>

              {/* Title & description */}
              <div className="space-y-3">
                <h3 className="font-sans font-extrabold text-slate-900 text-xl tracking-tight leading-tight">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans text-justify">
                  {proj.description}
                </p>
              </div>

              {/* Technical features / bullets */}
              <ul className="space-y-2.5 pt-3 border-t border-slate-100">
                {proj.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-xs text-slate-650 flex items-center gap-2 font-sans">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-200 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Bottom Actions buttons */}
            <div className="grid grid-cols-2 gap-3 mt-8 pt-4 border-t border-slate-100 font-mono">
              <a
                href={proj.githubUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-250/80 text-xs font-bold rounded-xl transition duration-155 cursor-pointer shadow-3xs"
              >
                <Github className="h-4 w-4 text-slate-650" />
                GitHub
              </a>

              <a
                href={proj.demoUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 text-white text-xs font-bold rounded-xl transition duration-155 cursor-pointer shadow-xs ${proj.demoBtnBg}`}
              >
                <ExternalLink className="h-4 w-4 text-slate-100" />
                Live Demo
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
