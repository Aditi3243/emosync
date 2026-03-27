import { Brain } from "lucide-react";

const tabs = ["Dashboard", "History", "Chat"];

const Header = () => {
  return (
    <header className="glass-card px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center">
          <Brain className="w-5 h-5" />
        </div>
        <span className="font-display font-bold text-lg text-foreground tracking-tight">
          EmoSync
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              i === 0
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="status-dot" />
        <span className="font-medium">AI Active</span>
      </div>
    </header>
  );
};

export default Header;
