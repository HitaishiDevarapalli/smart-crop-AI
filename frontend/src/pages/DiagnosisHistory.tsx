import React from "react";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Calendar, ShieldCheck, Sprout, ChevronRight, Sparkles } from "lucide-react";

export const DiagnosisHistory: React.FC = () => {
  const { setScreen, setSelectedDiagnosis, setActiveTab, t } = useApp();

  const historyRecords = [
    {
      id: "diag_101",
      date: "2026-09-18 10:30 AM",
      crop: "Tomato",
      variety: "Arka Rakshak",
      disease: "Early Blight (Alternaria solani)",
      pest: null,
      confidence: 0.94,
      modelVersion: "wpf-v1.2.0",
      status: "Treating",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=400&q=80",
      treatment: [
        "Remove and destroy severely infected lower leaves.",
        "Ensure wide plant spacing for proper airflow and sunlight penetration.",
        "Apply organic neem oil solution (5ml/liter of water) during early morning.",
        "Avoid overhead irrigation to prevent leaf moisture buildup."
      ]
    },
    {
      id: "diag_102",
      date: "2026-09-12 04:15 PM",
      crop: "Chilli",
      variety: "Guntur Sannam",
      disease: "Chilli Leaf Curl Virus",
      pest: "Whitefly vector suspected",
      confidence: 0.89,
      modelVersion: "wpf-v1.2.0",
      status: "Resolved",
      image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=400&q=80",
      treatment: [
        "Install yellow sticky traps (10 traps per acre) to control whiteflies.",
        "Spray organic bio-pesticide Verticillium lecanii.",
        "Remove heavily stunted plants to stop virus transmission."
      ]
    },
    {
      id: "diag_103",
      date: "2026-09-02 09:00 AM",
      crop: "Cotton",
      variety: "Bt-II Hybrid",
      disease: "Healthy Leaf - No supported disease detected",
      pest: null,
      confidence: 0.97,
      modelVersion: "wpf-v1.2.0",
      status: "Healthy",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=80",
      treatment: [
        "Crop appears healthy! Maintain balanced NPK fertilization.",
        "Continue weekly field monitoring."
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setScreen("main")}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t("history")}</h1>
            <p className="text-xs text-gray-500">Past AI crop scanning records & treatment guidance</p>
          </div>
        </div>

        <button
          onClick={() => {
            setScreen("main");
            setActiveTab("crop");
          }}
          className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 hover:bg-emerald-700"
        >
          <Sprout className="w-4 h-4" />
          <span>New Scan</span>
        </button>
      </div>

      <div className="space-y-4">
        {historyRecords.map((rec) => (
          <div
            key={rec.id}
            className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={rec.image}
                  alt={rec.crop}
                  className="w-14 h-14 rounded-xl object-cover border border-emerald-200"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-900 text-base">{rec.crop}</h3>
                    <span className="text-xs text-emerald-700 bg-emerald-50 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                      {rec.variety}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{rec.date}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs bg-gray-100 font-mono text-gray-600 px-2 py-1 rounded">
                  {rec.modelVersion}
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Scan</span>
                </span>
              </div>
            </div>

            <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>AI Detection Finding</span>
                </span>
                <span className="text-xs text-amber-800 font-semibold">{rec.status}</span>
              </div>
              <p className="text-sm font-extrabold text-gray-900">{rec.disease}</p>
              {rec.pest && <p className="text-xs text-amber-800 font-medium mt-0.5">Pest vector: {rec.pest}</p>}
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                {t("treatment_steps")}
              </h4>
              <ul className="space-y-1">
                {rec.treatment.map((step, sIdx) => (
                  <li key={sIdx} className="text-xs text-gray-600 flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
