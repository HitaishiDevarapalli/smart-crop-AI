import React, { useEffect, useState } from "react";
import { ShieldCheck, Cpu, Database, CheckCircle2, Layers } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    async function loadMetadata() {
      try {
        const res = await fetch("http://localhost:8000/api/admin/model-metadata");
        if (res.ok) {
          const data = await res.json();
          setMetadata(data);
        }
      } catch (e) {
        setMetadata({
          model_name: "Sanjeevani WPF Vision Classifier",
          version: "v1.4-WPF-YOLOv8",
          dataset: "WPF Plant Dataset",
          supported_classes: [
            "Tomato - Healthy",
            "Tomato - Early Blight",
            "Cotton - Healthy",
            "Cotton - Bacterial Blight",
            "Chilli - Leaf Curl",
            "Maize - Fall Armyworm"
          ],
          status: "Active / Deployed",
          trained_date: "2026-08-15",
          framework: "PyTorch / OpenCV / FastAPI Inference"
        });
      }
    }
    loadMetadata();
  }, []);

  return (
    <div className="space-y-4 pb-8 max-w-md mx-auto text-xs">
      <div className="bg-gradient-to-r from-gray-900 to-[#1E5128] p-4 rounded-2xl text-white shadow-md">
        <h2 className="text-lg font-extrabold flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>Sanjeevani Admin & AI Metadata</span>
        </h2>
        <p className="text-[11px] text-gray-300">WPF Neural Model Registry & System Monitoring</p>
      </div>

      {metadata && (
        <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Active Model</span>
              <h3 className="text-sm font-extrabold text-gray-900">{metadata.model_name}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
              {metadata.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-gray-700">
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 block">Version</span>
              <span className="font-bold">{metadata.version}</span>
            </div>

            <div className="p-2.5 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 block">Dataset</span>
              <span className="font-bold">{metadata.dataset}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-1.5 flex items-center space-x-1">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Supported Dataset Classes ({metadata.supported_classes?.length}):</span>
            </h4>
            <div className="space-y-1">
              {metadata.supported_classes?.map((c: string, idx: number) => (
                <div key={idx} className="p-2 rounded-lg bg-emerald-50 text-emerald-900 font-semibold flex items-center justify-between">
                  <span>{c}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
