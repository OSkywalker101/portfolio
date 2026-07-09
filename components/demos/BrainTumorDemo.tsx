"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Brain, Scan, Activity } from "lucide-react";
import { toast } from "sonner";

type TumorType = "Pituitary" | "Glioma" | "Meningioma" | "No Tumor";

interface BrainScan {
  id: string;
  name: string;
  slices: string[];
  tumorType: TumorType;
  confidence: number;
  location: { x: number; y: number; z: number };
  description: string;
}

const BRAIN_SCANS: BrainScan[] = [
  {
    id: "brain1",
    name: "Patient Scan A",
    slices: Array(5).fill("brain1"),
    tumorType: "Pituitary",
    confidence: 94.2,
    location: { x: 50, y: 30, z: 50 },
    description: "Pituitary tumor located at the base of the brain, affecting hormonal function."
  },
  {
    id: "brain2",
    name: "Patient Scan B",
    slices: Array(5).fill("brain2"),
    tumorType: "Glioma",
    confidence: 96.8,
    location: { x: 35, y: 45, z: 40 },
    description: "Glioma in the left temporal region, requires surgical evaluation."
  },
  {
    id: "brain3",
    name: "Patient Scan C",
    slices: Array(5).fill("brain3"),
    tumorType: "Meningioma",
    confidence: 91.5,
    location: { x: 65, y: 40, z: 55 },
    description: "Meningioma near the right hemisphere, typically benign but worth monitoring."
  },
  {
    id: "brain4",
    name: "Patient Scan D",
    slices: Array(5).fill("brain4"),
    tumorType: "No Tumor",
    confidence: 98.9,
    location: { x: 0, y: 0, z: 0 },
    description: "No abnormal growth detected. Brain tissue appears healthy."
  },
];

const TUMOR_COLORS: Record<TumorType, string> = {
  "Pituitary": "#f472b6",
  "Glioma": "#ef4444",
  "Meningioma": "#f97316",
  "No Tumor": "#22c55e",
};

const TUMOR_POSITIONS: Record<string, { cx: number; cy: number; label: string }> = {
  "Pituitary": { cx: 50, cy: 25, label: "Pituitary Gland" },
  "Glioma": { cx: 35, cy: 45, label: "Left Temporal" },
  "Meningioma": { cx: 65, cy: 40, label: "Right Parietal" },
};

const STORAGE_KEY = "braintumor-demo-state";

export default function BrainTumorDemo() {
  const [selectedBrain, setSelectedBrain] = useState<BrainScan | null>(null);
  const [selectedSlice, setSelectedSlice] = useState(2);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { brainId } = JSON.parse(saved);
      const brain = BRAIN_SCANS.find(b => b.id === brainId);
      if (brain) {
        setSelectedBrain(brain);
      }
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      setRotation(prev => (prev + 0.5) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleBrainSelect = (brain: BrainScan) => {
    setSelectedBrain(brain);
    setShowResult(false);
    setSelectedSlice(2);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ brainId: brain.id }));
    toast.info(`Selected ${brain.name}`, { duration: 1500 });
  };

  const handleRefresh = () => {
    setSelectedBrain(null);
    setShowResult(false);
    setSelectedSlice(2);
    localStorage.removeItem(STORAGE_KEY);
    toast.info("Brain scan analysis reset", { duration: 1500 });
  };

  const handleAnalyze = () => {
    if (!selectedBrain) return;

    setIsAnalyzing(true);
    setShowResult(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
      toast.success(`Analysis complete for ${selectedBrain.name}`, { duration: 3000 });
    }, 2500);
  };

  const brainPosition = selectedBrain ? TUMOR_POSITIONS[selectedBrain.tumorType] : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-mono text-cyan-400">{"// BRAIN_TUMOR_DETECTION"}</span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Select Brain Scan</div>
          <div className="grid grid-cols-2 gap-2">
            {BRAIN_SCANS.map(brain => (
              <button
                key={brain.id}
                onClick={() => handleBrainSelect(brain)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedBrain?.id === brain.id
                    ? "bg-cyan-500/10 border-cyan-500/50"
                    : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="text-xs font-mono text-white mb-1">{brain.name}</div>
                <div
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: TUMOR_COLORS[brain.tumorType] }}
                >
                  {brain.tumorType}
                </div>
              </button>
            ))}
          </div>

          {selectedBrain && (
            <div className="space-y-2">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Slice Selector</div>
              <div className="flex gap-1">
                {selectedBrain.slices.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlice(i)}
                    className={`flex-1 py-1.5 rounded text-xs font-mono transition-colors ${
                      selectedSlice === i
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    S{i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono text-sm font-bold hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Scan className="w-4 h-4 animate-pulse" />
                    Analyzing...
                  </span>
                ) : (
                  "ANALYZE SCAN"
                )}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">3D Visualization</div>
          <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 h-[200px] flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ maxWidth: 200, maxHeight: 200 }}
            >
              <defs>
                <radialGradient id="brainGradient" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <g transform={`rotate(${rotation} 50 50)`}>
                <ellipse
                  cx="50"
                  cy="50"
                  rx="35"
                  ry="40"
                  fill="url(#brainGradient)"
                  stroke="#475569"
                  strokeWidth="1.5"
                  opacity="0.9"
                />

                <path
                  d="M30 45 Q50 35 70 45"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
                <path
                  d="M35 55 Q50 45 65 55"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="0.5"
                  opacity="0.5"
                />

                {selectedBrain && selectedBrain.tumorType !== "No Tumor" && brainPosition && (
                  <g>
                    <circle
                      cx={brainPosition.cx}
                      cy={brainPosition.cy}
                      r="8"
                      fill={TUMOR_COLORS[selectedBrain.tumorType]}
                      opacity="0.6"
                      filter="url(#glow)"
                      className="animate-pulse"
                    />
                    <circle
                      cx={brainPosition.cx}
                      cy={brainPosition.cy}
                      r="5"
                      fill={TUMOR_COLORS[selectedBrain.tumorType]}
                      opacity="0.8"
                    />
                    <circle
                      cx={brainPosition.cx}
                      cy={brainPosition.cy}
                      r="2"
                      fill="white"
                      opacity="0.9"
                    />
                  </g>
                )}

                {selectedBrain && selectedBrain.tumorType === "No Tumor" && (
                  <g>
                    <circle
                      cx="50"
                      cy="50"
                      r="8"
                      fill="#22c55e"
                      opacity="0.2"
                    />
                    <path
                      d="M46 50 L49 53 L54 47"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                )}
              </g>

              <text x="50" y="95" textAnchor="middle" fill="#475569" fontSize="4" fontFamily="monospace">
                ROTATING VIEW
              </text>
            </svg>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)",
              }}
            />

            {isAnalyzing && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/50">
                <div className="text-center">
                  <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-pulse" />
                  <div className="text-xs font-mono text-cyan-400">Scanning...</div>
                </div>
              </div>
            )}
          </div>

          {selectedBrain && showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div
                className="rounded-lg p-3 border-2"
                style={{
                  backgroundColor: `${TUMOR_COLORS[selectedBrain.tumorType]}15`,
                  borderColor: TUMOR_COLORS[selectedBrain.tumorType],
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: TUMOR_COLORS[selectedBrain.tumorType] }}>
                      Diagnosis
                    </div>
                    <div className="text-lg font-bold text-white">{selectedBrain.tumorType}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: TUMOR_COLORS[selectedBrain.tumorType] }}>
                      {selectedBrain.confidence}%
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500">Confidence</div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                <div className="text-xs font-mono text-zinc-500 mb-1 uppercase">Location</div>
                <div className="text-sm text-zinc-300">
                  {selectedBrain.tumorType === "No Tumor"
                    ? "No abnormal region detected"
                    : brainPosition?.label}
                </div>
                <div className="text-xs text-zinc-600 mt-1 font-mono">
                  {selectedBrain.description}
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                <div className="text-xs font-mono text-zinc-500 mb-2 uppercase">Classification</div>
                <div className="space-y-1.5">
                  {(["Pituitary", "Glioma", "Meningioma", "No Tumor"] as TumorType[]).map(type => {
                    const isSelected = selectedBrain.tumorType === type;
                    const prob = isSelected ? selectedBrain.confidence : (100 - selectedBrain.confidence) * 0.3 + Math.random() * 10;
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span className={`text-xs font-mono ${isSelected ? "text-white" : "text-zinc-500"}`}>
                          {type}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${prob}%`,
                                backgroundColor: isSelected ? TUMOR_COLORS[type] : "#52525b"
                              }}
                            />
                          </div>
                          <span className={`text-[10px] font-mono w-8 text-right ${isSelected ? "text-white" : "text-zinc-600"}`}>
                            {prob.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {!selectedBrain && (
            <div className="flex items-center justify-center h-48 text-zinc-600 text-xs font-mono text-center">
              Select a brain scan to begin analysis
            </div>
          )}
        </div>
      </div>
    </div>
  );
}