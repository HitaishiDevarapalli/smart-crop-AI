import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Sprout, Bell, Globe, User } from "lucide-react";
import { Language } from "../types";

export const Header: React.FC = () => {
  const { language, setLanguage, t, unreadCount, farmer, setActiveTab, setScreen } = useApp();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const langLabels: Record<Language, string> = {
    te: "??????",
    hi: "??????",
    en: "English"
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1E5128] text-white shadow-md border-b border-[#2E6B3A] px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center space-x-2.5 cursor-pointer"
          onClick={() => {
            setActiveTab("home");
            setScreen("main");
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4E9F3D] to-[#1E5128] flex items-center justify-center shadow-md border border-white/20">
            <Sprout className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wide text-white leading-tight font-sans">
              ??????? <span className="text-amber-300 text-xs font-normal">Sanjeevani</span>
            </h1>
            <p className="text-[10px] text-emerald-200 font-medium tracking-tight">
              {t("tagline")}
            </p>
          </div>
        </div>

        {/* Right Action Icons: Language Selector, Notifications, Farmer Avatar */}
        <div className="flex items-center space-x-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1.5 bg-emerald-900/60 border border-emerald-600/50 hover:bg-emerald-800 text-xs px-2.5 py-1.5 rounded-full font-medium transition"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{langLabels[language]}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 py-1 z-50 overflow-hidden text-sm">
                {(["te", "hi", "en"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-emerald-50 transition flex items-center justify-between ${
                      language === lang ? "font-bold text-[#1E5128] bg-emerald-50/80" : ""
                    }`}
                  >
                    <span>{langLabels[lang]}</span>
                    {language === lang && <span className="text-xs text-amber-600">?</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <button 
            onClick={() => setActiveTab("home")}
            className="relative p-2 rounded-full bg-emerald-900/40 border border-emerald-600/40 hover:bg-emerald-800 text-white transition"
          >
            <Bell className="w-4 h-4 text-emerald-100" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-400 text-gray-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#1E5128]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Farmer Profile Avatar */}
          <button
            onClick={() => setActiveTab("profile")}
            className="w-9 h-9 rounded-full bg-amber-400/20 border-2 border-amber-400 overflow-hidden flex items-center justify-center text-amber-300 hover:opacity-90 transition"
          >
            {farmer.profile_photo_url ? (
              <img src={farmer.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-amber-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
