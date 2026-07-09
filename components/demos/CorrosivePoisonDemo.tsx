"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, AlertTriangle, TestTube } from "lucide-react";
import { toast } from "sonner";

type AcidType = "Sulfuric Acid (H₂SO₄)" | "Nitric Acid (HNO₃)" | "Hydrochloric Acid (HCl)";

interface SymptomState {
  oropharyngealBurns: boolean;
  teethDiscoloration: number;
  abdominalDistension: boolean;
  skinLesions: number;
  melena: boolean;
  hematemesis: boolean;
  throatPain: boolean;
  dysphagia: boolean;
  chestPain: boolean;
  acidosis: boolean;
}

interface ModelResult {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
}

const INITIAL_SYMPTOMS: SymptomState = {
  oropharyngealBurns: false,
  teethDiscoloration: 0,
  abdominalDistension: false,
  skinLesions: 0,
  melena: false,
  hematemesis: false,
  throatPain: false,
  dysphagia: false,
  chestPain: false,
  acidosis: false,
};

const ACID_COLORS: Record<string, string> = {
  "Sulfuric Acid (H₂SO₄)": "#ff4d4d",
  "Nitric Acid (HNO₃)": "#ffa500",
  "Hydrochloric Acid (HCl)": "#4d94ff",
};

const MODEL_RESULTS: ModelResult[] = [
  { name: "Random Forest", accuracy: 87.2, precision: 0.86, recall: 0.85, f1: 0.86 },
  { name: "Gradient Boosting", accuracy: 86.5, precision: 0.85, recall: 0.84, f1: 0.85 },
  { name: "XGBoost", accuracy: 85.8, precision: 0.84, recall: 0.83, f1: 0.84 },
  { name: "SVM", accuracy: 82.3, precision: 0.81, recall: 0.80, f1: 0.80 },
  { name: "Logistic Regression", accuracy: 78.6, precision: 0.77, recall: 0.76, f1: 0.76 },
];

const STORAGE_KEY = "corrosive-demo-state";

export default function CorrosivePoisonDemo() {
  const [symptoms, setSymptoms] = useState<SymptomState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_SYMPTOMS;
  });
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [prediction, setPrediction] = useState<{ acid: AcidType; confidence: number; probabilities: Record<string, number> } | null>(null);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const handleSymptomChange = (key: keyof SymptomState, value: boolean | number) => {
    setSymptoms(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleRefresh = () => {
    setSymptoms(INITIAL_SYMPTOMS);
    setPrediction(null);
    setTrainingProgress(0);
    localStorage.removeItem(STORAGE_KEY);
    toast.info("Diagnostic system reset", { duration: 1500 });
  };

  const calculateProbabilities = () => {
    const symptomCount =
      (symptoms.oropharyngealBurns ? 1 : 0) +
      (symptoms.teethDiscoloration > 0 ? 1 : 0) +
      (symptoms.abdominalDistension ? 1 : 0) +
      (symptoms.skinLesions > 0 ? 1 : 0) +
      (symptoms.melena ? 1 : 0) +
      (symptoms.hematemesis ? 1 : 0) +
      (symptoms.throatPain ? 1 : 0) +
      (symptoms.dysphagia ? 1 : 0) +
      (symptoms.chestPain ? 1 : 0) +
      (symptoms.acidosis ? 1 : 0);

    const sulfuricProb = Math.min(0.95, 0.2 + symptomCount * 0.08 + (symptoms.acidosis ? 0.15 : 0) + (symptoms.oropharyngealBurns ? 0.1 : 0));
    const nitricProb = Math.min(0.85, 0.15 + symptomCount * 0.06 + (symptoms.teethDiscoloration > 0 ? 0.12 : 0));
    const hydrochloricProb = Math.max(0.03, 0.1 + symptomCount * 0.02 - (symptoms.acidosis ? 0.08 : 0));

    const total = sulfuricProb + nitricProb + hydrochloricProb;

    return {
      "Sulfuric Acid (H₂SO₄)": sulfuricProb / total,
      "Nitric Acid (HNO₃)": nitricProb / total,
      "Hydrochloric Acid (HCl)": hydrochloricProb / total,
    };
  };

  const handleDiagnose = async () => {
    setIsDiagnosing(true);
    setPrediction(null);
    setTrainingProgress(0);

    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setTrainingProgress(i);
    }

    const probs = calculateProbabilities();
    const predictedAcid = Object.entries(probs).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as AcidType;

    setPrediction({
      acid: predictedAcid,
      confidence: Math.round(probs[predictedAcid] * 100 * 10) / 10,
      probabilities: Object.fromEntries(
        Object.entries(probs).map(([k, v]) => [k, Math.round(v * 100 * 10) / 10])
      ),
    });

    setIsDiagnosing(false);
    toast.success(<span>Diagnosis complete: <strong>{predictedAcid}</strong></span>, { duration: 3000 });
  };

  const symptomOptions: { key: keyof SymptomState; label: string; type: "checkbox" | "select"; options?: string[] }[] = [
    { key: "oropharyngealBurns", label: "Oropharyngeal Burns", type: "checkbox" },
    { key: "teethDiscoloration", label: "Teeth Discoloration", type: "select", options: ["None", "Yellow", "Chalky White"] },
    { key: "abdominalDistension", label: "Abdominal Distension", type: "checkbox" },
    { key: "skinLesions", label: "Skin Lesions", type: "select", options: ["None", "Mild", "Severe"] },
    { key: "melena", label: "Melena (Black Stool)", type: "checkbox" },
    { key: "hematemesis", label: "Hematemesis (Vomiting Blood)", type: "checkbox" },
    { key: "throatPain", label: "Throat Pain", type: "checkbox" },
    { key: "dysphagia", label: "Dysphagia (Swallowing Difficulty)", type: "checkbox" },
    { key: "chestPain", label: "Chest Pain", type: "checkbox" },
    { key: "acidosis", label: "Metabolic Acidosis", type: "checkbox" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TestTube className="w-4 h-4 text-rose-400" />
          <span className="text-sm font-mono text-rose-400">{"// TOXICOLOGY_DIAGNOSTIC"}</span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Clinical Symptoms</div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 space-y-2 max-h-[280px] overflow-y-auto">
            {symptomOptions.map(({ key, label, type, options }) => (
              <div key={key} className="flex items-center justify-between">
                {type === "checkbox" ? (
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={symptoms[key] as boolean}
                      onChange={(e) => handleSymptomChange(key, e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-rose-500 focus:ring-rose-500/50"
                    />
                    <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-mono text-zinc-300">{label}</span>
                    <select
                      value={symptoms[key] as number}
                      onChange={(e) => handleSymptomChange(key, parseInt(e.target.value))}
                      className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs font-mono text-zinc-300"
                    >
                      {options?.map((opt, i) => (
                        <option key={opt} value={i}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleDiagnose}
            disabled={isDiagnosing}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white font-mono text-sm font-bold hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50"
          >
            {isDiagnosing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Training Models... {trainingProgress}%
              </span>
            ) : (
              "RUN DIAGNOSIS"
            )}
          </button>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Diagnostic Result</div>

          <AnimatePresence mode="wait">
            {prediction ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-3"
              >
                <div
                  className="rounded-lg p-4 border-2"
                  style={{
                    backgroundColor: `${ACID_COLORS[prediction.acid]}15`,
                    borderColor: ACID_COLORS[prediction.acid],
                  }}
                >
                  <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: ACID_COLORS[prediction.acid] }}>
                    Predicted Agent
                  </div>
                  <div className="text-xl font-bold text-white mb-1">{prediction.acid}</div>
                  <div className="text-3xl font-bold" style={{ color: ACID_COLORS[prediction.acid] }}>
                    {prediction.confidence}%
                  </div>
                  <div className="text-xs text-zinc-400">Confidence</div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs font-mono text-zinc-500 mb-2 uppercase">Probability Distribution</div>
                  <div className="space-y-2">
                    {Object.entries(prediction.probabilities).map(([acid, prob]) => (
                      <div key={acid}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono text-zinc-400">{acid}</span>
                          <span className="text-xs font-mono" style={{ color: ACID_COLORS[acid] }}>
                            {prob}%
                          </span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${prob}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: ACID_COLORS[acid] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-48 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-lg"
              >
                <div className="text-center">
                  <AlertTriangle className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                  <div className="text-xs font-mono text-zinc-600">Select symptoms and run diagnosis</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3"
            >
              <div className="text-xs font-mono text-zinc-500 mb-2 uppercase">Model Comparison</div>
              <div className="space-y-1.5">
                {MODEL_RESULTS.slice(0, 3).map((model) => (
                  <div key={model.name} className="flex items-center justify-between text-xs">
                    <span className="font-mono text-zinc-400">{model.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${model.accuracy}%` }}
                        />
                      </div>
                      <span className="font-mono text-white w-10 text-right">{model.accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="text-[10px] font-mono text-zinc-600 text-center italic">
        This system is for clinical decision support only. All predictions must be verified by a qualified medical professional.
      </div>
    </div>
  );
}