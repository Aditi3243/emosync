import { useState, useCallback } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import JournalCard from "@/components/JournalCard";
import InsightsPanel from "@/components/InsightsPanel";
import ChatBar from "@/components/ChatBar";
import WeeklyChart from "@/components/WeeklyChart";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisEntry {
  day: string;
  stress: number;
  mood: number;
}

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Index = () => {
  const [mood, setMood] = useState({ emoji: "😊", label: "Calm", subtitle: "Peaceful & relaxed" });
  const [stress, setStress] = useState(32);
  const [suggestion, setSuggestion] = useState("Write in your journal and let AI analyze your emotions to get personalized insights.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

      // Update weekly chart with today's data
      const today = dayNames[new Date().getDay()];
      const moodScore = Math.max(0, 100 - data.stress);
      setWeeklyData(prev =>
        prev.map(d => d.day === today ? { ...d, stress: data.stress, mood: moodScore } : d)
      );
      setTotalEntries(prev => prev + 1);

      toast.success("Journal analyzed successfully! ✨");
    } catch (e) {
      console.error("Analysis error:", e);
      toast.error("Failed to analyze. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const avgStress = totalEntries > 0
    ? Math.round(weeklyData.reduce((s, d) => s + d.stress, 0) / Math.max(1, weeklyData.filter(d => d.stress > 0).length))
    : 0;
  const avgMood = totalEntries > 0
    ? Math.round(weeklyData.reduce((s, d) => s + d.mood, 0) / Math.max(1, weeklyData.filter(d => d.mood > 0).length))
    : 0;

  return (
    <div className="min-h-screen gradient-bg animate-gradient-shift relative overflow-x-hidden">
      {/* Dreamy floating orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-emo-purple/15 blur-[100px] animate-float pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-emo-pink/10 blur-[120px] pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[60%] w-64 h-64 rounded-full bg-emo-blue/10 blur-[80px] pointer-events-none" style={{ animationDelay: "4s" }} />
      <div className="absolute top-[60%] left-[20%] w-48 h-48 rounded-full bg-emo-green/8 blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-6 pb-12 flex flex-col gap-8">
        <Header />

        {/* Welcome Section */}
        <div className="text-center py-4 animate-fade-in">
          <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
            Welcome to your <span className="bg-gradient-to-r from-emo-purple to-emo-pink bg-clip-text text-transparent">Wellness Space</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Express your feelings below and let our AI understand your emotional state in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <JournalCard onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
          <div className="lg:col-span-2">
            <InsightsPanel mood={mood} stress={stress} suggestion={suggestion} />
          </div>
        </div>

        <WeeklyChart data={weeklyData} avgStress={avgStress} avgMood={avgMood} totalEntries={totalEntries} />
      </div>

      <ChatBar />
    </div>
  );
};

export default Index;
