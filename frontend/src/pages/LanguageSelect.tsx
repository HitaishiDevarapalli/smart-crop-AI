import React from "react";
import { useApp } from "../context/AppContext";
import { Language } from "../types";
import { Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const LanguageSelect: React.FC = () => {
  const { language, setLanguage, setScreen } = useApp();

  const languages: Array<{ id: Language; native: string; english: string; sub: string }> = [
    { id: "te", native: "??????", english: "Telugu", sub: "????????????, ??????? ????? ?????" },
    { id: "hi", native: "??????", english: "Hindi", sub: "????? ??? ???? ???? ?? ??????? ?? ???" },
    { id: "en", native: "English", english: "English", sub: "For English medium farmers & coordinators" }
  ];

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setScreen("onboarding");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] via-emerald-50/30 to-emerald-100/40 p-6 flex flex-col justify-between max-w-md mx-auto">
      <div className="pt-6">
        <div className="flex items-center space-x-2 text-[#1E5128] mb-2">
          <Globe className="w-6 h-6 text-emerald-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Select Language / ????? ?????????</span>
        </div>
        
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
          Choose Your Preferred Language
        </h2>
        
        <p className="text-sm text-gray-600 mb-8">
          Sanjeevani is customized to guide you in your native language with voice support.
        </p>

        {/* Large Language Cards */}
        <div className="space-y-4">
          {languages.map((item) => {
            const isSelected = language === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(item.id)}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 shadow-sm flex items-center justify-between ${
                  isSelected
                    ? "bg-white border-[#1E5128] shadow-md ring-2 ring-emerald-600/20"
                    : "bg-white border-gray-200 hover:border-emerald-300"
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-[#1E5128]">{item.native}</span>
                    <span className="text-xs font-semibold text-gray-500">({item.english})</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                </div>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? "bg-[#1E5128] text-amber-300" : "bg-gray-100 text-gray-400"
                }`}>
                  {isSelected ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="pb-6">
        <button
          onClick={() => setScreen("onboarding")}
          className="w-full py-4 bg-[#1E5128] hover:bg-[#16421F] text-white font-bold rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition"
        >
          <span>Continue / ??????? ??????</span>
          <ArrowRight className="w-5 h-5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
