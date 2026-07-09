"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, Database, Zap, Brain, Shield, ArrowRight, Terminal, Play } from "lucide-react";
import MutualFundDemo from "./demos/MutualFundDemo";
import KiranaFlowDemo from "./demos/KiranaFlowDemo";
import CorrosivePoisonDemo from "./demos/CorrosivePoisonDemo";
import BrainTumorDemo from "./demos/BrainTumorDemo";
import HaloSupportDemo from "./demos/HaloSupportDemo";

interface Project {
  id: string;
  name: string;
  codename: string;
  shortDesc: string;
  techStack: string[];
  overview: string;
  features: string[];
  metrics: { label: string; value: string }[];
  status: string;
  icon: React.ReactNode;
  accentColor: string;
  demo?: React.ReactNode;
}

const projects: Project[] = [
  {
    id: "mutual-fund",
    name: "Predictive Mutual Fund Model",
    codename: "TRADING_CORE_V2",
    shortDesc: "ML pipeline analyzing 8 ETFs with 23 technical indicators for risk classification",
    techStack: ["Python", "Scikit-learn", "XGBoost", "Streamlit", "Plotly", "yFinance"],
    overview:
      "An end-to-end machine learning pipeline that analyzes historical ETF and mutual fund data, classifies risk levels using multiple ML models, and backtests investment strategies with transaction costs—delivered through an interactive Streamlit dashboard.",
    features: [
      "23 engineered technical features (RSI, MACD, Bollinger Bands, volatility)",
      "4 ML models compared: Logistic Regression, Random Forest, XGBoost, Gradient Boosting",
      "Temporal cross-validation preventing label leakage",
      "Backtesting engine with 0.1% transaction cost modeling",
      "Real-time predictions via yFinance API",
    ],
    metrics: [
      { label: "Accuracy", value: "62.4%" },
      { label: "Sharpe Ratio", value: "1.34" },
      { label: "ETFs Analyzed", value: "8" },
      { label: "Features", value: "23" },
    ],
    status: "DEPLOYED",
    icon: <TrendingUp className="w-6 h-6" />,
    accentColor: "emerald",
    demo: <MutualFundDemo />,
  },
  {
    id: "kiranaflow",
    name: "KiranaFlow",
    codename: "RETAIL_OS_V1",
    shortDesc: "AI-powered retail management SaaS for Indian Kirana stores",
    techStack: ["Next.js 16", "FastAPI", "Supabase", "Gemini AI", "Zustand", "Tailwind"],
    overview:
      "Enterprise-grade retail management SaaS designed specifically for India\u2019s 12-15 million Kirana stores. Combines inventory management, customer credit tracking (Khata), AI-powered invoice scanning, and real-time analytics in a single platform.",
    features: [
      "AI-powered invoice scanning via Google Gemini",
      "Customer trust scoring (0-100) based on payment history",
      "Real-time inventory tracking with expiry alerts",
      "Point-of-sale billing with receipt generation",
      "Multi-portal architecture: Admin, Employee, User dashboards",
    ],
    metrics: [
      { label: "Entities", value: "12M+" },
      { label: "Market Share", value: "80%" },
      { label: "Tech Stack", value: "Full-Stack" },
      { label: "AI Features", value: "2" },
    ],
    status: "DEPLOYED",
    icon: <Store className="w-6 h-6" />,
    accentColor: "amber",
    demo: <KiranaFlowDemo />,
  },
  {
    id: "corrosive-poison",
    name: "Corrosive Poison Diagnostic",
    codename: "TOX_SCREEN_V3",
    shortDesc: "Clinical decision support system identifying toxicology agents from symptoms",
    techStack: ["Python", "Scikit-learn", "FastAPI", "React 19", "Glassmorphism"],
    overview:
      "An AI-powered clinical decision support system that identifies corrosive poisoning agents (Sulfuric Acid, Nitric Acid, or Hydrochloric Acid) based on observed clinical symptoms, helping medical professionals expedite diagnosis in emergency toxicology scenarios.",
    features: [
      "5 ML models trained on synthetic clinical data",
      "10 clinical symptom features as input",
      "Real-time probability estimation per acid type",
      "Dual interface: Streamlit (prototype) + Next.js (production)",
      "Acid-specific color coding: H\u2082SO\u2084 (red), HNO\u2083 (orange), HCl (blue)",
    ],
    metrics: [
      { label: "Accuracy", value: "87%+" },
      { label: "Acid Types", value: "3" },
      { label: "Symptoms", value: "10" },
      { label: "Models", value: "5" },
    ],
    status: "CLASSIFIED",
    icon: <Shield className="w-6 h-6" />,
    accentColor: "rose",
    demo: <CorrosivePoisonDemo />,
  },
  {
    id: "brain-tumor",
    name: "Brain Tumor Detection",
    codename: "MEDICAL_AI_SCAN",
    shortDesc: "Deep learning classification of brain MRI scans into 4 tumor categories",
    techStack: ["Python", "PyTorch", "EfficientNet B3", "Streamlit", "GradCAM", "Nilearn"],
    overview:
      "End-to-end deep learning pipeline for MRI-based brain tumor detection and classification. Classifies brain MRI images into four categories: glioma, meningioma, pituitary, and no tumor, using transfer learning with EfficientNet B3 and explainable AI via GradCAM visualization.",
    features: [
      "EfficientNet B3 pretrained on ImageNet, fine-tuned on 5,712 MRI images",
      "Patient-level diagnosis via majority voting across multiple slices",
      "GradCAM activation mapping for model interpretability",
      "3D brain surface projection for anatomical localization",
      "GPU-accelerated inference with CUDA support",
    ],
    metrics: [
      { label: "Training Images", value: "5,712" },
      { label: "Test Images", value: "1,311" },
      { label: "Tumor Classes", value: "4" },
      { label: "Model", value: "EfficientNet B3" },
    ],
    status: "APPROVED",
    icon: <Brain className="w-6 h-6" />,
    accentColor: "cyan",
    demo: <BrainTumorDemo />,
  },
  {
    id: "halo-support",
    name: "HALO Support",
    codename: "IT_TICKET_SOLVER",
    shortDesc: "AI-driven IT support platform with LangGraph pipeline orchestration",
    techStack: ["Next.js 16", "FastAPI", "LangGraph", "Groq LLM", "ChromaDB", "n8n"],
    overview:
      "HALO (Helpdesk Automation and Logic Operations) is an end-to-end AI-driven IT support platform that classifies, routes, and resolves incoming tickets with zero manual dispatch. Built on a unified LangGraph pipeline backend with three routing paths: Action (n8n), FAQ (RAG), and Complex (Human Expert).",
    features: [
      "AI Router Agent (Groq LPU) classifies every incoming ticket",
      "LangGraph state-machine pipeline with 3 dispatch paths",
      "RAG knowledge base with ChromaDB semantic search",
      "Real-time AI telemetry: CGR, RPI, HLO, SSE metrics",
      "Three-portal architecture: Admin, Employee, User",
    ],
    metrics: [
      { label: "Pipeline Paths", value: "3" },
      { label: "AI Telemetry", value: "4 Metrics" },
      { label: "LLM", value: "Groq" },
      { label: "Vector DB", value: "ChromaDB" },
    ],
    status: "OPERATIONAL",
    icon: <Cpu className="w-6 h-6" />,
    accentColor: "violet",
    demo: <HaloSupportDemo />,
  },
];

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
      <polyline points="16,7 22,7 22,13" />
    </svg>
  );
}

function Store(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const colorMap: Record<string, string> = {
    emerald: "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-500/20",
    amber: "border-amber-500/30 hover:border-amber-500/60 hover:shadow-amber-500/20",
    rose: "border-rose-500/30 hover:border-rose-500/60 hover:shadow-rose-500/20",
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-cyan-500/20",
    violet: "border-violet-500/30 hover:border-violet-500/60 hover:shadow-violet-500/20",
  };

  const iconColorMap: Record<string, string> = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
    cyan: "text-cyan-400",
    violet: "text-violet-400",
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full text-left p-6 rounded-xl border bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 ${colorMap[project.accentColor]} hover:shadow-lg`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-lg bg-zinc-800/50 ${iconColorMap[project.accentColor]}`}>
            {project.icon}
          </div>
          <div className="flex items-center gap-2">
            {project.demo && (
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE DEMO
              </span>
            )}
            <span className="text-xs font-mono text-zinc-500 px-2 py-1 rounded bg-zinc-800/50">
              {project.status}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
          {project.name}
        </h3>

        <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
          {project.shortDesc}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-1 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs font-mono px-2 py-1 rounded bg-zinc-800/80 text-zinc-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">
          <span>View Databank</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const colorMap: Record<string, string> = {
    emerald: "border-emerald-500/50 shadow-emerald-500/20",
    amber: "border-amber-500/50 shadow-amber-500/20",
    rose: "border-rose-500/50 shadow-rose-500/20",
    cyan: "border-cyan-500/50 shadow-cyan-500/20",
    violet: "border-violet-500/50 shadow-violet-500/20",
  };

  const iconColorMap: Record<string, string> = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
    cyan: "text-cyan-400",
    violet: "text-violet-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border rounded-xl overflow-hidden ${colorMap[project.accentColor]}`}
        style={{ boxShadow: "0 0 80px rgba(16, 185, 129, 0.2)" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-sm font-mono text-zinc-400">
              [{project.codename}] DATABANK_RETRIEVAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.demo && (
              <button
                onClick={() => setShowDemo(!showDemo)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                  showDemo
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                    : "text-zinc-400 border-zinc-700/50 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{showDemo ? "SHOW INFO" : "LIVE DEMO"}</span>
              </button>
            )}
            <span className="text-xs font-mono text-emerald-400">
              ● STATUS: DECLASSIFIED
            </span>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-700/50"
            >
              <span>ESC</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(90vh-52px)] scrollbar-emerald">
          <AnimatePresence mode="wait">
            {showDemo && project.demo ? (
              <motion.div
                key="demo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                {project.demo}
              </motion.div>
            ) : (
              <motion.div
                key="info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-zinc-900/80 ${iconColorMap[project.accentColor]}`}>
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">{project.name}</h2>
                    <p className="text-sm font-mono text-zinc-500">{project.shortDesc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex flex-col items-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50"
                    >
                      <span className="text-xl font-mono font-bold text-emerald-400">{metric.value}</span>
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-mono text-emerald-400">{"// OVERVIEW"}</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pl-6 border-l-2 border-zinc-800">
                      {project.overview}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-mono text-emerald-400">{"// TECH_STACK"}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900/80 text-zinc-300 border border-zinc-700/50 hover:border-emerald-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-mono text-emerald-400">{"// KEY_FEATURES"}</h3>
                    </div>
                    <ul className="space-y-2 pl-6">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                          <span className="text-emerald-500 mt-1">▹</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                  <span className="text-xs font-mono text-zinc-600">
                    READY_FOR_DEPLOYMENT.v1.0
                  </span>
                  <div className="flex items-center gap-3">
                    {project.demo && (
                      <button
                        onClick={() => setShowDemo(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-mono hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                      >
                        <Play className="w-4 h-4" />
                        <span>Try Live Demo</span>
                      </button>
                    )}
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 text-sm font-mono hover:bg-zinc-800 transition-colors border border-zinc-700"
                    >
                      <span>View Code</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section className="relative py-24 bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
              <span className="text-emerald-400">{"// "}</span>
              <span className="text-white">HOLOCRON ARCHIVE</span>
            </h2>
            <p className="text-zinc-500 font-mono text-sm tracking-wide">
              Interactive project demos await — click to explore
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}