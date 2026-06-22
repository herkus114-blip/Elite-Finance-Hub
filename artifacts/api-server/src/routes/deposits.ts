import { Router } from "express";

const router = Router();

const DEPOSIT_POOLS = [
  {
    id: "pool-001",
    name: "USD Prime Liquidity Pool",
    currency: "USD",
    totalLiquidity: 52800000000,
    utilization: 71,
    apy: 4.8,
    participantCount: 31,
    status: "Active",
    riskTier: "Tier 1",
    supportedRails: ["FedWire", "CHIPS", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-002",
    name: "EUR Settlement Pool",
    currency: "EUR",
    totalLiquidity: 34700000000,
    utilization: 58,
    apy: 4.2,
    participantCount: 26,
    status: "Active",
    riskTier: "Tier 1",
    supportedRails: ["TARGET2", "SEPA", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-003",
    name: "GBP Institutional Pool",
    currency: "GBP",
    totalLiquidity: 21400000000,
    utilization: 74,
    apy: 4.6,
    participantCount: 19,
    status: "Active",
    riskTier: "Tier 1",
    supportedRails: ["CHAPS", "Faster Payments", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-004",
    name: "SGD Regional Hub",
    currency: "SGD",
    totalLiquidity: 9800000000,
    utilization: 52,
    apy: 5.1,
    participantCount: 14,
    status: "Active",
    riskTier: "Tier 2",
    supportedRails: ["MEPS+", "FAST", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-005",
    name: "CHF Institutional Reserve",
    currency: "CHF",
    totalLiquidity: 14200000000,
    utilization: 63,
    apy: 3.8,
    participantCount: 22,
    status: "Active",
    riskTier: "Tier 1",
    supportedRails: ["SIC", "euroSIC", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-006",
    name: "AED Gulf Corridor Pool",
    currency: "AED",
    totalLiquidity: 8100000000,
    utilization: 46,
    apy: 5.4,
    participantCount: 12,
    status: "Active",
    riskTier: "Tier 2",
    supportedRails: ["UAE RTGS", "SWIFT", "Blockchain"],
  },
];

const ALL_ISSUERS = [
  "JPMorgan Chase", "Société Générale", "Standard Chartered", "Barclays",
  "Deutsche Bank", "Santander", "State Street", "Vontobel", "Swissquote",
  "Credit Suisse", "Arab Bank", "Zand Bank", "Sygnum Bank", "AMINA Bank",
  "Pictet", "Capital Union Bank", "Emirates NBD", "First Abu Dhabi Bank (FAB)",
  "Abu Dhabi Commercial Bank (ADCB)", "Qatar National Bank (QNB)",
  "HSBC", "DBS Bank", "MUFG Bank", "Goldman Sachs", "BNP Paribas",
  "UBS Group", "ING Bank", "OCBC Bank", "Standard Chartered", "RBC Royal Bank",
];

const TOKEN_SYMBOLS: Record<string, string> = {
  USD: "ESN-USD", EUR: "ESN-EUR", GBP: "ESN-GBP",
  CHF: "ESN-CHF", AED: "ESN-AED", SGD: "ESN-SGD",
};

const CURRENCIES = ["USD", "EUR", "GBP", "CHF", "AED", "SGD"];
const RAILS = ["SWIFT", "Blockchain", "SEPA", "FedWire", "TARGET2", "MEPS+", "CHAPS", "SIC", "UAE RTGS", "euroSIC"];
const POOLS = ["pool-001", "pool-002", "pool-003", "pool-005", "pool-006", "pool-004"];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateIssuances() {
  return Array.from({ length: 25 }, (_, i) => {
    const currency = pickRandom(CURRENCIES);
    const issuer = pickRandom(ALL_ISSUERS);
    const amount = Math.round((Math.random() * 900 + 50) * 1000000);
    const hoursAgo = Math.floor(Math.random() * 72);
    const issuedAt = new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString();
    const isComplete = hoursAgo > 2;
    const poolId = pickRandom(POOLS);

    return {
      id: `ISS-${100 + i}`,
      issuer,
      amount,
      currency,
      tokenSymbol: TOKEN_SYMBOLS[currency] || "ESN-USD",
      status: isComplete ? "SETTLED" : "PROCESSING",
      issuedAt,
      settledAt: isComplete ? new Date(new Date(issuedAt).getTime() + 3600000).toISOString() : null,
      settlementRail: pickRandom(RAILS),
      confirmations: isComplete ? Math.floor(Math.random() * 200 + 50) : Math.floor(Math.random() * 10),
      poolId,
      type: "ISSUANCE",
    };
  });
}

function generateRedemptions() {
  return Array.from({ length: 25 }, (_, i) => {
    const currency = pickRandom(CURRENCIES);
    const issuer = pickRandom(ALL_ISSUERS);
    const amount = Math.round((Math.random() * 700 + 30) * 1000000);
    const hoursAgo = Math.floor(Math.random() * 96);
    const issuedAt = new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString();
    const isComplete = hoursAgo > 3;
    const poolId = pickRandom(POOLS);

    return {
      id: `RED-${200 + i}`,
      issuer,
      amount,
      currency,
      tokenSymbol: TOKEN_SYMBOLS[currency] || "ESN-USD",
      status: isComplete ? "REDEEMED" : "PROCESSING",
      issuedAt,
      settledAt: isComplete ? new Date(new Date(issuedAt).getTime() + 1800000).toISOString() : null,
      settlementRail: pickRandom(RAILS),
      confirmations: isComplete ? Math.floor(Math.random() * 200 + 20) : Math.floor(Math.random() * 5),
      poolId,
      type: "REDEMPTION",
    };
  });
}

router.get("/deposits/pools", (_req, res) => {
  res.json(DEPOSIT_POOLS);
});

router.get("/deposits/issuances", (_req, res) => {
  const combined = [...generateIssuances(), ...generateRedemptions()];
  combined.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
  res.json(combined);
});

router.post("/deposits/issuances", (req, res) => {
  const { issuer, amount, currency, poolId, settlementRail } = req.body;
  res.status(201).json({
    id: `ISS-${Date.now()}`,
    issuer,
    amount,
    currency,
    tokenSymbol: TOKEN_SYMBOLS[currency] || "ESN-USD",
    status: "PROCESSING",
    issuedAt: new Date().toISOString(),
    settledAt: null,
    settlementRail: settlementRail || "SWIFT",
    confirmations: 0,
    poolId,
    type: "ISSUANCE",
  });
});

export default router;
