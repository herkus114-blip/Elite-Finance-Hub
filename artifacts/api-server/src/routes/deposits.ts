import { Router } from "express";

const router = Router();

const DEPOSIT_POOLS = [
  {
    id: "pool-001",
    name: "USD Prime Liquidity Pool",
    currency: "USD",
    totalLiquidity: 45200000000,
    utilization: 67,
    apy: 4.8,
    participantCount: 23,
    status: "Active",
    riskTier: "Tier 1",
    supportedRails: ["FedWire", "CHIPS", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-002",
    name: "EUR Settlement Pool",
    currency: "EUR",
    totalLiquidity: 28900000000,
    utilization: 54,
    apy: 4.2,
    participantCount: 18,
    status: "Active",
    riskTier: "Tier 1",
    supportedRails: ["TARGET2", "SEPA", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-003",
    name: "GBP Institutional Pool",
    currency: "GBP",
    totalLiquidity: 18300000000,
    utilization: 71,
    apy: 4.6,
    participantCount: 14,
    status: "Active",
    riskTier: "Tier 1",
    supportedRails: ["CHAPS", "Faster Payments", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-004",
    name: "SGD Regional Hub",
    currency: "SGD",
    totalLiquidity: 8400000000,
    utilization: 48,
    apy: 5.1,
    participantCount: 11,
    status: "Active",
    riskTier: "Tier 2",
    supportedRails: ["MEPS+", "FAST", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-005",
    name: "AED Gulf Corridor Pool",
    currency: "AED",
    totalLiquidity: 6200000000,
    utilization: 42,
    apy: 5.4,
    participantCount: 9,
    status: "Active",
    riskTier: "Tier 2",
    supportedRails: ["UAE RTGS", "SWIFT", "Blockchain"],
  },
  {
    id: "pool-006",
    name: "JPY Asia-Pacific Pool",
    currency: "JPY",
    totalLiquidity: 22100000000,
    utilization: 58,
    apy: 3.1,
    participantCount: 16,
    status: "Active",
    riskTier: "Tier 1",
    supportedRails: ["BOJNET", "Zengin", "SWIFT", "Blockchain"],
  },
];

function generateIssuances() {
  const issuers = ["Goldman Sachs", "HSBC", "DBS Bank", "MUFG", "Deutsche Bank", "UBS", "BNP Paribas", "Barclays"];
  const currencies = ["USD", "EUR", "GBP", "SGD", "JPY", "AED"];
  const symbols: Record<string, string> = { USD: "ESN-USD", EUR: "ESN-EUR", GBP: "ESN-GBP", SGD: "ESN-SGD", JPY: "ESN-JPY", AED: "ESN-AED" };
  const rails = ["SWIFT", "Blockchain", "SEPA", "FedWire", "TARGET2", "MEPS+"];
  const pools = ["pool-001", "pool-002", "pool-003", "pool-004", "pool-005", "pool-006"];

  return Array.from({ length: 20 }, (_, i) => {
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const amount = Math.round((Math.random() * 500 + 50) * 1000000);
    const hoursAgo = Math.floor(Math.random() * 48);
    const issuedAt = new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString();
    const isComplete = hoursAgo > 2;
    return {
      id: `DEP-${Date.now()}-${i}`,
      issuer: issuers[Math.floor(Math.random() * issuers.length)],
      amount,
      currency,
      tokenSymbol: symbols[currency],
      status: isComplete ? "SETTLED" : "PROCESSING",
      issuedAt,
      settledAt: isComplete ? new Date(new Date(issuedAt).getTime() + 3600000).toISOString() : null,
      settlementRail: rails[Math.floor(Math.random() * rails.length)],
      confirmations: isComplete ? Math.floor(Math.random() * 200 + 50) : Math.floor(Math.random() * 10),
      poolId: pools[Math.floor(Math.random() * pools.length)],
    };
  });
}

router.get("/deposits/pools", (_req, res) => {
  res.json(DEPOSIT_POOLS);
});

router.get("/deposits/issuances", (_req, res) => {
  res.json(generateIssuances());
});

router.post("/deposits/issuances", (req, res) => {
  const { issuer, amount, currency, poolId, settlementRail } = req.body;
  const symbols: Record<string, string> = { USD: "ESN-USD", EUR: "ESN-EUR", GBP: "ESN-GBP", SGD: "ESN-SGD", JPY: "ESN-JPY", AED: "ESN-AED" };
  res.status(201).json({
    id: `DEP-${Date.now()}`,
    issuer,
    amount,
    currency,
    tokenSymbol: symbols[currency] || "ESN-USD",
    status: "PROCESSING",
    issuedAt: new Date().toISOString(),
    settledAt: null,
    settlementRail: settlementRail || "SWIFT",
    confirmations: 0,
    poolId,
  });
});

export default router;
