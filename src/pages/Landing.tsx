import PageWrapper from "@/components/PageWrapper";
import { useNavigate } from "react-router-dom";
import { Brain, Heart, Shield, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    desc: "Understands your emotions in real-time using advanced AI.",
  },
  {
    icon: Heart,
    title: "Wellness Tracking",
    desc: "Visualize your mood & stress patterns beautifully.",
  },
  {
    icon: Shield,
    title: "Safe & Private",
    desc: "Your emotional data is secure and stays with you.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white relative overflow-hidden">

        {/* 🔥 Background Glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/30 blur-[140px] rounded-full animate-pulse-slow" />
        <div className="absolute top-[40%] left-[60%] w-60 h-60 bg-blue-500/20 blur-[100px] rounded-full animate-float" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

          {/* 💎 LOGO + APP NAME */}
          <div className="mb-6 animate-fade-up flex flex-col items-center gap-3">
            <img
              src={logo}
              alt="EmoSync Logo"
              style={{ height: "220px", width: "auto" }}
              className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            />
            <span className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              EmoSync
            </span>
          </div>

          {/* 🧠 HEADING */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl animate-fade-up">
            Your AI-Powered{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Emotional Wellness
            </span>{" "}
            Companion
          </h1>

          {/* 💬 SUBTEXT */}
          <p className="mt-6 text-gray-400 max-w-xl text-lg animate-fade-up">
            Journal your thoughts, understand your emotions, and get AI-powered insights — all in one calm, beautiful space.
          </p>

          {/* 🚀 CTA */}
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:scale-110 hover:shadow-pink-500/40 transition duration-300 flex items-center gap-2 animate-fade-up"
          >
            Let's Get Started
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* 💎 FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:-translate-y-2 hover:scale-[1.03] transition duration-300 animate-fade-up"
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-40 blur-md transition"></div>

                <div className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <f.icon className="w-6 h-6 text-purple-300" />
                  </div>

                  <h3 className="font-semibold text-white mb-2">
                    {f.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <p className="text-xs text-gray-500 mt-16 animate-fade-up">
            Built with ❤️ for your emotional wellbeing
          </p>

        </div>
      </div>
    </PageWrapper>
  );
};

export default Landing;