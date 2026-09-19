import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { triggerPhoneCall } from "../utils/phone";
import { Users, Phone, MessageSquare, CheckCircle2, Clock, AlertCircle, PlusCircle, UserCheck, PhoneCall } from "lucide-react";

export const WorkCoordinator: React.FC = () => {
  const { t, farmer, language } = useApp();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [workType, setWorkType] = useState("Harvesting");
  const [numWorkers, setNumWorkers] = useState("6");
  const [workDate, setWorkDate] = useState("Tomorrow");

  const availableWorkTeams = [
    {
      id: "w1",
      work_type: "Harvesting & Picking",
      work_type_te: "పంట కోత మరియు ఏరుట",
      work_type_hi: "कटाई और तुड़ाई",
      workers_count: 8,
      status: "Available",
      rate_per_day: 500,
      coordinator_contact: "+91 90000 11001"
    },
    {
      id: "w2",
      work_type: "Planting & Sowing",
      work_type_te: "నాట్లు మరియు విత్తుట",
      work_type_hi: "रोपाई और बुवाई",
      workers_count: 5,
      status: "Available",
      rate_per_day: 450,
      coordinator_contact: "+91 90000 11002"
    },
    {
      id: "w3",
      work_type: "Field Weeding & Cleaning",
      work_type_te: "కలుపు తీయుట మరియు శుభ్రము చేయుట",
      work_type_hi: "निराई और सफाई",
      workers_count: 4,
      status: "Limited",
      rate_per_day: 400,
      coordinator_contact: "+91 90000 11003"
    }
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setShowRequestModal(false);
    }, 1500);
  };

  const getLocalizedWorkType = (item: any) => {
    if (language === "te") return item.work_type_te || item.work_type;
    if (language === "hi") return item.work_type_hi || item.work_type;
    return item.work_type;
  };

  return (
    <div className="space-y-6 pb-12 w-full max-w-7xl mx-auto">
      {/* Top Banner - Full Width */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-6 rounded-3xl text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-amber-300 font-bold text-[10px] uppercase tracking-wider bg-blue-950/40 px-3 py-1 rounded-full border border-blue-400/30">
            Labor & Farm Workers Hub
          </span>
          <h2 className="text-2xl font-extrabold flex items-center space-x-2.5 mt-1.5">
            <Users className="w-6 h-6 text-amber-300" />
            <span>{t("farm_workers")} & Central Coordinator</span>
          </h2>
          <p className="text-xs text-blue-100 mt-1">Book experienced farm workers for harvesting, planting, and field labor.</p>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-2xl font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md transition shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-gray-900" />
          <span>{t("request_workers")}</span>
        </button>
      </div>

      {/* Coordinator Status Banner */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center border border-blue-200">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
              District Work Coordinator
            </span>
            <h3 className="text-lg font-extrabold text-gray-900 mt-0.5">Srinivas Rao (Central Labor Officer)</h3>
            <p className="text-xs text-gray-500 font-medium">Managing labor teams across Guntur & Vijayawada region</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="tel:+919876543210"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-2 transition"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>{t("call_coordinator")}</span>
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-2 transition"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Work Category Cards - Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider px-1">
          {t("workers_available")} Today
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {availableWorkTeams.map((team) => (
            <div key={team.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {team.status}
                  </span>
                  <span className="text-sm font-extrabold text-gray-900">₹{team.rate_per_day}/day per worker</span>
                </div>

                <h4 className="text-lg font-extrabold text-gray-900 mb-1">{getLocalizedWorkType(team)}</h4>
                <p className="text-xs text-gray-500 font-medium">Team Size: {team.workers_count} Workers Ready</p>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-xs transition"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span>{t("request_workers")}</span>
                </button>
                <p className="text-[10px] text-gray-400 text-center">Demo Contact: {team.coordinator_contact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-xl font-extrabold text-gray-900">{t("request_workers")}</h3>
            <p className="text-xs text-gray-500">Submit labor request to Central Coordinator for farm work.</p>

            {requestSuccess ? (
              <div className="bg-emerald-50 p-6 rounded-2xl text-center space-y-2 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-emerald-900">Worker Request Sent!</h4>
                <p className="text-xs text-emerald-700">The Work Coordinator will contact you shortly to confirm labor arrival.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Work Type</label>
                  <input
                    type="text"
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    placeholder="Type work type manually (e.g. Harvesting, Sowing, Weeding...)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold bg-white text-gray-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Workers Needed</label>
                    <input
                      type="number"
                      value={numWorkers}
                      onChange={(e) => setNumWorkers(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Date</label>
                    <input
                      type="text"
                      value={workDate}
                      onChange={(e) => setWorkDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-sm"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
