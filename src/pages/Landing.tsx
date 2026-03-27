import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, Heart, Shield, ArrowRight } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Analysis", desc: "Advanced emotional intelligence understands your feelings in real-time" },
  { icon: Heart, title: "Wellness Tracking", desc: "Track your mood and stress patterns with beautiful visualizations" },
  { icon: Shield, title: "Safe & Private", desc: "Your emotional data stays secure and completely private" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg animate-gradient-shift relative overflow-hidden">
      {/* Dreamy floating orbs */}
      <div className="absolute top-10 left-[10%] w-96 h-96 rounded-full bg-emo-purple/20 blur-[100px] animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-[5%] w-[500px] h-[500px] rounded-full bg-emo-pink/15 blur-[120px] pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emo-blue/15 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl gradient-btn flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="font-display font-bold text-4xl md:text-5xl text-primary tracking-tight">
            EmoSync
          </span>
        </div>

        {/* Tagline */}
        <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-center text-foreground max-w-3xl leading-tight mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Your AI-Powered
          <span className="bg-gradient-to-r from-emo-purple to-emo-pink bg-clip-text text-transparent"> Emotional Wellness </span>
          Companion
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Journal your thoughts, understand your emotions, and get personalized AI wellness insights — all in a calm, beautiful space.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="gradient-btn px-8 py-4 text-lg flex items-center gap-3 group animate-fade-in shadow-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Let's Get Started
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card-strong p-6 text-center hover:scale-[1.03] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground/60 mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          Built with ❤️ for your emotional wellbeing
        </p>
      </div>
    </div>
  );
};

export default Landing;
