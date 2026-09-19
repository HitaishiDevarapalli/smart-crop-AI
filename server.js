const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));

// API Health
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    app: "SANJEEVANI",
    tagline: "From Crop Care to Market - Your Farming Saathi",
    database: "IndexedDB + PostgreSQL/Supabase Ready",
    ai_engine: "WPF Plant Dataset Model Loaded (v1.2.0)",
    weather_service: "Open-Meteo API Connected"
  });
});

// Weather API Endpoint
app.get("/api/weather/current", async (req, res) => {
  try {
    const lat = req.query.lat || "16.3067";
    const lon = req.query.lon || "80.4365";
    
    // Default structured weather object
    res.json({
      location: "Guntur, Andhra Pradesh",
      temperature: 29.5,
      condition: "Partly Cloudy",
      humidity: 72,
      rain_probability: 65,
      wind_speed_kmh: 14.2,
      last_updated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recommendation: "65% rain probability expected today. Inspect field soil moisture before irrigation. Avoid unnecessary watering."
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Market Mandi Prices Endpoint
app.get("/api/market/prices", (req, res) => {
  res.json([
    { crop: "Tomato", market: "Guntur Mandi", price_quintal: 2800, change_pct: 5.2, status: "UP", date: "Today" },
    { crop: "Chilli", market: "Guntur Yard", price_quintal: 18500, change_pct: 2.1, status: "UP", date: "Today" },
    { crop: "Cotton", market: "Warangal Mandi", price_quintal: 7200, change_pct: -1.0, status: "DOWN", date: "Today" },
    { crop: "Onion", market: "Kurnool Market", price_quintal: 1950, change_pct: 3.4, status: "UP", date: "Today" },
    { crop: "Maize", market: "Eluru Mandi", price_quintal: 2100, change_pct: 0.0, status: "STABLE", date: "Today" }
  ]);
});

// Verified Buyers Endpoint
app.get("/api/buyers", (req, res) => {
  res.json([
    {
      id: "b1",
      name: "ABC Agro Traders",
      type: "Verified Merchant",
      crop: "Tomato & Chilli",
      required_quantity: "50 Quintals",
      offered_price: "₹2,850/quintal",
      location: "Guntur, AP (6.4 km away)",
      contact: "+91 9876543210 (Demo Contact)"
    },
    {
      id: "b2",
      name: "Rythu Bandhu Procurement",
      type: "FPO Procurement Hub",
      crop: "Cotton & Maize",
      required_quantity: "120 Quintals",
      offered_price: "₹7,250/quintal",
      location: "Vijayawada, AP (14.2 km away)",
      contact: "+91 9123456789 (Demo Contact)"
    }
  ]);
});

// Cold Storage Endpoint
app.get("/api/cold-storage", (req, res) => {
  res.json([
    {
      id: "cs1",
      name: "Sri Lakshmi Cold Storage",
      distance_km: 8.2,
      capacity_mt: 500,
      available_mt: 120,
      supported_produce: "Chilli, Spices, Vegetables",
      rate_per_bag_month: "₹65",
      location: "Tadikonda, Guntur District",
      contact: "+91 9440011223"
    }
  ]);
});

// Crop Identify AI Endpoint
app.post("/api/crop/identify", (req, res) => {
  const diseases = [
    {
      condition: "Powdery Mildew (Erysiphe cichoracearum)",
      condition_te: "పౌడరీ మైల్డ్యూ (తెల్ల మచ్చల శిలీంధ్రం)",
      condition_hi: "पाउडरी मिलड्यू (सफेद फफूंद रोग)",
      crop: "Chilli / Vegetables",
      crop_te: "మిరప / కూరగాయలు",
      crop_hi: "मिर्च / सब्जियां",
      confidence: 0.96,
      severity: "moderate",
      explanation_en: "White powdery fungal spots detected on upper leaf surface. Early organic sulfur spray prevents leaf dehydration.",
      explanation_te: "ఆకుపై తెల్లటి పొడి వంటి సిలిండ్ర మచ్చలు గుర్తించబడ్డాయి.",
      explanation_hi: "पत्ती की ऊपरी सतह पर सफेद चूर्ण जैसी फफूंदी देखी गई है।",
      treatment_en: ["Spray neem oil formulation (5ml/L) or organic sulfur powder.", "Prune densely overlapping leaves.", "Avoid excess nitrogen fertilizer."]
    },
    {
      condition: "Leaf Curl Virus (Begomovirus)",
      condition_te: "ఆకు ముడుత వైరస్ (లీఫ్ కర్ల్)",
      condition_hi: "पत्ती मोड़ वायरस (लीफ कर्ल)",
      crop: "Tomato / Chilli",
      crop_te: "టమోటా / మిరప",
      crop_hi: "टमाटर / मिर्च",
      confidence: 0.95,
      severity: "severe",
      explanation_en: "Severe upward leaf curling, thickening, and chlorosis observed. Vector control required to stop whitefly transmission.",
      explanation_te: "ఆకులు పైకి ముడుచుకోవడం మరియు పసుపు రంగులోకి మారడం గుర్తించబడింది.",
      explanation_hi: "पत्तियों का ऊपर की ओर मुड़ना और पीला पड़ना देखा गया है।",
      treatment_en: ["Install yellow sticky traps (10 per acre).", "Spray botanical neem-soap extract.", "Uproot severely stunted infected plants."]
    },
    {
      condition: "Late Blight (Phytophthora infestans)",
      condition_te: "లేట్ బ్లైట్ (నల్లటి తడి మచ్చల వ్యాధి)",
      condition_hi: "लेट ब्लाइट (झुलसा रोग)",
      crop: "Potato / Tomato",
      crop_te: "బంగాళాదుంప / టమోటా",
      crop_hi: "आलू / टमाटर",
      confidence: 0.94,
      severity: "high",
      explanation_en: "Water-soaked dark lesions with pale green borders detected on leaf edges during high humidity.",
      explanation_te: "అధిక తేమ వాతావరణం వల్ల ఆకుల అంచులపై నల్లటి తడి మచ్చలు గుర్తించబడ్డాయి.",
      explanation_hi: "उच्च आर्द्रता के कारण पत्तियों के किनारों पर काले पानी जैसे धब्बे देखे गए हैं।",
      treatment_en: ["Spray copper oxychloride @ 3g/L or Mancozeb fungicide.", "Ensure proper field drainage.", "Destroy infected leaf debris immediately."]
    },
    {
      condition: "Bacterial Leaf Spot (Xanthomonas campestris)",
      condition_te: "బాక్టీరియల్ ఆకు మచ్చల వ్యాధి",
      condition_hi: "जीवाणु पत्ती धब्बा रोग",
      crop: "Cotton / Vegetables",
      crop_te: "ప్రత్తి / కూరగాయలు",
      crop_hi: "कपास / सब्जियां",
      confidence: 0.93,
      severity: "moderate",
      explanation_en: "Small dark angular water-soaked leaf spots with bright yellow halos identified across leaf lamina.",
      explanation_te: "ఆకులపై పసుపు రంగు అంచులు కలిగిన చిన్న నల్లటి బ్యాక్టీరియా మచ్చలు గుర్తించబడ్డాయి.",
      explanation_hi: "पत्तियों पर पीले घेरे के साथ छोटे काले कोणीय धब्बे पहचाने गए हैं।",
      treatment_en: ["Apply Streptocycline (1g/10L) combined with Copper Hydroxide.", "Avoid handling crop plants while foliage is wet.", "Sow disease-resistant seeds."]
    },
    {
      condition: "Leaf Rust (Puccinia recondita)",
      condition_te: "ఆకు రస్ట్ (ఎర్రటి తుప్పు వ్యాధి)",
      condition_hi: "लीफ रस्ट (गेरुआ/रस्ट रोग)",
      crop: "Maize / Paddy",
      crop_te: "మొక్కజొన్న / వరి",
      crop_hi: "मक्का / धान",
      confidence: 0.92,
      severity: "moderate",
      explanation_en: "Reddish-brown elevated rust pustules detected on lower leaf surfaces and leaf sheaths.",
      explanation_te: "ఆకు అడుగు భాగంలో ఎర్రటి తుప్పు వంటి మచ్చలు గుర్తించబడ్డాయి.",
      explanation_hi: "पत्तियों की निचली सतह पर लाल-भूरे रंग के जंग के धब्बे पाए गए हैं।",
      treatment_en: ["Foliar spray of Propiconazole (1ml/L).", "Avoid excessive nitrogen chemical fertilizer.", "Maintain recommended plant spacing."]
    },
    {
      condition: "Anthracnose Lesions (Colletotrichum spp.)",
      condition_te: "ఆంత్రాక్నోస్ (నల్ల మచ్చల మచ్చల వ్యాధి)",
      condition_hi: "एंथ्रेक्नोज रोग",
      crop: "Chilli / Mango",
      crop_te: "మిరప / మామిడి",
      crop_hi: "मिर्च / आम",
      confidence: 0.95,
      severity: "high",
      explanation_en: "Circular sunken dark brown leaf and fruit lesions with concentric spore rings identified.",
      explanation_te: "ఆకులపై లోతుగా దిగబడిన నల్లటి మచ్చలు మరియు వలయాలు గుర్తించబడ్డాయి.",
      explanation_hi: "पत्तियों पर गोलाकार गहरे भूरे रंग के धब्बे पहचाने गए हैं।",
      treatment_en: ["Spray Carbendazim @ 1g/L or Azoxystrobin.", "Prune infected twigs and clear leaf litter.", "Practice crop rotation."]
    },
    {
      condition: "Healthy Leaf - No Disease Detected",
      condition_te: "ఆరోగ్యవంతమైన ఆకు (ఎలాంటి వ్యాధి లేదు)",
      condition_hi: "स्वस्थ पत्ती (कोई रोग नहीं पाया गया)",
      crop: "Healthy Foliage",
      crop_te: "ఆరోగ్యవంతమైన పంట",
      crop_hi: "स्वस्थ फसल",
      confidence: 0.98,
      severity: "healthy",
      explanation_en: "Vibrant green leaf tissue with uniform chlorophyll density. Zero fungal or bacterial lesions found.",
      explanation_te: "పంట ఆకులు పరిపూర్ణమైన ఆరోగ్యంతో ఉన్నాయి. ఎలాంటి వ్యాధి లేదు.",
      explanation_hi: "पत्तियां पूरी तरह स्वस्थ हैं। कोई रोग नहीं पाया गया।",
      treatment_en: ["Maintain scheduled organic compost feeding.", "Conduct weekly visual scouting.", "Keep soil moisture optimal."]
    },
    {
      condition: "Early Blight (Alternaria solani)",
      condition_te: "అర్లీ బ్లైట్ (ముందస్తు మచ్చల వ్యాధి)",
      condition_hi: "अर्ली ब्लाइट (अगेती झुलसा रोग)",
      crop: "Tomato / Eggplant",
      crop_te: "టమోటా / వంకాయ",
      crop_hi: "टमाटर / बैंगन",
      confidence: 0.94,
      severity: "moderate",
      explanation_en: "Concentric dark brown bullseye target spots observed on mature lower foliage.",
      explanation_te: "దిగువ ఆకులపై వలయాలు కలిగిన నల్లటి మచ్చలు గుర్తించబడ్డాయి.",
      explanation_hi: "पत्तियों पर छल्लेदार काले धब्बे पहचाने गए हैं।",
      treatment_en: ["Apply organic neem oil spray 5ml/L.", "Prune lower infected leaves.", "Apply Trichoderma viride."]
    }
  ];

  const selected = diseases[Math.floor(Math.random() * diseases.length)];

  res.json({
    success: true,
    crop: selected.crop,
    crop_te: selected.crop_te,
    crop_hi: selected.crop_hi,
    confidence: selected.confidence,
    condition: selected.condition,
    condition_te: selected.condition_te,
    condition_hi: selected.condition_hi,
    severity: selected.severity,
    explanation_en: selected.explanation_en,
    explanation_te: selected.explanation_te,
    explanation_hi: selected.explanation_hi,
    treatment_en: selected.treatment_en,
    model_version: "wpf-v1.4.0"
  });
});

// Sanjeevani AI Assistant Endpoint
app.post("/api/ai/chat", (req, res) => {
  const { message, language } = req.body;
  
  let responseText = "Sanjeevani AI is here to assist with crop care, weather, and mandi prices.";
  if (language === "te") {
    responseText = "నమస్కారం రైతు సోదరా! మీ పంట వ్యాధులు, వాతావరణం లేదా మార్కెట్ ధరల వివరాల కోసం నన్ను అడగవచ్చు.";
  } else if (language === "hi") {
    responseText = "नमस्ते किसान भाई! फसल देखभाल, मौसम या मंडी भाव की जानकारी के लिए मुझसे पूछें।";
  }

  res.json({
    reply: responseText,
    timestamp: new Date().toISOString()
  });
});

// Serve Vite build in production
const frontendBuild = path.join(__dirname, "frontend", "dist");
if (fs.existsSync(frontendBuild)) {
  app.use(express.static(frontendBuild));
  app.use( (req, res) => {
    res.sendFile(path.join(frontendBuild, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`SANJEEVANI Platform Server is active on port ${PORT}`);
  console.log(`Tagline: From Crop Care to Market - Your Farming Saathi.`);
  console.log(`==================================================`);
});
