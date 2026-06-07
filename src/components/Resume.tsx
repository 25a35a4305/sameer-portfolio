import React, { useState } from "react";
import { Download, Mail, Phone, MapPin, User, Briefcase, GraduationCap, FolderGit2, Linkedin, Instagram, Github, Zap, Copy, Check, Cpu, Sparkles, Palette } from "lucide-react";

interface ResumeProps {
  onNavigate?: (tab: "home" | "about" | "hobbies" | "projects" | "resume") => void;
}

export default function Resume({ onNavigate }: ResumeProps) {
  const [downloading, setDownloading] = useState(false);
  const [resumeMode, setResumeMode] = useState<"replica" | "recruiter">("replica");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const triggerDownloadSim = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 1000);
  };

  const copyFields = [
    { 
      label: "EMAIL ADDRESS", 
      value: "parveensameer203@gmail.com", 
      icon: <Mail className="h-4 w-4 text-blue-600" />, 
      iconBg: "bg-blue-50 border-blue-100" 
    },
    { 
      label: "CONTACT PHONE NO", 
      value: "+91 9392373349", 
      icon: <Phone className="h-4 w-4 text-blue-600" />, 
      iconBg: "bg-blue-50 border-blue-100" 
    },
    { 
      label: "PRIMARY LOCATION", 
      value: "Pithapuram, AP, India", 
      icon: <MapPin className="h-4 w-4 text-blue-600" />, 
      iconBg: "bg-blue-50 border-blue-100" 
    },
    { 
      label: "LINKEDIN PROFILE", 
      value: "linkedin.com/in/jaffersameer", 
      icon: <Linkedin className="h-4 w-4 text-[#0a66c2]" />, 
      iconBg: "bg-[#e0e7ff]/60 border-[#c7d2fe]/60" 
    },
    { 
      label: "INSTAGRAM HANDLE", 
      value: "@randomcreativity__", 
      icon: <Instagram className="h-4 w-4 text-[#e1306c]" />, 
      iconBg: "bg-[#fdf2f8] border-[#fbcfe8]" 
    },
    { 
      label: "GITHUB PROFILE", 
      value: "github.com/25a35a4305", 
      icon: <Github className="h-4 w-4 text-slate-900" />, 
      iconBg: "bg-slate-100 border-slate-200" 
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="resume-viewport">
      
      {/* Resume upper breadcrumbs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <p className="font-mono text-xs font-bold text-blue-600 tracking-widest uppercase">
            04 / FORMAL RECORD OF ACCOMPLISHMENTS
          </p>
          <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 mt-1">
            Curriculum Vitae / Resume
          </h2>
        </div>
      </div>

      {/* Subheader and mode toggles */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100/60 pb-5">
        <p className="text-xs text-slate-500 font-sans tracking-wide">
          Meticulously reproduced from Mohammad's physical printed credentials.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Tabs Container */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 font-mono text-[11px] font-semibold text-slate-600 animate-pulse">
            <button
              onClick={() => setResumeMode("replica")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                resumeMode === "replica"
                  ? "bg-white text-slate-900 border border-slate-200/50 shadow-2xs font-extrabold"
                  : "hover:text-slate-900"
              }`}
            >
              Paper Replica
            </button>
            <button
              onClick={() => setResumeMode("recruiter")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                resumeMode === "recruiter"
                  ? "bg-white text-slate-900 border border-slate-200/50 shadow-2xs font-extrabold"
                  : "hover:text-slate-900"
              }`}
            >
              Recruiter Hub
            </button>
          </div>

          {/* Action button */}
          <button
            onClick={triggerDownloadSim}
            disabled={downloading}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl shadow-xs border border-slate-200 cursor-pointer transition disabled:opacity-50 font-mono text-[11px]"
          >
            <Download className="h-3.5 w-3.5" />
            {downloading ? "PREPARING..." : "Print or Save PDF"}
          </button>
        </div>
      </div>

      {resumeMode === "replica" ? (
        /* Main formal paper layout with distinctive classic resume timeline */
        <div className="border border-slate-205/80 bg-white rounded-2xl md:p-12 p-6 shadow-sm max-w-4xl mx-auto space-y-10 font-sans animate-fade-in" id="physical-resume-paper">
          
          {/* Top Header - Mohammad Jaffer Sameer */}
          <div className="border-b border-slate-900 pb-6">
            <h1 className="font-display font-black text-3xl md:text-4xl tracking-tight text-slate-900 uppercase">
              Mohammad jaffer Sameer
            </h1>
            <p className="font-mono text-xs text-blue-600 font-bold tracking-widest uppercase mt-1">
              Computer Engineering Student
            </p>
          </div>

          {/* Two-Column Layout mimicking the uploaded resume */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: CONTACT, SKILLS, HOBBIES */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Contact details */}
              <div className="space-y-4">
                <h3 className="font-display font-black text-sm text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-1.5">
                  CONTACT
                </h3>
                <div className="space-y-3 text-xs text-slate-600 font-sans">
                  <a href="tel:9392373349" className="flex items-center gap-2.5 hover:text-blue-600 transition duration-200">
                    <Phone className="h-3.5 w-3.5 text-slate-800 shrink-0" />
                    <span>+91 9392373349</span>
                  </a>
                  <a href="mailto:parveensameer203@gmail.com" className="flex items-center gap-2.5 hover:text-blue-600 transition duration-200 break-all">
                    <Mail className="h-3.5 w-3.5 text-slate-800 shrink-0" />
                    <span>parveensameer203@gmail.com</span>
                  </a>
                  <a href="https://www.linkedin.com/in/jaffersameer" target="_blank" referrerPolicy="no-referrer" className="flex items-center gap-2.5 hover:text-[#0a66c2] transition duration-200 break-all">
                    <Linkedin className="h-3.5 w-3.5 text-[#0a66c2] shrink-0" />
                    <span>linkedin.com/in/jaffersameer</span>
                  </a>
                  <a href="https://www.instagram.com/randomcreativity__" target="_blank" referrerPolicy="no-referrer" className="flex items-center gap-2.5 hover:text-[#e1306c] transition duration-200 break-all">
                    <Instagram className="h-3.5 w-3.5 text-[#e1306c] shrink-0" />
                    <span>instagram.com/randomcreativity__</span>
                  </a>
                  <a href="https://github.com/25a35a4305" target="_blank" referrerPolicy="no-referrer" className="flex items-center gap-2.5 hover:text-slate-900 transition duration-200 break-all">
                    <Github className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    <span>github.com/25a35a4305</span>
                  </a>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-800 shrink-0 mt-0.5" />
                    <span className="leading-normal">12-2-79A velampeta pithapuram</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className="font-display font-black text-sm text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-1.5">
                  SKILLS
                </h3>
                <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-sans list-none">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Programming Languages:</strong> C, Python, JavaScript.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Problem Solving</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Web Development:</strong> HTML, CSS, JavaScript, PHP, Bootstrap.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Creative Thinking</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Team work and motivator</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">stock marketing have an idea</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Content Creation and Design:</strong> Canva, Adobe Photoshop (Photo & Video Editing).
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Database Management:</strong> MySQL.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hobbies & Interests */}
              <div className="space-y-4">
                <h3 className="font-display font-black text-sm text-slate-900 tracking-wider uppercase border-b-2 border-slate-900 pb-1.5">
                  HOBBIES & INTERESTS
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 font-sans list-none">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
                    <span>Video and photo editing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
                    <span>Content writing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
                    <span>Participating in teamwork and leadership activities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
                    <span>Learning new technologies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 shrink-0" />
                    <span>Playing strategy-based games to improve analytical skills</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* RIGHT COLUMN: TIMELINE (SUMMARY, WORK EXPERIENCE, PROJECTS, EDUCATION) */}
            <div className="lg:col-span-8 space-y-8 pl-0 md:pl-2 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              {/* PROFILE SUMMARY BLOCK */}
              <div className="relative pl-12 space-y-2">
                <div className="absolute left-[8px] top-0 h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center border border-white shadow-2xs z-10 shrink-0">
                  <User className="h-3 w-3" />
                </div>
                <h3 className="font-display font-black text-sm text-slate-900 uppercase tracking-widest leading-none pt-1">
                  PROFILE SUMMARY
                </h3>
                <div className="border-b border-slate-100/80 pt-1 pb-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-sans text-justify">
                    Motivated and detail-oriented B.Tech in Artificial Intelligence student (holding a Diploma in Computer Engineering completed in 2025) with a strong foundation in software development and modern AI technologies. Successfully completed a 6-month industrial training in software development and web development, gaining hands-on experience in HTML, CSS, JavaScript, PHP, and MySQL. Adept at content creation and design using Canva and Adobe Photoshop, with a passion for exploring filmmaking, fashion design, and cutting-edge technologies. Strong communication, teamwork, and technical skills, showing a commitment to continuous learning and professional growth.
                  </p>
                </div>
              </div>

              {/* WORK EXPERIENCE BLOCK */}
              <div className="relative pl-12 space-y-3">
                <div className="absolute left-[8px] top-0 h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center border border-white shadow-2xs z-10 shrink-0">
                  <Briefcase className="h-3 w-3" />
                </div>
                <h3 className="font-display font-black text-sm text-slate-900 uppercase tracking-widest leading-none pt-1">
                  WORK EXPERIENCE
                </h3>
                <div className="border-b border-slate-100/80 pt-1 pb-4 space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-sans font-extrabold text-sm text-slate-900">
                      Ava intern
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4 font-sans">
                      <li>Gained hands-on experience in software development and troubleshooting.</li>
                      <li>Worked on web development projects using HTML, CSS, JavaScript, and PHP.</li>
                      <li>Collaborated with the team members for group activities.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PROJECTS BLOCK */}
              <div className="relative pl-12 space-y-3">
                <div className="absolute left-[8px] top-0 h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center border border-white shadow-2xs z-10 shrink-0">
                  <FolderGit2 className="h-3 w-3" />
                </div>
                <h3 className="font-display font-black text-sm text-slate-900 uppercase tracking-widest leading-none pt-1">
                  PROJECTS
                </h3>
                <div className="border-b border-slate-100/80 pt-1 pb-4 space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-sans font-extrabold text-sm text-slate-900">
                      GitHub Repositories & Open Source Contribution
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans text-justify">
                      Open-source utility developments, neural network classification configurations, and modern frontend workspaces. Access all complete, modular source codes and revision histories directly at{" "}
                      <a
                        href="https://github.com/25a35a4305"
                        target="_blank"
                        className="font-bold underline text-slate-950 hover:text-blue-600"
                      >
                        github.com/25a35a4305
                      </a>
                      .
                    </p>
                  </div>

                  {/* Inline project promotion card matching screenshot absolutely */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-pulse">
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-black text-slate-900 font-sans">
                        Portfolio Repositories & Demos
                      </h5>
                      <p className="text-[10.5px] text-slate-500 font-sans">
                        Explore Mohammad's Summarizer tool, Object Detection Cockpit, and Arcade game online!
                      </p>
                    </div>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate("projects")}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition shadow-xs self-start md:self-center cursor-pointer"
                      >
                        Explore Projects
                        <span className="text-[9px]">↗</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* EDUCATION BLOCK */}
              <div className="relative pl-12 space-y-3">
                <div className="absolute left-[8px] top-0 h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center border border-white shadow-2xs z-10 shrink-0">
                  <GraduationCap className="h-3 w-3" />
                </div>
                <h3 className="font-display font-black text-sm text-slate-900 uppercase tracking-widest leading-none pt-1">
                  EDUCATION
                </h3>
                <div className="pt-1 pb-2 space-y-5">
                  
                  {/* Diploma */}
                  <div className="space-y-1 relative pl-3 border-l-2 border-slate-100">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sans font-extrabold text-xs text-slate-900">
                        Diploma in Computer Engineering
                      </h4>
                      <span className="font-mono text-[9px] text-slate-500 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        2025
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Aditya College of Engineering and Technology</p>
                  </div>

                  {/* B.Tech */}
                  <div className="space-y-1 relative pl-3 border-l-2 border-slate-100">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sans font-extrabold text-xs text-slate-900">
                        Bachelor of Technology (B.Tech) in Artificial Intelligence
                      </h4>
                      <span className="font-mono text-[9px] text-slate-500 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        2028
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Pragati Engineering College</p>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* Recruiter Hub View exactly matching the user's second screenshot block */
        <div className="border border-slate-200 bg-white rounded-2xl md:p-10 p-6 shadow-sm max-w-4xl mx-auto space-y-8 font-sans animate-fade-in" id="recruiter-hub-panel">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Quick Copy Panel (md:col-span-6) */}
            <div className="md:col-span-6 space-y-6">
              <div className="flex items-center gap-2 pb-2">
                <Zap className="h-5 w-5 text-amber-500 fill-amber-500 shrink-0" />
                <h3 className="font-display font-black text-base text-slate-900 uppercase tracking-tight">
                  Recruiter Quick Copy Panel
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Save time while sourcing talent. Click any button below to instantly copy details to your clipboard or initiate contact.
              </p>

              {/* Copyable cards */}
              <div className="space-y-3">
                {copyFields.map((field, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border border-slate-150 hover:border-slate-300 rounded-xl transition duration-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-8.5 w-8.5 rounded-lg border flex items-center justify-center shrink-0 shadow-3xs ${field.iconBg}`}>
                        {field.icon}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="font-mono text-[9px] font-bold text-slate-400 tracking-wider uppercase block leading-none">
                          {field.label}
                        </span>
                        <span className="text-xs font-bold text-slate-800 break-all block">
                          {field.value}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(field.value, index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg text-[11px] font-mono font-bold shrink-0 transition duration-150 cursor-pointer"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600 animate-bounce" />
                          <span className="text-emerald-650 font-extrabold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Immediate Recruiting Action (md:col-span-6) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2">
                  <Briefcase className="h-5 w-5 text-amber-950 shrink-0" />
                  <h3 className="font-display font-black text-base text-slate-900 uppercase tracking-tight">
                    Immediate Recruiting Action
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans text-justify">
                  Mohammad is a highly-motivated <strong className="text-slate-900">Computer Engineering candidate</strong> specializing in modern full-stack web architectures, Python solvers, relational database queries, and content workflows.
                </p>

                {/* Availability alert card */}
                <div className="bg-blue-50/50 border border-blue-105 p-5 rounded-2xl space-y-2">
                  <span className="font-mono text-[9px] font-bold text-blue-600 tracking-widest uppercase block">
                    AVAILABILITY ALERT
                  </span>
                  <p className="text-xs text-blue-900 leading-relaxed font-sans text-justify">
                    Actively seeking <strong className="text-blue-950 font-black">Summer Internships</strong>, <strong className="text-blue-950 font-black">Full-Time junior postings</strong>, and collaborative open-source tech contributions.
                  </p>
                </div>
              </div>

              {/* Button link */}
              <div className="pt-4">
                <a
                  href="mailto:parveensameer203@gmail.com?subject=Job%20/%20Interview%20Offer%20for%20Mohammad%20Jaffer%20Sameer&body=Hi%20Mohammad%2C%20We%20saw%20your%20interactive%20portfolio%20and%25your%20credentials%20look%20exceptional.%20Let's%20connect!"
                  className="w-full bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-mono text-[11px] font-bold tracking-wider uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition duration-300 hover:shadow-md text-center shrink-0 cursor-pointer"
                >
                  <Mail className="h-4 w-4 animate-pulse" />
                  SEND JOB / INTERVIEW OFFER
                </a>
              </div>
            </div>

          </div>

          {/* Standout Candidate Highlights / Core Superpowers Section */}
          <div className="border-t border-slate-100 pt-8 mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500 animate-pulse shrink-0" />
              <h4 className="font-display font-black text-sm text-slate-950 uppercase tracking-widest">
                Mohammad's Professional Superpowers
              </h4>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping ml-1" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Highlight 1: AI Focus */}
              <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/25 transition-all duration-300 group cursor-default">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition duration-300 shrink-0">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tight">AI & Tech Focus</span>
                </div>
                <p className="text-[11px] text-slate-505 font-sans leading-relaxed text-justify">
                  Deep immersion in Artificial Intelligence (B.Tech '28), focusing on predictive analytics, object classification, and modern fullstack structures.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold text-blue-600 tracking-wider">
                    COMPUTATIVE MODELS
                  </span>
                  <span className="text-[9px] font-bold bg-blue-50/80 px-1.5 py-0.5 rounded border border-blue-100 text-blue-700">
                    B.Tech '28
                  </span>
                </div>
              </div>

              {/* Highlight 2: Proven Training */}
              <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/25 transition-all duration-300 group cursor-default">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition duration-300 shrink-0">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tight">Industrial Training</span>
                </div>
                <p className="text-[11px] text-slate-550 font-sans leading-relaxed text-justify">
                  Completed a successful, intensive 6-month industrial internship developing clean, modular web apps, asynchronous handlers, and database scaling.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold text-emerald-600 tracking-wider">
                    INTERACTIVE CODING
                  </span>
                  <span className="text-[9px] font-bold bg-emerald-50/80 px-1.5 py-0.5 rounded border border-emerald-100 text-emerald-700">
                    6 Months
                  </span>
                </div>
              </div>

              {/* Highlight 3: Design Craft */}
              <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/25 transition-all duration-300 group cursor-default">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition duration-300 shrink-0">
                    <Palette className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tight">Creative & UI UX</span>
                </div>
                <p className="text-[11px] text-slate-550 font-sans leading-relaxed text-justify">
                  Proficient in Adobe Photoshop and Canva design. Exceptionally capable at developing pixel-perfect layouts, web banners, and video edit workflow.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold text-purple-600 tracking-wider">
                    CANVA + PHOTOSHOP
                  </span>
                  <span className="text-[9px] font-bold bg-purple-50/80 px-1.5 py-0.5 rounded border border-purple-100 text-purple-700">
                    Designer
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
