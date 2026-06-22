import { Router } from "express";

const router = Router();

const INSIGHTS_BANK = [
  "Strong institutional demand forecasted in Q3 2026. Liquidity corridors suggest optimal exit window within 18 months.",
  "AI sentiment analysis of 847 macroeconomic indicators yields a bullish signal. Cross-asset correlation at 12-year low.",
  "Regulatory environment in primary jurisdiction assessed as favorable. Three pending frameworks likely to expand investor base.",
  "Tokenization velocity outpacing comparable asset classes. Secondary market volume up 34% quarter-over-quarter.",
  "Cash flow distribution modeling shows 97.3% coverage ratio under stress scenarios. Downside protection robust.",
  "Geographic diversification reduces single-jurisdiction risk. ESG alignment unlocks sovereign wealth fund eligibility.",
  "Yield compression in traditional markets elevates relative attractiveness. Institutional allocation shifting toward alternative assets.",
  "Fraud detection models: zero anomalous patterns detected across 10,000 sampled data points. Counterparty risk: minimal.",
  "Infrastructure underlying asset demonstrates 23-year operating track record with 99.1% availability uptime.",
  "Demand signals from 14 sovereign wealth funds and 8 central banks indicate near-term subscription pressure.",
];

const RISK_FACTORS_BANK = [
  "FX exposure to secondary currency: manageable with standard hedging instruments.",
  "Regulatory transition risk in jurisdiction: mitigated by ESN legal team engagement.",
  "Liquidity seasonality Q4: historically compressed by 15%. Model accounts for this.",
  "Geopolitical correlation risk: low probability scenario, tail risk only.",
  "Interest rate sensitivity: duration gap within institutional tolerance thresholds.",
];

router.get("/ai/analyze/:assetId", (req, res) => {
  const { assetId } = req.params;
  const rand = (min: number, max: number) => Math.round((Math.random() * (max - min) + min) * 10) / 10;

  const overallScore = rand(72, 97);
  const riskScore = rand(70, 96);
  const liquidityScore = rand(68, 98);
  const fraudRisk = rand(0.5, 4.2);
  const sentiments = ["Bullish", "Strongly Bullish", "Neutral-Bullish"];
  const recommendations = ["BUY", "STRONG BUY", "HOLD"];
  const recommendationIdx = overallScore > 85 ? 1 : overallScore > 75 ? 0 : 2;

  const insights = INSIGHTS_BANK.sort(() => Math.random() - 0.5).slice(0, 4);
  const riskFactors = RISK_FACTORS_BANK.sort(() => Math.random() - 0.5).slice(0, 3);

  res.json({
    assetId,
    overallScore,
    riskScore,
    liquidityScore,
    fraudRisk,
    marketSentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    recommendation: recommendations[recommendationIdx],
    insights,
    priceTarget: rand(1.05, 1.28),
    confidence: rand(88, 97),
    riskFactors,
    generatedAt: new Date().toISOString(),
  });
});

router.get("/ai/market-forecast", (_req, res) => {
  res.json({
    period: "Q3 2026 – Q2 2027",
    globalLiquidityTrend: "Expanding",
    rwaGrowthForecast: 34.7,
    settlementVolumeProjection: 18600000000,
    topOpportunities: [
      "Tokenized sovereign debt in Gulf Cooperation Council markets",
      "Southeast Asia infrastructure build-out: $2.4T pipeline",
      "European green bond market: regulatory tailwinds accelerating",
      "North American private credit: bank retrenchment creates whitespace",
      "Carbon market expansion: Article 6 implementation drives demand",
    ],
    riskAlerts: [
      "USD liquidity tightening: monitor Fed policy path",
      "Geopolitical risk in Eastern Europe: corridor volatility possible",
      "Regulatory fragmentation risk: DORA compliance review recommended",
    ],
    generatedAt: new Date().toISOString(),
  });
});

export default router;
