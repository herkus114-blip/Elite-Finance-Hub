import { Router } from "express";

const router = Router();

const EXCHANGE_RATES: Record<string, number> = {
  "USD-EUR": 0.9214,
  "USD-GBP": 0.7856,
  "USD-SGD": 1.3412,
  "USD-JPY": 149.82,
  "USD-CHF": 0.8943,
  "USD-AED": 3.6725,
  "EUR-USD": 1.0852,
  "GBP-USD": 1.2729,
  "SGD-USD": 0.7456,
  "USD-USDC": 1.0,
  "USD-USDT": 1.0,
  "USDC-EUR": 0.9214,
  "USDC-SGD": 1.3412,
  "ETH-USD": 3248.40,
  "BTC-USD": 67420.50,
};

function getRate(from: string, to: string): number {
  const key = `${from}-${to}`;
  const reverseKey = `${to}-${from}`;
  if (EXCHANGE_RATES[key]) return EXCHANGE_RATES[key];
  if (EXCHANGE_RATES[reverseKey]) return 1 / EXCHANGE_RATES[reverseKey];
  return 1.0;
}

const CONVERSION_STEPS = [
  { step: 1, label: "Initiation & KYC Validation", status: "COMPLETED" },
  { step: 2, label: "AML / Compliance Screening", status: "COMPLETED" },
  { step: 3, label: "Liquidity Pool Matching", status: "COMPLETED" },
  { step: 4, label: "Cross-Border Settlement", status: "PROCESSING" },
  { step: 5, label: "Token Issuance Confirmation", status: "PENDING" },
];

function generateGatewayTransactions() {
  const fromTypes = ["Fiat", "Crypto", "Tokenized Deposit"];
  const toTypes = ["Tokenized Deposit", "Fiat", "Crypto"];
  const fromCurrencies = ["USD", "EUR", "GBP", "BTC", "ETH", "USDC"];
  const toCurrencies = ["ESN-USD", "ESN-EUR", "ESN-GBP", "USD", "EUR", "USDC"];
  const routings = ["USD → SWIFT → ESN-USD", "EUR → SEPA → ESN-EUR", "BTC → Blockchain → USDC → ESN-USD", "GBP → CHAPS → ESN-GBP"];
  const complianceStatuses = ["PASSED", "PASSED", "PASSED", "REVIEW"];

  return Array.from({ length: 15 }, (_, i) => {
    const fromCur = fromCurrencies[Math.floor(Math.random() * fromCurrencies.length)];
    const toCur = toCurrencies[Math.floor(Math.random() * toCurrencies.length)];
    const fromAmount = Math.round((Math.random() * 10 + 0.5) * 1000000);
    const rate = getRate(fromCur.replace("ESN-", ""), toCur.replace("ESN-", ""));
    const hoursAgo = Math.floor(Math.random() * 72);
    const initiatedAt = new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString();
    const isComplete = hoursAgo > 1;

    return {
      id: `GW-${Date.now()}-${i}`,
      fromType: fromTypes[Math.floor(Math.random() * fromTypes.length)],
      toType: toTypes[Math.floor(Math.random() * toTypes.length)],
      fromCurrency: fromCur,
      toCurrency: toCur,
      fromAmount,
      toAmount: Math.round(fromAmount * rate * 100) / 100,
      exchangeRate: rate,
      status: isComplete ? "COMPLETED" : "PROCESSING",
      initiatedAt,
      completedAt: isComplete ? new Date(new Date(initiatedAt).getTime() + 900000).toISOString() : null,
      complianceStatus: complianceStatuses[Math.floor(Math.random() * complianceStatuses.length)],
      steps: CONVERSION_STEPS.map((s, idx) => ({
        ...s,
        status: isComplete ? "COMPLETED" : idx < 3 ? "COMPLETED" : idx === 3 ? "PROCESSING" : "PENDING",
        timestamp: isComplete || idx < 3
          ? new Date(new Date(initiatedAt).getTime() + idx * 120000).toISOString()
          : null,
      })),
      fees: Math.round(fromAmount * 0.0012 * 100) / 100,
      routingPath: routings[Math.floor(Math.random() * routings.length)],
    };
  });
}

router.get("/gateway/transactions", (_req, res) => {
  res.json(generateGatewayTransactions());
});

router.post("/gateway/convert", (req, res) => {
  const { fromType, toType, fromCurrency, toCurrency, fromAmount } = req.body;
  const rate = getRate(fromCurrency?.replace("ESN-", ""), toCurrency?.replace("ESN-", ""));
  const toAmount = Math.round(fromAmount * rate * 100) / 100;
  const initiatedAt = new Date().toISOString();
  res.status(201).json({
    id: `GW-${Date.now()}`,
    fromType,
    toType,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    exchangeRate: rate,
    status: "PROCESSING",
    initiatedAt,
    completedAt: null,
    complianceStatus: "PASSED",
    steps: CONVERSION_STEPS.map((s, idx) => ({
      ...s,
      status: idx < 3 ? "COMPLETED" : idx === 3 ? "PROCESSING" : "PENDING",
      timestamp: idx < 3 ? new Date(new Date(initiatedAt).getTime() + idx * 60000).toISOString() : null,
    })),
    fees: Math.round(fromAmount * 0.0012 * 100) / 100,
    routingPath: `${fromCurrency} → ESN Network → ${toCurrency}`,
  });
});

export default router;
