import logo from '@/assets/logo.png';
import { LayoutDashboard, Clock, MessageCircle } from "lucide-react";

const tabs = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "History", icon: Clock },
  { label: "Chat", icon: MessageCircle },
];

const Header = () => {
  return (
    <header className="glass-card px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
          <img 
            src={logo} 
            alt="EmoSync Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-lg text-primary leading-tight tracking-tight">
            EmoSync
          </span>
          <span className="text-xs text-muted-foreground leading-tight">AI-Powered Emotional Wellness</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-1">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              i === 0
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/50">
        <span className="status-dot" />
        <span className="font-medium text-sm text-foreground">AI Active</span>
      </div>
    </header>
  );
};

export default Header;