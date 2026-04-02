import { motion } from "framer-motion";
import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      {/* --- PERSISTENT FLOATING BRANDING (STAYING OUTSIDE ANIMATIONS) --- */}
      <div className="fixed top-5 left-5 z-[999] flex items-center gap-3 px-4 py-2 bg-[#1a1a2e]/90 backdrop-blur-md rounded-full shadow-2xl border border-blue-500/30 select-none">
        {/* Using Brain Emoji for a high-res look since the .png is corrupted */}
        <span className="text-lg filter drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">🧠</span>
        
        <span className="font-bold text-white text-xs tracking-[0.2em] uppercase">
          EMOSYNC
        </span>
        
        {/* Pulsing indicator to show the app is "Live" to judges */}
        <div className="flex items-center gap-2 ml-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
        </div>
      </div>

      {/* --- PAGE TRANSITIONS --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageWrapper;