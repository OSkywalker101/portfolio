"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Lock, Globe, Terminal, Check } from "lucide-react";

const SITE_URL = "https://learnloop-academy.netlify.app";
const REPO_URL = "https://github.com/OSkywalker101/LearnLoop";

const bootLog = [
  { text: "vite build complete", meta: "3.6s" },
  { text: "curriculum model: 6 modules / 30 lessons", meta: "900 min" },
  { text: "llm provider: groq / gpt-oss-120b", meta: "live" },
  { text: "diagram renderer: mermaid", meta: "client" },
  { text: "narration engine: web speech api", meta: "client" },
  { text: "edge network: netlify", meta: "global" },
];

const techStack = [
  "React 18",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Groq LLM",
  "Mermaid",
  "Netlify",
  "Zod",
];

const features = [
  "AI-generated curriculum tailored to subject, skill level, daily time budget, and depth",
  "Adaptive engine re-plans the syllabus around weak concepts surfaced by every quiz",
  "Rich lessons with Mermaid diagrams and browser-narrated audio — no extra tooling or API keys",
  "Instant grading with per-question explanations, streaks, and concept mastery tracking",
];

const metrics = [
  { label: "Lessons", value: "30" },
  { label: "Modules", value: "6" },
  { label: "LLM", value: "Live" },
  { label: "Cost", value: "$0" },
];

export default function Uplink() {
  return (
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
            <span className="text-white">HOLOCRON UPLINK</span>
          </h2>
          <p className="text-zinc-500 font-mono text-sm tracking-wide">
            Live production deployment — open it in a new tab
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-xl" />

          <div className="relative bg-zinc-950 border border-emerald-500/30 rounded-xl overflow-hidden shadow-emerald-500/10">
            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  [EDU_LOOP_V1] UPLINK_TERMINAL
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-600">
                  <Globe className="w-3 h-3" />
                  learnloop-academy.netlify.app
                </span>
                <span className="text-xs font-mono text-emerald-400">● ONLINE</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: browser mock */}
              <div className="p-6 lg:border-r border-zinc-800/80">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800 bg-zinc-900/60">
                    <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="text-[11px] font-mono text-zinc-400 truncate">
                      learnloop-academy.netlify.app
                    </span>
                  </div>

                  <div className="p-4 font-mono text-[11px] leading-relaxed">
                    {bootLog.map((line, index) => (
                      <motion.div
                        key={line.text}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.12 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="text-zinc-400 flex-1 truncate">{line.text}</span>
                        <span className="text-zinc-600 shrink-0">{line.meta}</span>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 1.1 }}
                      className="mt-3 flex items-center gap-2 text-emerald-400"
                    >
                      <Terminal className="w-3 h-3 shrink-0" />
                      <span className="truncate">→ {SITE_URL}</span>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-4 gap-2">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex flex-col items-center p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50"
                    >
                      <span className="text-base font-mono font-bold text-emerald-400">
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: recruiter-facing copy */}
              <div className="p-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-mono text-emerald-400">{"// PRODUCT"}</h3>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">LearnLoop</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    An AI tutor that builds a course around the learner. Pick a subject, a
                    daily time budget, and how deep you want to go — LearnLoop generates a
                    full curriculum, teaches it with diagrams and narration, then re-plans
                    itself around quiz results so weak concepts get revisited before they
                    are forgotten.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-mono text-emerald-400">{"// CAPABILITIES"}</h3>
                  </div>
                  <ul className="space-y-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="text-emerald-500 mt-1 shrink-0">▹</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-mono text-emerald-400">{"// STACK"}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-zinc-900/80 text-zinc-300 border border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-sm hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-800/50 text-zinc-300 font-mono text-sm hover:bg-zinc-800 transition-colors border border-zinc-700"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Source</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-[11px] font-mono text-zinc-600">
                  Tip for reviewers: use{" "}
                  <span className="text-zinc-500">Continue with demo</span> on the login
                  screen — no signup required.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800/50 bg-zinc-900/30">
              <span className="text-xs font-mono text-zinc-600">
                READY_FOR_DEPLOYMENT.v1.0
              </span>
              <span className="text-xs font-mono text-emerald-500 animate-pulse">
                ● UPLINK_STABLE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
