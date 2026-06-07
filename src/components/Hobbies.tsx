import React, { useState } from "react";
import { Gamepad, Radio, PenTool, Video, X, ShieldAlert } from "lucide-react";

export default function Hobbies() {
  const [activeSpec, setActiveSpec] = useState<{ title: string; bullets: string[] } | null>(null);

  const list = [
    {
      id: "media",
      icon: <Gamepad className="h-5 w-5 text-slate-800" />,
      category: "INTERACTIVE MEDIA",
      title: "Video Games & Escapism",
      desc: "Analyzing competitive design and immersive mechanical loops.",
      specs: [
        "Competitive framing logic analytics",
        "Spatial audio immersion metrics",
        "Mechanic hierarchy profiling",
        "High-fidelity hardware optimization"
      ]
    },
    {
      id: "content",
      icon: <Radio className="h-5 w-5 text-slate-800" />,
      category: "EDUCATIONAL LOGS & NARRATIVES",
      title: "Content Creation",
      desc: "Drafting high-clarity technical explanations and graphics.",
      selectedState: true, // Show the thick custom border shown in photo 3
      specs: [
        "Advanced engineering diagnostics guides",
        "Symmetric algorithmic visualization",
        "LLMs prompt pipeline workflows",
        "Technical systems illustration"
      ]
    },
    {
      id: "editing",
      icon: <PenTool className="h-5 w-5 text-slate-800" />,
      category: "VISUAL POST-PRODUCTION",
      title: "Photo & Video Editing",
      desc: "Assembling smart templates and multi-track graphic timelines.",
      specs: [
        "Color LUT grading matrices",
        "Multi-track non-linear compilation",
        "High-contrast vectors mastering",
        "Dynamic scene transition triggers"
      ]
    },
    {
      id: "tech",
      icon: <Video className="h-5 w-5 text-slate-800" />,
      category: "R&D SANDBOX",
      title: "Exploring Technologies",
      desc: "Auditing generative tools, browser frameworks and smart system APIs.",
      specs: [
        "Local inference tests using LLMs",
        "H5 canvas coordinate mappings",
        "Edge-computing device interfaces",
        "Next-generation WebGL telemetry buffers"
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in" id="hobbies-viewport">
      
      {/* Hobbies Breadcrumb row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <p className="font-mono text-xs font-bold text-blue-600 tracking-widest uppercase">
            02 / DIVERSE PERSPECTIVES & INTERESTS
          </p>
          <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 mt-1">
            Hobbies & Creative Sandboxes
          </h2>
        </div>
        <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200/50 self-start md:self-center">
          RECREATIONAL FOCUS • GRAPHICS & AUDIOS
        </div>
      </div>

      {/* Grid structure matching the photo 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {list.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`relative bg-white border rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group cursor-pointer ${
                item.selectedState 
                  ? "border-slate-800 border-b-[6px] shadow-sm" 
                  : "border-slate-200/80"
              }`}
              onClick={() => setActiveSpec({ title: item.title, bullets: item.specs })}
            >
              <div className="space-y-6">
                
                {/* Icons row with Right label */}
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 bg-slate-100 border border-slate-200/40 rounded-xl flex items-center justify-center shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Main titles */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-slate-900 mt-2 block group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>

              {/* Action indicators at bottom */}
              <div className="flex items-center justify-between border-t border-slate-100 mt-8 pt-4">
                <span className="font-mono text-[10px] font-extrabold tracking-wide text-slate-500 uppercase flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                  INSPECT INTEREST SPECS <span className="transition-transform group-hover:translate-x-1 duration-300">➔</span>
                </span>
                <span className="font-mono text-[8.5px] text-slate-300 font-bold uppercase">
                  IDX: 00{idx + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Spectrometer detail overlay modal */}
      {activeSpec && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[100] animate-fade-in" id="hobby-modal-container">
          <div className="bg-white border border-slate-850 rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4 relative">
            <button 
              onClick={() => setActiveSpec(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-2">
              <span className="font-mono text-[10px] text-blue-600 font-bold tracking-widest uppercase block">
                INTEREST EXPLORER
              </span>
              <h3 className="font-display font-bold text-lg text-slate-900">
                {activeSpec.title}
              </h3>
            </div>

            <ul className="space-y-2 pt-2 border-t border-slate-100">
              {activeSpec.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-650">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActiveSpec(null)}
              className="w-full bg-slate-900 text-white rounded-xl py-2.5 text-xs font-mono font-bold hover:bg-slate-800 transition"
            >
              CLOSE SPECIFICATIONS
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
