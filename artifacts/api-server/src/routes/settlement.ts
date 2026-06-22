import { Router } from "express";

const router = Router();

const INSTITUTIONS = [
  { id: "inst-001", name: "Goldman Sachs", country: "USA", lat: 40.7128, lng: -74.006, type: "Investment Bank", tier: 1, dailyVolume: 4200000000, status: "Active", swiftCode: "GOLDUS33" },
  { id: "inst-002", name: "HSBC", country: "UK", lat: 51.5074, lng: -0.1278, type: "Universal Bank", tier: 1, dailyVolume: 3800000000, status: "Active", swiftCode: "MIDLGB22" },
  { id: "inst-003", name: "DBS Bank", country: "Singapore", lat: 1.3521, lng: 103.8198, type: "Commercial Bank", tier: 1, dailyVolume: 2100000000, status: "Active", swiftCode: "DBSSSG" },
  { id: "inst-004", name: "MUFG Bank", country: "Japan", lat: 35.6762, lng: 139.6503, type: "Universal Bank", tier: 1, dailyVolume: 3100000000, status: "Active", swiftCode: "BOTKJPJT" },
  { id: "inst-005", name: "Deutsche Bank", country: "Germany", lat: 50.1109, lng: 8.6821, type: "Investment Bank", tier: 1, dailyVolume: 2800000000, status: "Active", swiftCode: "DEUTDEDB" },
  { id: "inst-006", name: "Emirates NBD", country: "UAE", lat: 25.2048, lng: 55.2708, type: "Commercial Bank", tier: 2, dailyVolume: 890000000, status: "Active", swiftCode: "EBILAEAD" },
  { id: "inst-007", name: "Bank of China HK", country: "Hong Kong", lat: 22.3193, lng: 114.1694, type: "Universal Bank", tier: 1, dailyVolume: 2400000000, status: "Active", swiftCode: "BKCHKHHHXXX" },
  { id: "inst-008", name: "ANZ Bank", country: "Australia", lat: -33.8688, lng: 151.2093, type: "Commercial Bank", tier: 1, dailyVolume: 1200000000, status: "Active", swiftCode: "ANZBAU3M" },
  { id: "inst-009", name: "RBC Royal Bank", country: "Canada", lat: 43.6532, lng: -79.3832, type: "Universal Bank", tier: 1, dailyVolume: 1800000000, status: "Active", swiftCode: "ROYCCAT2" },
  { id: "inst-010", name: "UBS Group", country: "Switzerland", lat: 47.3769, lng: 8.5417, type: "Investment Bank", tier: 1, dailyVolume: 2200000000, status: "Active", swiftCode: "UBSWCHZH80A" },
  { id: "inst-011", name: "BNP Paribas", country: "France", lat: 48.8566, lng: 2.3522, type: "Universal Bank", tier: 1, dailyVolume: 2600000000, status: "Active", swiftCode: "BNPAFRPP" },
  { id: "inst-012", name: "ING Bank", country: "Netherlands", lat: 52.3676, lng: 4.9041, type: "Universal Bank", tier: 1, dailyVolume: 1400000000, status: "Active", swiftCode: "INGBNL2A" },
  { id: "inst-013", name: "KB Kookmin Bank", country: "South Korea", lat: 37.5665, lng: 126.978, type: "Commercial Bank", tier: 2, dailyVolume: 780000000, status: "Active", swiftCode: "CZNBKRSE" },
  { id: "inst-014", name: "HDFC Bank", country: "India", lat: 19.076, lng: 72.8777, type: "Commercial Bank", tier: 2, dailyVolume: 960000000, status: "Active", swiftCode: "HDFCINBB" },
  { id: "inst-015", name: "ICBC", country: "China", lat: 39.9042, lng: 116.4074, type: "Universal Bank", tier: 1, dailyVolume: 5100000000, status: "Active", swiftCode: "ICBKCNBJ" },
  { id: "inst-016", name: "Al Rajhi Bank", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, type: "Islamic Bank", tier: 2, dailyVolume: 640000000, status: "Active", swiftCode: "RJHISARI" },
  { id: "inst-017", name: "Itaú Unibanco", country: "Brazil", lat: -23.5505, lng: -46.6333, type: "Universal Bank", tier: 1, dailyVolume: 1100000000, status: "Active", swiftCode: "ITAUBRSP" },
  { id: "inst-018", name: "BBVA México", country: "Mexico", lat: 19.4326, lng: -99.1332, type: "Commercial Bank", tier: 2, dailyVolume: 580000000, status: "Active", swiftCode: "BCMRMXMM" },
  { id: "inst-019", name: "Standard Bank", country: "South Africa", lat: -26.2041, lng: 28.0473, type: "Commercial Bank", tier: 2, dailyVolume: 420000000, status: "Active", swiftCode: "SBZAZAJJ" },
  { id: "inst-020", name: "Nordea Bank", country: "Sweden", lat: 59.3293, lng: 18.0686, type: "Universal Bank", tier: 1, dailyVolume: 980000000, status: "Active", swiftCode: "NDEASEBBXXX" },
  { id: "inst-021", name: "Santander", country: "Spain", lat: 40.4168, lng: -3.7038, type: "Universal Bank", tier: 1, dailyVolume: 2100000000, status: "Active", swiftCode: "BSCHESMM" },
  { id: "inst-022", name: "UniCredit", country: "Italy", lat: 45.4654, lng: 9.1859, type: "Universal Bank", tier: 1, dailyVolume: 1700000000, status: "Active", swiftCode: "UNCRITMM" },
  { id: "inst-023", name: "Garanti BBVA", country: "Turkey", lat: 41.0082, lng: 28.9784, type: "Commercial Bank", tier: 2, dailyVolume: 340000000, status: "Active", swiftCode: "TGBATRISXXX" },
  { id: "inst-024", name: "Pictet Group", country: "Switzerland", lat: 46.2044, lng: 6.1432, type: "Private Bank", tier: 2, dailyVolume: 280000000, status: "Active", swiftCode: "PICTCHGGXXX" },
  { id: "inst-025", name: "Clearstream", country: "Luxembourg", lat: 49.6117, lng: 6.13, type: "CSD", tier: 1, dailyVolume: 8200000000, status: "Active", swiftCode: "CEDELULLXXX" },
  { id: "inst-026", name: "CIB Egypt", country: "Egypt", lat: 30.0444, lng: 31.2357, type: "Commercial Bank", tier: 3, dailyVolume: 180000000, status: "Active", swiftCode: "CIBEEGCX" },
  { id: "inst-027", name: "Attijariwafa Bank", country: "Morocco", lat: 33.9716, lng: -6.8498, type: "Commercial Bank", tier: 3, dailyVolume: 210000000, status: "Active", swiftCode: "BCMAMAMC" },
  { id: "inst-028", name: "Equity Bank", country: "Kenya", lat: -1.2921, lng: 36.8219, type: "Commercial Bank", tier: 3, dailyVolume: 95000000, status: "Active", swiftCode: "EQBLKENA" },
  { id: "inst-029", name: "Zenith Bank", country: "Nigeria", lat: 6.5244, lng: 3.3792, type: "Commercial Bank", tier: 3, dailyVolume: 140000000, status: "Active", swiftCode: "ZEIBNGLA" },
  { id: "inst-030", name: "DNB Bank", country: "Norway", lat: 59.9139, lng: 10.7522, type: "Universal Bank", tier: 2, dailyVolume: 680000000, status: "Active", swiftCode: "DNBANOKK" },
  { id: "inst-031", name: "Erste Group", country: "Austria", lat: 48.2082, lng: 16.3738, type: "Universal Bank", tier: 2, dailyVolume: 540000000, status: "Active", swiftCode: "GIBAATWG" },
  { id: "inst-032", name: "PKO Bank Polski", country: "Poland", lat: 52.2297, lng: 21.0122, type: "Universal Bank", tier: 2, dailyVolume: 390000000, status: "Active", swiftCode: "BPKOPLPW" },
  { id: "inst-033", name: "AIB Group", country: "Ireland", lat: 53.3498, lng: -6.2603, type: "Commercial Bank", tier: 2, dailyVolume: 460000000, status: "Active", swiftCode: "AIBKIE2D" },
  { id: "inst-034", name: "Standard Chartered", country: "Singapore", lat: 1.2966, lng: 103.8520, type: "Universal Bank", tier: 1, dailyVolume: 1600000000, status: "Active", swiftCode: "SCBLSG22" },
  { id: "inst-035", name: "Mashreq Bank", country: "UAE", lat: 25.0657, lng: 55.1713, type: "Commercial Bank", tier: 2, dailyVolume: 380000000, status: "Active", swiftCode: "BOMLAEAD" },
  { id: "inst-036", name: "Kasikorn Bank", country: "Thailand", lat: 13.7563, lng: 100.5018, type: "Commercial Bank", tier: 2, dailyVolume: 430000000, status: "Active", swiftCode: "KASITHBK" },
  { id: "inst-037", name: "OCBC Bank", country: "Singapore", lat: 1.3200, lng: 103.8440, type: "Commercial Bank", tier: 1, dailyVolume: 980000000, status: "Active", swiftCode: "OCBCSGSG" },
];

const CORRIDORS = [
  { id: "cor-001", fromId: "inst-001", toId: "inst-002", dailyVolume: 2800000000, currency: "USD", avgSettlementTime: 8, status: "Active" },
  { id: "cor-002", fromId: "inst-002", toId: "inst-003", dailyVolume: 1600000000, currency: "USD", avgSettlementTime: 11, status: "Active" },
  { id: "cor-003", fromId: "inst-003", toId: "inst-004", dailyVolume: 1200000000, currency: "SGD", avgSettlementTime: 9, status: "Active" },
  { id: "cor-004", fromId: "inst-004", toId: "inst-015", dailyVolume: 3400000000, currency: "JPY", avgSettlementTime: 7, status: "Active" },
  { id: "cor-005", fromId: "inst-001", toId: "inst-011", dailyVolume: 1900000000, currency: "EUR", avgSettlementTime: 12, status: "Active" },
  { id: "cor-006", fromId: "inst-010", toId: "inst-005", dailyVolume: 1400000000, currency: "CHF", avgSettlementTime: 6, status: "Active" },
  { id: "cor-007", fromId: "inst-006", toId: "inst-016", dailyVolume: 720000000, currency: "AED", avgSettlementTime: 14, status: "Active" },
  { id: "cor-008", fromId: "inst-003", toId: "inst-007", dailyVolume: 940000000, currency: "HKD", avgSettlementTime: 8, status: "Active" },
  { id: "cor-009", fromId: "inst-025", toId: "inst-012", dailyVolume: 5600000000, currency: "EUR", avgSettlementTime: 4, status: "Active" },
  { id: "cor-010", fromId: "inst-009", toId: "inst-001", dailyVolume: 1100000000, currency: "CAD", avgSettlementTime: 9, status: "Active" },
  { id: "cor-011", fromId: "inst-017", toId: "inst-001", dailyVolume: 680000000, currency: "BRL", avgSettlementTime: 18, status: "Active" },
  { id: "cor-012", fromId: "inst-008", toId: "inst-003", dailyVolume: 820000000, currency: "AUD", avgSettlementTime: 13, status: "Active" },
  { id: "cor-013", fromId: "inst-014", toId: "inst-003", dailyVolume: 740000000, currency: "INR", avgSettlementTime: 16, status: "Active" },
  { id: "cor-014", fromId: "inst-020", toId: "inst-011", dailyVolume: 560000000, currency: "SEK", avgSettlementTime: 10, status: "Active" },
  { id: "cor-015", fromId: "inst-021", toId: "inst-011", dailyVolume: 1300000000, currency: "EUR", avgSettlementTime: 8, status: "Active" },
];

function generateTransactions() {
  const refs = ["INS", "TKN", "FX", "TRSY"];
  return Array.from({ length: 25 }, (_, i) => {
    const from = INSTITUTIONS[Math.floor(Math.random() * INSTITUTIONS.length)];
    const to = INSTITUTIONS[Math.floor(Math.random() * INSTITUTIONS.length)];
    const currencies = ["USD", "EUR", "GBP", "SGD", "JPY", "CHF"];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const amount = Math.round((Math.random() * 2000 + 50) * 1000000);
    const minutesAgo = Math.floor(Math.random() * 180);
    const initAt = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
    const isComplete = minutesAgo > 5;
    const ref = refs[Math.floor(Math.random() * refs.length)];
    const statuses = isComplete ? ["COMPLETED"] : ["PROCESSING", "PENDING"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    return {
      id: `TXN-${Date.now()}-${i}`,
      fromInstitution: from.name,
      toInstitution: to.name,
      amount,
      currency,
      status,
      initiatedAt: initAt,
      completedAt: isComplete ? new Date(new Date(initAt).getTime() + Math.random() * 600000).toISOString() : null,
      settlementTime: Math.round(Math.random() * 20 + 5),
      corridor: `${from.country} → ${to.country}`,
      transactionRef: `ESN-${ref}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    };
  });
}

router.get("/settlement/network", (_req, res) => {
  res.json({
    institutions: INSTITUTIONS,
    corridors: CORRIDORS,
    totalDailyVolume: 12400000000,
    activeSettlements: 847,
  });
});

router.get("/settlement/transactions", (_req, res) => {
  res.json(generateTransactions());
});

router.post("/settlement/transactions", (req, res) => {
  const { fromInstitutionId, toInstitutionId, amount, currency } = req.body;
  const from = INSTITUTIONS.find((i) => i.id === fromInstitutionId) || INSTITUTIONS[0];
  const to = INSTITUTIONS.find((i) => i.id === toInstitutionId) || INSTITUTIONS[1];
  res.status(201).json({
    id: `TXN-${Date.now()}`,
    fromInstitution: from.name,
    toInstitution: to.name,
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
