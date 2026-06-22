import { Router } from "express";

const router = Router();

const INSTITUTIONS = [
  // North America
  { id: "inst-001", name: "Goldman Sachs", country: "USA", lat: 40.7128, lng: -74.006, type: "Investment Bank", tier: 1, dailyVolume: 4200000000, status: "Active", swiftCode: "GOLDUS33", region: "North America" },
  { id: "inst-002", name: "JPMorgan Chase", country: "USA", lat: 40.7549, lng: -73.9840, type: "Universal Bank", tier: 1, dailyVolume: 5800000000, status: "Active", swiftCode: "CHASUS33", region: "North America" },
  { id: "inst-003", name: "State Street", country: "USA", lat: 42.3601, lng: -71.0589, type: "Custodian Bank", tier: 1, dailyVolume: 2100000000, status: "Active", swiftCode: "SBOSUS33", region: "North America" },
  { id: "inst-004", name: "CACEIS Investor Services", country: "Canada", lat: 45.5017, lng: -73.5673, type: "Asset Servicer", tier: 2, dailyVolume: 890000000, status: "Active", swiftCode: "CACECAMM", region: "North America" },
  { id: "inst-005", name: "Capital Union Bank", country: "Bahamas", lat: 25.0480, lng: -77.3554, type: "Private Bank", tier: 2, dailyVolume: 340000000, status: "Active", swiftCode: "CUBNBS2N", region: "North America" },
  { id: "inst-006", name: "RBC Royal Bank", country: "Canada", lat: 43.6532, lng: -79.3832, type: "Universal Bank", tier: 1, dailyVolume: 1800000000, status: "Active", swiftCode: "ROYCCAT2", region: "North America" },

  // Europe
  { id: "inst-010", name: "HSBC", country: "UK", lat: 51.5074, lng: -0.1278, type: "Universal Bank", tier: 1, dailyVolume: 3800000000, status: "Active", swiftCode: "MIDLGB22", region: "Europe" },
  { id: "inst-011", name: "Barclays", country: "UK", lat: 51.5155, lng: -0.0922, type: "Investment Bank", tier: 1, dailyVolume: 2400000000, status: "Active", swiftCode: "BARCGB22", region: "Europe" },
  { id: "inst-012", name: "Deutsche Bank", country: "Germany", lat: 50.1109, lng: 8.6821, type: "Investment Bank", tier: 1, dailyVolume: 2800000000, status: "Active", swiftCode: "DEUTDEDB", region: "Europe" },
  { id: "inst-013", name: "BNP Paribas", country: "France", lat: 48.8566, lng: 2.3522, type: "Universal Bank", tier: 1, dailyVolume: 2600000000, status: "Active", swiftCode: "BNPAFRPP", region: "Europe" },
  { id: "inst-014", name: "Banque Delubac & Cie", country: "France", lat: 48.8742, lng: 2.3470, type: "Private Bank", tier: 3, dailyVolume: 95000000, status: "Active", swiftCode: "DELUFR22", region: "Europe" },
  { id: "inst-015", name: "Santander", country: "Spain", lat: 40.4168, lng: -3.7038, type: "Universal Bank", tier: 1, dailyVolume: 2100000000, status: "Active", swiftCode: "BSCHESMM", region: "Europe" },
  { id: "inst-016", name: "UniCredit", country: "Italy", lat: 45.4654, lng: 9.1859, type: "Universal Bank", tier: 1, dailyVolume: 1700000000, status: "Active", swiftCode: "UNCRITMM", region: "Europe" },
  { id: "inst-017", name: "ING Bank", country: "Netherlands", lat: 52.3676, lng: 4.9041, type: "Universal Bank", tier: 1, dailyVolume: 1400000000, status: "Active", swiftCode: "INGBNL2A", region: "Europe" },
  { id: "inst-018", name: "Nordea Bank", country: "Sweden", lat: 59.3293, lng: 18.0686, type: "Universal Bank", tier: 1, dailyVolume: 980000000, status: "Active", swiftCode: "NDEASEBBXXX", region: "Europe" },
  { id: "inst-019", name: "UBS Group", country: "Switzerland", lat: 47.3769, lng: 8.5417, type: "Investment Bank", tier: 1, dailyVolume: 2200000000, status: "Active", swiftCode: "UBSWCHZH80A", region: "Europe" },
  { id: "inst-020", name: "Credit Suisse", country: "Switzerland", lat: 47.3714, lng: 8.5385, type: "Investment Bank", tier: 1, dailyVolume: 1600000000, status: "Active", swiftCode: "CRESCHZZ80A", region: "Europe" },
  { id: "inst-021", name: "Pictet", country: "Switzerland", lat: 46.2044, lng: 6.1432, type: "Private Bank", tier: 2, dailyVolume: 680000000, status: "Active", swiftCode: "PICTCHGGXXX", region: "Europe" },
  { id: "inst-022", name: "Vontobel", country: "Switzerland", lat: 47.3654, lng: 8.5503, type: "Private Bank", tier: 2, dailyVolume: 420000000, status: "Active", swiftCode: "VONTCHZZ", region: "Europe" },
  { id: "inst-023", name: "Swissquote", country: "Switzerland", lat: 46.5198, lng: 6.6335, type: "Digital Bank", tier: 2, dailyVolume: 280000000, status: "Active", swiftCode: "SWQBCHGG", region: "Europe" },
  { id: "inst-024", name: "Sygnum Bank", country: "Switzerland", lat: 47.3744, lng: 8.5410, type: "Digital Asset Bank", tier: 2, dailyVolume: 190000000, status: "Active", swiftCode: "SYGNCHZZ", region: "Europe" },
  { id: "inst-025", name: "AMINA Bank", country: "Switzerland", lat: 47.3744, lng: 8.5244, type: "Digital Asset Bank", tier: 2, dailyVolume: 145000000, status: "Active", swiftCode: "AMINCHZZ", region: "Europe" },
  { id: "inst-026", name: "Hypothekarbank Lenzburg", country: "Switzerland", lat: 47.3878, lng: 8.1768, type: "Commercial Bank", tier: 3, dailyVolume: 65000000, status: "Active", swiftCode: "HYPLCH22", region: "Europe" },
  { id: "inst-027", name: "Clearstream", country: "Luxembourg", lat: 49.6117, lng: 6.13, type: "CSD", tier: 1, dailyVolume: 8200000000, status: "Active", swiftCode: "CEDELULLXXX", region: "Europe" },
  { id: "inst-028", name: "AIB Group", country: "Ireland", lat: 53.3498, lng: -6.2603, type: "Commercial Bank", tier: 2, dailyVolume: 460000000, status: "Active", swiftCode: "AIBKIE2D", region: "Europe" },
  { id: "inst-029", name: "PKO Bank Polski", country: "Poland", lat: 52.2297, lng: 21.0122, type: "Universal Bank", tier: 2, dailyVolume: 390000000, status: "Active", swiftCode: "BPKOPLPW", region: "Europe" },
  { id: "inst-030", name: "Erste Group", country: "Austria", lat: 48.2082, lng: 16.3738, type: "Universal Bank", tier: 2, dailyVolume: 540000000, status: "Active", swiftCode: "GIBAATWG", region: "Europe" },
  { id: "inst-031", name: "Türkiye İş Bankası", country: "Turkey", lat: 39.9334, lng: 32.8597, type: "Commercial Bank", tier: 2, dailyVolume: 410000000, status: "Active", swiftCode: "ISBKTRIS", region: "Europe" },
  { id: "inst-032", name: "Garanti BBVA", country: "Turkey", lat: 41.0082, lng: 28.9784, type: "Commercial Bank", tier: 2, dailyVolume: 340000000, status: "Active", swiftCode: "TGBATRISXXX", region: "Europe" },
  { id: "inst-033", name: "Misyon Bank", country: "Turkey", lat: 41.0150, lng: 28.9650, type: "Participation Bank", tier: 3, dailyVolume: 120000000, status: "Active", swiftCode: "MBNKTRXX", region: "Europe" },
  { id: "inst-034", name: "DNB Bank", country: "Norway", lat: 59.9139, lng: 10.7522, type: "Universal Bank", tier: 2, dailyVolume: 680000000, status: "Active", swiftCode: "DNBANOKK", region: "Europe" },

  // Middle East
  { id: "inst-040", name: "Emirates NBD", country: "UAE", lat: 25.2048, lng: 55.2708, type: "Commercial Bank", tier: 2, dailyVolume: 890000000, status: "Active", swiftCode: "EBILAEAD", region: "Middle East" },
  { id: "inst-041", name: "First Abu Dhabi Bank (FAB)", country: "UAE", lat: 24.4539, lng: 54.3773, type: "Commercial Bank", tier: 1, dailyVolume: 1200000000, status: "Active", swiftCode: "NBADAEAA", region: "Middle East" },
  { id: "inst-042", name: "Abu Dhabi Commercial Bank (ADCB)", country: "UAE", lat: 24.4680, lng: 54.3700, type: "Commercial Bank", tier: 2, dailyVolume: 640000000, status: "Active", swiftCode: "ADCBAEAD", region: "Middle East" },
  { id: "inst-043", name: "Zand Bank", country: "UAE", lat: 25.1850, lng: 55.2650, type: "Digital Bank", tier: 3, dailyVolume: 180000000, status: "Active", swiftCode: "ZANDAEAD", region: "Middle East" },
  { id: "inst-044", name: "Mashreq Bank", country: "UAE", lat: 25.0657, lng: 55.1713, type: "Commercial Bank", tier: 2, dailyVolume: 380000000, status: "Active", swiftCode: "BOMLAEAD", region: "Middle East" },
  { id: "inst-045", name: "Al Rajhi Bank", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, type: "Islamic Bank", tier: 2, dailyVolume: 640000000, status: "Active", swiftCode: "RJHISARI", region: "Middle East" },
  { id: "inst-046", name: "Arab Bank", country: "Jordan", lat: 31.9539, lng: 35.9106, type: "Commercial Bank", tier: 2, dailyVolume: 290000000, status: "Active", swiftCode: "ARABJOAX", region: "Middle East" },
  { id: "inst-047", name: "Qatar National Bank (QNB)", country: "Qatar", lat: 25.2854, lng: 51.5310, type: "Universal Bank", tier: 1, dailyVolume: 1100000000, status: "Active", swiftCode: "QNBAQAQA", region: "Middle East" },
  { id: "inst-048", name: "CIB Egypt", country: "Egypt", lat: 30.0444, lng: 31.2357, type: "Commercial Bank", tier: 3, dailyVolume: 180000000, status: "Active", swiftCode: "CIBEEGCX", region: "Middle East" },
  { id: "inst-049", name: "Attijariwafa Bank", country: "Morocco", lat: 33.9716, lng: -6.8498, type: "Commercial Bank", tier: 3, dailyVolume: 210000000, status: "Active", swiftCode: "BCMAMAMC", region: "Middle East" },

  // Asia-Pacific
  { id: "inst-060", name: "DBS Bank", country: "Singapore", lat: 1.3521, lng: 103.8198, type: "Commercial Bank", tier: 1, dailyVolume: 2100000000, status: "Active", swiftCode: "DBSSSG", region: "Asia-Pacific" },
  { id: "inst-061", name: "Standard Chartered", country: "Singapore", lat: 1.2966, lng: 103.8520, type: "Universal Bank", tier: 1, dailyVolume: 1600000000, status: "Active", swiftCode: "SCBLSG22", region: "Asia-Pacific" },
  { id: "inst-062", name: "OCBC Bank", country: "Singapore", lat: 1.3200, lng: 103.8440, type: "Commercial Bank", tier: 1, dailyVolume: 980000000, status: "Active", swiftCode: "OCBCSGSG", region: "Asia-Pacific" },
  { id: "inst-063", name: "MUFG Bank", country: "Japan", lat: 35.6762, lng: 139.6503, type: "Universal Bank", tier: 1, dailyVolume: 3100000000, status: "Active", swiftCode: "BOTKJPJT", region: "Asia-Pacific" },
  { id: "inst-064", name: "Bank of China HK", country: "Hong Kong", lat: 22.3193, lng: 114.1694, type: "Universal Bank", tier: 1, dailyVolume: 2400000000, status: "Active", swiftCode: "BKCHKHHHXXX", region: "Asia-Pacific" },
  { id: "inst-065", name: "ICBC", country: "China", lat: 39.9042, lng: 116.4074, type: "Universal Bank", tier: 1, dailyVolume: 5100000000, status: "Active", swiftCode: "ICBKCNBJ", region: "Asia-Pacific" },
  { id: "inst-066", name: "HDFC Bank", country: "India", lat: 19.076, lng: 72.8777, type: "Commercial Bank", tier: 2, dailyVolume: 960000000, status: "Active", swiftCode: "HDFCINBB", region: "Asia-Pacific" },
  { id: "inst-067", name: "KB Kookmin Bank", country: "South Korea", lat: 37.5665, lng: 126.978, type: "Commercial Bank", tier: 2, dailyVolume: 780000000, status: "Active", swiftCode: "CZNBKRSE", region: "Asia-Pacific" },
  { id: "inst-068", name: "ANZ Bank", country: "Australia", lat: -33.8688, lng: 151.2093, type: "Commercial Bank", tier: 1, dailyVolume: 1200000000, status: "Active", swiftCode: "ANZBAU3M", region: "Asia-Pacific" },
  { id: "inst-069", name: "Kasikorn Bank", country: "Thailand", lat: 13.7563, lng: 100.5018, type: "Commercial Bank", tier: 2, dailyVolume: 430000000, status: "Active", swiftCode: "KASITHBK", region: "Asia-Pacific" },
  { id: "inst-070", name: "Equity Bank", country: "Kenya", lat: -1.2921, lng: 36.8219, type: "Commercial Bank", tier: 3, dailyVolume: 95000000, status: "Active", swiftCode: "EQBLKENA", region: "Asia-Pacific" },
  { id: "inst-071", name: "Standard Bank", country: "South Africa", lat: -26.2041, lng: 28.0473, type: "Commercial Bank", tier: 2, dailyVolume: 420000000, status: "Active", swiftCode: "SBZAZAJJ", region: "Asia-Pacific" },
  { id: "inst-072", name: "Itaú Unibanco", country: "Brazil", lat: -23.5505, lng: -46.6333, type: "Universal Bank", tier: 1, dailyVolume: 1100000000, status: "Active", swiftCode: "ITAUBRSP", region: "North America" },
];

const CORRIDORS = [
  { id: "cor-001", fromId: "inst-001", toId: "inst-010", dailyVolume: 2800000000, currency: "USD", avgSettlementTime: 8, status: "Active" },
  { id: "cor-002", fromId: "inst-010", toId: "inst-060", dailyVolume: 1600000000, currency: "USD", avgSettlementTime: 11, status: "Active" },
  { id: "cor-003", fromId: "inst-060", toId: "inst-063", dailyVolume: 1200000000, currency: "SGD", avgSettlementTime: 9, status: "Active" },
  { id: "cor-004", fromId: "inst-063", toId: "inst-065", dailyVolume: 3400000000, currency: "JPY", avgSettlementTime: 7, status: "Active" },
  { id: "cor-005", fromId: "inst-001", toId: "inst-013", dailyVolume: 1900000000, currency: "EUR", avgSettlementTime: 12, status: "Active" },
  { id: "cor-006", fromId: "inst-019", toId: "inst-012", dailyVolume: 1400000000, currency: "CHF", avgSettlementTime: 6, status: "Active" },
  { id: "cor-007", fromId: "inst-040", toId: "inst-045", dailyVolume: 720000000, currency: "AED", avgSettlementTime: 14, status: "Active" },
  { id: "cor-008", fromId: "inst-060", toId: "inst-064", dailyVolume: 940000000, currency: "HKD", avgSettlementTime: 8, status: "Active" },
  { id: "cor-009", fromId: "inst-027", toId: "inst-017", dailyVolume: 5600000000, currency: "EUR", avgSettlementTime: 4, status: "Active" },
  { id: "cor-010", fromId: "inst-006", toId: "inst-001", dailyVolume: 1100000000, currency: "CAD", avgSettlementTime: 9, status: "Active" },
  { id: "cor-011", fromId: "inst-072", toId: "inst-002", dailyVolume: 680000000, currency: "BRL", avgSettlementTime: 18, status: "Active" },
  { id: "cor-012", fromId: "inst-068", toId: "inst-060", dailyVolume: 820000000, currency: "AUD", avgSettlementTime: 13, status: "Active" },
  { id: "cor-013", fromId: "inst-066", toId: "inst-060", dailyVolume: 740000000, currency: "INR", avgSettlementTime: 16, status: "Active" },
  { id: "cor-014", fromId: "inst-018", toId: "inst-013", dailyVolume: 560000000, currency: "SEK", avgSettlementTime: 10, status: "Active" },
  { id: "cor-015", fromId: "inst-015", toId: "inst-013", dailyVolume: 1300000000, currency: "EUR", avgSettlementTime: 8, status: "Active" },
  { id: "cor-016", fromId: "inst-041", toId: "inst-060", dailyVolume: 890000000, currency: "AED", avgSettlementTime: 10, status: "Active" },
  { id: "cor-017", fromId: "inst-047", toId: "inst-010", dailyVolume: 640000000, currency: "USD", avgSettlementTime: 13, status: "Active" },
  { id: "cor-018", fromId: "inst-002", toId: "inst-060", dailyVolume: 2200000000, currency: "USD", avgSettlementTime: 9, status: "Active" },
  { id: "cor-019", fromId: "inst-020", toId: "inst-019", dailyVolume: 980000000, currency: "CHF", avgSettlementTime: 3, status: "Active" },
  { id: "cor-020", fromId: "inst-021", toId: "inst-019", dailyVolume: 450000000, currency: "CHF", avgSettlementTime: 4, status: "Active" },
  { id: "cor-021", fromId: "inst-046", toId: "inst-040", dailyVolume: 280000000, currency: "USD", avgSettlementTime: 15, status: "Active" },
  { id: "cor-022", fromId: "inst-061", toId: "inst-064", dailyVolume: 720000000, currency: "SGD", avgSettlementTime: 7, status: "Active" },
  { id: "cor-023", fromId: "inst-003", toId: "inst-002", dailyVolume: 1400000000, currency: "USD", avgSettlementTime: 5, status: "Active" },
  { id: "cor-024", fromId: "inst-004", toId: "inst-010", dailyVolume: 560000000, currency: "EUR", avgSettlementTime: 9, status: "Active" },
  { id: "cor-025", fromId: "inst-022", toId: "inst-019", dailyVolume: 320000000, currency: "CHF", avgSettlementTime: 2, status: "Active" },
  { id: "cor-026", fromId: "inst-067", toId: "inst-063", dailyVolume: 590000000, currency: "KRW", avgSettlementTime: 8, status: "Active" },
  { id: "cor-027", fromId: "inst-031", toId: "inst-012", dailyVolume: 380000000, currency: "EUR", avgSettlementTime: 11, status: "Active" },
  { id: "cor-028", fromId: "inst-042", toId: "inst-041", dailyVolume: 240000000, currency: "AED", avgSettlementTime: 4, status: "Active" },
  { id: "cor-029", fromId: "inst-011", toId: "inst-010", dailyVolume: 1100000000, currency: "GBP", avgSettlementTime: 3, status: "Active" },
  { id: "cor-030", fromId: "inst-069", toId: "inst-060", dailyVolume: 310000000, currency: "THB", avgSettlementTime: 12, status: "Active" },
];

function generateTransactions() {
  const currencies = ["USD", "EUR", "GBP", "SGD", "JPY", "CHF", "AED", "HKD"];
  const refs = ["INS", "TKN", "FX", "TRSY", "RWA"];

  return Array.from({ length: 30 }, (_, i) => {
    const from = INSTITUTIONS[Math.floor(Math.random() * INSTITUTIONS.length)];
    let to = INSTITUTIONS[Math.floor(Math.random() * INSTITUTIONS.length)];
    while (to.id === from.id) {
      to = INSTITUTIONS[Math.floor(Math.random() * INSTITUTIONS.length)];
    }
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const amount = Math.round((Math.random() * 2000 + 50) * 1000000);
    const minutesAgo = Math.floor(Math.random() * 180);
    const initAt = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
    const isComplete = minutesAgo > 5;
    const ref = refs[Math.floor(Math.random() * refs.length)];
    const status = isComplete ? "COMPLETED" : ["PROCESSING", "PENDING"][Math.floor(Math.random() * 2)];

    return {
      id: `TXN-${Date.now()}-${i}`,
      fromInstitution: from.name,
      toInstitution: to.name,
      fromCountry: from.country,
      toCountry: to.country,
      amount,
      currency,
      status,
      initiatedAt: initAt,
      completedAt: isComplete ? new Date(new Date(initAt).getTime() + Math.random() * 600000).toISOString() : null,
      settlementTime: Math.round(Math.random() * 20 + 3),
      corridor: `${from.country} → ${to.country}`,
      transactionRef: `ESN-${ref}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    };
  });
}

router.get("/settlement/network", (_req, res) => {
  res.json({
    institutions: INSTITUTIONS,
    corridors: CORRIDORS,
    totalDailyVolume: 18600000000,
    activeSettlements: 1247,
  });
});

router.get("/settlement/transactions", (_req, res) => {
  res.json(generateTransactions());
});

router.post("/settlement/transactions", (req, res) => {
  const { fromInstitutionId, toInstitutionId, amount, currency } = req.body;
  const from = INSTITUTIONS.find((i) => i.id === fromInstitutionId) || INSTITUTIONS[0];
  const to = INSTITUTIONS.find((i) => i.id === toInstitutionId) || INSTITUTIONS[10];
  res.status(201).json({
    id: `TXN-${Date.now()}`,
    fromInstitution: from.name,
    toInstitution: to.name,
    fromCountry: from.country,
    toCountry: to.country,
    amount,
    currency,
    status: "PROCESSING",
    initiatedAt: new Date().toISOString(),
    completedAt: null,
    settlementTime: 12,
    corridor: `${from.country} → ${to.country}`,
    transactionRef: `ESN-INS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  });
});

export default router;
