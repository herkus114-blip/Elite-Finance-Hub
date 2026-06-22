import { Router } from "express";

const router = Router();

const DEMO_STEPS = [
  {
    id: "step-01",
    order: 1,
    title: "Elite Settlement Network",
    subtitle: "The Future of Institutional Finance",
    route: "/",
    duration: 30,
    description: "ESN is the world's first integrated institutional financial infrastructure platform — combining real-world asset tokenization, AI-driven valuation, and a global settlement network into a single, sovereign-grade platform.",
  },
  {
    id: "step-02",
    order: 2,
    title: "Market Opportunity",
    subtitle: "$15.3 Trillion addressable market in tokenized real-world assets",
    route: "/",
    duration: 30,
    description: "By 2030, an estimated $15.3T in real-world assets will be tokenized. ESN is positioned at the intersection of institutional finance, blockchain infrastructure, and AI — capturing value across the entire asset lifecycle.",
  },
  {
    id: "step-03",
    order: 3,
    title: "Tokenize an Asset",
    subtitle: "Real-world assets tokenized in minutes",
    route: "/assets",
    duration: 45,
    description: "Watch as a commercial real estate asset valued at $2.8 billion is submitted, AI-rated, and tokenized onto the ESN network. Institutional investors can subscribe to individual token allocations with T+0 settlement.",
  },
  {
    id: "step-04",
    order: 4,
    title: "AI Rating Generation",
    subtitle: "ESN-Quant AI engine delivers institutional-grade ratings in seconds",
    route: "/ai",
    duration: 45,
    description: "ESN-Quant v3.2, trained on 847 macroeconomic indicators and 12 years of institutional transaction data, generates comprehensive risk, liquidity, and fraud assessments with 94.7% model confidence.",
  },
  {
    id: "step-05",
    order: 5,
    title: "Treasury Issuance",
    subtitle: "Tokenized treasury products with T+0 settlement",
    route: "/treasury",
    duration: 30,
    description: "ESN's Treasury Platform enables sovereign, municipal, and corporate issuers to bring tokenized debt instruments to market in hours rather than weeks. $25B+ currently under management across 7 product categories.",
  },
  {
    id: "step-06",
    order: 6,
    title: "Global Settlement Demonstration",
    subtitle: "47 institutions. 127 corridors. 99.97% uptime.",
    route: "/settlement",
    duration: 60,
    description: "The ESN Settlement Network processes $12.4B in cross-border transactions daily across 127 active corridors connecting 47 Tier-1 banking institutions worldwide. Average settlement time: 11 seconds.",
  },
  {
    id: "step-07",
    order: 7,
    title: "Cross-Border Payment Flow",
    subtitle: "USD to SGD in under 15 seconds",
    route: "/gateway",
    duration: 45,
    description: "A $50M USD payment routes through ESN's compliance engine, matches with the SGD liquidity pool, and settles as ESN-SGD tokenized deposit — fully auditable and compliant, in seconds not days.",
  },
  {
    id: "step-08",
    order: 8,
    title: "Revenue Generation Model",
    subtitle: "Three compounding revenue streams",
    route: "/",
    duration: 30,
    description: "ESN generates revenue from: (1) Settlement Fees: 1.2bps per transaction — $148.8M ARR at current volume; (2) Platform Licensing: $2.4M per institutional participant; (3) Yield Management: 15bps on $25B AUM.",
  },
  {
    id: "step-09",
    order: 9,
    title: "Growth Potential",
    subtitle: "47 institutions onboarded. Target: 500 by 2027.",
    route: "/",
    duration: 30,
    description: "Each new institutional participant adds network value exponentially. At 500 institutions, our settlement volume projections reach $180B daily — generating $2.16B in annual settlement fee revenue alone.",
  },
  {
    id: "step-10",
    order: 10,
    title: "Future Expansion",
    subtitle: "Regulated in 12 jurisdictions. 8 pending regulatory approvals.",
    route: "/",
    duration: 30,
    description: "ESN holds regulatory approvals or licenses in the UAE (ADGM), Singapore (MAS), UK (FCA), Luxembourg (CSSF), and 8 additional jurisdictions. Central bank digital currency (CBDC) integration protocols are in active development with 4 central banks.",
  },
];

router.get("/demo/steps", (_req, res) => {
  res.json(DEMO_STEPS);
});

export default router;
