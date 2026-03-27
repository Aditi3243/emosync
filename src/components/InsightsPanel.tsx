import { Lightbulb, Smile, Activity } from "lucide-react";

interface InsightsPanelProps {
  mood: { emoji: string; label: string; subtitle: string };
  stress: number;
  suggestion: string;
}

const getStressLabel = (stress: number) => {
  if (stress < 30) return "Low stress detected";
  if (stress < 60) return "Moderate stress detected";
  return "High stress detected";
};

const getStressColor = (stress: number) => {
  if (stress < 30) return "text-emo-green";
  if (stress < 60) return "text-emo-purple";
  return "text-destructive";
};

const InsightsPanel = ({ mood, stress, suggestion }: InsightsPanelProps) => {
  return (
    <div className="flex flex-col gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div>
        <h2 className="font-display font-semibold text-xl text-foreground">Emotional Insights</h2>
        <p className="text-sm text-muted-foreground">Real-time analysis</p>
      </div>

      {/* Current Mood Card */}
      <div className="glass-card-strong p-5 group hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Smile className="w-4 h-4 text-primary" />
          </div>
          <p className="font-display font-semibold text-foreground">Current Mood</p>
        </div>
        <div className="flex items-center gap-3 ml-1">
          <span className="text-4xl animate-float">{mood.emoji}</span>
          <div>
            <p className="font-display font-bold text-lg text-primary">{mood.label}</p>
            <p className="text-sm text-muted-foreground">{mood.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Stress Level Card */}
      <div className="glass-card-strong p-5 hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emo-pink/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-emo-pink" />
          </div>
          <p className="font-display font-semibold text-foreground">Stress Level</p>
        </div>
        <div className="flex items-center justify-between mb-2 ml-1">
          <p className="text-sm text-muted-foreground">{getStressLabel(stress)}</p>
          <span className={`text-sm font-bold ${getStressColor(stress)}`}>{stress}%</span>
        </div>
        <div className="w-full bg-muted/60 rounded-full h-3">
          <div className="stress-bar h-3" style={{ width: `${stress}%` }} />
        </div>
      </div>

      {/* AI Suggestion Card */}
      <div className="glass-card-strong p-5 hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <p className="font-display font-semibold text-foreground">AI Suggestion</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed ml-1">{suggestion}</p>
      </div>
    </div>
  );
};

export default InsightsPanel;
