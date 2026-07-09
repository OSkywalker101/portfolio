"use client";

import { motion } from "framer-motion";
import { Code2, Database, Container, Cpu } from "lucide-react";

type SkillCategory = "language" | "framework" | "database" | "tool" | "ai";

type Skill = {
  name: string;
  icon: string;
  category: SkillCategory;
};

const skills: Skill[] = [
  { name: "Python", icon: "🐍", category: "language" },
  { name: "Java", icon: "☕", category: "language" },
  { name: "C++", icon: "⚡", category: "language" },
  { name: "JavaScript", icon: "JS", category: "language" },
  { name: "HTML/CSS", icon: "🎨", category: "language" },
  { name: "Flask", icon: "🌶️", category: "framework" },
  { name: "TensorFlow", icon: "TF", category: "framework" },
  { name: "PyTorch", icon: "🔥", category: "framework" },
  { name: "Scikit-Learn", icon: "🧠", category: "framework" },
  { name: "Streamlit", icon: "📊", category: "framework" },
  { name: "FastAPI", icon: "⚡", category: "framework" },
  { name: "MongoDB", icon: "🍃", category: "database" },
  { name: "MySQL", icon: "🐬", category: "database" },
  { name: "Git", icon: "📦", category: "tool" },
  { name: "GitHub", icon: "🐙", category: "tool" },
  { name: "VSCode", icon: "💻", category: "tool" },
  { name: "Docker", icon: "🐳", category: "tool" },
  { name: "Linux", icon: "🐧", category: "tool" },
  { name: "Next.js", icon: "▲", category: "framework" },
  { name: "React", icon: "⚛️", category: "framework" },
  { name: "TypeScript", icon: "TS", category: "language" },
  { name: "Groq LLM", icon: "🤖", category: "ai" },
  { name: "LangGraph", icon: "🔗", category: "ai" },
  { name: "ChromaDB", icon: "💾", category: "ai" },
];

const categoryColors = {
  language: "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/60 hover:bg-blue-500/10",
  framework: "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60 hover:bg-emerald-500/10",
  database: "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60 hover:bg-amber-500/10",
  tool: "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60 hover:bg-purple-500/10",
  ai: "border-rose-500/30 bg-rose-500/5 hover:border-rose-500/60 hover:bg-rose-500/10",
};

function SkillBadge({ name, icon, category }: { name: string; icon: string; category: keyof typeof categoryColors }) {
  return (
    <div
      className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-default ${categoryColors[category]}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-mono text-zinc-300 whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function Arsenal() {
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <section className="relative py-24 overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-emerald-400">{"// "}</span>
            <span className="text-white">JEDI ARSENAL</span>
          </h2>
          <p className="text-zinc-500 font-mono text-sm tracking-wide">
            Weapons, tools & technologies mastered across the galaxy
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {duplicatedSkills.map((skill, index) => (
                <SkillBadge
                  key={`${skill.name}-${index}`}
                  name={skill.name}
                  icon={skill.icon}
                  category={skill.category}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Languages", count: 5, icon: Code2 },
            { label: "Frameworks", count: 7, icon: Cpu },
            { label: "Databases", count: 2, icon: Database },
            { label: "DevOps & Tools", count: 5, icon: Container },
          ].map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-zinc-800 bg-zinc-900/30"
            >
              <cat.icon className="w-6 h-6 text-emerald-400" />
              <span className="text-2xl font-mono font-bold text-white">{cat.count}</span>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{cat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}