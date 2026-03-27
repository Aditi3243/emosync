import { Lightbulb } from "lucide-react";

interface InsightsPanelProps {
  mood: { emoji: string; label: string; subtitle: string };
  stress: number;
  suggestion: string;
}

const InsightsPanel = ({ mood, stress, suggestion }: InsightsPanelProps) => {
  return (
    <div className="flex flex-col gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      {/* Mood Card */}
      <div className="glass-card-strong p-5 flex items-center gap-4 group hover:scale-[1.01] transition-transform duration-200">
        <span className="text-4xl animate-float">{mood.emoji}</span>
        <div>
          <p className="font-display font-semibold text-foreground">{mood.label}</p>
          <p className="text-sm text-muted-foreground">{mood.subtitle}</p>
        </div>
      </div>

      {/* Stress Card */}
      <div className="glass-card-strong p-5 hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center justify-between mb-3">
          <p className="font-display font-semibold text-foreground text-sm">Stress Level</p>
          <span className="text-sm font-semibold text-emo-purple">{stress}%</span>
        </div>
        <div className="w-full bg-muted/60 rounded-full h-2.5">
          <div className="stress-bar" style={{ width: `${stress}%` }} />
        </div>
      </div>

      {/* Suggestion Card */}
      <div className="glass-card-strong p-5 hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <p className="font-display font-semibold text-foreground text-sm">AI Suggestion</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{suggestion}</p>
      </div>
    </div>
  );
};

export default InsightsPanel;
