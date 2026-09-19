import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Sprout, Sun } from "lucide-react";
import { motion } from "framer-motion";

export const Splash: React.FC = () => {
  const { setScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen("language");
    }, 2800);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#1E5128] via-[#16421F] to-[#0D2813] text-white flex flex-col items-center justify-between p-8 overflow-hidden select-none">
      {/* Background Animated Rays */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-400 blur-3xl animate-pulse"></div>
      </div>

      {/* Top Sunrise Element */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-8 flex flex-col items-center"
      >
        <div className="relative">
          <Sun className="w-16 h-16 text-amber-300 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full"></div>
        </div>
      </motion.div>

      {/* Center Brand Animation */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col items-center text-center z-10"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#4E9F3D] to-[#1E5128] flex items-center justify-center shadow-2xl border-2 border-amber-400/50 mb-6">
          <Sprout className="w-14 h-14 text-amber-300" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-wide text-white mb-2 font-sans">
          ??????? <span className="text-amber-300 text-2xl">Sanjeevani</span>
        </h1>
        
        <p className="text-sm font-medium text-emerald-200 tracking-wide max-w-xs">
          "From Crop Care to Market — Your Farming Companion."
        </p>

        <div className="mt-8 flex items-center space-x-2 bg-emerald-900/60 border border-emerald-600/40 px-4 py-1.5 rounded-full text-xs text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>AI-Powered Plant Health & Market Platform</span>
        </div>
      </motion.div>

      {/* Footer loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-6 flex flex-col items-center text-xs text-emerald-300/80"
      >
        <div className="w-32 h-1.5 bg-emerald-950 rounded-full overflow-hidden mb-2">
          <div className="w-full h-full bg-gradient-to-r from-amber-400 to-emerald-400 animate-[pulse_1.5s_infinite]"></div>
        </div>
        <span>Loading Sanjeevani Engine...</span>
      </motion.div>
    </div>
  );
};
