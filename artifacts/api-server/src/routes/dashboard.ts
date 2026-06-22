import { Router } from "express";

const router = Router();

router.get("/dashboard/metrics", (_req, res) => {
  res.json({
    totalTokenizedAssets: 847300000000,
    totalTreasuryAssets: 234100000000,
    dailySettlementVolume: 12400000000,
    connectedInstitutions: 47,
    globalLiquidityIndex: 94.2,
    aiConfidenceScore: 94.7,
    totalRevenue: 847000000,
    activeCorridors: 127,
    networkUptime: 99.97,
    transactionsToday: 18429,
    revenueChange: 23.4,
    volumeChange: 18.7,
    institutionsChange: 3,
  });
});

const eventTypes = ["SETTLEMENT", "TOKENIZATION", "TREASURY_ISSUANCE", "COMPLIANCE_CLEARED", "LIQUIDITY_ADDED"];
const institutions = [
  "Goldman Sachs NY", "HSBC London", "DBS Singapore", "MUFG Tokyo", "Deutsche Bank Frankfurt",
  "Emirates NBD Dubai", "UBS Zurich", "BNP Paribas Paris", "JPMorgan Chase", "Citigroup",
  "Standard Chartered", "Barclays Capital", "Morgan Stanley", "Bank of America", "RBC Toronto",
];
const currencies = ["USD", "EUR", "GBP", "SGD", "JPY", "CHF", "AED", "HKD"];
const statuses = ["COMPLETED", "PROCESSING", "PENDING"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

router.get("/dashboard/market-activity", (_req, res) => {
  const events = Array.from({ length: 20 }, (_, i) => {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const fromInst = institutions[Math.floor(Math.random() * institutions.length)];
    const toInst = institutions[Math.floor(Math.random() * institutions.length)];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const amount = randomBetween(10_000_000, 2_000_000_000);
    const descriptions: Record<string, string> = {
      SETTLEMENT: `Cross-border settlement: ${fromInst} → ${toInst}`,
      TOKENIZATION: `RWA tokenization completed: Commercial asset batch #${1000 + i}`,
      TREASURY_ISSUANCE: `Treasury bond issuance: ${fromInst}`,
      COMPLIANCE_CLEARED: `KYC/AML cleared for ${toInst} institutional onboarding`,
      LIQUIDITY_ADDED: `Liquidity injection: ${fromInst} to ${currency} pool`,
    };

    const minutesAgo = Math.floor(randomBetween(1, 60));
    const ts = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();

    return {
      id: `EVT-${Date.now()}-${i}`,
      type,
      description: descriptions[type],
      amount,
      currency,
      timestamp: ts,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      institution: fromInst,
    };
  });

  events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  res.json(events);
});

export default router;
