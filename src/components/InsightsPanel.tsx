import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Lightbulb, Smile, Wind, Heart } from "lucide-react";

interface InsightsPanelProps {
  mood: { emoji: string; label: string; subtitle: string };
  stress: number;
  suggestion: string;
  isAnalyzing?: boolean;
  hasAnalyzed?: boolean;
}

const getCalmLabel = (calm: number) => {
  if (calm >= 70) return "Feeling calm & balanced ✨";
  if (calm >= 40) return "You're doing okay, keep going 💪";
  return "Take a deep breath, you've got this 🌸";
};

const getCalmColor = (calm: number) => {
  if (calm >= 70) return "text-emerald-400";
  if (calm >= 40) return "text-purple-400";
  return "text-rose-400";
};

const getReliefLabel = (stress: number) => {
  if (stress < 30) return "You're in a great headspace! 🌟";
  if (stress < 60) return "A little break might help you recharge 🍵";
  return "You deserve some rest and kindness today 💙";
};

const getReliefColor = (stress: number) => {
  if (stress < 30) return "text-emerald-400";
  if (stress < 60) return "text-amber-400";
  return "text-rose-400";
};

const InsightsPanel = ({ mood, stress, suggestion, isAnalyzing, hasAnalyzed }: InsightsPanelProps) => {

  const calm = Math.max(0, 100 - stress);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!suggestion || isAnalyzing) return;
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(suggestion.slice(0, i));
      i++;
      if (i > suggestion.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [suggestion, isAnalyzing]);

  return (
    <div className="flex flex-col gap-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>

      {/* HEADER */}
      <div>
        <h2 className="font-display font-semibold text-xl text-white">
          Emotional Insights
        </h2>
        <p className="text-sm text-purple-300">Real-time analysis</p>
      </div>

      {/* LOADER */}
      {isAnalyzing ? (
        <div className="bg-[#1e1a2e] rounded-2xl p-6 border border-purple-500/20 flex items-center justify-center min-h-[300px]">
          <Loader />
        </div>
      ) : (
        <>
          {/* Mood */}
          <div className="bg-[#1e1a2e] rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/50 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Smile className="w-4 h-4 text-blue-400" />
              </div>
              <p className="font-display font-semibold text-white">Current Mood</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-4xl animate-float">{mood.emoji}</span>
              <p className="font-display font-bold text-lg text-blue-400">{mood.label}</p>
              <p className="text-sm text-purple-200">{mood.subtitle}</p>
            </div>
          </div>

          {/* Calm Score + Relief Needed */}
          {hasAnalyzed ? (
            <div className="grid grid-cols-2 gap-3">

              {/* Calm Score */}
              <div className="bg-[#1e1a2e] rounded-2xl p-4 border border-purple-500/20 hover:border-emerald-500/50 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Wind className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="font-display font-semibold text-white text-sm">Calm Score</p>
                </div>
                <p className={`text-2xl font-bold ${getCalmColor(calm)}`}>{calm}%</p>
                <p className="text-xs text-purple-200 mt-1 leading-relaxed">{getCalmLabel(calm)}</p>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 transition-all duration-700"
                    style={{ width: `${calm}%` }}
                  />
                </div>
              </div>

              {/* Relief Needed */}
              <div className="bg-[#1e1a2e] rounded-2xl p-4 border border-purple-500/20 hover:border-rose-500/50 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <p className="font-display font-semibold text-white text-sm">Relief Needed</p>
                </div>
                <p className={`text-2xl font-bold ${getReliefColor(stress)}`}>{stress}%</p>
                <p className="text-xs text-purple-200 mt-1 leading-relaxed">{getReliefLabel(stress)}</p>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 transition-all duration-700"
                    style={{ width: `${stress}%` }}
                  />
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#1e1a2e] rounded-2xl p-5 border border-purple-500/20 flex items-center justify-center min-h-[100px]">
              <p className="text-purple-300 text-sm text-center">✨ Your scores will appear here after analysis</p>
            </div>
          )}

          {/* AI Suggestion */}
          <div className="bg-[#1e1a2e] rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/50 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-purple-400" />
              </div>
              <p className="font-display font-semibold text-white">AI Suggestion</p>
            </div>
            <p className="text-sm text-purple-100 leading-relaxed min-h-[60px]">
              {displayedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default InsightsPanel;