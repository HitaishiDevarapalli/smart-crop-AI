import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  Warehouse, 
  Sprout, 
  FileText, 
  FileCheck, 
  Activity, 
  Settings, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  Lock, 
  Unlock, 
  ArrowRight, 
  RefreshCw, 
  Building, 
  Truck, 
  TrendingUp, 
  Database, 
  Layers, 
  UserCheck, 
  Clock, 
  CheckSquare, 
  Award,
  ChevronRight
} from "lucide-react";

// Types for Admin Master Control Panel
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userId: string;
  userRole: "ADMIN" | "FARMER" | "BUYER" | "COLD STORAGE OPERATOR";
  module: "Farmer" | "Buyer" | "Cold Storage" | "Crop" | "Agreement";
  action: string;
  recordId: string;
  prevValue: string;
  newValue: string;
  status: "Success" | "Warning" | "Denied";
}

export interface FarmerRecord {
  id: string;
  name: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  mainCrop: string;
  farmSizeAcres: number;
  soilType: string;
  verificationStatus: "Verified" | "Pending Verification" | "Rejected";
  accountStatus: "Active" | "Suspended";
  kycDocUrl: string;
  landRecordNo: string;
  previousCrops: string[];
  assignedBuyer: string;
  assignedStorage: string;
  createdDate: string;
}

export interface BuyerRecord {
  id: string;
  companyName: string;
  repName: string;
  phone: string;
  email: string;
  location: string;
  district: string;
  buyerType: string;
  interestedCrops: string[];
  priceOfferedQtl: number;
  minQtyTons: number;
  kycStatus: "Pending" | "Under Review" | "Verified" | "Rejected" | "Suspended";
  accountStatus: "Active" | "Suspended";
  kycDocName: string;
  totalAgreements: number;
  createdDate: string;
}

export interface ColdStorageRecord {
  id: string;
  facilityName: string;
  operatorName: string;
  phone: string;
  location: string;
  district: string;
  totalCapacityMT: number;
  occupiedCapacityMT: number;
  availableCapacityMT: number;
  dailyRateQtl: number;
  temperatureC: number;
  humidityPct: number;
  supportedCrops: string[];
  maintenanceStatus: "Optimal" | "Maintenance Required" | "Under Repair";
  accountStatus: "Active" | "Suspended";
  inventory: Array<{
    id: string;
    cropName: string;
    farmerName: string;
    batchSizeMT: number;
    entryDate: string;
    expiryDate: string;
  }>;
}

export interface AgreementRecord {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  quantityQuintals: number;
  agreedPriceQtl: number;
  buyerId: string;
  buyerName: string;
  storageId: string;
  storageName: string;
  startDate: string;
  expiryDate: string;
  status: "Active" | "Expiring Soon" | "Fulfilled" | "Terminated";
}

export const AdminDashboard: React.FC = () => {
  const { setScreen, setActiveTab } = useApp();

  // Active Admin Subtab
  const [activeTabModule, setActiveTabModule] = useState<
    "farmers" | "buyers" | "storage" | "crops" | "agreements" | "audit" | "settings"
  >("farmers");

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "LOG_901",
      timestamp: "2026-09-19 16:45:10",
      userName: "Hitaishi Admin",
      userId: "ADM_001",
      userRole: "ADMIN",
      module: "Buyer",
      action: "Approve Buyer KYC",
      recordId: "BUY_102",
      prevValue: "KYC Status: Under Review",
      newValue: "KYC Status: Verified",
      status: "Success"
    },
    {
      id: "LOG_902",
      timestamp: "2026-09-19 15:30:22",
      userName: "Ramesh Kumar",
      userId: "FAR_201",
      userRole: "FARMER",
      module: "Crop",
      action: "Updated Soil & Crop Record",
      recordId: "CRP_405",
      prevValue: "Soil: Red Sandy, Crop: Tomato",
      newValue: "Soil: Red Sandy, Crop: Paddy / Rice",
      status: "Success"
    },
    {
      id: "LOG_903",
      timestamp: "2026-09-19 14:15:00",
      userName: "Sri Lakshmi Exporters",
      userId: "BUY_102",
      userRole: "BUYER",
      module: "Agreement",
      action: "Submitted Direct Procurement Contract",
      recordId: "AGR_880",
      prevValue: "Status: Draft",
      newValue: "Status: Active Contract (50 Quintals)",
      status: "Success"
    },
    {
      id: "LOG_904",
      timestamp: "2026-09-19 12:10:45",
      userName: "Guntur Cold Storage Operator",
      userId: "STO_301",
      userRole: "COLD STORAGE OPERATOR",
      module: "Cold Storage",
      action: "Updated Occupied Capacity",
      recordId: "STO_301",
      prevValue: "Occupied: 1,150 MT",
      newValue: "Occupied: 1,200 MT (Paddy Batch added)",
      status: "Success"
    }
  ]);

  // Master Data Lists State
  const [farmers, setFarmers] = useState<FarmerRecord[]>([
    {
      id: "FAR_201",
      name: "Ramesh Kumar",
      phone: "+91 98765 43210",
      village: "Tadikonda",
      district: "Guntur",
      state: "Andhra Pradesh",
      mainCrop: "Tomato",
      farmSizeAcres: 3.5,
      soilType: "Red Sandy Loam",
      verificationStatus: "Verified",
      accountStatus: "Active",
      kycDocUrl: "Aadhaar Verified (XXXX-XXXX-9012)",
      landRecordNo: "PATTADAR_PASSBOOK_8890",
      previousCrops: ["Chilli", "Cotton"],
      assignedBuyer: "Sri Lakshmi Exporters",
      assignedStorage: "Guntur Central Cold Care",
      createdDate: "2026-01-15"
    },
    {
      id: "FAR_202",
      name: "Venkateswara Rao",
      phone: "+91 98765 43211",
      village: "Tenali",
      district: "Guntur",
      state: "Andhra Pradesh",
      mainCrop: "Rice / Paddy",
      farmSizeAcres: 5.0,
      soilType: "Black Cotton Soil",
      verificationStatus: "Verified",
      accountStatus: "Active",
      kycDocUrl: "Aadhaar Verified (XXXX-XXXX-4421)",
      landRecordNo: "PATTADAR_PASSBOOK_4412",
      previousCrops: ["Groundnut", "Maize"],
      assignedBuyer: "AgriProcure South Ltd",
      assignedStorage: "Tenali Farmers Warehouse",
      createdDate: "2026-02-10"
    },
    {
      id: "FAR_203",
      name: "Srinivasa Reddy",
      phone: "+91 98765 43212",
      village: "Mangalagiri",
      district: "Guntur",
      state: "Andhra Pradesh",
      mainCrop: "Chilli",
      farmSizeAcres: 4.2,
      soilType: "Alluvial Soil",
      verificationStatus: "Pending Verification",
      accountStatus: "Active",
      kycDocUrl: "Document Submitted (Aadhaar Pending)",
      landRecordNo: "PATTADAR_PASSBOOK_1109",
      previousCrops: ["Pulses"],
      assignedBuyer: "Unassigned",
      assignedStorage: "Unassigned",
      createdDate: "2026-09-18"
    }
  ]);

  const [buyers, setBuyers] = useState<BuyerRecord[]>([
    {
      id: "BUY_101",
      companyName: "Sri Lakshmi Agri Buyers & Processors",
      repName: "K. Satyanarayana",
      phone: "+91 90000 11001",
      email: "contact@srilakshmiagri.com",
      location: "Guntur Mandi Yard",
      district: "Guntur",
      buyerType: "Wholesaler & Exporter",
      interestedCrops: ["Tomato", "Chilli", "Rice / Paddy"],
      priceOfferedQtl: 2900,
      minQtyTons: 15,
      kycStatus: "Verified",
      accountStatus: "Active",
      kycDocName: "GSTIN_28AABCU9012K1Z9_GST_CERT.pdf",
      totalAgreements: 14,
      createdDate: "2026-01-10"
    },
    {
      id: "BUY_102",
      companyName: "AgriProcure South Ltd",
      repName: "Vikram Shah",
      phone: "+91 90000 11002",
      email: "procurement@agriprocure.in",
      location: "Vijayawada Commercial Hub",
      district: "Krishna",
      buyerType: "Food Processing Company",
      interestedCrops: ["Rice / Paddy", "Maize", "Cotton"],
      priceOfferedQtl: 2750,
      minQtyTons: 25,
      kycStatus: "Under Review",
      accountStatus: "Active",
      kycDocName: "COMPANY_REGISTRATION_AP2026.pdf",
      totalAgreements: 8,
      createdDate: "2026-08-05"
    },
    {
      id: "BUY_103",
      companyName: "Apex Grain Mills & Exports",
      repName: "Deepak Patel",
      phone: "+91 90000 11003",
      email: "apex@grainmills.com",
      location: "Hyderabad Industrial Yard",
      district: "Hyderabad",
      buyerType: "Exporter",
      interestedCrops: ["Rice / Paddy", "Groundnut"],
      priceOfferedQtl: 3100,
      minQtyTons: 40,
      kycStatus: "Pending",
      accountStatus: "Active",
      kycDocName: "PAN_CERTIFICATE_APEX.pdf",
      totalAgreements: 2,
      createdDate: "2026-09-15"
    }
  ]);

  const [storages, setStorages] = useState<ColdStorageRecord[]>([
    {
      id: "STO_301",
      facilityName: "Guntur Central Cold Care & Logistics",
      operatorName: "Subba Rao",
      phone: "+91 90000 22001",
      location: "NH-16 Highway, Guntur",
      district: "Guntur",
      totalCapacityMT: 5000,
      occupiedCapacityMT: 3800,
      availableCapacityMT: 1200,
      dailyRateQtl: 8,
      temperatureC: 4.5,
      humidityPct: 88,
      supportedCrops: ["Tomato", "Chilli", "Fruits"],
      maintenanceStatus: "Optimal",
      accountStatus: "Active",
      inventory: [
        { id: "INV_1", cropName: "Tomato", farmerName: "Ramesh Kumar", batchSizeMT: 50, entryDate: "2026-09-10", expiryDate: "2026-10-10" },
        { id: "INV_2", cropName: "Chilli", farmerName: "Srinivasa Reddy", batchSizeMT: 120, entryDate: "2026-09-12", expiryDate: "2026-12-12" }
      ]
    },
    {
      id: "STO_302",
      facilityName: "Tenali Farmers Cold Warehouse",
      operatorName: "K. Prasad",
      phone: "+91 90000 22002",
      location: "Tenali Industrial Area",
      district: "Guntur",
      totalCapacityMT: 3000,
      occupiedCapacityMT: 1800,
      availableCapacityMT: 1200,
      dailyRateQtl: 7,
      temperatureC: 3.8,
      humidityPct: 85,
      supportedCrops: ["Rice / Paddy", "Maize", "Pulses"],
      maintenanceStatus: "Optimal",
      accountStatus: "Active",
      inventory: [
        { id: "INV_3", cropName: "Rice / Paddy", farmerName: "Venkateswara Rao", batchSizeMT: 200, entryDate: "2026-09-01", expiryDate: "2027-03-01" }
      ]
    }
  ]);

  const [agreements, setAgreements] = useState<AgreementRecord[]>([
    {
      id: "AGR_880",
      farmerId: "FAR_201",
      farmerName: "Ramesh Kumar",
      cropName: "Tomato",
      quantityQuintals: 50,
      agreedPriceQtl: 2900,
      buyerId: "BUY_101",
      buyerName: "Sri Lakshmi Agri Buyers",
      storageId: "STO_301",
      storageName: "Guntur Central Cold Care",
      startDate: "2026-09-15",
      expiryDate: "2026-10-15",
      status: "Active"
    },
    {
      id: "AGR_881",
      farmerId: "FAR_202",
      farmerName: "Venkateswara Rao",
      cropName: "Rice / Paddy",
      quantityQuintals: 150,
      agreedPriceQtl: 2750,
      buyerId: "BUY_102",
      buyerName: "AgriProcure South Ltd",
      storageId: "STO_302",
      storageName: "Tenali Farmers Warehouse",
      startDate: "2026-09-01",
      expiryDate: "2026-12-31",
      status: "Active"
    }
  ]);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<"farmer" | "buyer" | "storage" | "agreement">("farmer");
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form States for Modal
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("+91 98765 43210");
  const [formDistrict, setFormDistrict] = useState("Guntur");
  const [formCrop, setFormCrop] = useState("Tomato");
  const [formSize, setFormSize] = useState("3.5");
  const [formPrice, setFormPrice] = useState("2900");
  const [formCapacity, setFormCapacity] = useState("5000");

  const logAuditAction = (module: any, action: string, recordId: string, prevVal: string, newVal: string) => {
    const newLog: AuditLogEntry = {
      id: `LOG_${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      userName: "Hitaishi Admin",
      userId: "ADM_MASTER",
      userRole: "ADMIN",
      module,
      action,
      recordId,
      prevValue: prevVal,
      newValue: newVal,
      status: "Success"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Farmer Actions
  const handleToggleFarmerStatus = (farmerId: string) => {
    setFarmers((prev) =>
      prev.map((f) => {
        if (f.id === farmerId) {
          const nextStatus = f.accountStatus === "Active" ? "Suspended" : "Active";
          logAuditAction("Farmer", `Account Status Changed to ${nextStatus}`, f.id, `Status: ${f.accountStatus}`, `Status: ${nextStatus}`);
          return { ...f, accountStatus: nextStatus };
        }
        return f;
      })
    );
  };

  const handleVerifyFarmer = (farmerId: string) => {
    setFarmers((prev) =>
      prev.map((f) => {
        if (f.id === farmerId) {
          logAuditAction("Farmer", "Verified Farmer KYC Information", f.id, `Kyc: ${f.verificationStatus}`, "Kyc: Verified");
          return { ...f, verificationStatus: "Verified" };
        }
        return f;
      })
    );
  };

  const handleDeleteFarmer = (farmerId: string) => {
    const f = farmers.find((item) => item.id === farmerId);
    if (!f) return;
    setFarmers((prev) => prev.filter((item) => item.id !== farmerId));
    logAuditAction("Farmer", "Deleted Farmer Profile Record", farmerId, `Name: ${f.name}`, "Record Removed");
  };

  // Buyer Actions
  const handleApproveBuyerKyc = (buyerId: string) => {
    setBuyers((prev) =>
      prev.map((b) => {
        if (b.id === buyerId) {
          logAuditAction("Buyer", "Approved Buyer KYC & Legal Documents", b.id, `KYC: ${b.kycStatus}`, "KYC: Verified");
          return { ...b, kycStatus: "Verified" };
        }
        return b;
      })
    );
  };

  const handleRejectBuyerKyc = (buyerId: string) => {
    setBuyers((prev) =>
      prev.map((b) => {
        if (b.id === buyerId) {
          logAuditAction("Buyer", "Rejected Buyer KYC Submission", b.id, `KYC: ${b.kycStatus}`, "KYC: Rejected");
          return { ...b, kycStatus: "Rejected" };
        }
        return b;
      })
    );
  };

  const handleToggleBuyerStatus = (buyerId: string) => {
    setBuyers((prev) =>
      prev.map((b) => {
        if (b.id === buyerId) {
          const nextStatus = b.accountStatus === "Active" ? "Suspended" : "Active";
          logAuditAction("Buyer", `Changed Buyer Account Status to ${nextStatus}`, b.id, `Status: ${b.accountStatus}`, `Status: ${nextStatus}`);
          return { ...b, accountStatus: nextStatus };
        }
        return b;
      })
    );
  };

  // Storage Actions
  const handleToggleStorageStatus = (storageId: string) => {
    setStorages((prev) =>
      prev.map((s) => {
        if (s.id === storageId) {
          const nextStatus = s.accountStatus === "Active" ? "Suspended" : "Active";
          logAuditAction("Cold Storage", `Updated Cold Storage Facility Status to ${nextStatus}`, s.id, `Status: ${s.accountStatus}`, `Status: ${nextStatus}`);
          return { ...s, accountStatus: nextStatus };
        }
        return s;
      })
    );
  };

  // Modal Submit
  const handleModalFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `${modalType.substring(0, 3).toUpperCase()}_${Date.now().toString().slice(-4)}`;

    if (modalType === "farmer") {
      const newFarmer: FarmerRecord = {
        id: newId,
        name: formName || "New Farmer",
        phone: formPhone,
        village: "Guntur Rural",
        district: formDistrict,
        state: "Andhra Pradesh",
        mainCrop: formCrop,
        farmSizeAcres: parseFloat(formSize) || 3.0,
        soilType: "Red Sandy Loam",
        verificationStatus: "Verified",
        accountStatus: "Active",
        kycDocUrl: "Aadhaar Verified",
        landRecordNo: `PATTADAR_${Date.now().toString().slice(-4)}`,
        previousCrops: ["Pulses"],
        assignedBuyer: "Unassigned",
        assignedStorage: "Unassigned",
        createdDate: new Date().toISOString().slice(0, 10)
      };
      setFarmers([newFarmer, ...farmers]);
      logAuditAction("Farmer", "Admin Added New Farmer Record", newId, "None", `Created Farmer: ${formName}`);
    } else if (modalType === "buyer") {
      const newBuyer: BuyerRecord = {
        id: newId,
        companyName: formName || "New Agri Buyer Ltd",
        repName: "Authorized Agent",
        phone: formPhone,
        email: "buyer@agritrade.com",
        location: `${formDistrict} Mandi`,
        district: formDistrict,
        buyerType: "Wholesaler & Exporter",
        interestedCrops: [formCrop],
        priceOfferedQtl: parseFloat(formPrice) || 3000,
        minQtyTons: 10,
        kycStatus: "Verified",
        accountStatus: "Active",
        kycDocName: "REGISTRATION_CERTIFICATE.pdf",
        totalAgreements: 0,
        createdDate: new Date().toISOString().slice(0, 10)
      };
      setBuyers([newBuyer, ...buyers]);
      logAuditAction("Buyer", "Admin Created New Buyer Account", newId, "None", `Created Buyer: ${formName}`);
    } else if (modalType === "storage") {
      const newStorage: ColdStorageRecord = {
        id: newId,
        facilityName: formName || "New Cold Storage Care",
        operatorName: "Facility Manager",
        phone: formPhone,
        location: `${formDistrict} Hub`,
        district: formDistrict,
        totalCapacityMT: parseFloat(formCapacity) || 4000,
        occupiedCapacityMT: 500,
        availableCapacityMT: (parseFloat(formCapacity) || 4000) - 500,
        dailyRateQtl: 8,
        temperatureC: 4.0,
        humidityPct: 85,
        supportedCrops: [formCrop, "Chilli", "Fruits"],
        maintenanceStatus: "Optimal",
        accountStatus: "Active",
        inventory: []
      };
      setStorages([newStorage, ...storages]);
      logAuditAction("Cold Storage", "Admin Added Cold Storage Facility", newId, "None", `Facility: ${formName}`);
    }

    setShowAddModal(false);
  };

  // Calculated Dashboard KPI Aggregates
  const totalFarmersCount = farmers.length;
  const activeFarmersCount = farmers.filter((f) => f.accountStatus === "Active").length;
  const pendingFarmersCount = farmers.filter((f) => f.verificationStatus === "Pending Verification").length;

  const totalBuyersCount = buyers.length;
  const verifiedBuyersCount = buyers.filter((b) => b.kycStatus === "Verified").length;
  const pendingBuyersCount = buyers.filter((b) => b.kycStatus === "Pending" || b.kycStatus === "Under Review").length;

  const totalStorageCount = storages.length;
  const totalStorageCapacityMT = storages.reduce((sum, s) => sum + s.totalCapacityMT, 0);
  const occupiedStorageCapacityMT = storages.reduce((sum, s) => sum + s.occupiedCapacityMT, 0);
  const availableStorageCapacityMT = totalStorageCapacityMT - occupiedStorageCapacityMT;

  return (
    <div className="min-h-screen bg-[#F4F6F2] py-6 px-4 sm:px-6 lg:px-8 font-sans select-none space-y-6">
      
      {/* 1. ADMIN TOP MASTER CONTROL BAR */}
      <div className="bg-gradient-to-r from-[#1B3B18] via-[#23451B] to-[#122810] text-white p-6 rounded-3xl shadow-2xl border border-emerald-800/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 mb-1">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-widest bg-amber-400/20 px-3 py-0.5 rounded-full border border-amber-400/40">
              Admin Master Control • Highest Permission Override
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            SANJEEVANI Central Control Panel
          </h1>
          <p className="text-xs text-emerald-200 mt-1">
            Complete management over Farmers, Buyers, Cold Storage, Agreements, Relational Lifecycles & Audit History.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => {
              setModalType("farmer");
              setFormName("");
              setShowAddModal(true);
            }}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xs rounded-xl shadow-md transition active:scale-95 flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Add Record</span>
          </button>

          <button
            onClick={() => setScreen("landing")}
            className="px-4 py-2.5 bg-emerald-900/80 hover:bg-emerald-950 text-emerald-200 border border-emerald-600 font-extrabold text-xs rounded-xl transition cursor-pointer"
          >
            Exit Control Panel
          </button>
        </div>
      </div>

      {/* 2. MASTER KPI AGGREGATE SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* FARMER SUMMARY CARD */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase border border-emerald-200">
              Farmer Module
            </span>
          </div>
          <div>
            <span className="text-3xl font-black text-gray-900">{totalFarmersCount}</span>
            <span className="text-xs text-gray-500 font-bold ml-1.5">Registered Farmers</span>
          </div>
          <div className="flex justify-between text-xs pt-2 border-t border-gray-100 font-bold text-gray-600">
            <span>Active: <strong className="text-emerald-700">{activeFarmersCount}</strong></span>
            <span>Pending KYC: <strong className="text-amber-600">{pendingFarmersCount}</strong></span>
          </div>
        </div>

        {/* BUYER SUMMARY CARD */}
        <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full uppercase border border-amber-200">
              Buyer Module
            </span>
          </div>
          <div>
            <span className="text-3xl font-black text-gray-900">{totalBuyersCount}</span>
            <span className="text-xs text-gray-500 font-bold ml-1.5">Registered Buyers</span>
          </div>
          <div className="flex justify-between text-xs pt-2 border-t border-gray-100 font-bold text-gray-600">
            <span>Verified: <strong className="text-emerald-700">{verifiedBuyersCount}</strong></span>
            <span>Pending Approval: <strong className="text-amber-600">{pendingBuyersCount}</strong></span>
          </div>
        </div>

        {/* COLD STORAGE SUMMARY CARD */}
        <div className="bg-white p-5 rounded-3xl border border-teal-100 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Warehouse className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full uppercase border border-teal-200">
              Storage Module
            </span>
          </div>
          <div>
            <span className="text-3xl font-black text-gray-900">{totalStorageCount}</span>
            <span className="text-xs text-gray-500 font-bold ml-1.5">Storage Facilities</span>
          </div>
          <div className="flex justify-between text-xs pt-2 border-t border-gray-100 font-bold text-gray-600">
            <span>Capacity: <strong className="text-teal-700">{(totalStorageCapacityMT/1000).toFixed(1)}k MT</strong></span>
            <span>Available: <strong className="text-emerald-700">{(availableStorageCapacityMT/1000).toFixed(1)}k MT</strong></span>
          </div>
        </div>

        {/* AGREEMENTS & LIFECYCLE SUMMARY CARD */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full uppercase border border-purple-200">
              Active Contracts
            </span>
          </div>
          <div>
            <span className="text-3xl font-black text-gray-900">{agreements.length}</span>
            <span className="text-xs text-gray-500 font-bold ml-1.5">Direct Agreements</span>
          </div>
          <div className="flex justify-between text-xs pt-2 border-t border-gray-100 font-bold text-gray-600">
            <span>Active: <strong className="text-emerald-700">{agreements.filter(a => a.status === "Active").length}</strong></span>
            <span>Audit Entries: <strong className="text-purple-700">{auditLogs.length}</strong></span>
          </div>
        </div>

      </div>

      {/* 3. SUBTAB MODULE NAVIGATION BAR */}
      <div className="flex items-center space-x-2 border-b border-gray-300 pb-3 overflow-x-auto no-scrollbar text-xs font-extrabold">
        {[
          { id: "farmers", label: "Farmer Management", icon: Sprout, badge: totalFarmersCount },
          { id: "buyers", label: "Buyer Management", icon: ShoppingBag, badge: totalBuyersCount },
          { id: "storage", label: "Cold Storage Management", icon: Warehouse, badge: totalStorageCount },
          { id: "crops", label: "Crops & Recommendation Rules", icon: Layers },
          { id: "agreements", label: "Agreements & Contracts", icon: FileCheck, badge: agreements.length },
          { id: "audit", label: "Audit & Activity Logs", icon: Activity, badge: auditLogs.length },
          { id: "settings", label: "System Permissions & Role Overrides", icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabModule(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#23451B] text-white shadow-md font-extrabold"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:text-[#23451B]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-[#23451B]"}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-emerald-800 text-amber-300" : "bg-gray-100 text-gray-600"}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. MODULE CONTENT SECTIONS */}

      {/* TAB 1: FARMER MANAGEMENT MODULE */}
      {activeTabModule === "farmers" && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
                <Sprout className="w-5 h-5 text-emerald-700" />
                <span>Farmer Management Panel</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Full CRUD control: Add, Edit, Verify KYC, Manage Crops, Soil Details, and Suspend/Activate farmer accounts.
              </p>
            </div>

            <button
              onClick={() => {
                setModalType("farmer");
                setFormName("");
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow transition cursor-pointer flex items-center space-x-1.5 self-start md:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add New Farmer</span>
            </button>
          </div>

          {/* Search & Filter Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Farmer Name, Phone, Village..."
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl outline-none focus:border-emerald-700 font-semibold"
              />
            </div>

            <div>
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl outline-none font-bold text-gray-800 bg-white"
              >
                <option value="All">All Districts (Guntur, Krishna, etc.)</option>
                <option value="Guntur">Guntur District</option>
                <option value="Krishna">Krishna District</option>
              </select>
            </div>

            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl outline-none font-bold text-gray-800 bg-white"
              >
                <option value="All">All Statuses (Active, Suspended)</option>
                <option value="Active">Active Only</option>
                <option value="Suspended">Suspended Only</option>
              </select>
            </div>
          </div>

          {/* Farmers Data Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-[10px] font-black tracking-wider border-b border-gray-200">
                  <th className="p-3">Farmer Name & ID</th>
                  <th className="p-3">Contact & Location</th>
                  <th className="p-3">Farm & Soil Details</th>
                  <th className="p-3">Main Crop & Previous</th>
                  <th className="p-3">Verification & Status</th>
                  <th className="p-3 text-center">Admin Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {farmers.map((f) => (
                  <tr key={f.id} className="hover:bg-emerald-50/40 transition">
                    <td className="p-3">
                      <div className="font-extrabold text-gray-900 text-sm">{f.name}</div>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                        {f.id}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{f.phone}</div>
                      <div className="text-[10px] text-gray-500">{f.village}, {f.district}, {f.state}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{f.farmSizeAcres} Acres</div>
                      <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                        {f.soilType}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-extrabold text-emerald-800">{f.mainCrop}</div>
                      <div className="text-[10px] text-gray-400">Prev: {f.previousCrops.join(", ")}</div>
                    </td>
                    <td className="p-3 space-y-1">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        f.verificationStatus === "Verified" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}>
                        {f.verificationStatus}
                      </span>
                      <span className={`block text-[10px] font-bold ${f.accountStatus === "Active" ? "text-emerald-600" : "text-red-600"}`}>
                        • Account {f.accountStatus}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-1 whitespace-nowrap">
                      {f.verificationStatus !== "Verified" && (
                        <button
                          onClick={() => handleVerifyFarmer(f.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg shadow-xs cursor-pointer"
                          title="Verify Farmer KYC"
                        >
                          Verify KYC
                        </button>
                      )}

                      <button
                        onClick={() => handleToggleFarmerStatus(f.id)}
                        className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg shadow-xs cursor-pointer ${
                          f.accountStatus === "Active" ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-emerald-700 hover:bg-emerald-800 text-white"
                        }`}
                      >
                        {f.accountStatus === "Active" ? "Suspend" : "Activate"}
                      </button>

                      <button
                        onClick={() => handleDeleteFarmer(f.id)}
                        className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-[10px] font-bold rounded-lg cursor-pointer"
                        title="Delete Farmer Record"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BUYER MANAGEMENT MODULE */}
      {activeTabModule === "buyers" && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-amber-700" />
                <span>Buyer Management & KYC Approval Panel</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Only Admin can approve or reject Buyer KYC documents, edit procurement requirements, and manage agreements.
              </p>
            </div>

            <button
              onClick={() => {
                setModalType("buyer");
                setFormName("");
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow transition cursor-pointer flex items-center space-x-1.5 self-start md:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add New Buyer</span>
            </button>
          </div>

          {/* Buyer Data Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-[10px] font-black tracking-wider border-b border-gray-200">
                  <th className="p-3">Buyer / Company Name</th>
                  <th className="p-3">Representative & Contact</th>
                  <th className="p-3">Interested Crops & Rate</th>
                  <th className="p-3">KYC Status & Document</th>
                  <th className="p-3">Agreements</th>
                  <th className="p-3 text-center">Admin KYC Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {buyers.map((b) => (
                  <tr key={b.id} className="hover:bg-amber-50/40 transition">
                    <td className="p-3">
                      <div className="font-extrabold text-gray-900 text-sm">{b.companyName}</div>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {b.buyerType}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{b.repName}</div>
                      <div className="text-[10px] text-gray-500">{b.phone} • {b.location}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-extrabold text-emerald-800">₹{b.priceOfferedQtl} / Quintal</div>
                      <div className="text-[10px] text-gray-500">{b.interestedCrops.join(", ")}</div>
                    </td>
                    <td className="p-3 space-y-1">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        b.kycStatus === "Verified"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : b.kycStatus === "Rejected"
                          ? "bg-red-100 text-red-800 border border-red-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300 animate-pulse"
                      }`}>
                        KYC: {b.kycStatus}
                      </span>
                      <div className="text-[10px] text-blue-700 underline font-semibold cursor-pointer">
                        📄 {b.kycDocName}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-extrabold text-gray-900">{b.totalAgreements} Active</span>
                    </td>
                    <td className="p-3 text-center space-x-1 whitespace-nowrap">
                      {b.kycStatus !== "Verified" && (
                        <button
                          onClick={() => handleApproveBuyerKyc(b.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg shadow-xs cursor-pointer"
                        >
                          Approve KYC
                        </button>
                      )}

                      {b.kycStatus !== "Rejected" && b.kycStatus !== "Verified" && (
                        <button
                          onClick={() => handleRejectBuyerKyc(b.id)}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-extrabold rounded-lg shadow-xs cursor-pointer"
                        >
                          Reject KYC
                        </button>
                      )}

                      <button
                        onClick={() => handleToggleBuyerStatus(b.id)}
                        className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-[10px] font-bold rounded-lg cursor-pointer"
                      >
                        {b.accountStatus === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COLD STORAGE MANAGEMENT MODULE */}
      {activeTabModule === "storage" && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
                <Warehouse className="w-5 h-5 text-teal-700" />
                <span>Cold Storage & Inventory Management Panel</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Complete control over warehouse capacities, stored crops, climate parameters, daily charges & inventory batches.
              </p>
            </div>

            <button
              onClick={() => {
                setModalType("storage");
                setFormName("");
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs rounded-xl shadow transition cursor-pointer flex items-center space-x-1.5 self-start md:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add Storage Facility</span>
            </button>
          </div>

          {/* Storage Facilities List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storages.map((s) => (
              <div key={s.id} className="p-5 rounded-3xl border border-teal-100 bg-stone-50/50 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base">{s.facilityName}</h3>
                    <p className="text-[11px] text-gray-500 font-medium">{s.location} • Operator: {s.operatorName}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-900 text-[10px] font-extrabold">
                    {s.maintenanceStatus}
                  </span>
                </div>

                {/* Capacity Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Occupied: <strong className="text-teal-800">{s.occupiedCapacityMT} MT</strong></span>
                    <span>Available: <strong className="text-emerald-700">{s.availableCapacityMT} MT</strong></span>
                    <span>Total: {s.totalCapacityMT} MT</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-600 h-full rounded-full"
                      style={{ width: `${(s.occupiedCapacityMT / s.totalCapacityMT) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Climate & Rate Parameters */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white rounded-xl border border-gray-200">
                    <span className="text-[9px] text-gray-400 block font-bold">Daily Rate</span>
                    <span className="font-extrabold text-emerald-800">₹{s.dailyRateQtl}/qtl/day</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-gray-200">
                    <span className="text-[9px] text-gray-400 block font-bold">Temperature</span>
                    <span className="font-extrabold text-teal-800">{s.temperatureC}°C</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-gray-200">
                    <span className="text-[9px] text-gray-400 block font-bold">Humidity</span>
                    <span className="font-extrabold text-purple-800">{s.humidityPct}%</span>
                  </div>
                </div>

                {/* Inventory Batches */}
                <div>
                  <h4 className="text-xs font-bold text-gray-800 mb-1">Stored Inventory Batches ({s.inventory.length}):</h4>
                  <div className="space-y-1 text-[11px]">
                    {s.inventory.map((inv) => (
                      <div key={inv.id} className="p-2 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-gray-900">{inv.cropName}</span> ({inv.batchSizeMT} MT)
                          <span className="text-gray-400 block text-[9px]">Farmer: {inv.farmerName} • Exp: {inv.expiryDate}</span>
                        </div>
                        <button
                          onClick={() => {
                            setStorages((prev) =>
                              prev.map((item) =>
                                item.id === s.id
                                  ? { ...item, inventory: item.inventory.filter((i) => i.id !== inv.id) }
                                  : item
                              )
                            );
                            logAuditAction("Cold Storage", "Removed Stored Inventory Batch", s.id, `Batch: ${inv.cropName}`, "Inventory Released");
                          }}
                          className="px-2 py-0.5 bg-red-50 text-red-700 text-[9px] font-bold rounded hover:bg-red-100"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => handleToggleStorageStatus(s.id)}
                    className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-gray-800 text-xs font-bold rounded-xl"
                  >
                    {s.accountStatus === "Active" ? "Suspend Facility" : "Activate Facility"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CROPS & RECOMMENDATION RULES MODULE */}
      {activeTabModule === "crops" && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                <span>Crop Catalog & AI Recommendation Rules Panel</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Admin control over regional crop parameters, soil suitability rules, and organic treatment guidelines.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { crop: "Tomato 🍅", soil: "Red Sandy Loam", npk: "120:60:60 NPK", season: "Kharif & Rabi", yieldStr: "25-30 Tons/Acre" },
              { crop: "Rice / Paddy 🌾", soil: "Clay Loam & Alluvial", npk: "100:50:50 NPK", season: "Kharif Season", yieldStr: "30-35 Quintals/Acre" },
              { crop: "Chilli 🌶️", soil: "Black Cotton & Loam", npk: "150:75:75 NPK", season: "Kharif Season", yieldStr: "15-20 Quintals/Acre" },
              { crop: "Cotton ☁️", soil: "Deep Black Cotton Soil", npk: "120:60:60 NPK", season: "Kharif Season", yieldStr: "12-15 Quintals/Acre" },
              { crop: "Maize 🌽", soil: "Well Drained Sandy Loam", npk: "120:60:40 NPK", season: "Rabi & Kharif", yieldStr: "35-40 Quintals/Acre" },
              { crop: "Groundnut 🥜", soil: "Light Sandy Soil", npk: "25:50:0 NPK", season: "Kharif Season", yieldStr: "18-22 Quintals/Acre" }
            ].map((c, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-emerald-950 text-base">{c.crop}</h3>
                  <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                    Rule Active
                  </span>
                </div>
                <div className="space-y-1 text-gray-700 font-medium">
                  <div><strong>Suitable Soil:</strong> {c.soil}</div>
                  <div><strong>Optimal NPK Ratio:</strong> {c.npk}</div>
                  <div><strong>Target Yield:</strong> {c.yieldStr}</div>
                  <div><strong>Season:</strong> {c.season}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AGREEMENTS & RELATIONAL LIFECYCLE MASTER MODULE */}
      {activeTabModule === "agreements" && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-purple-700" />
                <span>Relational Lifecycle & Direct Contract Agreements</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Complete connected chain: Farmer ➔ Farm/Soil ➔ Crop ➔ Buyer ➔ Contract ➔ Assigned Cold Storage.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {agreements.map((a) => (
              <div key={a.id} className="p-5 rounded-3xl border border-purple-100 bg-purple-50/30 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-extrabold bg-purple-200 text-purple-900 px-2 py-0.5 rounded">
                      {a.id}
                    </span>
                    <h3 className="text-base font-extrabold text-gray-900 mt-1">
                      {a.cropName} Sale Contract ({a.quantityQuintals} Quintals)
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold self-start sm:self-auto">
                    Status: {a.status}
                  </span>
                </div>

                {/* Connected Chain Visualizer */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-2xl border border-purple-100">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Farmer Producer</span>
                    <span className="font-extrabold text-emerald-900 text-sm">{a.farmerName}</span>
                    <span className="text-[10px] text-gray-500 block">ID: {a.farmerId}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Contracted Buyer</span>
                    <span className="font-extrabold text-amber-900 text-sm">{a.buyerName}</span>
                    <span className="text-[10px] text-emerald-800 font-bold block">₹{a.agreedPriceQtl} / Quintal</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Assigned Cold Storage</span>
                    <span className="font-extrabold text-teal-900 text-sm">{a.storageName}</span>
                    <span className="text-[10px] text-gray-500 block">Facility ID: {a.storageId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: COMPLETE ACTIVITY / AUDIT LOG MODULE */}
      {activeTabModule === "audit" && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-700" />
                <span>Complete Activity & Immutable System Audit History</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Read-only system log for all Admin, Farmer, Buyer, and Storage operator changes with prior and new values.
              </p>
            </div>

            <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-extrabold rounded-full">
              🔒 Audit Log Read-Only Enforced
            </span>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-[10px] font-black tracking-wider border-b border-gray-200">
                  <th className="p-3">Log ID & Timestamp</th>
                  <th className="p-3">User & Role</th>
                  <th className="p-3">Module</th>
                  <th className="p-3">Action Description</th>
                  <th className="p-3">Previous Value ➔ New Value</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-blue-50/30 transition">
                    <td className="p-3">
                      <span className="font-bold text-gray-900 block">{log.id}</span>
                      <span className="text-[10px] text-gray-400">{log.timestamp}</span>
                    </td>
                    <td className="p-3">
                      <div className="font-extrabold text-gray-900">{log.userName}</div>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                        {log.userRole}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-800">{log.module}</span>
                    </td>
                    <td className="p-3">
                      <div className="font-extrabold text-gray-900">{log.action}</div>
                      <span className="text-[10px] text-gray-400">Rec ID: {log.recordId}</span>
                    </td>
                    <td className="p-3 text-[11px]">
                      <span className="text-gray-500 line-through mr-1">{log.prevValue}</span>
                      <span className="text-emerald-800 font-extrabold">➔ {log.newValue}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: SYSTEM PERMISSIONS & ROLE OVERRIDES MODULE */}
      {activeTabModule === "settings" && (
        <div className="space-y-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-700" />
                <span>Role Hierarchy & Permission Overrides</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Admin privileges supersede all lower roles. Backend & Frontend strict role enforcement enabled.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-900 text-white space-y-2 shadow-md">
              <h3 className="font-extrabold text-amber-300 text-sm">ADMIN (Highest Privilege)</h3>
              <p className="text-[11px] text-emerald-100">
                Full CRUD, KYC approval/rejection, user account activation/suspension, agreement termination, and log inspection.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2 text-stone-800">
              <h3 className="font-extrabold text-stone-900 text-sm">FARMER</h3>
              <p className="text-[11px] text-stone-600">
                Control limited strictly to own farm, soil details, crop diagnosis, and buyer produce requests.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2 text-stone-800">
              <h3 className="font-extrabold text-stone-900 text-sm">BUYER</h3>
              <p className="text-[11px] text-stone-600">
                Control limited strictly to own profile, interested crops, procurement requests, and contract acceptance.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2 text-stone-800">
              <h3 className="font-extrabold text-stone-900 text-sm">COLD STORAGE OPERATOR</h3>
              <p className="text-[11px] text-stone-600">
                Control limited strictly to assigned storage facility, daily rates, and inventory batch updates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. UNIVERSAL ADMIN ADD/EDIT RECORD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 border border-emerald-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-extrabold text-gray-900">
                Admin Add New {modalType.toUpperCase()} Record
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleModalFormSubmit} className="space-y-3.5 text-xs font-semibold">
              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  {modalType === "farmer" ? "Farmer Full Name" : modalType === "buyer" ? "Buyer / Company Name" : "Storage Facility Name"}
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter full name or business title"
                  className="w-full p-3 border border-gray-300 rounded-xl font-bold text-gray-900 outline-none focus:border-emerald-700"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">District</label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Crop / Product Focus</label>
                <input
                  type="text"
                  value={formCrop}
                  onChange={(e) => setFormCrop(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-gray-900"
                  required
                />
              </div>

              <div className="flex space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-[#23451B] hover:bg-[#1A3414] text-white font-extrabold rounded-xl shadow cursor-pointer active:scale-95"
                >
                  Save Admin Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
