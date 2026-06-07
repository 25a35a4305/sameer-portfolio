import React, { useState, useEffect } from "react";
import { PlayCircle, RefreshCw, Layers, BrainCircuit, History, CheckCircle2, ChevronRight } from "lucide-react";

type BoardState = ("X" | "O" | "")[];

interface MoveLog {
  turn: number;
  player: "X" | "O";
  index: number;
  searchedNodes: number;
  timeSec: number;
}

export default function PredictiveGameSolver() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(""));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // O is Player, X is Minimax AI
  const [lookaheadDepth, setLookaheadDepth] = useState(6);
  const [winner, setWinner] = useState<"X" | "O" | "Draw" | null>(null);
  const [moveLogs, setMoveLogs] = useState<MoveLog[]>([]);
  const [evalLog, setEvalLog] = useState<string>("ENGINE_IDLE: Select a cell to initialize forward search matrices.");
  const [gridWeights, setGridWeights] = useState<number[]>(Array(9).fill(0));

  // Check board winner Helper
  const checkWinner = (b: BoardState): "X" | "O" | "Draw" | null => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (b[a] && b[a] === b[b] && b[a] === b[c]) {
        return b[a] as "X" | "O";
      }
    }
    if (b.every((cell) => cell !== "")) return "Draw";
    return null;
  };

  // Minimax recursive search engine
  const minimax = (
    b: BoardState,
    depth: number,
    isMax: boolean,
    maxDepth: number,
    counter: { nodes: number }
  ): number => {
    counter.nodes += 1;
    const scoreState = checkWinner(b);
    if (scoreState === "X") return 10 - depth; // AI Wins (maximize)
    if (scoreState === "O") return depth - 10; // Human Wins (minimize)
    if (scoreState === "Draw" || depth >= maxDepth) return 0;

    if (isMax) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (b[i] === "") {
          b[i] = "X";
          best = Math.max(best, minimax(b, depth + 1, false, maxDepth, counter));
          b[i] = "";
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (b[i] === "") {
          b[i] = "O";
          best = Math.min(best, minimax(b, depth + 1, true, maxDepth, counter));
          b[i] = "";
        }
      }
      return best;
    }
  };

  // Recalculate grid predictive cell weights for display overlay
  const calculateHeuristicCellWeights = (currentBoard: BoardState) => {
    const weights = Array(9).fill(0);
    // If game ended, weights are zeroed
    if (checkWinner(currentBoard)) {
      setGridWeights(weights);
      return;
    }

    // For every empty space, evaluate what doing high-priority recursive Minimax looks like
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === "") {
        const testBoard = [...currentBoard];
        testBoard[i] = "X"; // Perform test AI move
        const counter = { nodes: 0 };
        // Obtain minimax weight
        weights[i] = minimax(testBoard, 0, false, lookaheadDepth, counter);
      }
    }
    setGridWeights(weights);
  };

  // Run grid updates whenever lookahead or board shifts
  useEffect(() => {
    calculateHeuristicCellWeights(board);
  }, [board, lookaheadDepth]);

  // Execute AI optimal move
  const triggerAiTurn = (currentBoard: BoardState) => {
    const endState = checkWinner(currentBoard);
    if (endState) {
      setWinner(endState);
      return;
    }

    const start = performance.now();
    const counter = { nodes: 0 };
    let bestVal = -Infinity;
    let bestMove = -1;

    // Search empty cells on current board context
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === "") {
        const testBoard = [...currentBoard];
        testBoard[i] = "X";
        const val = minimax(testBoard, 0, false, lookaheadDepth, counter);
        if (val > bestVal) {
          bestVal = val;
          bestMove = i;
        }
      }
    }

    const duration = (performance.now() - start) / 1000;

    if (bestMove !== -1) {
      const updatedBoard = [...currentBoard];
      updatedBoard[bestMove] = "X";
      setBoard(updatedBoard);

      const logsIndex = moveLogs.length + 1;
      setMoveLogs((prev) => [
        ...prev,
        {
          turn: logsIndex,
          player: "X",
          index: bestMove,
          searchedNodes: counter.nodes,
          timeSec: parseFloat(duration.toFixed(4)),
        },
      ]);

      setEvalLog(
        `AIPLAY: Cell ${bestMove} flagged. Utility weight: ${bestVal}. Calculated ${counter.nodes} potential subtrees in ${(duration * 1000).toFixed(2)}ms.`
      );

      const nextEndState = checkWinner(updatedBoard);
      if (nextEndState) {
        setWinner(nextEndState);
      } else {
        setIsPlayerTurn(true);
      }
    }
  };

  // Human player choice trigger
  const makePlayerMove = (index: number) => {
    if (!isPlayerTurn || board[index] !== "" || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = "O";
    setBoard(updatedBoard);

    const logsIndex = moveLogs.length + 1;
    setMoveLogs((prev) => [
      ...prev,
      {
        turn: logsIndex,
        player: "O",
        index,
        searchedNodes: 0,
        timeSec: 0,
      },
    ]);

    setEvalLog(`PLAYER: Selected Cell ${index}. Transitioning to recursive Minimax AI evaluation.`);

    const endState = checkWinner(updatedBoard);
    if (endState) {
      setWinner(endState);
    } else {
      setIsPlayerTurn(false);
      // AI triggers after brief planning latency simulation
      setTimeout(() => {
        triggerAiTurn(updatedBoard);
      }, 500);
    }
  };

  // Reset solver session
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsPlayerTurn(true);
    setWinner(null);
    setMoveLogs([]);
    setEvalLog("ENGINE_RESET: Board flushed. Standard first-hand human ('O') advantage.");
    setGridWeights(Array(9).fill(0));
  };

  // AI advantage progress scale formulation
  // GridWeights can accumulate weight indicators. Average heuristic values
  const aiAdvantagePercentage = () => {
    if (winner === "X") return 100;
    if (winner === "O") return 0;
    if (winner === "Draw") return 50;

    // Standard baseline calculation: lookup highest weight value
    const maxVal = Math.max(...gridWeights);
    const minVal = Math.min(...gridWeights);
    
    // Compute sliding ratio based on best paths
    if (maxVal === 0 && minVal === 0) return 50;
    if (maxVal > 0) return 50 + (maxVal / 10) * 45;
    if (minVal < 0) return 50 - (Math.abs(minVal) / 10) * 45;
    return 50;
  };

  const advRatio = aiAdvantagePercentage();

  return (
    <div className="space-y-6">
      {/* Description Panel */}
      <div className="border border-slate-900 bg-slate-950 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono text-amber-500 font-semibold mb-1 flex items-center gap-1.5">
            <Layers className="h-4 w-4" />
            Decision Heuristics Game Solver Node
          </h3>
          <p className="text-slate-400 text-xs font-sans">
            Demonstrates <strong>recursive Minimax lookahead game solvers</strong> with full state evaluation weights and interactive lookahead tree mapping diagnostics.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
            Strategy: Depth Pruned Minimax
          </span>
          <button
            onClick={resetGame}
            className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 bg-slate-900/90 hover:bg-slate-800 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            Reset State Space
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Playable Matrix Board (LHS) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="border border-slate-900 bg-slate-900/10 p-6 rounded-lg space-y-6">
            
            {/* Advantage Slider Scale Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Human Advantage (O)</span>
                <span className="text-amber-500 font-bold">Predictive Balance Index</span>
                <span>AI Solver Advantage (X)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded border border-slate-900 overflow-hidden flex relative">
                <div 
                  className="h-full bg-blue-500/20 transition-all duration-300 border-r border-slate-800" 
                  style={{ width: `${100 - advRatio}%` }} 
                />
                <div 
                  className="h-full bg-emerald-500/20 transition-all duration-300" 
                  style={{ width: `${advRatio}%` }} 
                />
                {/* Center marker */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700" title="Neutral parity" />
                
                {/* Score text */}
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] tracking-widest text-slate-400 font-bold pointer-events-none">
                  AI PROB: {advRatio.toFixed(0)}% WIN_PATH
                </div>
              </div>
            </div>

            {/* Core Game Board Matrix Grid */}
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
                {board.map((cell, idx) => {
                  const weight = gridWeights[idx];
                  const hasValue = cell !== "";

                  // Select overlay color based on predictive minimax cell evaluations
                  let overlayClass = "text-slate-600";
                  if (weight > 0) overlayClass = "text-emerald-400";
                  if (weight < 0) overlayClass = "text-red-400";

                  return (
                    <button
                      key={idx}
                      onClick={() => makePlayerMove(idx)}
                      disabled={hasValue || !!winner}
                      className="aspect-square relative flex flex-col items-center justify-center bg-slate-950 border border-slate-850 rounded-lg hover:border-amber-500/40 focus:outline-none transition-all group disabled:hover:border-slate-850"
                    >
                      {/* Interactive heuristic scores map overlays */}
                      {!hasValue && !winner && (
                        <span className={`absolute top-1.5 right-2 font-mono text-[8px] font-bold opacity-45 group-hover:opacity-100 transition ${overlayClass}`}>
                          {weight > 0 ? `+${weight}` : weight}
                        </span>
                      )}

                      {/* Display index tag */}
                      <span className="absolute bottom-1.5 left-2 font-mono text-[7px] text-slate-700">
                        P_0{idx}
                      </span>

                      {/* Cell Value */}
                      {cell === "X" ? (
                        <span className="text-3xl font-mono font-extrabold text-emerald-400 animate-scale">
                          X
                        </span>
                      ) : cell === "O" ? (
                        <span className="text-3xl font-sans font-black text-amber-500 animate-scale">
                          O
                        </span>
                      ) : (
                        // Micro placeholder grid value hint inside empty cells
                        <span className="text-[9px] font-mono text-slate-800 opacity-20 group-hover:opacity-40 transition">
                          E_VAL
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Winner banner overlay */}
            {winner && (
              <div className="p-4 rounded-md border border-amber-500/30 bg-amber-500/5 text-center space-y-2 animate-pulse">
                <span className="font-mono text-xs font-bold uppercase text-amber-400 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400" />
                  BOARD RESOLVED SUTIE
                </span>
                <p className="text-slate-300 font-sans text-xs">
                  {winner === "Draw" ? (
                    "Game matched to complete parity (Draw node). Symmetric strategy verified."
                  ) : (
                    <span>Decision node captured by <strong>{winner === "O" ? "Human Player (O" : "AI Minimax Solver (X"}</strong>).</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tree Search Controls & Decision Timeline Logging (RHS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-slate-900 bg-slate-950 p-5 rounded-lg space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
              <BrainCircuit className="h-3.5 w-3.5 text-amber-500" />
              Lookahead Algorithm Spec
            </h4>

            {/* Lookahead Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>Maximum Lookahead Depth</span>
                <span className="text-amber-500">{lookaheadDepth} Cells</span>
              </div>
              <input
                type="range"
                min="2"
                max="9"
                step="1"
                value={lookaheadDepth}
                onChange={(e) => setLookaheadDepth(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[8px] font-mono text-slate-650">
                <span>Fast (Depth 2)</span>
                <span>Maximum Forefront (Depth 9)</span>
              </div>
            </div>

            {/* Live Engine Trace Feedback Box */}
            <div className="bg-slate-900/50 p-3 rounded border border-slate-900 text-[10px] font-mono text-slate-400 leading-normal gap-1 flex flex-col">
              <span className="text-slate-600 border-b border-slate-900 pb-1 text-[9px]">ENGINE_TRACE_BUS:</span>
              <p className="whitespace-pre-wrap">{evalLog}</p>
            </div>

            {/* Standard Moves Timeline Log list */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1.5">
                <History className="h-3.5 w-3.5" />
                Path Choice Decsion Logs
              </span>
              
              <div className="bg-slate-950 max-h-[160px] overflow-y-auto space-y-1 text-[9px] font-mono rounded border border-slate-900 scrollbar-thin p-2 select-none">
                {moveLogs.length === 0 ? (
                  <div className="text-slate-650 text-center py-4">No decision movements registered.</div>
                ) : (
                  moveLogs.map((log) => (
                    <div key={log.turn} className="flex justify-between items-center py-1 hover:bg-slate-900/35 px-1 rounded transition">
                      <span className="text-slate-500">T_0{log.turn}</span>
                      <span className="text-slate-300 flex items-center gap-0.5">
                        Role: {log.player === "X" ? "AI_X" : "PLAYER_O"} 
                        <ChevronRight className="h-2 w-2" /> 
                        Pos: {log.index}
                      </span>
                      {log.player === "X" ? (
                        <span className="text-emerald-400 font-bold border border-emerald-950/40 bg-emerald-950/20 px-1 rounded">
                          Nodes: {log.searchedNodes} ({log.timeSec * 1000 < 1 ? "<1" : (log.timeSec * 1000).toFixed(0)}ms)
                        </span>
                      ) : (
                        <span className="text-slate-500">Self Matrix</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
