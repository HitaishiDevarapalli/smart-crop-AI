import React, { useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { FastForward, Volume2, VolumeX, Play } from "lucide-react";

export const Splash: React.FC = () => {
  const { setScreen } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleFinishIntro = () => {
    setScreen("language");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center overflow-hidden select-none font-sans">
      {/* Background Video Player */}
      {!hasError ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isMuted}
          onEnded={handleFinishIntro}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover sm:object-contain bg-black"
        >
          <source src="/WhatsApp%20Video%202026-09-19%20at%204.04.59%20PM.mov" type="video/mp4" />
          <source src="/WhatsApp Video 2026-09-19 at 4.04.59 PM.mov" type="video/quicktime" />
          Your browser does not support full screen intro video.
        </video>
      ) : (
        /* Fallback graphic if video format is unplayable on device */
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E5128] via-[#16421F] to-[#0D2813] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-24 h-24 rounded-3xl bg-white p-2 shadow-2xl flex items-center justify-center border-2 border-amber-400">
            <img src="/logo.png" alt="Sanjeevani" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            సంజీవని <span className="text-amber-300">SANJEEVANI</span>
          </h1>
          <p className="text-xs text-emerald-200 font-medium max-w-xs">
            "From Crop Care to Market — Your Farming Saathi."
          </p>
        </div>
      )}

      {/* Top Header Overlay */}
      <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
            SANJEEVANI • Official Platform Intro
          </span>
        </div>

        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="pointer-events-auto p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full border border-white/30 backdrop-blur-md transition cursor-pointer"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-amber-300" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
        </button>
      </div>

      {/* BOTTOM RIGHT: SKIP INTRO BUTTON */}
      <div className="absolute bottom-8 right-8 z-50">
        <button
          onClick={handleFinishIntro}
          className="px-6 py-3 bg-emerald-600/90 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base rounded-full shadow-2xl border-2 border-amber-400 flex items-center space-x-2 backdrop-blur-md cursor-pointer transition active:scale-95 group hover:shadow-emerald-500/50"
        >
          <span>Skip Intro</span>
          <FastForward className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Splash;
