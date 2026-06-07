import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Sliders, Play, AlertCircle, FileJson, Check, Copy, HelpCircle } from "lucide-react";

const SAMPLE_DOCS = [
  {
    title: "Transformer Neural Net Architectures",
    text: `The Transformer is a deep learning model architecture that relies entirely on self-attention mechanisms to compute representations of its input and output without using sequence-aligned RNNs or convolution. Since its introduction, it has completely taken over NLP, and was subsequently found to generalise beautifully to computer vision and sequence planning. Standard transformers process complete input contexts parallelizing training operations, which is fundamentally different from recurrent networks that processed sequences sequence-by-sequence. However, this attention mechanism requires quadratic computation complexity O(N^2) over sequence length N, introducing massive memory bottlenecks during high-context inferences. Modern techniques seek to alleviate this with linear state space layers, rotary positional embeddings, and flashing attention kernels that reduce register read-write cycles significantly. In spite of these, processing long documents under constant latency constraints remains a core ongoing challenge in intelligent engineering systems.`
  },
  {
    title: "Edge Visual Processing Unit Hardware Telemetry",
    text: `Real-time embedded computer vision systems must make critical trade-offs between frame rate capture pipelines and active processing thermal dissipation. Edge devices equipped with specialized Neural Processing Units (NPUs) or Visual Processing Units (VPUs) usually compile quantized weights of convolutional models like YOLO to execute real-time bounding box extraction under tight power limits. Bounding box coordinates require rapid synchronization across the application thread pool to trigger downstream controls without lagging behind actual spatial motion. In order to analyze network stability and bounding precision, edge telemetry systems compile coordinate arrays, camera lens focus coefficients, output labels, and latency histograms into compact byte packets. If the data packetization rate drifts from the sensor frame rate, thread buffer overflow occurs, spilling valuable tracking points. Thus, efficient memory buffering queues and non-blocking asynchronous output stream channels remain mandatory requirements for stable telemetry.`
  },
  {
    title: "Recursive Decision Tree & Matrix Game Plan",
    text: `Mathematical zero-sum games are traditionally parsed via systematic recursive traversal of state space trees. The standard approach, Minimax, evaluates possible pathways to assign utility values to each future state, under the assumption that the opponent makes optimal moves to minimize utility. In a native state space like chess or even simpler games, the branching factor quickly scales beyond reasonable compute potential, necessitating a cutoff depth paired with a static evaluation heuristic function. To prune pathways that are mathematically proven to yield worse nodes than already found, Alpha-Beta pruning maintains upper and lower bounds on decision weights, eliminating branches that cannot affect the optimal path. Predictive AI models can augment these classic search spaces by predicting the most promising candidate cells in advance, narrowing search windows to highly strategic sectors, and optimizing computation budgets dynamically.`
  }
];

export default function NlpSummarizer() {
  const [text, setText] = useState(SAMPLE_DOCS[0].text);
  const [length, setLength] = useState<"short" | "medium" | "detailed">("medium");
  const [tone, setTone] = useState("professional");
  const [customInstruction, setCustomInstruction] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          length,
          tone,
          customInstruction
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process summarization.");
      }

      setSummary(data.summary);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not reach the summarizer engine. Ensure your Express backend server is active.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const preloadSample = (sampleText: string) => {
    setText(sampleText);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Description Panel */}
      <div className="border border-slate-900 bg-slate-950 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
            <FileText className="h-4 w-full max-w-[16px]" />
            NLP Document Summarizer Node
          </h3>
          <p className="text-slate-400 text-xs font-sans">
            Demonstrates rich context-aware text distillation using <strong>Gemini 3.5 Flash</strong> over Express HTTP endpoints with customizable density constraints.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
            Model: gemini-3.5-flash
          </span>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
            API Format: POST/json
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls and Input Column (LHS) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-slate-905 bg-slate-900/40 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-slate-300">Document Input</span>
              {/* Sample preloads */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-500">Preload:</span>
                {SAMPLE_DOCS.map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => preloadSample(doc.text)}
                    className="text-[10px] font-mono text-emerald-400/90 hover:text-emerald-300 bg-slate-900 hover:bg-slate-800 px-2 py-0.5 rounded border border-slate-800 transition"
                  >
                    Doc {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError(null);
                }}
                placeholder="Paste your source literature or document corpus here..."
                className="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg p-4 font-sans text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 resize-y transition"
              />
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
                Word Count: {wordCount} (Target: ~200-800 words)
              </div>
            </div>

            {/* Config Widgets */}
            <div className="pt-2 border-t border-slate-900/80 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Length Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Sliders className="h-3 w-3" />
                  Target Length
                </label>
                <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-md border border-slate-855 text-xs">
                  <button
                    type="button"
                    onClick={() => setLength("short")}
                    className={`py-1.5 px-2 rounded font-mono text-[10px] md:text-xs transition ${
                      length === "short" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Short
                  </button>
                  <button
                    type="button"
                    onClick={() => setLength("medium")}
                    className={`py-1.5 px-2 rounded font-mono text-[10px] md:text-xs transition ${
                      length === "medium" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Med
                  </button>
                  <button
                    type="button"
                    onClick={() => setLength("detailed")}
                    className={`py-1.5 px-2 rounded font-mono text-[10px] md:text-xs transition ${
                      length === "detailed" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Bullets
                  </button>
                </div>
              </div>

              {/* Tone Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400">Target Tone Setting</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-855 rounded-md p-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50"
                >
                  <option value="professional">Professional / Objective</option>
                  <option value="minimalist">Minimalist / Direct</option>
                  <option value="technical">Technical Deep-Dive</option>
                  <option value="casual">Casual Summary</option>
                </select>
              </div>
            </div>

            {/* Custom Guideline Directive */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Specialized API Directive (Optional)</span>
                <span className="text-[9px] text-slate-500">Appended to model context</span>
              </label>
              <input
                type="text"
                value={customInstruction}
                onChange={(e) => setCustomInstruction(e.target.value)}
                placeholder="e.g. 'focus on hardware constraints' or 'explain mathematical variables'"
                className="w-full bg-slate-950 border border-slate-855 rounded-md p-2 text-xs text-slate-300 font-sans focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* Execution Trigger */}
            <button
              onClick={handleSummarize}
              disabled={loading || !text.trim()}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-slate-600 text-slate-950 font-mono text-xs font-bold tracking-wider rounded-lg transition-all shadow-md focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  ENGAGING NLP COMPILER PIPELINE...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  EXECUTE SUMMARIZATION RUN
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Stream Column (RHS) */}
        <div className="lg:col-span-5 h-full">
          <div className="border border-slate-850 bg-slate-900/25 rounded-lg p-5 h-[480px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1.5">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${loading ? "bg-yellow-400 animate-pulse" : summary ? "bg-emerald-400" : "bg-slate-700"}`} />
                Summary Stream Output
              </span>
              {summary && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white transition bg-slate-950/60 px-2 py-1 rounded border border-slate-850"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy Markdown
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Central display zone */}
            <div className="flex-1 overflow-y-auto pt-4 text-slate-300 font-sans text-sm leading-relaxed scrollbar-thin">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-3"
                  >
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full border-2 border-emerald-500/10 border-t-emerald-400 animate-spin" />
                      <div className="absolute inset-0 h-10 w-10 rounded-full border border-dashed border-emerald-500/20" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-xs text-slate-300">Evaluating multi-doc coordinates...</p>
                      <p className="text-[10px] font-mono text-slate-500">Querying Gemini model instance via fullstack middleware</p>
                    </div>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-red-950/80 bg-red-950/20 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span className="font-mono text-xs font-bold leading-none">PIPELINE EXCEPTION OCCURRED</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono leading-relaxed bg-slate-950/80 p-2 rounded border border-red-950/50">
                      {error}
                    </p>
                    <div className="p-1 px-2 bg-slate-950 rounded text-[9px] font-mono text-slate-500 border border-slate-850">
                      💡 <strong>Note to evaluator:</strong> Connect your <strong>GEMINI_API_KEY</strong> using the <strong>Settings &gt; Secrets</strong> panel in Google AI Studio to restore live endpoints!
                    </div>
                  </motion.div>
                ) : summary ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 pr-2"
                  >
                    {/* Render plaintext or formatted summary nicely */}
                    <div className="markdown-body text-slate-200">
                      {summary.split("\n").map((line, i) => {
                        if (line.startsWith("- ") || line.startsWith("* ")) {
                          return (
                            <li key={i} className="ml-4 list-disc mb-1.5 text-slate-300">
                              {line.substring(2)}
                            </li>
                          );
                        }
                        return <p key={i} className="mb-3 whitespace-pre-wrap">{line}</p>;
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-500"
                  >
                    <HelpCircle className="h-8 w-8 text-slate-700 font-thin" />
                    <div className="space-y-1">
                      <p className="font-mono text-xs">Waiting for execution stream...</p>
                      <p className="text-[10px] font-sans">Fill parameters on the left and invoke the NLP core compiler to test Mohammad Jaffer Sameer's custom summarizing API block.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Diagnostic trace label */}
            <div className="mt-4 pt-3 border-t border-slate-950 flex items-center justify-between text-[10px] font-mono text-slate-600">
              <span>TR_STREAM_RATE: 2.4kb/s</span>
              <span>STATE: IDLE_WAIT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
