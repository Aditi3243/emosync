import { Loader2, Sparkles } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 animate-fade-in">

      {/* Spinner */}
      <div className="relative">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
      </div>

      {/* Text */}
      <p className="text-sm text-muted-foreground animate-pulse">
        Understanding your emotions...
      </p>

    </div>
  );
};

export default Loader;