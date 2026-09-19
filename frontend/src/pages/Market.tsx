import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { fetchMarketPrices, fetchBuyers, fetchFPOs, fetchColdStorage } from "../services/api";
import { MarketPrice, Buyer, FPO, ColdStorageFacility } from "../types";
import { TrendingUp, Users, Building, Warehouse, Truck, PlusCircle, MapPin, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Market: React.FC = () => {
  const { t, farmer } = useApp();
  const [subTab, setSubTab] = useState<"prices" | "buyers" | "fpo" | "storage" | "transport">("prices");
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [fpos, setFpos] = useState<FPO[]>([]);
  const [facilities, setFacilities] = useState<ColdStorageFacility[]>([]);
  
  // Listing modal
  const [showListingModal, setShowListingModal] = useState(false);
  const [listingSuccess, setListingSuccess] = useState(false);
  const [quantity, setQuantity] = useState("25");
  const [price, setPrice] = useState("2800");

  useEffect(() => {
    async function loadData() {
      const p = await fetchMarketPrices();
      setPrices(p);
      const b = await fetchBuyers();
      setBuyers(b);
      const f = await fetchFPOs();
      setFpos(f);
      const c = await fetchColdStorage();
      setFacilities(c);
    }
    loadData();
  }, []);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    setListingSuccess(true);
    setTimeout(() => {
      setListingSuccess(false);
      setShowListingModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-4 pb-8 max-w-md mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1E5128] to-[#2E6B3A] p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-300" />
            <span>Market & Buyer Hub</span>
          </h2>
          <p className="text-xs text-emerald-200 mt-0.5">Live Mandi Prices, Verified Buyers & Cold Storage.</p>
        </div>

        <button
          onClick={() => setShowListingModal(true)}
          className="px-3 py-2 bg-amber-400 text-gray-900 rounded-xl font-extrabold text-xs flex items-center space-x-1 shadow hover:bg-amber-300"
        >
          <PlusCircle className="w-4 h-4 text-gray-900" />
          <span>Sell Produce</span>
        </button>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {[
          { id: "prices", label: "Mandi Prices", icon: TrendingUp },
          { id: "buyers", label: "Buyers", icon: Users },
          { id: "fpo", label: "FPOs", icon: Building },
          { id: "storage", label: "Cold Storage", icon: Warehouse },
          { id: "transport", label: "Transport", icon: Truck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                isActive ? "bg-[#1E5128] text-amber-300 shadow" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SubTab 1: Mandi Prices */}
      {subTab === "prices" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-gray-700">Live Agmarknet Mandi Rates</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
              ? Verified Live Data
            </span>
          </div>

          <div className="space-y-2.5">
            {prices.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base font-extrabold text-gray-900">{item.crop_te || item.crop}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#1E5128]">
                      {item.crop}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">?? {item.mandi}</p>
                  <span className="text-[10px] text-gray-400 block mt-1">Source: {item.data_source}</span>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-[#1E5128] block">?{item.price.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-500 block">per {item.unit}</span>
                  <span className={`inline-block mt-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                    item.trend === "up" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    {item.trend === "up" ? "? +" : "? "}{item.change_pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Buyers */}
      {subTab === "buyers" && (
        <div className="space-y-3">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center justify-between">
            <span>Direct Buyers purchasing {farmer.main_crop}</span>
            <span className="font-bold text-[10px] bg-amber-200 px-2 py-0.5 rounded-full">Verified</span>
          </div>

          {buyers.map((buyer) => (
            <div key={buyer.id} className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{buyer.buyer_type}</span>
                  <h4 className="text-base font-extrabold text-gray-900">{buyer.name}</h4>
                  <p className="text-xs text-gray-500">?? {buyer.location}</p>
                </div>
                <span className="text-base font-extrabold text-[#1E5128]">?{buyer.price_offered.toLocaleString()}/qtl</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t text-xs">
                <span className="text-gray-600">Min Quantity: <b>{buyer.min_quantity_tons} Tons</b></span>

                <a
                  href={`tel:${buyer.phone_number}`}
                  className="px-3.5 py-1.5 bg-[#1E5128] text-amber-300 font-extrabold rounded-xl shadow flex items-center space-x-1 text-xs hover:bg-[#16421F]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Buyer</span>
                </a>
              </div>

              {buyer.is_demo && (
                <span className="text-[10px] text-gray-400 block text-right">Label: Sample Demo Contact ({buyer.phone_number})</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SubTab 3: FPOs */}
      {subTab === "fpo" && (
        <div className="space-y-3">
          {fpos.map((fpo) => (
            <div key={fpo.id} className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm space-y-3">
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Farmer Producer Org</span>
                <h4 className="text-base font-extrabold text-gray-900">{fpo.name}</h4>
                <p className="text-xs text-gray-500">?? {fpo.location} • <b>{fpo.member_count} Members</b></p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-700 block mb-1">FPO Benefits:</span>
                <div className="flex flex-wrap gap-1.5">
                  {fpo.benefits.map((b, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-[10px] font-semibold">
                      ? {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t flex justify-end">
                <a
                  href={`tel:${fpo.contact_phone}`}
                  className="px-4 py-2 bg-[#1E5128] text-amber-300 font-bold rounded-xl text-xs flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact FPO</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 4: Cold Storage Leaflet Map */}
      {subTab === "storage" && (
        <div className="space-y-3">
          {/* Leaflet OpenStreetMap View */}
          <div className="h-48 w-full rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-md">
            <MapContainer center={[16.3067, 80.4365]} zoom={11} scrollWheelZoom={false} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {facilities.map((fac) => (
                <Marker key={fac.id} position={[fac.latitude, fac.longitude]}>
                  <Popup>
                    <div className="text-xs">
                      <b>{fac.facility_name}</b>
                      <p>{fac.location}</p>
                      <p className="text-emerald-700 font-bold">Space: {fac.available_space_mt} MT</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="space-y-2.5">
            {facilities.map((fac) => (
              <div key={fac.id} className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900">{fac.facility_name}</h4>
                    <p className="text-xs text-gray-500">?? {fac.location} ({fac.distance_km} km away)</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {fac.available_space_mt} MT Available
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs border-t">
                  <span className="text-gray-600">Rate: <b>?{fac.rate_per_day_quintal}/day/qtl</b></span>
                  <a
                    href={`tel:${fac.contact_phone}`}
                    className="px-3.5 py-1.5 bg-[#1E5128] text-white font-bold rounded-xl text-xs flex items-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Request Storage</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 5: Transport */}
      {subTab === "transport" && (
        <div className="space-y-3 bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm text-xs">
          <h4 className="text-sm font-extrabold text-gray-900 mb-2">Book Farm Produce Transport</h4>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Vehicle Type / ????? ?????</label>
              <select className="w-full p-3 border border-gray-300 rounded-xl text-xs font-bold text-[#1E5128]">
                <option value="bolero">Bolero Pickup / Ace (2 Ton Capacity) - ?1,200 est.</option>
                <option value="eicher">Eicher 14ft LCV Truck (5 Ton Capacity) - ?2,400 est.</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Pickup Location / ????? ???????</label>
              <input
                type="text"
                defaultValue={`${farmer.village}, ${farmer.district}`}
                className="w-full p-3 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Destination Mandi / ??????????? ?????</label>
              <input
                type="text"
                defaultValue="Guntur Main Market Yard"
                className="w-full p-3 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900"
              />
            </div>

            <button
              onClick={() => alert("Transport vehicle request submitted to local driver pool.")}
              className="w-full py-3.5 bg-[#1E5128] hover:bg-[#16421F] text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-1"
            >
              <Truck className="w-4 h-4 text-amber-300" />
              <span>Confirm Transport Request</span>
            </button>
          </div>
        </div>
      )}

      {/* Produce Listing Modal */}
      {showListingModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4">
            <h3 className="text-base font-extrabold text-gray-900">Sell My Produce (??? ??????)</h3>

            {listingSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2 text-xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-emerald-900">Listing Published!</h4>
                <p className="text-gray-600">Local verified buyers & traders have been notified.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateListing} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    value={farmer.main_crop}
                    readOnly
                    className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-xl font-bold text-[#1E5128]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quantity (Quintals)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Expected Price (?/Quintal)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-gray-900"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowListingModal(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#1E5128] text-white font-extrabold rounded-xl shadow"
                  >
                    Publish Listing
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
