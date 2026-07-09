"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, GraduationCap, FileText } from "lucide-react";

const achievements = [
  {
    type: "hackathon",
    title: "Runner-up — HackVerse 3.0",
    description: "Secured second place in this competitive hackathon",
    icon: Medal,
    date: "2024",
  },
  {
    type: "hackathon",
    title: "Runner-up — CodeFusion 2024",
    description: "Recognized for innovative solution in AI/ML track",
    icon: Medal,
    date: "2024",
  },
  {
    type: "hackathon",
    title: "Runner-up — InnovateX Hackathon",
    description: "Demonstrated excellence in full-stack development",
    icon: Medal,
    date: "2023",
  },
  {
    type: "research",
    title: "Published Research Paper on AI Companionship",
    description: "Contributed to academic research on AI-human interaction",
    icon: FileText,
    date: "2024",
  },
  {
    type: "academic",
    title: "Trinity Communication Distinction",
    description: "Recognized for exceptional communication skills",
    icon: GraduationCap,
    date: "2023",
  },
  {
    type: "academic",
    title: "World Scholar's Cup Finalist",
    description: "Reached finals in global academic competition",
    icon: Trophy,
    date: "2022",
  },
];

const typeColors = {
  hackathon: "border-amber-500/30 bg-amber-500/5",
  research: "border-emerald-500/30 bg-emerald-500/5",
  academic: "border-violet-500/30 bg-violet-500/5",
};

const iconColors = {
  hackathon: "text-amber-400 bg-amber-400/10",
  research: "text-emerald-400 bg-emerald-400/10",
  academic: "text-violet-400 bg-violet-400/10",
};

export default function Achievements() {
  return (
    <section className="relative py-24 bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            <span className="text-emerald-400">{"// "}</span>
            <span className="text-white">GALACTIC ACHIEVEMENTS</span>
          </h2>
          <p className="text-zinc-500 font-mono text-sm tracking-wide">
            Honors earned across the galaxy
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[22px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-500/50 to-emerald-500/20" />

          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`flex-1 ${isLeft ? "md:text-right" : ""}`}>
                    <div
                      className={`inline-flex flex-col md:flex-row items-start md:items-center gap-2 p-4 rounded-xl border ${typeColors[achievement.type as keyof typeof typeColors]} hover:border-emerald-500/30 transition-colors group`}
                    >
                      <div className="flex items-center gap-3 md:flex-1">
                        <div className={`p-2 rounded-lg ${iconColors[achievement.type as keyof typeof iconColors]}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-zinc-500 mt-0.5">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-600 px-2 py-1 rounded bg-zinc-800/50 md:ml-auto">
                        {achievement.date}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/40 transition-colors" />
                    <div className="relative w-11 h-11 rounded-full border-2 border-emerald-500/50 bg-zinc-950 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 text-center"
        >
          <p className="text-sm font-mono text-zinc-500">
            <span className="text-emerald-400">{"// "}</span>
            Total Achievements:{" "}
            <span className="text-white font-bold">{achievements.length}</span>
            {" | "}
            Hackathons:{" "}
            <span className="text-amber-400 font-bold">3</span>
            {" | "}
            Research:{" "}
            <span className="text-emerald-400 font-bold">1</span>
            {" | "}
            Academic:{" "}
            <span className="text-violet-400 font-bold">2</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}