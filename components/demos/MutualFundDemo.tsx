"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const TICKERS = ["SPY", "VOO", "QQQ", "IWM", "EFA", "VWO", "TLT", "GLD"];
const MODELS = ["Logistic Regression", "Random Forest", "XGBoost", "Gradient Boosting"];

const generateChartData = (ticker: string, model: string) => {
  const baseValue = 10000;
  const days = 30;
  const data = [];
  let strategyValue = baseValue;
  let buyHoldValue = baseValue;

  const volatility = ticker === "QQQ" ? 0.025 : ticker === "TLT" ? 0.008 : 0.015;
  const strategyBias = MODELS.indexOf(model) * 0.001;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const dayStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    const dailyReturn = (Math.random() - 0.48) * volatility + strategyBias;
    const marketReturn = (Math.random() - 0.48) * volatility;

    strategyValue *= 1 + dailyReturn;
    buyHoldValue *= 1 + marketReturn;

    const volume = Math.floor(Math.random() * 10000000) + 1000000;

    data.push({
      date: dayStr,
      strategyValue: Math.round(strategyValue * 100) / 100,
      buyHoldValue: Math.round(buyHoldValue * 100) / 100,
      volume,
      strategyReturn: ((strategyValue - baseValue) / baseValue) * 100,
      buyHoldReturn: ((buyHoldValue - baseValue) / baseValue) * 100,
    });
  }

  return data;
};

const modelAccuracy: Record<string, number> = {
  "Logistic Regression": 58.2,
  "Random Forest": 64.7,
  "XGBoost": 67.3,
  "Gradient Boosting": 65.8,
};

const riskLevels: Record<string, { level: string; confidence: number; color: string }> = {
  "TLT": { level: "Low Risk", confidence: 72, color: "emerald" },
  "VOO": { level: "Medium Risk", confidence: 58, color: "amber" },
  "SPY": { level: "Medium Risk", confidence: 61, color: "amber" },
  "QQQ": { level: "High Risk", confidence: 69, color: "red" },
  "IWM": { level: "Medium Risk", confidence: 55, color: "amber" },
  "EFA": { level: "Medium Risk", confidence: 52, color: "amber" },
  "VWO": { level: "Medium Risk", confidence: 57, color: "amber" },
  "GLD": { level: "Low Risk", confidence: 78, color: "emerald" },
};

interface ChartDataPoint {
  date: string;
  strategyValue: number;
  buyHoldValue: number;
  volume: number;
  strategyReturn: number;
  buyHoldReturn: number;
}

export default function MutualFundDemo() {
  const [selectedTicker, setSelectedTicker] = useState("SPY");
  const [selectedModel, setSelectedModel] = useState("XGBoost");
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const chartRef = useRef<HTMLDivElement>(null);

  const risk = riskLevels[selectedTicker];
  const accuracy = modelAccuracy[selectedModel];

  const handleRefresh = () => {
    setShowResult(false);
    setChartData([]);
    setHoveredPoint(null);
    toast.info("Trading simulation reset", { duration: 1500 });
  };

  const handlePredict = () => {
    setIsLoading(true);
    setShowResult(false);

    setTimeout(() => {
      const data = generateChartData(selectedTicker, selectedModel);
      setChartData(data);
      setIsLoading(false);
      setShowResult(true);
      toast.success(`Prediction complete for ${selectedTicker}`, { duration: 2000 });
    }, 1500);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current || chartData.length === 0) return;

    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const chartWidth = rect.width - 60;
    const paddingLeft = 45;
    const pointSpacing = chartWidth / (chartData.length - 1);

    const index = Math.round((x - paddingLeft) / pointSpacing);
    const clampedIndex = Math.max(0, Math.min(chartData.length - 1, index));

    setHoveredPoint(chartData[clampedIndex]);
    setHoverPos({ x, y });
  }, [chartData]);

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const minValue = chartData.length > 0 ? Math.min(...chartData.map(d => Math.min(d.strategyValue, d.buyHoldValue))) * 0.98 : 0;
  const maxValue = chartData.length > 0 ? Math.max(...chartData.map(d => Math.max(d.strategyValue, d.buyHoldValue))) * 1.02 : 0;
  const valueRange = maxValue - minValue;

  const chartHeight = 180;
  const chartWidth = 100;
  const paddingLeft = 45;
  const paddingTop = 10;

  const getY = (value: number) => {
    return chartHeight - paddingTop - ((value - minValue) / valueRange) * (chartHeight - 30);
  };

  const formatCurrency = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const createPath = (key: "strategyValue" | "buyHoldValue") => {
    if (chartData.length === 0) return "";
    return chartData.map((d, i) => {
      const x = paddingLeft + (i / (chartData.length - 1)) * (chartWidth - 10);
      const y = getY(d[key]);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-mono text-emerald-400">{"// TRADING_SIMULATION"}</span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={selectedTicker}
          onChange={(e) => setSelectedTicker(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm font-mono text-zinc-300 focus:border-emerald-500 focus:outline-none cursor-pointer"
        >
          {TICKERS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm font-mono text-zinc-300 focus:border-emerald-500 focus:outline-none cursor-pointer"
        >
          {MODELS.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <button
          onClick={handlePredict}
          disabled={isLoading}
          className="px-4 py-2 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-sm font-mono hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            "GET PREDICTION"
          )}
        </button>
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${
                risk.color === "emerald" ? "bg-emerald-500/10 border-emerald-500/30" :
                risk.color === "amber" ? "bg-amber-500/10 border-amber-500/30" :
                "bg-red-500/10 border-red-500/30"
              }`}>
                <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${
                  risk.color === "emerald" ? "text-emerald-400" :
                  risk.color === "amber" ? "text-amber-400" :
                  "text-red-400"
                }`}>
                  Risk Classification
                </div>
                <div className={`text-2xl font-bold ${
                  risk.color === "emerald" ? "text-emerald-300" :
                  risk.color === "amber" ? "text-amber-300" :
                  "text-red-300"
                }`}>
                  {risk.level}
                </div>
                <div className="text-sm text-zinc-400 mt-1">Confidence: {risk.confidence}%</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Model Accuracy
                </div>
                <div className="text-2xl font-bold text-white">
                  {accuracy}%
                </div>
                <div className="text-sm text-zinc-400 mt-1">{selectedModel}</div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Equity Curve</span>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-emerald-500 rounded" />
                    <span className="text-zinc-400">Strategy</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-amber-500 rounded" />
                    <span className="text-zinc-400">Buy & Hold</span>
                  </span>
                </div>
              </div>

              <div className="relative" ref={chartRef}>
                <svg
                  width="100%"
                  height={chartHeight}
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="overflow-visible"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <defs>
                    <linearGradient id="strategyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="buyHoldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                    <g key={i}>
                      <line
                        x1={paddingLeft}
                        y1={paddingTop + (chartHeight - 30) * (1 - ratio)}
                        x2={chartWidth - 5}
                        y2={paddingTop + (chartHeight - 30) * (1 - ratio)}
                        stroke="#27272a"
                        strokeDasharray="4"
                      />
                      <text
                        x={paddingLeft - 5}
                        y={paddingTop + (chartHeight - 30) * (1 - ratio) + 4}
                        fill="#52525b"
                        fontSize="8"
                        textAnchor="end"
                        fontFamily="var(--font-jetbrains)"
                      >
                        {formatCurrency(minValue + valueRange * ratio)}
                      </text>
                    </g>
                  ))}

                  {chartData.length > 0 && (
                    <>
                      <path
                        d={createPath("buyHoldValue")}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={createPath("strategyValue")}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {hoveredPoint && (
                        <>
                          <line
                            x1={paddingLeft + (chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * (chartWidth - 10)}
                            y1={paddingTop}
                            x2={paddingLeft + (chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * (chartWidth - 10)}
                            y2={chartHeight - 15}
                            stroke="#52525b"
                            strokeDasharray="4"
                          />
                          <circle
                            cx={paddingLeft + (chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * (chartWidth - 10)}
                            cy={getY(hoveredPoint.strategyValue)}
                            r="4"
                            fill="#10b981"
                            stroke="#030303"
                            strokeWidth="2"
                          />
                          <circle
                            cx={paddingLeft + (chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * (chartWidth - 10)}
                            cy={getY(hoveredPoint.buyHoldValue)}
                            r="4"
                            fill="#f59e0b"
                            stroke="#030303"
                            strokeWidth="2"
                          />
                        </>
                      )}
                    </>
                  )}
                </svg>

                {hoveredPoint && (
                  <div
                    className="absolute z-10 bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-xs font-mono shadow-xl pointer-events-none"
                    style={{
                      left: Math.min(hoverPos.x + 10, 280),
                      top: hoverPos.y - 60,
                    }}
                  >
                    <div className="text-zinc-400 mb-1.5">{hoveredPoint.date}</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-emerald-400">Strategy</span>
                        <span className="text-white">{formatCurrency(hoveredPoint.strategyValue)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-amber-400">Buy&Hold</span>
                        <span className="text-white">{formatCurrency(hoveredPoint.buyHoldValue)}</span>
                      </div>
                      <div className="pt-1 border-t border-zinc-800 mt-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-zinc-500">Diff</span>
                          <span className={hoveredPoint.strategyValue > hoveredPoint.buyHoldValue ? "text-emerald-400" : "text-red-400"}>
                            {hoveredPoint.strategyValue > hoveredPoint.buyHoldValue ? "+" : ""}
                            {((hoveredPoint.strategyValue - hoveredPoint.buyHoldValue) / hoveredPoint.buyHoldValue * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Sharpe Ratio", value: (1.2 + Math.random() * 0.5).toFixed(2) },
                { label: "Max Drawdown", value: `-${(5 + Math.random() * 10).toFixed(1)}%` },
                { label: "Win Rate", value: `${(55 + Math.random() * 20).toFixed(0)}%` },
                { label: "Total Return", value: `${(5 + Math.random() * 20).toFixed(1)}%` },
              ].map((metric) => (
                <div key={metric.label} className="bg-zinc-900/50 border border-zinc-800 rounded p-2 text-center">
                  <div className="text-lg font-bold text-white">{metric.value}</div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showResult && !isLoading && (
        <div className="flex items-center justify-center h-32 text-zinc-600 text-sm font-mono">
          Select ticker and model, then click GET PREDICTION
        </div>
      )}
    </div>
  );
}