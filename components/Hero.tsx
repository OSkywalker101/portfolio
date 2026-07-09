"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";

const GITHUB_STATS_URL = "https://github-readme-stats-sigma-five.vercel.app/api?username=OSkywalker101&show_icons=true&theme=tokyonight&hide_border=true";
const TOP_LANGS_URL = "https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=OSkywalker101&layout=compact&theme=tokyonight&hide_border=true";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];
    const STAR_COUNT = 250;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${currentOpacity * 0.15})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createStars();

    const handleResize = () => {
      resize();
      createStars();
    };

    window.addEventListener("resize", handleResize);
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ filter: "brightness(1.25) contrast(1.1)" }}
    />
  );
}

function GitBusterCard() {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="relative mt-12 w-full max-w-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-xl" />

      <div className="relative bg-zinc-950/70 border border-zinc-800 backdrop-blur-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: "0.5s" }} />
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
            <span className="text-xs font-mono text-emerald-400">HOLOCRON_CORE_CONNECTED</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-500">SYS_STATUS: ACTIVE</span>
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-zinc-500">USER: OSkywalker101</span>
              <span className="text-xs font-mono text-zinc-600">|</span>
              <span className="text-xs font-mono text-emerald-400">LEVEL: Full Stack Jedi</span>
            </div>
            <div className="text-xs font-mono text-zinc-600">
              {">"}Fetching holocron data... <span className="text-emerald-400">COMPLETE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 rounded border border-zinc-800/50 p-3">
              <div className="text-xs font-mono text-zinc-500 mb-2">{"// REPOSITORY_STATS"}</div>
              {!loaded && (
                <div className="h-24 bg-zinc-800/30 animate-pulse rounded" />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GITHUB_STATS_URL}
                alt="GitHub Stats"
                className={`h-24 object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setLoaded(true)}
              />
            </div>

            <div className="bg-zinc-900/50 rounded border border-zinc-800/50 p-3">
              <div className="text-xs font-mono text-zinc-500 mb-2">{"// TOP_LANGUAGES"}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TOP_LANGS_URL}
                alt="Top Languages"
                className="h-24 object-contain"
              />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-zinc-800/50 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-600">JEDI_ARCHIVE.v2.0.26</span>
            <span className="text-xs font-mono text-emerald-500 animate-pulse">● LIVE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarfieldCanvas />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(3,3,3,0.4) 50%, rgba(3,3,3,0.95) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-amber-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
        >
          May the Source be with You.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Oliver Jude
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-zinc-400 text-lg md:text-xl font-mono tracking-wide mb-8"
        >
          AI Engineer • Full Stack Developer • Researcher
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-6"
        >
          <a
            href="https://www.linkedin.com/in/oliver-jude-00b0092b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-700 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
          >
            <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            <span className="text-sm font-mono text-zinc-300 group-hover:text-emerald-300">LinkedIn</span>
          </a>

          <a
            href="mailto:ocsestuff@gmail.com"
            className="group flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-700 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            <span className="text-sm font-mono text-zinc-300 group-hover:text-emerald-300">Email</span>
          </a>

          <a
            href="https://github.com/OSkywalker101"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-700 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
          >
            <Github className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            <span className="text-sm font-mono text-zinc-300 group-hover:text-emerald-300">GitHub</span>
          </a>
        </motion.div>

        <GitBusterCard />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-emerald-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}