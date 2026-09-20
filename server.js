const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));

// In-Memory Database with Seed baseline
let db = {
  farmers: [
    { id: "FAR_201", full_name: "Ramesh Kumar", phone: "+91 9876543210", village: "Tadikonda", district: "Guntur", state: "Andhra Pradesh", main_crop: "Tomato", farm_size_acres: 3.5, soil_type: "Red Sandy Loam", kyc_status: "Verified", account_status: "Active", created_at: "2026-09-15" },
    { id: "FAR_202", full_name: "Venkateswara Rao", phone: "+91 9848012345", village: "Tenali", district: "Guntur", state: "Andhra Pradesh", main_crop: "Chilli", farm_size_acres: 5.0, soil_type: "Black Clay Soil", kyc_status: "Verified", account_status: "Active", created_at: "2026-09-16" },
    { id: "FAR_203", full_name: "K. Satyanarayana", phone: "+91 9440156789", village: "Mangalagiri", district: "Guntur", state: "Andhra Pradesh", main_crop: "Turmeric", farm_size_acres: 4.2, soil_type: "Alluvial Soil", kyc_status: "Pending", account_status: "Active", created_at: "2026-09-19" }
  ],
  buyers: [
    { id: "BUY_301", company_name: "Sri Lakshmi Agri Processing Pvt Ltd", rep_name: "Anand Reddy", phone: "+91 9849011223", email: "procurement@srilakshmiagri.com", location: "Guntur Industrial Estate", district: "Guntur", state: "Andhra Pradesh", buyer_type: "Processor", interested_crops: ["Tomato", "Chilli"], price_offered_qtl: 2850.0, min_qty_tons: 5.0, kyc_status: "Verified", account_status: "Active", kyc_doc_name: "GSTIN_37AABCU9603R1ZM.pdf", created_at: "2026-09-17" },
    { id: "BUY_302", company_name: "Deccan Food Exports Ltd", rep_name: "P. Sudhakar", phone: "+91 9440188990", email: "exports@deccanfoods.in", location: "Autonagar, Vijayawada", district: "Krishna", state: "Andhra Pradesh", buyer_type: "Exporter", interested_crops: ["Chilli", "Turmeric"], price_offered_qtl: 19500.0, min_qty_tons: 10.0, kyc_status: "Verified", account_status: "Active", kyc_doc_name: "IEC_Trade_0512893411.pdf", created_at: "2026-09-18" },
    { id: "BUY_303", company_name: "Godavari Agro Traders", rep_name: "M. Ramachandra Rao", phone: "+91 9866123456", email: "trade@godavariagro.com", location: "Market Yard, Guntur", district: "Guntur", state: "Andhra Pradesh", buyer_type: "Wholesaler", interested_crops: ["Cotton", "Maize"], price_offered_qtl: 7500.0, min_qty_tons: 8.0, kyc_status: "Pending", account_status: "Active", kyc_doc_name: "FSSAI_Cert_1001904700.pdf", created_at: "2026-09-19" }
  ],
  crops: [
    { id: "CRP_01", name: "Tomato (Hybrid Grade A)", name_te: "టమోటా (హైబ్రిడ్ గ్రేడ్ A)", name_hi: "टमाटर (हाइब्रिड)", category: "Vegetables", variety: "Arka Rakshak", season: "Kharif", harvest_status: "Optimal Harvest", expected_price_qtl: 2800.0, current_mandi_price: 2800.0, mandi_name: "Guntur Mandi", unit: "₹/Quintal", change_pct: 5.2, trend: "up" },
    { id: "CRP_02", name: "Red Chilli (Teja / Dry)", name_te: "ఎండు మిర్చి (తేజ)", name_hi: "लाल मिर्च (तेजा)", category: "Spices", variety: "Teja Supreme", season: "Rabi", harvest_status: "Drying & Storing", expected_price_qtl: 19200.0, current_mandi_price: 19200.0, mandi_name: "Guntur Mirchi Yard", unit: "₹/Quintal", change_pct: 3.8, trend: "up" },
    { id: "CRP_03", name: "Turmeric (Salem Finger)", name_te: "పసుపు కొమ్ములు", name_hi: "हल्दी गांठ", category: "Spices", variety: "Prathibha", season: "Rabi", harvest_status: "Harvest Ready", expected_price_qtl: 13500.0, current_mandi_price: 13500.0, mandi_name: "Duggirala Market", unit: "₹/Quintal", change_pct: 1.5, trend: "up" },
    { id: "CRP_04", name: "Cotton (Shankar-6)", name_te: "పత్తి", name_hi: "कपास", category: "Commercial", variety: "Shankar-6", season: "Kharif", harvest_status: "Picking Phase", expected_price_qtl: 7450.0, current_mandi_price: 7450.0, mandi_name: "Adoni Mandi", unit: "₹/Quintal", change_pct: -0.8, trend: "down" }
  ],
  storage_facilities: [
    { id: "STR_401", facility_name: "Sri Lakshmi Agro Cold Storage", operator_name: "K. Venkateswara Rao", phone: "+91 98480 33441", location: "NH-16 Bypass Road", district: "Guntur", total_capacity_mt: 500.0, occupied_capacity_mt: 380.0, available_capacity_mt: 120.0, daily_rate_qtl: 12.0, temperature_c: 3.5, humidity_pct: 88.0, supported_crops: ["Tomato", "Chilli", "Turmeric"], maintenance_status: "Optimal", account_status: "Active" },
    { id: "STR_402", facility_name: "Guntur Mirchi Yard Mega Cold Storage", operator_name: "AP State Warehousing Corp", phone: "+91 98480 55662", location: "Mirchi Yard Complex", district: "Guntur", total_capacity_mt: 1200.0, occupied_capacity_mt: 950.0, available_capacity_mt: 250.0, daily_rate_qtl: 14.0, temperature_c: 2.0, humidity_pct: 82.0, supported_crops: ["Chilli", "Turmeric", "Spices"], maintenance_status: "Optimal", account_status: "Active" }
  ],
  agreements: [
    { id: "AGR_501", agreement_code: "AGR-2026-089", farmer_id: "FAR_201", farmer_name: "Ramesh Kumar", buyer_id: "BUY_301", buyer_name: "Sri Lakshmi Agri Processing Pvt Ltd", storage_name: "Sri Lakshmi Agro Cold Storage", crop_name: "Tomato (Grade A)", quantity_qtl: 100.0, agreed_price_qtl: 2850.0, total_value: 285000.0, start_date: "2026-09-15", end_date: "2026-10-15", status: "Active" },
    { id: "AGR_502", agreement_code: "AGR-2026-090", farmer_id: "FAR_202", farmer_name: "Venkateswara Rao", buyer_id: "BUY_302", buyer_name: "Deccan Food Exports Ltd", storage_name: "Guntur Mirchi Yard Mega Cold Storage", crop_name: "Red Chilli (Teja)", quantity_qtl: 25.0, agreed_price_qtl: 19500.0, total_value: 487500.0, start_date: "2026-09-18", end_date: "2026-11-18", status: "Active" }
  ],
  payments: [
    { id: "TXN_701", txn_code: "TXN-2026-0901", agreement_id: "AGR_501", payer_name: "Sri Lakshmi Agri Processing Pvt Ltd", payee_name: "Ramesh Kumar", amount: 85500.0, payment_method: "NEFT Bank Direct", status: "Success", reference_number: "SBI9928172635", created_at: "2026-09-16" },
    { id: "TXN_702", txn_code: "TXN-2026-0902", agreement_id: "AGR_502", payer_name: "Deccan Food Exports Ltd", payee_name: "Venkateswara Rao", amount: 146250.0, payment_method: "RTGS Direct Transfer", status: "Success", reference_number: "HDFC8837162534", created_at: "2026-09-19" }
  ],
  worker_requests: [
    { id: "WR_101", farmer_name: "Ramesh Kumar", phone: "+91 9876543210", work_type: "Tomato Harvesting", workers_needed: 6, date: "Tomorrow", location: "Tadikonda, Guntur", status: "Requested", created_at: "2026-09-20" }
  ],
  audit_logs: [
    { id: "LOG_01", action: "System Initialized with Relational Database", user_name: "Hitaishi Admin", role: "MASTER_ADMIN", entity: "System", entity_id: "SYS_01", status: "SUCCESS", details: "Single source of truth initialized.", timestamp: new Date().toISOString() }
  ],
  cms: {
    hero_banner: {
      key: "hero_banner",
      title: "Sanjeevani AgriTech Platform",
      subtitle: "From Crop Care to Market — Your Farming Saathi.",
      notice_text: "Special Procurement Drive: Guntur Mirchi Yard live rates +5.2% above MSP.",
      is_active: true
    }
  }
};

// API Health
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    app: "SANJEEVANI",
    tagline: "From Crop Care to Market - Your Farming Saathi",
    database: "Single Source of Truth Database Connected",
    ai_engine: "WPF Plant Dataset Model Loaded (v1.2.0)",
    weather_service: "Open-Meteo API Connected"
  });
});

// Dashboard Statistics Endpoint (Dynamic Database Calculations)
app.get("/api/dashboard/stats", (req, res) => {
  const totalFarmers = db.farmers.length;
  const activeFarmers = db.farmers.filter(f => f.kyc_status === "Verified").length;
  const pendingFarmers = db.farmers.filter(f => f.kyc_status === "Pending").length;

  const totalBuyers = db.buyers.length;
  const verifiedBuyers = db.buyers.filter(b => b.kyc_status === "Verified").length;
  const pendingBuyers = db.buyers.filter(b => b.kyc_status === "Pending").length;

  const totalCap = db.storage_facilities.reduce((acc, f) => acc + f.total_capacity_mt, 0);
  const occupiedCap = db.storage_facilities.reduce((acc, f) => acc + f.occupied_capacity_mt, 0);
  const freeCap = db.storage_facilities.reduce((acc, f) => acc + f.available_capacity_mt, 0);
  const usagePct = totalCap > 0 ? ((occupiedCap / totalCap) * 100).toFixed(1) : 0;

  const totalRevenue = db.payments.filter(p => p.status === "Success").reduce((acc, p) => acc + p.amount, 0);

  res.json({
    farmers: { total: totalFarmers, active: activeFarmers, pending: pendingFarmers, suspended: 0 },
    buyers: { total: totalBuyers, verified: verifiedBuyers, pending: pendingBuyers, suspended: 0 },
    cold_storage: {
      total_facilities: db.storage_facilities.length,
      active_facilities: db.storage_facilities.length,
      total_capacity_mt: totalCap,
      used_capacity_mt: occupiedCap,
      free_capacity_mt: freeCap,
      usage_percentage: parseFloat(usagePct)
    },
    crops: { total: db.crops.length, harvest_ready: db.crops.filter(c => c.harvest_status.includes("Harvest")).length },
    agreements: { total: db.agreements.length, active: db.agreements.filter(a => a.status === "Active").length, expiring: 0 },
    revenue: { total_processed: totalRevenue, total_transactions: db.payments.length, successful_transactions: db.payments.filter(p => p.status === "Success").length, pending_transactions: 0 },
    alerts: pendingBuyers > 0 ? [{ id: "alt_1", type: "kyc", title: `${pendingBuyers} Buyer KYC Pending`, severity: "high", action: "Review in Buyers" }] : [],
    recent_activities: db.audit_logs
  });
});

// Farmers CRUD
app.get("/api/farmers", (req, res) => res.json(db.farmers));
app.post("/api/farmers", (req, res) => {
  const newFarmer = { id: `FAR_${Date.now().toString().slice(-4)}`, kyc_status: "Pending", account_status: "Active", created_at: new Date().toISOString(), ...req.body };
  db.farmers.unshift(newFarmer);
  db.audit_logs.unshift({ id: `LOG_${Date.now()}`, action: `Registered New Farmer: ${newFarmer.full_name}`, user_name: newFarmer.full_name, role: "FARMER", entity: "Farmer", entity_id: newFarmer.id, status: "SUCCESS", timestamp: new Date().toISOString() });
  res.json(newFarmer);
});
app.patch("/api/farmers/:id/status", (req, res) => {
  const farmer = db.farmers.find(f => f.id === req.params.id);
  if (!farmer) return res.status(404).json({ error: "Farmer not found" });
  if (req.body.kyc_status) farmer.kyc_status = req.body.kyc_status;
  if (req.body.account_status) farmer.account_status = req.body.account_status;
  db.audit_logs.unshift({ id: `LOG_${Date.now()}`, action: `Updated Farmer Status: ${farmer.full_name} -> ${farmer.kyc_status}`, user_name: req.body.admin_name || "Admin", role: "MASTER_ADMIN", entity: "Farmer", entity_id: farmer.id, status: "SUCCESS", timestamp: new Date().toISOString() });
  res.json({ success: true, farmer });
});

// Buyers CRUD
app.get("/api/buyers", (req, res) => res.json(db.buyers));
app.post("/api/buyers", (req, res) => {
  const newBuyer = { id: `BUY_${Date.now().toString().slice(-4)}`, kyc_status: "Pending", account_status: "Active", created_at: new Date().toISOString(), ...req.body };
  db.buyers.unshift(newBuyer);
  db.audit_logs.unshift({ id: `LOG_${Date.now()}`, action: `Registered New Buyer: ${newBuyer.company_name}`, user_name: newBuyer.rep_name, role: "BUYER", entity: "Buyer", entity_id: newBuyer.id, status: "SUCCESS", timestamp: new Date().toISOString() });
  res.json(newBuyer);
});
app.patch("/api/buyers/:id/status", (req, res) => {
  const buyer = db.buyers.find(b => b.id === req.params.id);
  if (!buyer) return res.status(404).json({ error: "Buyer not found" });
  if (req.body.kyc_status) buyer.kyc_status = req.body.kyc_status;
  if (req.body.account_status) buyer.account_status = req.body.account_status;
  db.audit_logs.unshift({ id: `LOG_${Date.now()}`, action: `Verified Buyer KYC: ${buyer.company_name} -> ${buyer.kyc_status}`, user_name: req.body.admin_name || "Admin", role: "MASTER_ADMIN", entity: "Buyer", entity_id: buyer.id, status: "SUCCESS", timestamp: new Date().toISOString() });
  res.json({ success: true, buyer });
});

// Crops CRUD
app.get("/api/crops", (req, res) => res.json(db.crops));
app.put("/api/crops/:id", (req, res) => {
  const crop = db.crops.find(c => c.id === req.params.id);
  if (!crop) return res.status(404).json({ error: "Crop not found" });
  Object.assign(crop, req.body);
  res.json(crop);
});

// Cold Storage CRUD
app.get("/api/cold-storage", (req, res) => res.json(db.storage_facilities));
app.post("/api/cold-storage/book", (req, res) => {
  const facility = db.storage_facilities.find(f => f.id === req.body.facility_id);
  if (!facility) return res.status(404).json({ error: "Facility not found" });
  facility.occupied_capacity_mt += req.body.batch_size_mt;
  facility.available_capacity_mt = Math.max(0, facility.total_capacity_mt - facility.occupied_capacity_mt);
  res.json({ success: true, message: "Storage space booked!", facility });
});

// Agreements CRUD
app.get("/api/agreements", (req, res) => res.json(db.agreements));

// Payments CRUD
app.get("/api/payments", (req, res) => res.json(db.payments));

// Workers CRUD
app.get("/api/workers/requests", (req, res) => res.json(db.worker_requests));
app.post("/api/workers/requests", (req, res) => {
  const newReq = { id: `WR_${Date.now().toString().slice(-4)}`, status: "Requested", created_at: new Date().toISOString(), ...req.body };
  db.worker_requests.unshift(newReq);
  res.json(newReq);
});

// Audit Logs
app.get("/api/audit-logs", (req, res) => res.json(db.audit_logs));

// CMS
app.get("/api/cms/:key", (req, res) => res.json(db.cms[req.params.key] || { title: "Sanjeevani", subtitle: "AgriTech Platform" }));
app.put("/api/cms/:key", (req, res) => {
  db.cms[req.params.key] = { ...db.cms[req.params.key], ...req.body };
  res.json(db.cms[req.params.key]);
});

// Global Search
app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const results = [];
  db.farmers.filter(f => f.full_name.toLowerCase().includes(q) || f.phone.includes(q)).forEach(f => results.push({ entity: "Farmer", id: f.id, title: f.full_name, subtitle: `${f.village}, ${f.district} • ${f.main_crop}`, status: f.kyc_status, route_module: "farmers" }));
  db.buyers.filter(b => b.company_name.toLowerCase().includes(q) || b.phone.includes(q)).forEach(b => results.push({ entity: "Buyer", id: b.id, title: b.company_name, subtitle: `${b.rep_name} • ${b.buyer_type}`, status: b.kyc_status, route_module: "buyers" }));
  db.crops.filter(c => c.name.toLowerCase().includes(q)).forEach(c => results.push({ entity: "Crop", id: c.id, title: c.name, subtitle: `₹${c.current_mandi_price}/Qtl at ${c.mandi_name}`, status: c.harvest_status, route_module: "crops" }));
  res.json({ results });
});

// Serve frontend dist
const frontendBuild = path.join(__dirname, "frontend", "dist");
if (fs.existsSync(frontendBuild)) {
  app.use(express.static(frontendBuild));
  app.use((req, res) => {
    res.sendFile(path.join(frontendBuild, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`SANJEEVANI Unified Platform Server active on port ${PORT}`);
});
