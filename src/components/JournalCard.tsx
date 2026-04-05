import { Sparkles, Loader2, Mic, MicOff, Check, X } from "lucide-react";
import { useState, useRef } from "react";

interface JournalCardProps {
  onAnalyze: (text: string) => void;
  isAnalyzing?: boolean;
}

const JournalCard = ({ onAnalyze, isAnalyzing }: JournalCardProps) => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Use supported format
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setIsTranscribing(true);
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        
        try {
          const formData = new FormData();
          // Always use .wav extension — Groq accepts this
          formData.append("file", audioBlob, "recording.wav");
          formData.append("model", "whisper-large-v3-turbo");
          

          const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            },
            body: formData,
          });

          const data = await response.json();
          console.log("Transcription response:", data);
          
          if (data.text) {
            setPreviewText(data.text);
            setShowPreview(true);
          } else {
            console.error("No text in response:", data);
            alert("Could not transcribe. Please try again!");
          }
        } catch (err) {
          console.error("Transcription error:", err);
          alert("Transcription failed. Please try again!");
        } finally {
          setIsTranscribing(false);
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("Please allow microphone access!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const confirmPreview = () => {
    setText(prev => prev ? prev + " " + previewText : previewText);
    setPreviewText("");
    setShowPreview(false);
  };

  const cancelPreview = () => {
    setPreviewText("");
    setShowPreview(false);
  };

  return (
    <div className="relative group h-full">

      {/* Glow Border */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>

      {/* Main Card */}
      <div className="relative bg-[#0f172a]/80 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col gap-6 h-full transition duration-500 group-hover:scale-[1.01]">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white tracking-wide">
            Journal Entry
          </h2>
          <span className="text-xs text-gray-400">
            {text.length} chars
          </span>
        </div>

        {/* Textarea */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-xl opacity-50"></div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing your thoughts... or use the mic 🎙️"
            className="relative w-full h-full min-h-[260px] resize-none rounded-2xl bg-[#020617]/80 p-5 text-gray-200 placeholder:text-gray-500 text-[15px] leading-relaxed focus:outline-none border border-white/5 focus:border-purple-400 transition"
          />
        </div>

        {/* Voice Preview */}
        {showPreview && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-xs text-purple-300 font-medium">🎙️ Review your recording:</p>
            <p className="text-sm text-gray-200 leading-relaxed">{previewText}</p>
            <div className="flex gap-2">
              <button
                onClick={confirmPreview}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition"
              >
                <Check className="w-3.5 h-3.5" />
                Add to journal
              </button>
              <button
                onClick={cancelPreview}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-sm font-medium hover:bg-rose-500/30 transition"
              >
                <X className="w-3.5 h-3.5" />
                Discard
              </button>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            {/* Mic Button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isTranscribing || isAnalyzing}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition duration-300 ${
                isRecording
                  ? "bg-rose-500 shadow-lg shadow-rose-500/40 animate-pulse"
                  : "bg-white/10 hover:bg-white/20 border border-white/10"
              }`}
            >
              {isTranscribing ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : isRecording ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-gray-300" />
              )}
            </button>

            <p className="text-xs text-gray-500 hidden md:block">
              {isRecording ? "🔴 Recording... tap to stop" : isTranscribing ? "Transcribing..." : "AI will analyze mood instantly"}
            </p>
          </div>

          {/* Analyze Button */}
          <button
            onClick={() => onAnalyze(text)}
            disabled={isAnalyzing || !text.trim()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:scale-110 hover:shadow-pink-500/40 transition duration-300 flex items-center gap-2 disabled:opacity-40 disabled:hover:scale-100"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default JournalCard;