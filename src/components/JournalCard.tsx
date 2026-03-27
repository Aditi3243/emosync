import { Sparkles } from "lucide-react";
import { useState } from "react";

interface JournalCardProps {
  onAnalyze: (text: string) => void;
}

const JournalCard = ({ onAnalyze }: JournalCardProps) => {
  const [text, setText] = useState("");

  return (
    <div className="glass-card-strong p-6 md:p-8 flex flex-col gap-5 animate-fade-in h-full">
      <div>
        <h2 className="font-display font-semibold text-xl text-foreground">
          Daily Journal
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Express yourself freely — your thoughts are safe here.
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling today?"
        className="flex-1 min-h-[220px] w-full resize-none rounded-xl bg-muted/40 border border-border/50 p-5 text-foreground placeholder:text-muted-foreground/60 text-[15px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
      />

      <button
        onClick={() => onAnalyze(text)}
        className="gradient-btn px-6 py-3 text-sm flex items-center justify-center gap-2 w-full md:w-auto md:self-start"
      >
        <Sparkles className="w-4 h-4" />
        Analyze My Feelings
      </button>
    </div>
  );
};

export default JournalCard;
