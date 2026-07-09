"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";

const codeSnippet = `class JediDeveloper:

    def __init__(self):
        self.name = "Oliver Jude"
        self.alias = "OSkywalker101"

        self.role = "AI Engineer"

        self.languages = [
            "Python",
            "Java",
            "JavaScript",
            "C++"
        ]

        self.current_mission = [
            "Building AI Products",
            "Winning Hackathons",
            "Publishing Research",
            "Learning LLMs"
        ]

        self.favorite_universe = "Star Wars"

    def motto(self):
        return "May the Source be with You."

    def status(self):
        return "Always Exploring..."`;

const tokenColors: Record<string, string> = {
  keyword: "text-emerald-400",
  class: "text-amber-400",
  string: "text-rose-400",
  function: "text-cyan-400",
  decorator: "text-violet-400",
  comment: "text-zinc-600",
  number: "text-amber-300",
  operator: "text-zinc-400",
  property: "text-blue-400",
  builtin: "text-emerald-300",
};

function highlightPython(code: string): React.ReactNode[] {
  const tokens: { type: string; value: string }[] = [];
  const regex = /\b(class|def|return|self|if|else|for|in|import|from|with|as|try|except|raise|finally|lambda|yield|async|await|pass|break|continue|and|or|not|is|None|True|False)\b|(".*?"|'.*?'|""".*?"""|'''.*?''')|(#.*$)|(\b[A-Z][a-zA-Z0-9_]*\b)|([=+\-*/<>!&|%,.:]+)|(\b\d+\.?\d*\b)/gm;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: code.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      tokens.push({ type: "keyword", value: match[1] });
    } else if (match[2]) {
      tokens.push({ type: "string", value: match[2] });
    } else if (match[3]) {
      tokens.push({ type: "comment", value: match[3] });
    } else if (match[4]) {
      if (match[4].startsWith("def ") || match[4].startsWith("class ")) {
        tokens.push({ type: "function", value: match[4] });
      } else {
        tokens.push({ type: "class", value: match[4] });
      }
    } else if (match[5]) {
      tokens.push({ type: "operator", value: match[5] });
    } else if (match[6]) {
      tokens.push({ type: "number", value: match[6] });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: "text", value: code.slice(lastIndex) });
  }

  return tokens.map((token, index) => {
    if (token.type === "text") {
      return <span key={index}>{token.value}</span>;
    }
    return (
      <span key={index} className={tokenColors[token.type] || "text-zinc-300"}>
        {token.value}
      </span>
    );
  });
}

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.log("Failed to copy");
    }
  };

  return (
    <section className="relative py-24 bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/10 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-emerald-400">{"// "}</span>
            <span className="text-white">JEDI_SIGNATURE</span>
          </h2>
          <p className="text-zinc-500 font-mono text-sm tracking-wide">
            The code that defines the developer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-xl" />

          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-zinc-500">jedi_developer.py</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-700/50"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code>{highlightPython(codeSnippet)}</code>
              </pre>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800/50 bg-zinc-900/30">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-mono text-zinc-600">Python 3.10+</span>
              </div>
              <span className="text-xs font-mono text-emerald-500 animate-pulse">
                ● EXECUTE_SUCCESS
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-500 font-mono text-sm">
            <span className="text-amber-400">{"// "}</span>
            <span className="text-zinc-400 italic">
              &ldquo;The Force will be with you.&rdquo;
            </span>
          </p>
          <p className="text-zinc-600 font-mono text-xs mt-2">
            If you like my work, consider giving a star to my repositories.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href="mailto:ocsestuff@gmail.com"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-sm hover:bg-emerald-500/20 transition-colors border border-emerald-500/30"
          >
            <span>Email Me</span>
          </a>
          <a
            href="https://www.linkedin.com/in/oliver-jude-00b0092b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800/50 text-zinc-300 font-mono text-sm hover:bg-zinc-800 transition-colors border border-zinc-700"
          >
            <span>Connect on LinkedIn</span>
          </a>
          <a
            href="https://github.com/OSkywalker101"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800/50 text-zinc-300 font-mono text-sm hover:bg-zinc-800 transition-colors border border-zinc-700"
          >
            <span>View GitHub</span>
          </a>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-zinc-900 text-center">
          <p className="text-xs font-mono text-zinc-700">
            © 2025 Oliver Jude (@OSkywalker101). May the Source be with You.
          </p>
        </div>
      </div>
    </section>
  );
}