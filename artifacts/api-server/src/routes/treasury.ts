import { Router } from "express";

const router = Router();

const TREASURY_PRODUCTS = [
  {
    id: "trsy-001",
    name: "ESN Sovereign Note 2027",
    type: "Government Bond",
    issuer: "Elite Settlement Network",
    faceValue: 5000000000,
    currency: "USD",
    yieldRate: 5.2,
    maturityDate: "2027-06-30",
    rating: "AAA",
    status: "Active",
    totalIssuance: 5000000000,
    availableAllocation: 1250000000,
    settlementDays: 0,
    description: "Flagship sovereign-grade note issued by ESN with T+0 settlement and quarterly coupon payments.",
  },
  {
    id: "trsy-002",
    name: "Infrastructure Revenue Bond Series B",
    type: "Municipal Bond",
    issuer: "ESN Infrastructure Finance",
    faceValue: 2300000000,
    currency: "USD",
    yieldRate: 6.1,
    maturityDate: "2031-12-31",
    rating: "AA+",
    status: "Active",
    totalIssuance: 2300000000,
    availableAllocation: 920000000,
    settlementDays: 0,
    description: "Revenue bond backed by infrastructure project cash flows across 12 jurisdictions. Semi-annual coupon.",
  },
  {
    id: "trsy-003",
    name: "Green Climate Fund Sukuk",
    type: "Islamic Finance",
    issuer: "ESN Islamic Capital Markets",
    faceValue: 1800000000,
    currency: "AED",
    yieldRate: 5.8,
    maturityDate: "2029-03-31",
    rating: "AA",
    status: "Active",
    totalIssuance: 1800000000,
    availableAllocation: 540000000,
    settlementDays: 1,
    description: "Shariah-compliant Sukuk financing green energy and sustainable infrastructure across GCC and Southeast Asia.",
  },
  {
    id: "trsy-004",
    name: "Digital Asset-Backed Security",
    type: "ABS",
    issuer: "ESN Structured Finance",
    faceValue: 890000000,
    currency: "USD",
    yieldRate: 7.2,
    maturityDate: "2028-09-30",
    rating: "A+",
    status: "Active",
    totalIssuance: 890000000,
    availableAllocation: 267000000,
    settlementDays: 0,
    description: "Asset-backed security collateralized by a diversified pool of tokenized real-world assets with overcollateralization of 135%.",
  },
  {
    id: "trsy-005",
    name: "Tokenized T-Bill Fund",
    type: "Money Market",
    issuer: "ESN Money Markets",
    faceValue: 10000000000,
    currency: "USD",
    yieldRate: 4.9,
    maturityDate: "2025-12-31",
    rating: "AAA",
    status: "Active",
    totalIssuance: 10000000000,
    availableAllocation: 4000000000,
    settlementDays: 0,
    description: "Daily liquidity money market fund holding US Treasury Bills. Institutional minimum $10M. T+0 settlement.",
  },
  {
    id: "trsy-006",
    name: "Private Credit CLO Tranche A",
    type: "CLO",
    issuer: "ESN Credit Strategies",
    faceValue: 650000000,
    currency: "EUR",
    yieldRate: 8.1,
    maturityDate: "2032-06-30",
    rating: "AA",
    status: "Active",
    totalIssuance: 650000000,
    availableAllocation: 195000000,
    settlementDays: 2,
    description: "Senior tranche of CLO backed by European leveraged loans. Structural enhancements include OC and IC triggers.",
  },
  {
    id: "trsy-007",
    name: "ESN Covered Bond Programme",
    type: "Covered Bond",
    issuer: "ESN Bank Partners",
    faceValue: 3400000000,
    currency: "EUR",
    yieldRate: 4.4,
    maturityDate: "2030-06-30",
    rating: "AAA",
    status: "Active",
    totalIssuance: 3400000000,
    availableAllocation: 1020000000,
    settlementDays: 1,
    description: "Dual recourse covered bonds backed by prime residential mortgage pools in Germany, France, and the Netherlands.",
  },
];

const YIELD_CURVE = [
  { maturity: "3M", yield: 4.82 },
  { maturity: "6M", yield: 4.91 },
  { maturity: "1Y", yield: 5.02 },
  { maturity: "2Y", yield: 5.18 },
  { maturity: "3Y", yield: 5.31 },
  { maturity: "5Y", yield: 5.47 },
  { maturity: "7Y", yield: 5.62 },
  { maturity: "10Y", yield: 5.78 },
  { maturity: "20Y", yield: 5.94 },
  { maturity: "30Y", yield: 6.02 },
];

const TOP_HOLDERS = [
  { name: "Abu Dhabi Investment Authority", allocation: 4200000000, percentage: 16.8 },
  { name: "GIC Singapore", allocation: 3800000000, percentage: 15.2 },
  { name: "Norway Government Pension Fund", allocation: 3200000000, percentage: 12.8 },
  { name: "Kuwait Investment Authority", allocation: 2900000000, percentage: 11.6 },
  { name: "Temasek Holdings", allocation: 2400000000, percentage: 9.6 },
  { name: "Saudi PIF", allocation: 2100000000, percentage: 8.4 },
  { name: "CDPQ Canada", allocation: 1800000000, percentage: 7.2 },
  { name: "Other Institutional", allocation: 4600000000, percentage: 18.4 },
];

router.get("/treasury/products", (_req, res) => {
  res.json(TREASURY_PRODUCTS);
});

router.get("/treasury/analytics", (_req, res) => {
  res.json({
    totalPortfolioValue: 25000000000,
    weightedAverageYield: 5.68,
    durationRisk: 4.2,
    maturingIn30Days: 1200000000,
    maturingIn90Days: 3800000000,
    topHolders: TOP_HOLDERS,
    yieldCurve: YIELD_CURVE,
  });
});

router.post("/treasury/products", (req, res) => {
  const { name, type, issuer, faceValue, currency, yieldRate, maturityDate, totalIssuance, description } = req.body;
  const newProduct = {
    id: `trsy-${Date.now()}`,
    name,
    type,
    issuer,
    faceValue,
    currency,
    yieldRate,
    maturityDate,
    rating: "A",
    status: "Pending",
    totalIssuance: totalIssuance || faceValue,
    availableAllocation: totalIssuance || faceValue,
    settlementDays: 1,
    description: description || "",
  };
  res.status(201).json(newProduct);
});

export default router;
