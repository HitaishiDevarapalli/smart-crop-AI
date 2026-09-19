import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { fetchWorkCoordinator, postWorkRequest } from "../services/api";
import { WorkCoordinator as WorkCoordinatorType, WorkRequest } from "../types";
import { Users, Phone, MessageSquare, Calendar, MapPin, CheckCircle2, Clock, UserCheck, ShieldCheck } from "lucide-react";

export const WorkCoordinator: React.FC = () => {
  const { farmer, t } = useApp();
  const [coordinator, setCoordinator] = useState<WorkCoordinatorType | null>(null);
  const [viewMode, setViewMode] = useState<"farmer" | "admin">("farmer");
  
  // Work request form
  const [workType, setWorkType] = useState("Harvesting");
  const [workersCount, setWorkersCount] = useState("4");
  const [requestDate, setRequestDate] = useState("2026-09-20");
  const [location, setLocation] = useState(`${farmer.village} Field`);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [requestsList, setRequestsList] = useState<WorkRequest[]>([
    {
      id: "wr_201",
      farmer_name: farmer.full_name,
      work_type: "Harvesting",
      date: "2026-09-20",
      workers_needed: 4,
      location: `${farmer.village} East Field`,
      instructions: "Need workers by 7:00 AM for tomato harvest",
      status: "Confirmed",
      created_at: "Today 08:00 AM"
    }
  ]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchWorkCoordinator();
      setCoordinator(data);
    }
    loadData();
  }, []);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: WorkRequest = {
      id: `wr_${201 + requestsList.length}`,
      farmer_name: farmer.full_name,
      work_type: workType,
      date: requestDate,
      workers_needed: parseInt(workersCount) || 2,
      location,
      status: "Waiting for Coordinator",
      created_at: "Just now"
    };

    await postWorkRequest(newReq);
    setRequestsList([newReq, ...requestsList]);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2500);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Available") return <span className="text-emerald-700 font-extrabold bg-emerald-100 px-2.5 py-0.5 rounded-full">?? Available</span>;
    if (status === "Limited") return <span className="text-amber-800 font-extrabold bg-amber-100 px-2.5 py-0.5 rounded-full">?? Limited</span>;
    return <span className="text-red-700 font-extrabold bg-red-100 px-2.5 py-0.5 rounded-full">?? Unavailable</span>;
  };

  return (
    <div className="space-y-4 pb-8 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E5128] to-[#2E6B3A] p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold flex items-center space-x-2">
            <Users className="w-5 h-5 text-amber-300" />
            <span>Farm Workers & Coordinator</span>
          </h2>
          <p className="text-xs text-emerald-200 mt-0.5">Centralized daily agricultural labour booking hub.</p>
        </div>

        <button
          onClick={() => setViewMode(viewMode === "farmer" ? "admin" : "farmer")}
          className="px-2.5 py-1.5 bg-amber-400 text-gray-900 font-bold rounded-xl text-[11px] shadow"
        >
          {viewMode === "farmer" ? "Coordinator View" : "Farmer View"}
        </button>
      </div>

      {viewMode === "farmer" ? (
        <div className="space-y-4">
          {/* Central Farm Work Coordinator Card */}
          <div className="bg-gradient-to-br from-emerald-900 via-[#1E5128] to-emerald-950 p-5 rounded-3xl text-white shadow-xl border border-emerald-700/50 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Central Farm Work Coordinator</span>
                <h3 className="text-lg font-extrabold text-white">
                  {coordinator?.coordinator_name || "Venkateswara Rao"}
                </h3>
                <p className="text-xs text-emerald-200">?? {coordinator?.region || "Guntur Mandal"}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-emerald-300 block">Today's Status</span>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/30 text-amber-300 text-xs font-bold border border-emerald-400/40">
                  ?? Available ({coordinator?.total_workers_available || 14} Workers Free)
                </span>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={`tel:${coordinator?.phone_number || "919000055001"}`}
                className="py-3 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-4 h-4 text-gray-900" />
                <span>Call Coordinator</span>
              </a>

              <a
                href={coordinator?.whatsapp_link || "https://wa.me/919000055001"}
                target="_blank"
                rel="noreferrer"
                className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center space-x-1.5 border border-emerald-400/40"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>WhatsApp Message</span>
              </a>
            </div>

            <p className="text-[10px] text-emerald-300/80 text-center font-medium">
              Demo Contact Number: {coordinator?.phone_number}
            </p>
          </div>

          {/* Daily Work Availability Matrix */}
          <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">
              Today's Worker Availability Matrix (????? ???????)
            </h4>

            <div className="space-y-2 text-xs">
              {coordinator?.work_matrix.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <div>
                    <span className="font-extrabold text-gray-900 block">{item.work_type}</span>
                    <span className="text-[11px] text-gray-500">Rate: ?{item.rate_per_day}/day</span>
                  </div>

                  <div className="text-right">
                    {getStatusBadge(item.status)}
                    <span className="text-[10px] text-gray-500 block mt-0.5">{item.workers_free} Free Today</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Request Form */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm space-y-3 text-xs">
            <h4 className="text-sm font-extrabold text-[#1E5128]">Book Farm Workers (????? ??????? ?????)</h4>

            {isSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Request sent to Coordinator! Status: Waiting for Coordinator confirmation.</span>
              </div>
            )}

            <form onSubmit={handleSubmitRequest} className="space-y-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Work Type / ??? ???</label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl font-bold text-[#1E5128] bg-emerald-50/40"
                >
                  <option value="Harvesting">Harvesting (??? ???)</option>
                  <option value="Planting & Sowing">Planting & Sowing (??????)</option>
                  <option value="Field Cleaning & Weeding">Field Cleaning & Weeding (????? ???)</option>
                  <option value="Irrigation & Spraying">Irrigation & Spraying (?????? ????????)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Workers Needed</label>
                  <input
                    type="number"
                    value={workersCount}
                    onChange={(e) => setWorkersCount(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Date Required</label>
                  <input
                    type="date"
                    value={requestDate}
                    onChange={(e) => setRequestDate(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Field Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl font-semibold text-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1E5128] hover:bg-[#16421F] text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center space-x-1.5 transition"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>Submit Booking Request to Coordinator</span>
              </button>
            </form>
          </div>

          {/* Requested Bookings Status */}
          <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm space-y-3 text-xs">
            <h4 className="font-extrabold text-gray-800 uppercase tracking-wider">My Worker Requests (?? ?????????)</h4>

            <div className="space-y-2">
              {requestsList.map((req) => (
                <div key={req.id} className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-extrabold text-gray-900 block">{req.work_type} ({req.workers_needed} Workers)</span>
                      <span className="text-[10px] text-gray-500">?? {req.date} • ?? {req.location}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      req.status === "Confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Coordinator / Admin Dashboard View */
        <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-md space-y-4 text-xs">
          <div className="flex items-center space-x-2 text-[#1E5128]">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-extrabold">Coordinator Control Panel</h3>
          </div>

          <p className="text-gray-600">
            As the village coordinator, manage worker availability and approve incoming requests from local farmers.
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-gray-800">Pending Worker Requests</h4>
            {requestsList.map((req) => (
              <div key={req.id} className="p-3 rounded-xl border border-gray-300 bg-gray-50 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold">{req.farmer_name}</span>
                  <span className="text-emerald-700 font-extrabold">{req.status}</span>
                </div>
                <p className="text-gray-600">{req.work_type} - {req.workers_needed} Workers needed on {req.date}</p>

                <div className="flex space-x-2 pt-1">
                  <button
                    onClick={() => {
                      req.status = "Confirmed";
                      setRequestsList([...requestsList]);
                    }}
                    className="flex-1 py-1.5 bg-emerald-600 text-white rounded-lg font-bold"
                  >
                    Accept & Confirm
                  </button>

                  <button
                    onClick={() => {
                      req.status = "Unavailable";
                      setRequestsList([...requestsList]);
                    }}
                    className="flex-1 py-1.5 bg-red-600 text-white rounded-lg font-bold"
                  >
                    Set Unavailable
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
