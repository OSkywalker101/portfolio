"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Bot, User, Zap, Database, Users, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type PathType = "action" | "rag" | "complex";
type PathLabel = "Action Path" | "FAQ Path" | "Complex Path";

interface Question {
  id: string;
  text: string;
  path: PathType;
  response: string;
  category: string;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface Telemetry {
  cgr: number;
  rpi: number;
  hlo: number;
  sse: number;
}

const QUESTIONS: Question[] = [
  {
    id: "1",
    text: "My laptop won't connect to WiFi",
    path: "complex",
    response: "I've analyzed your issue and created ticket TKT-7842. This requires expertise from our Network Team. An agent will be assigned within 2-4 hours. For immediate assistance, try restarting your router.",
    category: "Network",
  },
  {
    id: "2",
    text: "How do I reset my password?",
    path: "rag",
    response: "Based on our knowledge base, here's how to reset your password:\n\n1. Go to the login page\n2. Click 'Forgot Password'\n3. Enter your email\n4. Check your inbox for reset link\n\nThe link expires in 24 hours. Let me know if you need further assistance!",
    category: "Account",
  },
  {
    id: "3",
    text: "I need software installed for a project",
    path: "action",
    response: "I've automatically processed your request. Your software installation request has been submitted to the IT automation system. Expected completion: 15-30 minutes. You'll receive a notification when ready.",
    category: "Software",
  },
  {
    id: "4",
    text: "My mouse is not working properly",
    path: "rag",
    response: "Let me help you troubleshoot your mouse issue:\n\n1. Try a different USB port\n2. Check if the mouse is paired (for wireless)\n3. Update mouse drivers in Device Manager\n\nIf the issue persists, it may need replacement. Would you like me to create a ticket?",
    category: "Hardware",
  },
  {
    id: "5",
    text: "I need access to the shared drive",
    path: "action",
    response: "Your request has been automatically processed! I've granted you access to the Shared Projects drive. You should see it appear in your network locations within 5 minutes. Let me know if you encounter any issues!",
    category: "Access",
  },
];

const PATH_CONFIG: Record<PathType, { label: PathLabel; icon: typeof Zap; color: string; bgColor: string }> = {
  action: { label: "Action Path", icon: Zap, color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
  rag: { label: "FAQ Path", icon: Database, color: "text-purple-400", bgColor: "bg-purple-500/20" },
  complex: { label: "Complex Path", icon: Users, color: "text-orange-400", bgColor: "bg-orange-500/20" },
};

const STORAGE_KEY = "halo-demo-state";

export default function HaloSupportDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPath, setCurrentPath] = useState<PathType | null>(null);
  const [showPipeline, setShowPipeline] = useState(false);
  const [telemetry, setTelemetry] = useState<Telemetry>({ cgr: 0, rpi: 0, hlo: 0, sse: 0 });
  const [ticketCreated, setTicketCreated] = useState<{ id: string; path: PathLabel } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { messages: savedMessages, telemetry: savedTelemetry } = JSON.parse(saved);
        setMessages(savedMessages || []);
        if (savedTelemetry) {
          setTelemetry(savedTelemetry);
          setShowPipeline(true);
        }
      } catch {
        console.log("Failed to load saved state");
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, telemetry }));
    }
  }, [messages, telemetry]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRefresh = () => {
    setMessages([]);
    setSelectedQuestion(null);
    setCurrentPath(null);
    setShowPipeline(false);
    setTelemetry({ cgr: 0, rpi: 0, hlo: 0, sse: 0 });
    setTicketCreated(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.info("HALO Support reset", { duration: 1500 });
  };

  const handleSendQuestion = async (question: Question) => {
    if (!question) return;

    setSelectedQuestion(question);
    setCurrentPath(null);
    setShowPipeline(false);
    setTicketCreated(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: question.text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    setIsTyping(false);
    setCurrentPath(question.path);
    setShowPipeline(true);

    await new Promise(resolve => setTimeout(resolve, 600));

    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: question.response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);

    if (question.path === "complex") {
      const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketCreated({ id: ticketId, path: PATH_CONFIG[question.path].label });
    }

    setTelemetry({
      cgr: Math.floor(65 + Math.random() * 25),
      rpi: Math.floor(70 + Math.random() * 20),
      hlo: Math.floor(55 + Math.random() * 20),
      sse: Math.floor(80 + Math.random() * 15),
    });

    setShowPipeline(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-mono text-blue-400">{"// HALO_AI_SUPPORT"}</span>
          {currentPath && (
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${PATH_CONFIG[currentPath].bgColor} ${PATH_CONFIG[currentPath].color}`}>
              {PATH_CONFIG[currentPath].label}
            </span>
          )}
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
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Quick Questions</div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-2 space-y-1.5">
            {QUESTIONS.map(q => (
              <button
                key={q.id}
                onClick={() => handleSendQuestion(q)}
                className={`w-full text-left p-2 rounded transition-all ${
                  selectedQuestion?.id === q.id
                    ? "bg-blue-500/20 border border-blue-500/50"
                    : "hover:bg-zinc-800 border border-transparent"
                }`}
              >
                <div className="text-xs font-mono text-white mb-0.5">{q.text}</div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                    q.path === "action" ? "bg-cyan-500/20 text-cyan-400" :
                    q.path === "rag" ? "bg-purple-500/20 text-purple-400" :
                    "bg-orange-500/20 text-orange-400"
                  }`}>
                    {PATH_CONFIG[q.path].label}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-600">{q.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Chat Interface</div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="h-[180px] overflow-y-auto p-3 space-y-3">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-zinc-600 text-xs font-mono text-center">
                  Select a question to start chatting with HALO AI
                </div>
              ) : (
                <>
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white rounded-tr-none"
                            : "bg-zinc-800 text-zinc-200 rounded-tl-none"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {msg.sender === "ai" ? (
                            <Bot className="w-3 h-3 text-blue-400" />
                          ) : (
                            <User className="w-3 h-3" />
                          )}
                          <span className="text-[9px] font-mono opacity-70">
                            {msg.sender === "user" ? "You" : "HALO AI"}
                          </span>
                        </div>
                        <div className="text-xs font-mono whitespace-pre-wrap">{msg.text}</div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-none px-3 py-2">
                        <div className="flex items-center gap-1">
                          <Bot className="w-3 h-3 text-blue-400" />
                          <span className="text-xs font-mono text-zinc-400">HALO AI is typing</span>
                          <span className="flex gap-0.5">
                            {[0, 1, 2].map(i => (
                              <span
                                key={i}
                                className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                              />
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPipeline && currentPath && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <div className="text-xs font-mono text-zinc-500 mb-3 uppercase tracking-wider">Pipeline Visualization</div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-1">
                      <User className="w-5 h-5 text-zinc-400" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">User</span>
                  </div>

                  <div className="flex-1 px-2">
                    <div className="h-0.5 bg-zinc-700 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-blue-500 mb-1">
                      <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">AI Router</span>
                  </div>

                  <div className="flex-1 px-2">
                    <div className="h-0.5 bg-zinc-700 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`absolute inset-0 ${PATH_CONFIG[currentPath].color.replace("text-", "bg-")}`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${PATH_CONFIG[currentPath].bgColor} border-2`}
                      style={{ borderColor: PATH_CONFIG[currentPath].color.replace("text-", "") }}
                    >
                      {currentPath === "action" ? (
                        <Zap className={`w-5 h-5 ${PATH_CONFIG[currentPath].color}`} />
                      ) : currentPath === "rag" ? (
                        <Database className={`w-5 h-5 ${PATH_CONFIG[currentPath].color}`} />
                      ) : (
                        <Users className={`w-5 h-5 ${PATH_CONFIG[currentPath].color}`} />
                      )}
                    </motion.div>
                    <span className={`text-[10px] font-mono ${PATH_CONFIG[currentPath].color}`}>
                      {PATH_CONFIG[currentPath].label}
                    </span>
                  </div>

                  <div className="flex-1 px-2">
                    <div className="h-0.5 bg-zinc-700 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="absolute inset-0 bg-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-1 border border-emerald-500">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Resolved</span>
                  </div>
                </div>
              </div>

              {ticketCreated && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-orange-400">Ticket Created:</span>
                    <span className="text-xs font-mono text-white font-bold">{ticketCreated.id}</span>
                    <span className="text-xs font-mono text-zinc-500">via {ticketCreated.path}</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "CGR", value: telemetry.cgr, desc: "Context Grounding" },
                { label: "RPI", value: telemetry.rpi, desc: "Routing Precision" },
                { label: "HLO", value: telemetry.hlo, desc: "Human Labor Offset" },
                { label: "SSE", value: telemetry.sse, desc: "Search Efficiency" },
              ].map(metric => (
                <div key={metric.label} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">{metric.value}%</div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase">{metric.label}</div>
                  <div className="h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        metric.value >= 80 ? "bg-emerald-500" :
                        metric.value >= 50 ? "bg-amber-500" :
                        "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}