import React from "react";
import { useApp } from "../context/AppContext";
import { User, MapPin, Sprout, Globe, HelpCircle, LogOut, Settings, ShieldCheck, Camera } from "lucide-react";

export const Profile: React.FC = () => {
  const { farmer, language, setLanguage, setScreen, t } = useApp();

  return (
    <div className="space-y-4 pb-8 max-w-md mx-auto text-xs">
      {/* Farmer Profile Card */}
      <div className="bg-gradient-to-br from-[#1E5128] via-[#2E6B3A] to-[#1E5128] p-5 rounded-3xl text-white shadow-xl flex items-center space-x-4 border border-emerald-600/50">
        <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-amber-200 overflow-hidden shrink-0 flex items-center justify-center text-gray-900 shadow-md">
          {farmer.profile_photo_url ? (
            <img src={farmer.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-9 h-9 text-[#1E5128]" />
          )}
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-white">{farmer.full_name}</h2>
          <p className="text-emerald-200 font-semibold mt-0.5">{farmer.phone_number}</p>
          <div className="mt-1 flex items-center space-x-2 text-[11px] text-amber-300">
            <span>ధర {farmer.village}, {farmer.district}</span>
            <span>�</span>
            <span>ధర {farmer.main_crop} ({farmer.farm_size_acres} Acres)</span>
          </div>
        </div>
      </div>

      {/* Account Settings List */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden space-y-1 p-2">
        <button
          onClick={() => setScreen("profile_setup")}
          className="w-full p-3.5 flex items-center justify-between hover:bg-emerald-50 rounded-2xl transition"
        >
          <div className="flex items-center space-x-3 text-gray-800">
            <User className="w-5 h-5 text-emerald-700" />
            <span className="font-bold">Edit Farmer Profile</span>
          </div>
          <span className="text-gray-400 font-bold">?</span>
        </button>

        <button
          onClick={() => setScreen("language")}
          className="w-full p-3.5 flex items-center justify-between hover:bg-emerald-50 rounded-2xl transition"
        >
          <div className="flex items-center space-x-3 text-gray-800">
            <Globe className="w-5 h-5 text-amber-600" />
            <span className="font-bold">Change Language / పంట సంజీవని?</span>
          </div>
          <span className="text-gray-400 font-bold">?</span>
        </button>

        <button
          onClick={() => setScreen("profile_setup")}
          className="w-full p-3.5 flex items-center justify-between hover:bg-emerald-50 rounded-2xl transition"
        >
          <div className="flex items-center space-x-3 text-gray-800">
            <Camera className="w-5 h-5 text-sky-600" />
            <span className="font-bold">Update Profile Photo</span>
          </div>
          <span className="text-gray-400 font-bold">?</span>
        </button>
      </div>

      {/* Help & Support Card */}
      <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
        <h4 className="font-extrabold text-gray-900 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>Help & Assistance (సలహా)</span>
        </h4>

        <div className="space-y-2 text-gray-600">
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="font-bold text-gray-900 block">How to scan crop leaves?</span>
            <p className="text-[11px] text-gray-500">Tap Check My Crop, point your phone camera at the leaf inside the frame and hold steady.</p>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="font-bold text-gray-900 block">How offline mode works?</span>
            <p className="text-[11px] text-gray-500">Your crop checks and worker requests save on your phone automatically and sync when reconnected.</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setScreen("auth")}
        className="w-full py-3.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold rounded-2xl flex items-center justify-center space-x-2 transition"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout / సంజీవనిసంజీవని</span>
      </button>
    </div>
  );
};
