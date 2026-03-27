import { Sparkles, BookOpen, Loader2 } from "lucide-react";
import { useState } from "react";

interface JournalCardProps {
  onAnalyze: (text: string) => void;
  isAnalyzing?: boolean;
}

const JournalCard = ({ onAnalyze, isAnalyzing }: JournalCardProps) => {
  const [text, setText] = useState("");

  return (
    <div className="glass-card-strong p-6 md:p-8 flex flex-col gap-5 animate-fade-in h-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-xl text-foreground">Your Journal</h2>
          <p className="text-sm text-muted-foreground">Express yourself freely and let AI understand your emotions</p>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling today? Write about your day, your thoughts, anything on your mind..."
        className="flex-1 min-h-[260px] w-full resize-none rounded-2xl bg-muted/30 border border-border/40 p-5 text-foreground placeholder:text-muted-foreground/50 text-[15px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
      />

      <button
        onClick={() => onAnalyze(text)}
        disabled={isAnalyzing || !text.trim()}
        className="gradient-btn px-6 py-3 text-sm flex items-center justify-center gap-2 w-full md:w-auto md:self-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Analyze My Feelings
          </>
        )}
      </button>
    </div>
  );
};

export default JournalCard;
