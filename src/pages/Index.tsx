import { useState, useCallback } from "react";
import Header from "@/components/Header";
import JournalCard from "@/components/JournalCard";
import InsightsPanel from "@/components/InsightsPanel";
import ChatBar from "@/components/ChatBar";

const moodBank = [
  { emoji: "😊", label: "Calm", subtitle: "Peaceful & relaxed" },
  { emoji: "😄", label: "Happy", subtitle: "Joyful & energized" },
  { emoji: "😌", label: "Content", subtitle: "At ease with yourself" },
  { emoji: "😔", label: "Melancholy", subtitle: "A bit low today" },
  { emoji: "😤", label: "Frustrated", subtitle: "Feeling tense" },
  { emoji: "🥰", label: "Grateful", subtitle: "Warm & appreciative" },
];

const suggestions = [
  "Try a 5-minute breathing exercise. Inhale for 4 counts, hold for 4, exhale for 6. This activates your parasympathetic nervous system.",
  "Consider journaling three things you're grateful for. Gratitude practice has been shown to improve overall wellbeing.",
  "A short walk outside could help reset your mood. Nature exposure reduces cortisol levels significantly.",
  "Take a moment to stretch and release physical tension. Body and mind are deeply connected.",
  "Reach out to someone you trust. Social connection is one of the strongest predictors of emotional resilience.",
];

const Index = () => {
  const [mood, setMood] = useState(moodBank[0]);
  const [stress, setStress] = useState(32);
  const [suggestion, setSuggestion] = useState(suggestions[0]);

  const handleAnalyze = useCallback((text: string) => {
    if (!text.trim()) return;
    const randomMood = moodBank[Math.floor(Math.random() * moodBank.length)];
    const randomStress = Math.floor(Math.random() * 80) + 10;
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setMood(randomMood);
    setStress(randomStress);
    setSuggestion(randomSuggestion);
  }, []);

  return (
    <div className="min-h-screen gradient-bg animate-gradient-shift relative overflow-hidden">
      {/* Decorative blurred orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-emo-purple/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-emo-pink/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-emo-blue/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-6 pb-28 flex flex-col gap-6">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
          <div className="lg:col-span-3">
            <JournalCard onAnalyze={handleAnalyze} />
          </div>
          <div className="lg:col-span-2">
            <InsightsPanel mood={mood} stress={stress} suggestion={suggestion} />
          </div>
        </div>
      </div>

      <ChatBar />
    </div>
  );
};

export default Index;
