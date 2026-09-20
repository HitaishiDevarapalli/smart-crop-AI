import React, { useRef, useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { FastForward, Volume2, VolumeX, Play, Pause, RotateCcw, ArrowRight } from "lucide-react";

export const Splash: React.FC = () => {
  const { setScreen } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay with sound might be blocked by browser policy; fallback to muted autoplay
        setIsMuted(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => setHasError(true));
        }
      });
    }
  }, []);

  const handleFinishIntro = () => {
    setScreen("auth");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
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
          <source src="/intro.mp4" type="video/mp4" />
          <source src="/intro.mov" type="video/quicktime" />
          <source src="/WhatsApp%20Video%202026-09-19%20at%204.04.59%20PM.mov" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      ) : (
        /* Fallback graphic if video file is missing or unsupported */
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

      {/* Top Header Overlay Bar */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-50 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2.5 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
            SANJEEVANI • Platform Intro
          </span>
        </div>

        {/* Audio Mute/Unmute & Play/Pause Controls */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={togglePlayPause}
            className="p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full border border-white/30 backdrop-blur-md transition cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={handleReplay}
            className="p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full border border-white/30 backdrop-blur-md transition cursor-pointer"
            title="Replay Video"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !isMuted;
              }
              setIsMuted(!isMuted);
            }}
            className="p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full border border-white/30 backdrop-blur-md transition cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* BOTTOM ACTION BAR: SKIP / CONTINUE TO LOGIN */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-50">
        <button
          onClick={handleFinishIntro}
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-full shadow-2xl border-2 border-amber-400 flex items-center space-x-2 backdrop-blur-md cursor-pointer transition active:scale-95 group hover:shadow-emerald-500/50"
        >
          <span>Skip Intro & Login</span>
          <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Splash;
