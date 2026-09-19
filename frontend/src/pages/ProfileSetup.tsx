import React, { useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Camera, User, MapPin, Sprout, ArrowRight, Check } from "lucide-react";
import { CameraModal } from "../components/CameraModal";

export const ProfileSetup: React.FC = () => {
  const { farmer, setFarmer, setScreen, setActiveTab } = useApp();

  const [fullName, setFullName] = useState(farmer.full_name || "Ramesh Kumar");
  const [village, setVillage] = useState(farmer.village || "Tadikonda");
  const [district, setDistrict] = useState(farmer.district || "Guntur");
  const [state, setState] = useState(farmer.state || "Andhra Pradesh");
  const [mainCrop, setMainCrop] = useState(farmer.main_crop || "Tomato");
  const [farmSize, setFarmSize] = useState<number>(farmer.farm_size_acres || 3.5);
  const [photoUrl, setPhotoUrl] = useState<string | null>(farmer.profile_photo_url || null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoCaptured = (file: File) => {
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotoUrl(url);
    }
  };

  const handleSaveProfile = () => {
    setFarmer({
      ...farmer,
      full_name: fullName,
      village,
      district,
      state,
      main_crop: mainCrop,
      farm_size_acres: farmSize,
      profile_photo_url: photoUrl
    });

    setActiveTab("home");
    setScreen("main");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] via-emerald-50/40 to-emerald-100/50 p-6 flex flex-col justify-between max-w-md mx-auto">
      <div className="pt-4">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Farmer Profile Setup</h2>
        <p className="text-xs text-gray-600 mb-6">?? ???????? ????? ???? ?? ??????? ???? ???????? ???????????.</p>

        {/* Profile Photo Camera Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-[#1E5128] bg-emerald-100 overflow-hidden shadow-lg flex items-center justify-center">
            {photoUrl ? (
              <img src={photoUrl} alt="Farmer Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-[#1E5128]" />
            )}
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <button
              type="button"
              onClick={() => setIsCameraOpen(true)}
              className="px-3 py-1.5 bg-[#1E5128] text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1 hover:bg-[#16421F]"
            >
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Camera</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-xl shadow-sm hover:bg-gray-50"
            >
              Gallery
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleGalleryUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name / ???? ?????? ????</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-[#1E5128]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Village / ??????</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">District / ??????</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Main Crop / ?????? ???</label>
              <select
                value={mainCrop}
                onChange={(e) => setMainCrop(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#1E5128] bg-emerald-50/50"
              >
                <option value="Tomato">Tomato (?????)</option>
                <option value="Chilli">Chilli (????)</option>
                <option value="Cotton">Cotton (???????)</option>
                <option value="Maize">Maize (??????????)</option>
                <option value="Onion">Onion (????????)</option>
                <option value="Paddy">Paddy / Rice (???)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Farm Size (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={farmSize}
                onChange={(e) => setFarmSize(parseFloat(e.target.value) || 1)}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pb-6 mt-6">
        <button
          onClick={handleSaveProfile}
          className="w-full py-4 bg-[#1E5128] hover:bg-[#16421F] text-white font-extrabold text-base rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition"
        >
          <span>Save Profile & Start Sanjeevani</span>
          <Check className="w-5 h-5 text-amber-300" />
        </button>
      </div>

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handlePhotoCaptured}
      />
    </div>
  );
};
