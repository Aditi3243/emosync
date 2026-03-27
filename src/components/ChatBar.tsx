import { Send } from "lucide-react";
import { useState } from "react";

const ChatBar = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="glass-card-strong flex items-center gap-3 px-5 py-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
        <button
          className="gradient-send w-9 h-9 flex items-center justify-center flex-shrink-0"
          onClick={() => setMessage("")}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatBar;
