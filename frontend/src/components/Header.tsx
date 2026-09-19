import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Sprout, Bell, Globe, User, Home, ShieldCheck, ChevronDown, Check, Leaf, TrendingUp, Users, Search, Sparkles } from "lucide-react";
import { Language } from "../types";

export const Header: React.FC = () => {
  const { language, setLanguage, t, unreadCount, farmer, activeTab, setActiveTab, setScreen, screen } = useApp();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const searchPlaceholders = [
    "Search 'Tomato Early Blight'...",
    "Search 'Guntur Mandi Prices'...",
    "Search 'Sri Lakshmi Buyers'...",
    "Search 'Cold Storage Near Me'...",
    "Search 'Paddy Harvest Workers'...",
    "Search 'PM Kisan Scheme'...",
    "Search 'Drone Spraying'..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const searchSuggestions = [
    { type: "crop", icon: "🔬", title: "Tomato Early Blight Treatment", target: () => { setScreen("main"); setActiveTab("crop"); } },
    { type: "crop", icon: "🌿", title: "Chilli Leaf Curl Virus Guide", target: () => { setScreen("main"); setActiveTab("crop"); } },
    { type: "market", icon: "🛒", title: "Guntur Mandi Tomato Prices (₹2,800/qtl)", target: () => { setScreen("main"); setActiveTab("market"); } },
    { type: "market", icon: "🌶️", title: "Chilli Teja Rates (₹15,500/qtl)", target: () => { setScreen("main"); setActiveTab("market"); } },
    { type: "buyer", icon: "🏢", title: "Sri Lakshmi Agri Processing Buyers", target: () => { setScreen("main"); setActiveTab("market"); } },
    { type: "fpo", icon: "🏛️", title: "Amaravathi Farmers Producer Co (FPO)", target: () => { setScreen("main"); setActiveTab("market"); } },
    { type: "storage", icon: "❄️", title: "Sri Lakshmi Cold Storage (120 MT Free)", target: () => { setScreen("main"); setActiveTab("market"); } },
    { type: "work", icon: "👨‍🌾", title: "Book Harvesting Workers (₹500/day)", target: () => { setScreen("main"); setActiveTab("work"); } },
    { type: "scheme", icon: "📜", title: "PM Kisan Samman Nidhi (₹6,000/yr)", target: () => { setScreen("main"); setActiveTab("market"); } },
    { type: "machinery", icon: "🚜", title: "Mahindra 575 Tractor Rental (₹600/hr)", target: () => { setScreen("main"); setActiveTab("market"); } }
  ];

  const filteredSuggestions = searchQuery.trim() === ""
    ? searchSuggestions.slice(0, 5)
    : searchSuggestions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleGlobalSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return;

    if (q.includes("buyer") || q.includes("procurement") || q.includes("wholesaler") || q.includes("exporter") || q.includes("sri lakshmi")) {
      setScreen("main");
      setActiveTab("market");
    } else if (q.includes("price") || q.includes("mandi") || q.includes("rate") || q.includes("guntur")) {
      setScreen("main");
      setActiveTab("market");
    } else if (q.includes("storage") || q.includes("cold") || q.includes("warehouse")) {
      setScreen("main");
      setActiveTab("market");
    } else if (q.includes("worker") || q.includes("labor") || q.includes("labour") || q.includes("harvesting") || q.includes("srinivas")) {
      setScreen("main");
      setActiveTab("work");
    } else if (q.includes("disease") || q.includes("blight") || q.includes("leaf") || q.includes("pest") || q.includes("crop check")) {
      setScreen("main");
      setActiveTab("crop");
    } else if (q.includes("pdf") || q.includes("resource") || q.includes("form") || q.includes("manual") || q.includes("pm kisan") || q.includes("kcc loan") || q.includes("calculator")) {
      setScreen("resources");
    } else {
      setScreen("main");
      setActiveTab("market");
    }
  };

  const langLabels: Record<Language, string> = {
    en: "English",
    te: "తెలుగు",
    hi: "हिन्दी"
  };

  const navItems = [
    { id: "home", label: t("home"), action: () => setScreen("landing") },
    { id: "crop", label: "Crop Care", action: () => { setScreen("main"); setActiveTab("crop"); } },
    { id: "market_prices", label: "Market Prices", action: () => { setScreen("main"); setActiveTab("market"); } },
    { id: "buyers_fpos", label: "Buyers & FPOs", action: () => { setScreen("main"); setActiveTab("market"); } },
    { id: "storage_logistics", label: "Storage & Logistics", action: () => { setScreen("main"); setActiveTab("market"); } },
    { id: "resources", label: "Resources", action: () => setScreen("resources") },
    { id: "admin", label: "🛡️ Admin Master", action: () => setScreen("admin") },
    { id: "contact", label: "Contact us", action: () => { setScreen("main"); setActiveTab("work"); } }
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-md select-none font-sans">
      {/* 1. TOP PASTEL GREEN BAR */}
      <div className="bg-gradient-to-r from-[#5B8C46] via-[#669850] to-[#4F7D3C] text-white py-2.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shadow-sm">
        {/* Left: Brand Logo & Title */}
        <div 
          className="flex items-center space-x-3 cursor-pointer shrink-0"
          onClick={() => setScreen("landing")}
        >
          <img 
            src="/logo.png" 
            alt="SANJEEVANI Logo" 
            className="w-9 h-9 object-contain bg-white rounded-lg p-0.5 shadow-xs" 
          />
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight leading-none text-white">
              SANJEEVANI
            </h1>
            <p className="text-[10px] text-emerald-100 font-medium tracking-tight mt-0.5">
              Direct Market & Crop Care
            </p>
          </div>
        </div>

        {/* Center: Search Bar with Form Submit & SEO Dropdown */}
        <div className="flex-1 max-w-xl mx-2 hidden sm:block relative">
          <form onSubmit={handleGlobalSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder={searchPlaceholders[placeholderIndex]}
              className="w-full bg-white text-gray-900 text-xs px-4 py-2 rounded-full shadow-inner focus:outline-none placeholder-gray-400 font-semibold pr-10 transition-all duration-300"
            />
            <button 
              type="submit"
              className="absolute right-1 w-7 h-7 bg-[#2E4A23] text-white rounded-full flex items-center justify-center hover:bg-[#1E3316] transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* LIVE SEO SEARCH SUGGESTIONS DROPDOWN */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 p-2 text-xs space-y-1">
              <div className="flex items-center justify-between px-3 py-1 text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 rounded-lg">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>SEO Search Suggestions</span>
                </span>
                <span>Instant Direct Results</span>
              </div>

              {filteredSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onMouseDown={() => {
                    setSearchQuery(item.title);
                    item.target();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 flex items-center space-x-2.5 transition group cursor-pointer"
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span className="font-bold text-gray-800 group-hover:text-[#5B8C46] truncate">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Status & Controls */}
        <div className="flex items-center space-x-3 shrink-0 text-xs">
          {/* Online Pill */}
          <div className="hidden md:flex items-center space-x-1.5 bg-[#487537] text-emerald-100 px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-300/30">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>• Online</span>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1.5 bg-white/90 hover:bg-white text-gray-800 px-3 py-1 rounded-full font-extrabold text-xs shadow-xs transition"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span>{langLabels[language]}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 py-1 z-50 overflow-hidden text-xs">
                {(["en", "te", "hi"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 transition flex items-center justify-between ${
                      language === lang ? "font-bold text-[#5B8C46] bg-emerald-50" : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span>{langLabels[lang]}</span>
                    {language === lang && <Check className="w-3.5 h-3.5 text-[#5B8C46]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <button
            onClick={() => {
              setActiveTab("profile");
              setScreen("main");
            }}
            className="flex items-center space-x-1.5 bg-[#487537] hover:bg-[#3C632C] text-white px-3 py-1 rounded-full text-xs font-bold border border-emerald-300/30 transition"
          >
            <span className="w-2 h-2 rounded-full bg-amber-300"></span>
            <span className="truncate max-w-[100px]">{farmer.full_name.split(' ')[0]}</span>
            <span className="bg-[#335328] text-[9px] px-1.5 py-0.5 rounded text-emerald-200 uppercase font-bold">Farmer</span>
          </button>
        </div>
      </div>

      {/* 2. SECONDARY PASTEL FOREST NAV BAR */}
      <div className="bg-[#335328] text-gray-100 py-1.5 border-b border-[#29441F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center space-x-6 text-xs sm:text-sm font-extrabold overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = (item.id === "home" && screen === "landing") || (item.id === "crop" && activeTab === "crop" && screen === "main") || (item.id === "market_prices" && activeTab === "market" && screen === "main");
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`py-1 px-3 rounded-md transition whitespace-nowrap ${
                  isActive
                    ? "bg-white/20 text-white font-black border-b-2 border-amber-300"
                    : "hover:text-amber-200 text-stone-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
