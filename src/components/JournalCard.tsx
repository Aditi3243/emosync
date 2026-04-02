import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

interface JournalCardProps {
  onAnalyze: (text: string) => void;
  isAnalyzing?: boolean;
}

const JournalCard = ({ onAnalyze, isAnalyzing }: JournalCardProps) => {
  const [text, setText] = useState("");

  return (
    <div className="relative group h-full">

      {/* Glow Border */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>

      {/* Main Card */}
      <div className="relative bg-[#0f172a]/80 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col gap-6 h-full transition duration-500 group-hover:scale-[1.01]">

        {/* 🔥 Minimal Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white tracking-wide">
            Journal Entry
          </h2>

          <span className="text-xs text-gray-400">
            {text.length} chars
          </span>
        </div>

        {/* ✍️ Textarea (Modern) */}
        <div className="flex-1 relative">

          {/* subtle glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-xl opacity-50"></div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing your thoughts... no pressure, just flow ✨"
            className="relative w-full h-full min-h-[260px] resize-none rounded-2xl bg-[#020617]/80 p-5 text-gray-200 placeholder:text-gray-500 text-[15px] leading-relaxed focus:outline-none border border-white/5 focus:border-purple-400 transition"
          />
        </div>

        {/* 🚀 Bottom Actions */}
        <div className="flex items-center justify-between gap-4">

          {/* Hint text */}
          <p className="text-xs text-gray-500 hidden md:block">
            AI will analyze mood & stress instantly
          </p>

          {/* Button */}
          <button
            onClick={() => onAnalyze(text)}
            disabled={isAnalyzing || !text.trim()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:scale-110 hover:shadow-pink-500/40 transition duration-300 flex items-center gap-2 disabled:opacity-40 disabled:hover:scale-100"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default JournalCard;