// Shared data store for Sanjeevani Farmer App & Master Admin Portal

export interface SharedFarmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  crop: string;
  farmSizeAcres: number;
  kycStatus: "Pending" | "Verified" | "Rejected";
  accountStatus: "Active" | "Suspended";
  createdDate: string;
  profilePhoto?: string | null;
}

export interface SharedBuyer {
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
  createdDate: string;
}

export interface SharedStorage {
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
  supportedCrops: string[];
  accountStatus: "Active" | "Suspended";
}

export interface SharedWorkerRequest {
  id: string;
  farmerName: string;
  phone: string;
  workType: string;
  workersNeeded: number;
  date: string;
  location: string;
  status: "Requested" | "Assigned" | "In Progress" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface SharedMandiPrice {
  id: string;
  crop: string;
  cropTe: string;
  cropHi: string;
  mandi: string;
  price: number;
  unit: string;
  changePct: number;
  trend: "up" | "down";
  updatedAt: string;
}

const DEFAULT_FARMERS: SharedFarmer[] = [
  {
    id: "f_001",
    name: "Ramesh Kumar",
    phone: "+91 9876543210",
    village: "Tadikonda",
    district: "Guntur",
    state: "Andhra Pradesh",
    crop: "Tomato",
    farmSizeAcres: 3.5,
    kycStatus: "Verified",
    accountStatus: "Active",
    createdDate: "2026-09-15"
  },
  {
    id: "f_002",
    name: "Venkatesh Rao",
    phone: "+91 9848012345",
    village: "Tenali",
    district: "Guntur",
    state: "Andhra Pradesh",
    crop: "Chilli",
    farmSizeAcres: 5.0,
    kycStatus: "Verified",
    accountStatus: "Active",
    createdDate: "2026-09-16"
  }
];

const DEFAULT_BUYERS: SharedBuyer[] = [
  {
    id: "b_001",
    companyName: "Sri Lakshmi Agri Processing Pvt Ltd",
    repName: "Anand Reddy",
    phone: "+91 9849011223",
    email: "procurement@srilakshmiagri.com",
    location: "Guntur Industrial Estate",
    district: "Guntur",
    buyerType: "Processor",
    interestedCrops: ["Tomato", "Chilli"],
    priceOfferedQtl: 2850,
    minQtyTons: 5,
    kycStatus: "Verified",
    accountStatus: "Active",
    kycDocName: "GSTIN_37AABCU9603R1ZM.pdf",
    createdDate: "2026-09-17"
  },
  {
    id: "b_002",
    companyName: "Deccan Food Exports Ltd",
    repName: "P. Sudhakar",
    phone: "+91 9440188990",
    email: "exports@deccanfoods.in",
    location: "Autonagar, Vijayawada",
    district: "Krishna",
    buyerType: "Exporter",
    interestedCrops: ["Chilli", "Turmeric"],
    priceOfferedQtl: 19500,
    minQtyTons: 10,
    kycStatus: "Verified",
    accountStatus: "Active",
    kycDocName: "IEC_Trade_0512893411.pdf",
    createdDate: "2026-09-18"
  }
];

const DEFAULT_WORKER_REQUESTS: SharedWorkerRequest[] = [
  {
    id: "wr_001",
    farmerName: "Ramesh Kumar",
    phone: "+91 9876543210",
    workType: "Tomato Harvesting",
    workersNeeded: 6,
    date: "Tomorrow",
    location: "Tadikonda, Guntur",
    status: "Requested",
    createdAt: "2026-09-20 09:30 AM"
  },
  {
    id: "wr_002",
    farmerName: "Venkatesh Rao",
    phone: "+91 9848012345",
    workType: "Field Weeding & Cleaning",
    workersNeeded: 4,
    date: "2026-09-22",
    location: "Tenali, Guntur",
    status: "Assigned",
    createdAt: "2026-09-19 02:15 PM"
  }
];

const DEFAULT_MANDI_PRICES: SharedMandiPrice[] = [
  {
    id: "m_001",
    crop: "Tomato (Grade A)",
    cropTe: "టమోటా (గ్రేడ్ A)",
    cropHi: "टमाटर (ग्रेड A)",
    mandi: "Guntur Mandi",
    price: 2800,
    unit: "₹/Quintal",
    changePct: 5.2,
    trend: "up",
    updatedAt: "Today 08:30 AM"
  },
  {
    id: "m_002",
    crop: "Red Chilli (Teja / Dry)",
    cropTe: "ఎండు మిర్చి (తేజ)",
    cropHi: "लाल मिर्च (तेजा)",
    mandi: "Guntur Mirchi Yard",
    price: 19200,
    unit: "₹/Quintal",
    changePct: 3.8,
    trend: "up",
    updatedAt: "Today 08:30 AM"
  },
  {
    id: "m_003",
    crop: "Turmeric (Salem Finger)",
    cropTe: "పసుపు కొమ్ములు",
    cropHi: "हल्दी गांठ",
    mandi: "Duggirala Market",
    price: 13500,
    unit: "₹/Quintal",
    changePct: 1.5,
    trend: "up",
    updatedAt: "Today 08:30 AM"
  },
  {
    id: "m_004",
    crop: "Cotton (Shankar-6)",
    cropTe: "పత్తి",
    cropHi: "कपास",
    mandi: "Adoni Mandi",
    price: 7450,
    unit: "₹/Quintal",
    changePct: -0.8,
    trend: "down",
    updatedAt: "Today 08:30 AM"
  }
];

export const getSharedFarmers = (): SharedFarmer[] => {
  try {
    const raw = localStorage.getItem("sanjeevani_farmers");
    return raw ? JSON.parse(raw) : DEFAULT_FARMERS;
  } catch {
    return DEFAULT_FARMERS;
  }
};

export const saveSharedFarmers = (farmers: SharedFarmer[]) => {
  localStorage.setItem("sanjeevani_farmers", JSON.stringify(farmers));
  window.dispatchEvent(new Event("sanjeevani_storage_update"));
};

export const getSharedBuyers = (): SharedBuyer[] => {
  try {
    const raw = localStorage.getItem("sanjeevani_buyers");
    return raw ? JSON.parse(raw) : DEFAULT_BUYERS;
  } catch {
    return DEFAULT_BUYERS;
  }
};

export const saveSharedBuyers = (buyers: SharedBuyer[]) => {
  localStorage.setItem("sanjeevani_buyers", JSON.stringify(buyers));
  window.dispatchEvent(new Event("sanjeevani_storage_update"));
};

export const getSharedWorkerRequests = (): SharedWorkerRequest[] => {
  try {
    const raw = localStorage.getItem("sanjeevani_worker_requests");
    return raw ? JSON.parse(raw) : DEFAULT_WORKER_REQUESTS;
  } catch {
    return DEFAULT_WORKER_REQUESTS;
  }
};

export const addSharedWorkerRequest = (req: Omit<SharedWorkerRequest, "id" | "createdAt">): SharedWorkerRequest => {
  const current = getSharedWorkerRequests();
  const newReq: SharedWorkerRequest = {
    ...req,
    id: `wr_${Date.now()}`,
    createdAt: new Date().toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })
  };
  const updated = [newReq, ...current];
  localStorage.setItem("sanjeevani_worker_requests", JSON.stringify(updated));
  window.dispatchEvent(new Event("sanjeevani_storage_update"));
  return newReq;
};

export const getSharedMandiPrices = (): SharedMandiPrice[] => {
  try {
    const raw = localStorage.getItem("sanjeevani_mandi_prices");
    return raw ? JSON.parse(raw) : DEFAULT_MANDI_PRICES;
  } catch {
    return DEFAULT_MANDI_PRICES;
  }
};

export const saveSharedMandiPrices = (prices: SharedMandiPrice[]) => {
  localStorage.setItem("sanjeevani_mandi_prices", JSON.stringify(prices));
  window.dispatchEvent(new Event("sanjeevani_storage_update"));
};
