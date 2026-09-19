import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { fetchWeather, fetchMarketPrices } from "../services/api";
import { WeatherData, MarketPrice } from "../types";
import { Camera, CloudRain, Thermometer, Wind, Droplets, TrendingUp, Users, Truck, Warehouse, Calendar, ArrowRight, Sparkles, AlertTriangle, ShieldAlert } from "lucide-react";
import { VoiceReader } from "../components/VoiceReader";

export const Home: React.FC = () => {
  const { farmer, t, setActiveTab, setIsAiModalOpen, language } = useApp();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      const wData = await fetchWeather();
      setWeather(wData);
      const mData = await fetchMarketPrices();
      setMarketPrices(mData.slice(0, 4));
      setLoading(false);
    }
    loadHomeData();
  }, []);

  const getLocalizedWeatherCond = () => {
    if (!weather) return "";
    if (language === "te") return weather.condition_te || weather.condition;
    if (language === "hi") return weather.condition_hi || weather.condition;
    return weather.condition;
  };

  const getLocalizedAdvice = () => {
    if (!weather) return "";
    if (language === "te") return weather.advice_te || weather.advice_en;
    if (language === "hi") return weather.advice_hi || weather.advice_en;
    return weather.advice_en;
  };

  return (
    <div className="space-y-5 pb-8 max-w-md mx-auto">
      {/* Top Greeting */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#1E5128] via-[#2E6B3A] to-[#1E5128] p-4 rounded-2xl text-white shadow-lg border border-[#3E8B4A]/50">
        <div>
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">{t("good_morning")}</span>
          <h2 className="text-xl font-extrabold text-white leading-tight">{farmer.full_name}</h2>
          <p className="text-xs text-emerald-200 mt-0.5">
            ?? {farmer.village}, {farmer.district} • <span className="font-semibold text-amber-200">{farmer.main_crop}</span> ({farmer.farm_size_acres} Acres)
          </p>
        </div>

        <button
          onClick={() => setIsAiModalOpen(true)}
          className="p-3 bg-amber-400 text-gray-900 rounded-2xl font-bold text-xs flex flex-col items-center shadow-lg hover:scale-105 transition"
        >
          <Sparkles className="w-5 h-5 text-gray-900 mb-0.5" />
          <span>Ask AI</span>
        </button>
      </div>

      {/* Weather Intelligence Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-[#1E5128] to-emerald-950 rounded-3xl p-5 text-white shadow-xl border border-emerald-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <CloudRain className="w-32 h-32 text-amber-300" />
        </div>

        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Live Weather Intelligence</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-amber-300 text-[10px] font-bold border border-emerald-400/40">
                Open-Meteo API
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-amber-300 mt-1">
              {weather ? `${weather.temperature}°C` : "28.5°C"}
            </h3>
            <p className="text-sm font-semibold text-emerald-100">{getLocalizedWeatherCond()}</p>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-emerald-300">Rain Prob.</span>
            <div className="text-lg font-bold text-amber-300 flex items-center justify-end space-x-1">
              <CloudRain className="w-4 h-4 text-sky-400" />
              <span>{weather ? `${weather.rain_probability}%` : "65%"}</span>
            </div>
          </div>
        </div>

        {/* Weather Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 bg-emerald-950/60 p-2.5 rounded-2xl border border-emerald-800/60 text-xs mb-3">
          <div className="flex items-center space-x-1.5 text-emerald-200">
            <Droplets className="w-4 h-4 text-sky-400" />
            <div>
              <span className="text-[10px] text-gray-400 block">Humidity</span>
              <span className="font-bold text-white">{weather ? `${weather.humidity}%` : "74%"}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-emerald-200">
            <Wind className="w-4 h-4 text-amber-300" />
            <div>
              <span className="text-[10px] text-gray-400 block">Wind</span>
              <span className="font-bold text-white">{weather ? `${weather.wind_speed} km/h` : "12 km/h"}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-emerald-200">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <div>
              <span className="text-[10px] text-gray-400 block">Status</span>
              <span className="font-bold text-emerald-300 text-[11px]">Updated</span>
            </div>
          </div>
        </div>

        {/* Weather Farm Advice */}
        <div className="bg-amber-400/10 border border-amber-400/30 p-3 rounded-2xl text-xs text-amber-100">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-amber-300 flex items-center space-x-1">
              <span>?? {t("today_advice")}</span>
            </span>
            <VoiceReader text={getLocalizedAdvice()} />
          </div>
          <p className="leading-relaxed">{getLocalizedAdvice()}</p>
        </div>
      </div>

      {/* Weather Alerts if present */}
      {weather && weather.alerts && weather.alerts.length > 0 && (
        <div className="bg-red-900/10 border border-red-500/30 p-3.5 rounded-2xl text-xs text-red-900 flex items-start space-x-3 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-red-700 block mb-0.5">{weather.alerts[0].title_te || weather.alerts[0].title}</span>
            <p className="text-gray-700 leading-snug">{weather.alerts[0].message_te || weather.alerts[0].message_en}</p>
          </div>
        </div>
      )}

      {/* Primary CTA Button: CHECK MY CROP */}
      <button
        onClick={() => setActiveTab("crop")}
        className="w-full p-4 bg-gradient-to-r from-[#1E5128] via-[#2E6B3A] to-[#1E5128] text-white rounded-3xl shadow-xl border-2 border-amber-400 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] transition"
      >
        <div className="flex items-center space-x-3 text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-900 flex items-center justify-center shadow-lg">
            <Camera className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-amber-300 leading-none">{t("check_my_crop")}</h3>
            <p className="text-xs text-emerald-100 mt-1">Camera AI Plant Identification & Disease Care</p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-amber-300">
          <ArrowRight className="w-5 h-5" />
        </div>
      </button>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-sm font-extrabold text-gray-800 mb-3 uppercase tracking-wider">Quick Actions & Services</h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => setActiveTab("market")}
            className="p-3.5 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:border-emerald-400 transition text-left flex items-center space-x-3"
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 text-[#1E5128]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">{t("market_prices")}</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Live Mandi Trends</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("market")}
            className="p-3.5 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:border-emerald-400 transition text-left flex items-center space-x-3"
          >
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">{t("find_buyers")}</span>
              <span className="text-[10px] text-gray-500">Verified Buyers & FPOs</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("work")}
            className="p-3.5 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:border-emerald-400 transition text-left flex items-center space-x-3"
          >
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">{t("farm_workers")}</span>
              <span className="text-[10px] text-blue-700 font-semibold">Coordinator Booking</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("market")}
            className="p-3.5 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:border-emerald-400 transition text-left flex items-center space-x-3"
          >
            <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800">
              <Warehouse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">{t("cold_storage")}</span>
              <span className="text-[10px] text-gray-500">Map Storage & Transport</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mandi Prices Preview Card */}
      <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center space-x-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Latest Market Prices (???? ????)</span>
          </h4>
          <button
            onClick={() => setActiveTab("market")}
            className="text-xs font-bold text-[#1E5128] hover:underline"
          >
            View All ?
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          {marketPrices.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 transition">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="font-bold text-gray-900">{item.crop_te || item.crop}</span>
                <span className="text-[10px] text-gray-400">({item.mandi})</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-[#1E5128]">?{item.price.toLocaleString()}</span>
                <span className="text-[10px] text-gray-500"> / {item.unit}</span>
                <span className="ml-1 text-[10px] font-bold text-emerald-600">+{item.change_pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
