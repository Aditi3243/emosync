import PageWrapper from "@/components/PageWrapper";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import JournalCard from "@/components/JournalCard";
import InsightsPanel from "@/components/InsightsPanel";
import ChatBar from "@/components/ChatBar";
import WeeklyChart from "@/components/WeeklyChart";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

interface AnalysisEntry {
  day: string;
  stress: number;
  mood: number;
}

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Index = () => {
  const [mood, setMood] = useState({ emoji: "✨", label: "—", subtitle: "Write to get started" });
  const [stress, setStress] = useState(0);
  const [suggestion, setSuggestion] = useState("Write in your journal and let AI analyze your emotions to get personalized insights.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [weeklyData, setWeeklyData] = useState<AnalysisEntry[]>([
    { day: "Mon", stress: 0, mood: 0 },
    { day: "Tue", stress: 0, mood: 0 },
    { day: "Wed", stress: 0, mood: 0 },
    { day: "Thu", stress: 0, mood: 0 },
    { day: "Fri", stress: 0, mood: 0 },
    { day: "Sat", stress: 0, mood: 0 },
    { day: "Sun", stress: 0, mood: 0 },
  ]);
  const [totalEntries, setTotalEntries] = useState(0);

  const handleAnalyze = useCallback(async (text: string) => {
    if (!text.trim()) {
      toast.error("Please write something in your journal first.");
      return;
    }
    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-journal", {
        body: { text },
      });

      if (error) throw error;

      setMood({ emoji: data.moodEmoji, label: data.mood, subtitle: data.moodSubtitle });
      setStress(data.stress);
      setSuggestion(data.suggestion);
      setHasAnalyzed(true);

      const today = dayNames[new Date().getDay()];
      const moodScore = Math.max(0, 100 - data.stress);

      setWeeklyData(prev =>
        prev.map(d =>
          d.day === today ? { ...d, stress: data.stress, mood: moodScore } : d
        )
      );

      setTotalEntries(prev => prev + 1);
      toast.success("Analyzed ✨");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const avgStress =
    totalEntries > 0
      ? Math.round(
          weeklyData.reduce((s, d) => s + d.stress, 0) /
            Math.max(1, weeklyData.filter(d => d.stress > 0).length)
        )
      : 0;

  const avgMood =
    totalEntries > 0
      ? Math.round(
          weeklyData.reduce((s, d) => s + d.mood, 0) /
            Math.max(1, weeklyData.filter(d => d.mood > 0).length)
        )
      : 0;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white relative overflow-hidden">

        {/* Floating Glow Background */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 blur-[140px] rounded-full animate-pulse" />

        {/* MAIN */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

          {/* 🚀 HERO SECTION */}
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src={logo}
              alt="EmoSync Logo"
              style={{ height: "220px", width: "auto" }}
              className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-float"
            />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Your Emotional Dashboard
            </h1>
            <p className="text-gray-400 max-w-md">
              Write, reflect, and let AI understand how you feel.
            </p>
          </div>

          {/* 🧠 MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Journal */}
            <div className="lg:col-span-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4">
              <JournalCard onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </div>

            {/* Insights */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4">
              <InsightsPanel
                mood={mood}
                stress={stress}
                suggestion={suggestion}
                isAnalyzing={isAnalyzing}
                hasAnalyzed={hasAnalyzed}
              />
            </div>
          </div>

          {/* 📊 CHART */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4">
            <WeeklyChart
              data={weeklyData}
              avgStress={avgStress}
              avgMood={avgMood}
              totalEntries={totalEntries}
            />
          </div>

        </div>

        <ChatBar />
      </div>
    </PageWrapper>
  );
};

export default Index;