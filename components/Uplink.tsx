"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Terminal } from "lucide-react";

const SITE_URL = "https://enterpriseops-copilot.vercel.app";
const REPO_URL = "https://github.com/OSkywalker101/EnterpriseOps_Copilot";

export default function Uplink() {
  return (
    <section className="relative py-24 bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-emerald-400">{"// "}</span>
            <span className="text-white">HOLOCRON UPLINK</span>
          </h2>
          <p className="text-zinc-500 font-mono text-sm tracking-wide">
            Live production deployments — open them in a new tab
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-3xl mx-auto">
          {/* LearnLoop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-xl" />

            <div className="relative h-full bg-zinc-950 border border-emerald-500/30 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500">[EDU_LOOP_V1]</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">● ONLINE</span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">LearnLoop</h3>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  An AI tutor that builds a course around the learner. Pick a subject, a
                  daily time budget, and how deep you want to go — LearnLoop generates a
                  full curriculum, teaches it with diagrams and narration, then re-plans
                  itself around quiz results so weak concepts get revisited before they
                  are forgotten.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="https://learnloop-academy.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-sm hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/OSkywalker101/LearnLoop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-800/50 text-zinc-300 font-mono text-sm hover:bg-zinc-800 transition-colors border border-zinc-700"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* EnterpriseOps Copilot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-xl" />

            <div className="relative h-full bg-zinc-950 border border-emerald-500/30 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500">[OPS_COPILOT_V2]</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">● ONLINE</span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">EnterpriseOps Copilot</h3>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  A grounded operations assistant for procurement, inventory, suppliers,
                  and invoice matching. Ask in plain language about pending approvals,
                  overdue deliveries, reorder exposure, or invoice discrepancies — every
                  answer cites the PO, invoice, or SKU it came from, and the workspace
                  actions run on seeded demo data with an optional Groq-backed chat
                  endpoint.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-sm hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-800/50 text-zinc-300 font-mono text-sm hover:bg-zinc-800 transition-colors border border-zinc-700"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
