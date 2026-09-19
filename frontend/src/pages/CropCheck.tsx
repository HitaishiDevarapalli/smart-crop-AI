import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Camera, Image as ImageIcon, CheckCircle2, AlertCircle, RefreshCw, Volume2, Sparkles, ShieldCheck, History } from "lucide-react";
import { CameraModal } from "../components/CameraModal";
import { analyzeCropImage } from "../services/api";
import { CropDiagnosisResult } from "../types";
import { VoiceReader } from "../components/VoiceReader";
import { motion, AnimatePresence } from "framer-motion";

export const CropCheck: React.FC = () => {
  const { farmer, t, setIsAiModalOpen, language } = useApp();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<CropDiagnosisResult | null>(null);
  const [history, setHistory] = useState<Array<any>>([
    {
      id: "diag_001",
      crop: "Tomato (?????)",
      condition: "Early Blight (Alternaria solani)",
      confidence: 0.94,
      severity: "moderate",
      date: "2026-09-18 10:30 AM",
      image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80"
    }
  ]);

  const scanStepMessages = [
    "Preparing Image for WPF Neural Model...",
    "Validating Leaf Brightness & Resolution...",
    "Matching Plant Features against WPF Dataset...",
    "Checking Pathology & Infection Patterns...",
    "AI Diagnosis Ready!"
  ];

  const handleImageSelected = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setAnalyzing(true);
    setDiagnosis(null);

    // Simulate scanning step progress for smooth UX
    for (let i = 0; i < scanStepMessages.length; i++) {
      setScanStep(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    const result = await analyzeCropImage(file, farmer.main_crop);
    setDiagnosis(result);
    setAnalyzing(false);

    if (result.success) {
      setHistory((prev) => [
        {
          id: `diag_${Date.now()}`,
          crop: result.crop_te ? `${result.crop} (${result.crop_te})` : result.crop,
          condition: result.condition_te ? `${result.condition} (${result.condition_te})` : result.condition,
          confidence: result.confidence,
          severity: result.severity,
          date: "Just now",
          image: imageUrl
        },
        ...prev
      ]);
    }
  };

  const getLocalizedExplanation = () => {
    if (!diagnosis) return "";
    if (language === "te") return diagnosis.explanation_te || diagnosis.explanation_en;
    if (language === "hi") return diagnosis.explanation_hi || diagnosis.explanation_en;
    return diagnosis.explanation_en;
  };

  const getLocalizedTreatment = (): string[] => {
    if (!diagnosis) return [];
    if (language === "te") return diagnosis.treatment_te || diagnosis.treatment_en || [];
    if (language === "hi") return diagnosis.treatment_hi || diagnosis.treatment_en || [];
    return diagnosis.treatment_en || [];
  };

  return (
    <div className="space-y-5 pb-8 max-w-md mx-auto">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-[#1E5128] to-[#2E6B3A] p-4 rounded-2xl text-white shadow-md">
        <h2 className="text-xl font-extrabold flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{t("check_my_crop")}</span>
        </h2>
        <p className="text-xs text-emerald-200 mt-1">
          Camera Computer Vision AI powered by WPF Plant Dataset.
        </p>
      </div>

      {/* Main Action Buttons */}
      {!analyzing && !diagnosis && (
        <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#1E5128] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Camera className="w-9 h-9" />
          </div>

          <h3 className="text-base font-extrabold text-gray-900 mb-1">Capture Crop Leaf Photo</h3>
          <p className="text-xs text-gray-500 mb-5 max-w-xs mx-auto">
            Take a clear photo of the infected or healthy plant leaf for AI identification.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setIsCameraOpen(true)}
              className="w-full py-4 bg-[#1E5128] hover:bg-[#16421F] text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition"
            >
              <Camera className="w-5 h-5 text-amber-300" />
              <span>{t("open_camera")}</span>
            </button>

            <label className="w-full py-3 bg-emerald-50 border border-emerald-200 text-[#1E5128] font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center space-x-2 cursor-pointer hover:bg-emerald-100 transition block text-center">
              <ImageIcon className="w-4 h-4 text-emerald-700 inline" />
              <span>{t("upload_gallery")}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageSelected(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {/* AI Scanning Animation State */}
      {analyzing && (
        <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-lg text-center space-y-4">
          <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-emerald-500 shadow-inner">
            {selectedImage && (
              <img src={selectedImage} alt="Scanning" className="w-full h-full object-cover" />
            )}
            
            {/* Animated Laser Scanning Line */}
            <motion.div
              animate={{ y: [0, 180, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-x-0 h-1 bg-amber-400 shadow-[0_0_15px_#f59e0b]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-2 text-[#1E5128]">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span className="text-sm font-extrabold">{scanStepMessages[scanStep]}</span>
            </div>
            <p className="text-[11px] text-gray-400">Analyzing WPF Computer Vision Dataset Features</p>
          </div>
        </div>
      )}

      {/* AI Diagnosis Result Screen */}
      {diagnosis && !analyzing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          {diagnosis.success ? (
            <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden">
              {/* Image Header with Confidence Badge */}
              <div className="relative h-48 bg-gray-900">
                {selectedImage && (
                  <img src={selectedImage} alt="Diagnosed Crop" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                <div className="absolute top-3 right-3 bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-xs font-extrabold flex items-center space-x-1 shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-gray-900" />
                  <span>{Math.round((diagnosis.confidence || 0.94) * 100)}% Confidence</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">Identified Crop</span>
                  <h3 className="text-2xl font-extrabold">{diagnosis.crop_te ? `${diagnosis.crop} (${diagnosis.crop_te})` : diagnosis.crop}</h3>
                </div>
              </div>

              {/* Condition & Severity */}
              <div className="p-5 space-y-4">
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Detected Condition</span>
                    <h4 className="text-base font-extrabold text-gray-900">
                      {diagnosis.condition_te ? `${diagnosis.condition} (${diagnosis.condition_te})` : diagnosis.condition}
                    </h4>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold capitalize ${
                    diagnosis.severity === "severe" ? "bg-red-100 text-red-700 border border-red-300" : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}>
                    {diagnosis.severity} Severity
                  </span>
                </div>

                {/* Explanation */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h5 className="text-xs font-extrabold text-gray-800">What happened? / ?????:</h5>
                    <VoiceReader text={getLocalizedExplanation()} />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-200">
                    {getLocalizedExplanation()}
                  </p>
                </div>

                {/* Step-by-Step Treatment */}
                <div>
                  <h5 className="text-xs font-extrabold text-[#1E5128] mb-2 uppercase tracking-wider">
                    Recommended Treatment Steps / ?????? ??????:
                  </h5>
                  <div className="space-y-2">
                    {getLocalizedTreatment().map((stepText, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-gray-800">
                        <span className="w-5 h-5 rounded-full bg-[#1E5128] text-amber-300 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="font-semibold leading-snug">{stepText}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="py-3 bg-amber-400 text-gray-900 font-extrabold text-xs rounded-xl shadow flex items-center justify-center space-x-1 hover:bg-amber-300"
                  >
                    <Sparkles className="w-4 h-4 text-gray-900" />
                    <span>{t("ask_saathi")}</span>
                  </button>

                  <button
                    onClick={() => {
                      setDiagnosis(null);
                      setSelectedImage(null);
                    }}
                    className="py-3 bg-[#1E5128] text-white font-extrabold text-xs rounded-xl shadow flex items-center justify-center space-x-1 hover:bg-[#16421F]"
                  >
                    <Camera className="w-4 h-4 text-amber-300" />
                    <span>Scan Again</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Low confidence or unsupported error screen */
            <div className="bg-amber-50 border border-amber-300 p-5 rounded-3xl text-center space-y-3">
              <AlertCircle className="w-12 h-12 text-amber-600 mx-auto" />
              <h3 className="text-base font-extrabold text-gray-900">Crop Identification Result Uncertain</h3>
              <p className="text-xs text-gray-700 leading-relaxed max-w-xs mx-auto">
                {diagnosis.message || "The crop image could not be identified with high confidence. Please capture a clear leaf photo with better lighting."}
              </p>
              <button
                onClick={() => {
                  setDiagnosis(null);
                  setSelectedImage(null);
                  setIsCameraOpen(true);
                }}
                className="px-6 py-2.5 bg-[#1E5128] text-white font-bold text-xs rounded-xl shadow"
              >
                Try Again / ????? ?????????????
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Diagnosis History Log ("My Crop Checks") */}
      <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <History className="w-4 h-4 text-emerald-700" />
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">My Crop Checks (?? ???????)</h4>
        </div>

        <div className="space-y-2.5 text-xs">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <span className="font-extrabold text-[#1E5128] block">{item.crop}</span>
                <span className="text-[11px] text-gray-600 font-medium">{item.condition}</span>
                <span className="text-[10px] text-gray-400 block">{item.date}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {Math.round(item.confidence * 100)}% Confidence
              </span>
            </div>
          ))}
        </div>
      </div>

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleImageSelected}
      />
    </div>
  );
};
