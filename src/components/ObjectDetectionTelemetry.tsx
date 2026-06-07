import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Settings, Sliders, RefreshCw, Terminal, Eye, AlertTriangle } from "lucide-react";

interface TrackedObject {
  id: number;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  confidence: number;
  color: string;
}

export default function ObjectDetectionTelemetry() {
  const [active, setActive] = useState(true);
  const [streamLayer, setStreamLayer] = useState<"bbox" | "optical" | "edge" | "thermal">("bbox");
  const [pipelineFps, setPipelineFps] = useState<number>(30);
  const [noiseFilter, setNoiseFilter] = useState(true);
  const [activeTargetClass, setActiveTargetClass] = useState<string>("All");
  
  const [logs, setLogs] = useState<string[]>([
    "[10:38:02] PILOT_INIT: Camera sensor thread loaded at 1080p@60fps.",
    "[10:38:02] TELEM_CONN: WebSocket standard telemetry broker established.",
    "[10:38:03] NET_LOAD: Loaded YOLO quantization layers on Edge-VPU core."
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const objectsRef = useRef<TrackedObject[]>([
    { id: 1, label: "Robot Arm", x: 100, y: 120, vx: 1.2, vy: 0.8, width: 70, height: 90, confidence: 0.985, color: "#10b981" },
    { id: 2, label: "Processor IC", x: 280, y: 80, vx: -0.9, vy: 1.1, width: 50, height: 50, confidence: 0.942, color: "#3b82f6" },
    { id: 3, label: "Thermal Valve", x: 200, y: 220, vx: 0.6, vy: -0.7, width: 60, height: 60, confidence: 0.891, color: "#f59e0b" },
    { id: 4, label: "Safety Barrier", x: 50, y: 280, vx: -0.5, vy: -0.4, width: 90, height: 40, confidence: 0.993, color: "#ef4444" }
  ]);

  const frameCountRef = useRef<number>(0);
  const activeTargetClassRef = useRef<string>("All");

  // Keep target class ref updated
  useEffect(() => {
    activeTargetClassRef.current = activeTargetClass;
  }, [activeTargetClass]);

  // Periodic visual telemetry log updater
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const randomLogs = [
        `CV_PIPELINE: Processed frame ${1200 + frameCountRef.current} dynamically. Latency: ${(Math.random() * 4 + 8).toFixed(1)}ms.`,
        `TELEM_CONN: Flushed buffers to websocket pipeline. Outbox: ${Math.floor(Math.random() * 150 + 200)} bytes.`,
        `MODEL: Recalculated tracking velocities over active target matrix.`
      ];
      
      const randomObject = objectsRef.current[Math.floor(Math.random() * objectsRef.current.length)];
      if (Math.random() > 0.5) {
        randomLogs.push(`DETECT: "${randomObject.label}" frame locked at x:${Math.floor(randomObject.x)},y:${Math.floor(randomObject.y)} confidence:${(randomObject.confidence * 100).toFixed(1)}%.`);
      }

      setLogs((prev) => {
        const next = [...prev, ...randomLogs.map(l => `[${new Date().toLocaleTimeString()}] ${l}`)];
        if (next.length > 25) return next.slice(next.length - 25);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [active]);

  // Canvas drawing effect loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      if (active) {
        frameCountRef.current += 1;
        
        // Update physics for simulated tracked objects
        objectsRef.current = objectsRef.current.map((obj) => {
          let nx = obj.x + obj.vx * (30 / pipelineFps);
          let ny = obj.y + obj.vy * (30 / pipelineFps);
          let nvx = obj.vx;
          let nvy = obj.vy;

          // Boundary bounce calculations (VPU simulator scope)
          if (nx < 10 || nx + obj.width > canvas.width - 10) {
            nvx = -nvx;
            nx = Math.max(10, Math.min(nx, canvas.width - obj.width - 10));
          }
          if (ny < 10 || ny + obj.height > canvas.height - 10) {
            nvy = -nvy;
            ny = Math.max(10, Math.min(ny, canvas.height - obj.height - 10));
          }

          // Slightly fluctuate confidence
          const nConf = Math.max(0.7, Math.min(0.99, obj.confidence + (Math.random() * 0.02 - 0.01)));

          return { ...obj, x: nx, y: ny, vx: nvx, vy: nvy, confidence: nConf };
        });
      }

      // Clear with VPU dark background
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw mathematical target coordinates grid lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw thermal contrast heat points or general edge noise if requested
      if (streamLayer === "thermal") {
        ctx.shadowBlur = 40;
        objectsRef.current.forEach(obj => {
          if (activeTargetClassRef.current !== "All" && obj.label !== activeTargetClassRef.current) return;
          const gradient = ctx.createRadialGradient(
            obj.x + obj.width / 2, obj.y + obj.height / 2, 5,
            obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width * 1.5
          );
          gradient.addColorStop(0, "rgba(239, 68, 68, 0.3)");
          gradient.addColorStop(0.4, "rgba(245, 158, 11, 0.15)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width * 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
      }

      if (streamLayer === "edge") {
        ctx.strokeStyle = "rgba(14, 165, 233, 0.2)";
        ctx.lineWidth = 1.5;
        objectsRef.current.forEach(obj => {
          if (activeTargetClassRef.current !== "All" && obj.label !== activeTargetClassRef.current) return;
          ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
          // Draw horizontal scanline
          const scanY = obj.y + (Math.sin(frameCountRef.current / 10) * obj.height / 2) + (obj.height / 2);
          ctx.beginPath();
          ctx.moveTo(obj.x, scanY);
          ctx.lineTo(obj.x + obj.width, scanY);
          ctx.stroke();
        });
      }

      // Draw simulated camera static scanlines / camera noise
      if (noiseFilter) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.012)";
        for (let i = 0; i < 4; i++) {
          const blockY = Math.floor(Math.random() * canvas.height);
          ctx.fillRect(0, blockY, canvas.width, Math.random() * 2 + 1);
        }
      }

      // Draw tracked objects
      objectsRef.current.forEach((obj) => {
        // Class filter
        if (activeTargetClassRef.current !== "All" && obj.label !== activeTargetClassRef.current) {
          return;
        }

        const color = obj.color;

        if (streamLayer === "bbox" || streamLayer === "thermal") {
          // Drawing bounding boxes
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

          // Draw minimalist corner bracket highlights
          ctx.fillStyle = color;
          const len = 10;
          // Top Left
          ctx.fillRect(obj.x - 2, obj.y - 2, len, 3);
          ctx.fillRect(obj.x - 2, obj.y - 2, 3, len);
          // Top Right
          ctx.fillRect(obj.x + obj.width - len + 2, obj.y - 2, len, 3);
          ctx.fillRect(obj.x + obj.width - 1, obj.y - 2, 3, len);
          // Bottom Left
          ctx.fillRect(obj.x - 2, obj.y + obj.height - 1, len, 3);
          ctx.fillRect(obj.x - 2, obj.y + obj.height - len + 2, 3, len);
          // Bottom Right
          ctx.fillRect(obj.x + obj.width - len + 2, obj.y + obj.height - 1, len, 3);
          ctx.fillRect(obj.x + obj.width - 1, obj.y + obj.height - len + 2, 3, len);

          // Draw Bounding box header label background
          ctx.fillStyle = "rgba(2, 6, 23, 0.85)";
          ctx.fillRect(obj.x - 2, obj.y - 18, obj.width + 4, 18);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.strokeRect(obj.x - 2, obj.y - 18, obj.width + 4, 18);

          // Bounding box labels (Conf)
          ctx.fillStyle = "#ffffff";
          ctx.font = '8px "JetBrains Mono"';
          ctx.fillText(`${obj.label} ${(obj.confidence * 100).toFixed(1)}%`, obj.x + 4, obj.y - 6);
        }

        if (streamLayer === "optical") {
          // Draw standard optical vector lines representing speed layers
          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 1.5;
          const centerX = obj.x + obj.width / 2;
          const centerY = obj.y + obj.height / 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + obj.vx * 25, centerY + obj.vy * 25);
          ctx.stroke();

          // Vector peak dot
          ctx.fillStyle = "#e0a7ff";
          ctx.beginPath();
          ctx.arc(centerX + obj.vx * 25, centerY + obj.vy * 25, 3, 0, Math.PI * 2);
          ctx.fill();

          // Circle indicator
          ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.font = '7px "JetBrains Mono"';
          ctx.fillText(`F_VEC [dx:${(obj.vx).toFixed(2)},dy:${(obj.vy).toFixed(2)}]`, obj.x, obj.y - 4);
        }
      });

      // Target center screen sights
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      // Horizontal centerline
      ctx.moveTo(canvas.width / 2 - 40, canvas.height / 2);
      ctx.lineTo(canvas.width / 2 + 40, canvas.height / 2);
      // Vertical centerline
      ctx.moveTo(canvas.width / 2, canvas.height / 2 - 40);
      ctx.lineTo(canvas.width / 2, canvas.height / 2 + 40);
      ctx.stroke();

      // Trigger frame request
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [active, streamLayer, pipelineFps, noiseFilter]);

  const clearTerminalLogs = () => {
    setLogs([`[${new Date().toLocaleTimeString()}] terminal index logs cleared.`]);
  };

  return (
    <div className="space-y-6">
      {/* Description Panel */}
      <div className="border border-slate-900 bg-slate-950 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono text-blue-400 font-semibold mb-1 flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            VPU Bounding Box Bounded Telemetry Wrapper
          </h3>
          <p className="text-slate-400 text-xs font-sans">
            Simulates a real-time smart hardware observation matrix that compiles motion coordinate frames, lens focus fields, and confidence parameters.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
            Platform: WebGL/Canvas
          </span>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-1 rounded border border-slate-800 flex items-center gap-1">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-red-500"}`} />
            CV_ENGINE: {active ? "ACTIVE" : "STANDBY"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border border-slate-900 bg-slate-950 p-5 rounded-lg space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              Capture Pipeline Controls
            </h4>

            {/* Toggle Engine */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActive(!active)}
                className={`flex-1 shrink-0 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-mono font-semibold transition ${
                  active 
                    ? "bg-amber-950/40 hover:bg-amber-950/60 text-amber-500 border border-amber-500/20" 
                    : "bg-emerald-600 hover:bg-emerald-500 text-slate-950"
                }`}
              >
                {active ? (
                  <>
                    <Square className="h-3 w-3 fill-current" />
                    HALT CV PIPELINE
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 fill-current" />
                    START CV PIPELINE
                  </>
                )}
              </button>
            </div>

            {/* Selector Stream Layer */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400">Stream Telemetry Layer</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                {(["bbox", "optical", "edge", "thermal"] as const).map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setStreamLayer(layer)}
                    className={`py-1.5 px-2 rounded font-mono text-[10px] text-center border transition ${
                      streamLayer === layer 
                        ? "bg-slate-900 text-white border-blue-500/50" 
                        : "bg-slate-950 text-slate-500 border-slate-900 hover:text-slate-350"
                    }`}
                  >
                    {layer === "bbox" ? "Class BBoxes" : layer === "optical" ? "Optical Flow" : layer === "edge" ? "Edge Outline" : "Thermal Infra"}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Variable FPS */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>Pipeline Refresh Target</span>
                <span className="text-blue-400">{pipelineFps} FPS / Hz</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={pipelineFps}
                onChange={(e) => setPipelineFps(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[8px] font-mono text-slate-650">
                <span>5 FPS (Heavy Compute)</span>
                <span>60 FPS (True stream)</span>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-900">
              <span className="text-[11px] font-mono text-slate-400">Noise Distortion Overlay</span>
              <button
                onClick={() => setNoiseFilter(!noiseFilter)}
                className={`py-0.5 px-2 rounded-full font-mono text-[9px] border transition ${
                  noiseFilter 
                    ? "bg-slate-900 text-emerald-400 border-emerald-500/20" 
                    : "bg-slate-950 text-slate-505 border-slate-900"
                }`}
              >
                {noiseFilter ? "ON" : "OFF"}
              </button>
            </div>

            {/* Class filtering */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400">Target Segment Filter</label>
              <div className="flex flex-wrap gap-1">
                {["All", "Robot Arm", "Processor IC", "Thermal Valve", "Safety Barrier"].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setActiveTargetClass(cls)}
                    className={`py-0.5 px-1.5 rounded text-[9px] font-mono transition ${
                      activeTargetClass === cls
                        ? "bg-slate-900 text-white border border-slate-800"
                        : "text-slate-500 hover:text-slate-350"
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Live Stream Screen (LHS/Center) & Diagnosis (RHS) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Stream Canvas */}
          <div className="md:col-span-7 bg-slate-950 border border-slate-900 p-3 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className={`inline-block h-2 w-2 rounded-full ${active ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                REAL_TIME_STREAM_PORT_3
              </span>
              <span>1080P_SIM</span>
            </div>
            
            {/* Aspect box container */}
            <div className="border border-slate-900 p-0.5 bg-slate-950 rounded-md overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={360}
                height={320}
                className="w-full max-w-[360px] aspect-square block bg-slate-950"
              />
            </div>
          </div>

          {/* Scrolling Log Terminal */}
          <div className="md:col-span-5 bg-slate-950 border border-slate-900 rounded-lg p-3 flex flex-col justify-between h-full min-h-[380px]">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Terminal className="h-3.5 w-3.5 text-blue-500" />
                Raw Telemetry Logs
              </span>
              <button
                onClick={clearTerminalLogs}
                className="text-[9px] hover:text-emerald-400 text-slate-600 font-mono"
              >
                Clear
              </button>
            </div>

            {/* Scrollable monospaced log text list */}
            <div className="flex-1 overflow-y-auto font-mono text-[9px] text-slate-400 space-y-1.5 max-h-[300px] scrollbar-thin select-none">
              {logs.map((log, index) => (
                <div key={index} className="leading-normal hover:bg-slate-900/30 px-1 rounded transition">
                  <span className="text-emerald-500/80">{log.substring(0, 10)}</span>
                  <span className="text-slate-300">{log.substring(10)}</span>
                </div>
              ))}
            </div>

            {/* Status footer inside logs container */}
            <div className="mt-2 pt-2 border-t border-slate-900 font-mono text-[9px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                SYS_UP_STEADY
              </span>
              <span>BUF_LEN: 0x0A4</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
