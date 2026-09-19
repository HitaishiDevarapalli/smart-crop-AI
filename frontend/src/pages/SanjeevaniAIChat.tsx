import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Bot, Mic, MicOff, Send, X, Volume2, Sparkles, User } from "lucide-react";
import { askSanjeevaniAI } from "../services/api";
import { VoiceReader } from "../components/VoiceReader";

export const SanjeevaniAIChat: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, farmer, language, t } = useApp();
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: language === "te"
        ? `?????? ${farmer.full_name}! ???? ?? ??????? AI ??????? ??????????. ?? ${farmer.main_crop} ??? ???????, ???????? ???? ???????? ???????? ??????? ????? ????????????.`
        : language === "hi"
        ? `?????? ${farmer.full_name}! ??? ???? ??????? AI ???? ???? ???? ???? ${farmer.main_crop} ???, ???? ?? ???? ??? ?? ???? ??? ??????`
        : `Hello ${farmer.full_name}! I am your Sanjeevani AI farming assistant. Ask me anything about your ${farmer.main_crop} crop, weather, or market sales.`
    }
  ]);

  if (!isAiModalOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg = { sender: "user" as const, text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    const reply = await askSanjeevaniAI(textToSend, language, farmer.main_crop);
    setLoading(false);
    setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please type your question.");
      return;
    }

    const recognition = new SpeechRecognition();
    if (language === "te") recognition.lang = "te-IN";
    else if (language === "hi") recognition.lang = "hi-IN";
    else recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md h-[90vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E5128] via-[#2E6B3A] to-[#1E5128] p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-gray-900 flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-amber-300">Sanjeevani AI</h3>
              <p className="text-[11px] text-emerald-200">Your farming assistant • {farmer.main_crop} Context Active</p>
            </div>
          </div>

          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === "user" ? "bg-amber-500 text-gray-900" : "bg-[#1E5128] text-amber-300"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-[80%] shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#1E5128] text-white rounded-tr-none font-medium"
                    : "bg-white border border-emerald-100 text-gray-800 rounded-tl-none font-normal space-y-1.5"
                }`}
              >
                <p className="leading-relaxed text-xs">{msg.text}</p>
                {msg.sender === "ai" && <VoiceReader text={msg.text} label="Listen Voice" />}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs p-2">
              <Sparkles className="w-4 h-4 animate-spin text-amber-500" />
              <span>Sanjeevani is thinking...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 bg-emerald-50/70 border-t border-emerald-100 flex space-x-1.5 overflow-x-auto text-[11px] no-scrollbar">
          {["Is rain expected today?", "Where to sell Tomato?", "Worker availability?"].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1 rounded-full bg-white border border-emerald-300 text-[#1E5128] font-bold whitespace-nowrap shadow-sm hover:bg-emerald-100"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice Mic */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
          <button
            onClick={startVoiceInput}
            className={`p-3 rounded-full text-white font-bold transition shadow ${
              isListening ? "bg-red-600 animate-bounce" : "bg-amber-500 hover:bg-amber-400 text-gray-900"
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Sanjeevani (????? ???? ???? ??????)..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-xs font-semibold outline-none focus:border-[#1E5128]"
          />

          <button
            onClick={() => handleSend()}
            className="p-3 rounded-full bg-[#1E5128] hover:bg-[#16421F] text-amber-300 shadow"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
