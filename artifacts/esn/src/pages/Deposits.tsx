import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Plus, ArrowRightLeft, Layers, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCompactCurrency } from "@/lib/format";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useState, useEffect } from "react";

const pools = [
  { id: "1", name: "USD Prime Liquidity", currency: "USD", total: 52800000000, utilization: 71, apy: 4.8, participants: 31, rails: ["FedWire", "CHIPS", "SWIFT", "Blockchain"] },
  { id: "2", name: "EUR Settlement Pool", currency: "EUR", total: 34700000000, utilization: 58, apy: 4.2, participants: 26, rails: ["TARGET2", "SEPA", "SWIFT", "Blockchain"] },
  { id: "3", name: "GBP Institutional Pool", currency: "GBP", total: 21400000000, utilization: 74, apy: 4.6, participants: 19, rails: ["CHAPS", "Faster Payments", "SWIFT", "Blockchain"] },
  { id: "4", name: "SGD Regional Hub", currency: "SGD", total: 9800000000, utilization: 52, apy: 5.1, participants: 14, rails: ["MEPS+", "FAST", "SWIFT", "Blockchain"] },
  { id: "5", name: "CHF Institutional Reserve", currency: "CHF", total: 14200000000, utilization: 63, apy: 3.8, participants: 22, rails: ["SIC", "euroSIC", "SWIFT", "Blockchain"] },
  { id: "6", name: "AED Gulf Corridor", currency: "AED", total: 8100000000, utilization: 46, apy: 5.4, participants: 12, rails: ["UAE RTGS", "SWIFT", "Blockchain"] },
];

const TOKEN_SYMBOLS: Record<string, string> = {
  USD: "ESN-USD", EUR: "ESN-EUR", GBP: "ESN-GBP",
  CHF: "ESN-CHF", AED: "ESN-AED", SGD: "ESN-SGD",
};

const ALL_ISSUERS = [
  "JPMorgan Chase", "Société Générale", "Standard Chartered", "Barclays",
  "Deutsche Bank", "Santander", "State Street", "Vontobel", "Swissquote",
  "Credit Suisse", "Arab Bank", "Zand Bank", "Sygnum Bank", "AMINA Bank",
  "Pictet", "Capital Union Bank", "Emirates NBD", "First Abu Dhabi Bank (FAB)",
  "Abu Dhabi Commercial Bank (ADCB)", "Qatar National Bank (QNB)",
  "HSBC", "DBS Bank", "MUFG Bank", "Goldman Sachs", "BNP Paribas",
  "UBS Group", "ING Bank", "OCBC Bank", "RBC Royal Bank", "Hypothekarbank Lenzburg",
];
const CURRENCIES = ["USD", "EUR", "GBP", "CHF", "AED", "SGD"];
const RAILS = ["SWIFT", "Blockchain", "SEPA", "FedWire", "TARGET2", "MEPS+", "CHAPS", "SIC", "UAE RTGS", "euroSIC"];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeTimestamp(hoursAgo: number): string {
  const d = new Date(Date.now() - hoursAgo * 3600 * 1000);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }) + " UTC";
}

function generateRecords() {
  const issuances = Array.from({ length: 25 }, (_, i) => {
    const currency = pickRandom(CURRENCIES);
    const hoursAgo = i * 2.4 + Math.random() * 1.5;
    return {
      id: `ISS-${100 + i}`,
      issuer: pickRandom(ALL_ISSUERS),
      amount: Math.round((Math.random() * 900 + 50) * 1_000_000),
      currency,
      tokenSymbol: TOKEN_SYMBOLS[currency],
      status: hoursAgo > 3 ? "Settled" : hoursAgo > 0.5 ? "Processing" : "Pending",
      timestamp: makeTimestamp(hoursAgo),
      rail: pickRandom(RAILS),
      type: "MINT" as const,
    };
  });

  const redemptions = Array.from({ length: 25 }, (_, i) => {
    const currency = pickRandom(CURRENCIES);
    const hoursAgo = i * 2.2 + Math.random() * 2;
    return {
      id: `RED-${200 + i}`,
      issuer: pickRandom(ALL_ISSUERS),
      amount: Math.round((Math.random() * 700 + 30) * 1_000_000),
      currency,
      tokenSymbol: TOKEN_SYMBOLS[currency],
      status: hoursAgo > 4 ? "Redeemed" : hoursAgo > 1 ? "Processing" : "Pending",
      timestamp: makeTimestamp(hoursAgo),
      rail: pickRandom(RAILS),
      type: "BURN" as const,
    };
  });

  const combined = [...issuances, ...redemptions];
  combined.sort((a, b) => {
    const ta = issuances.find((x) => x.id === a.id)?.id ? issuances.indexOf(a as typeof issuances[0]) : Infinity;
    const tb = issuances.find((x) => x.id === b.id)?.id ? issuances.indexOf(b as typeof issuances[0]) : Infinity;
    return ta - tb;
  });
  return combined;
}

const INITIAL_RECORDS = generateRecords();

type FilterType = "ALL" | "MINT" | "BURN";

export function Deposits() {
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [records, setRecords] = useState(INITIAL_RECORDS);

  // Occasionally add a new live record
  useEffect(() => {
    const interval = setInterval(() => {
      const currency = pickRandom(CURRENCIES);
      const type = Math.random() > 0.45 ? "MINT" : "BURN";
      const newRecord = {
        id: `LIVE-${Date.now()}`,
        issuer: pickRandom(ALL_ISSUERS),
        amount: Math.round((Math.random() * 400 + 20) * 1_000_000),
        currency,
        tokenSymbol: TOKEN_SYMBOLS[currency],
        status: "Processing",
        timestamp: makeTimestamp(0),
        rail: pickRandom(RAILS),
        type: type as "MINT" | "BURN",
      };
      setRecords((prev) => [newRecord, ...prev.slice(0, 49)]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const displayed = records.filter((r) => filter === "ALL" || r.type === filter);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Landmark className="text-emerald-500" />
            Tokenized Deposit Network
          </h1>
          <p className="text-sm text-muted-foreground">Programmable commercial bank money and wholesale CBDCs</p>
        </div>

        <Button className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 border-none shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Plus size={16} />
          Issue Deposit Token
        </Button>
      </div>

      {/* Pool cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {pools.map((pool, i) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="glass-dark rounded-xl border border-border p-5 flex flex-col relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
          >
            <div
              className="absolute bottom-0 left-0 w-full h-0.5"
              style={{ background: `linear-gradient(90deg, hsl(142 71% 45%) ${pool.utilization}%, transparent ${pool.utilization}%)` }}
            />

            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-foreground text-sm leading-tight">{pool.name}</h3>
                <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded mt-1 inline-block">{pool.currency}</span>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 font-mono font-bold text-xs px-1.5 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
                {pool.apy}%
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground mb-0.5">Total Liquidity</p>
            <p className="text-xl font-mono font-bold tracking-tight text-foreground mb-3">
              {formatCompactCurrency(pool.total, pool.currency)}
            </p>

            <div className="space-y-2 mt-auto pt-3 border-t border-border/50">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="font-mono text-foreground">{pool.utilization}%</span>
                </div>
                <div className="h-1 bg-background rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pool.utilization}%` }} />
                </div>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">Participants</span>
                <span className="font-mono text-foreground">{pool.participants}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {pool.rails.slice(0, 3).map((rail) => (
                  <span key={rail} className="text-[8px] uppercase tracking-wider bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground">
                    {rail}
                  </span>
                ))}
                {pool.rails.length > 3 && (
                  <span className="text-[8px] uppercase tracking-wider bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground">
                    +{pool.rails.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity table + Compliance panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 glass-dark rounded-xl border border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border flex justify-between items-center bg-background/50 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-foreground">Issuances & Redemptions</h2>
              <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {(["ALL", "MINT", "BURN"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs px-2.5 py-1 rounded font-mono transition-colors ${
                    filter === f
                      ? f === "MINT"
                        ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                        : f === "BURN"
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "bg-primary/20 text-primary border border-primary/30"
                      : "bg-background border border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {f === "MINT" ? "Issuances" : f === "BURN" ? "Redemptions" : "All"}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 border-b border-border sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 font-medium">Institution</th>
                  <th className="px-4 py-3 font-medium">Token</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium">Curr.</th>
                  <th className="px-4 py-3 font-medium">Rail</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <AnimatePresence initial={false}>
                  {displayed.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, backgroundColor: "hsl(var(--primary) / 0.08)" }}
                      animate={{ opacity: 1, backgroundColor: "transparent" }}
                      transition={{ duration: 0.6 }}
                      className="hover:bg-white/4 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-foreground text-xs whitespace-nowrap">{item.issuer}</td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                          {item.tokenSymbol}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {item.type === "MINT" ? (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            MINT
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                            BURN
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-right font-bold text-foreground text-xs whitespace-nowrap">
                        {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-mono text-muted-foreground">{item.currency}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs flex items-center gap-1 whitespace-nowrap">
                        {item.rail === "Blockchain" ? (
                          <Layers size={11} className="text-primary shrink-0" />
                        ) : (
                          <ArrowRightLeft size={11} className="shrink-0" />
                        )}
                        {item.rail}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-[10px] whitespace-nowrap font-mono">{item.timestamp}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-border bg-background/30 flex items-center justify-between text-xs text-muted-foreground">
            <span>{displayed.length} records • Updated in real-time</span>
            <div className="flex items-center gap-1">
              <RefreshCw size={11} className="animate-spin" style={{ animationDuration: "3s" }} />
              Live sync
            </div>
          </div>
        </motion.div>

        {/* Compliance & Reserves */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col"
        >
          <h2 className="text-base font-semibold text-foreground mb-5">Compliance & Reserves</h2>

          <div className="space-y-5 flex-1">
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
              <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">100% Reserve Backed</p>
                <p className="text-xs text-muted-foreground">All tokenized deposits are fully backed 1:1 by central bank reserves or HQLA held in bankruptcy-remote trusts.</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Real-time Attestation</span>
                <span className="font-mono text-emerald-500">Live</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Last Oracle Update: 12 seconds ago</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Network Statistics</h3>
              <div className="space-y-3">
                {[
                  { label: "Active Issuers", value: "30" },
                  { label: "Total Issuances (30d)", value: "$184.2B" },
                  { label: "Total Redemptions (30d)", value: "$162.8B" },
                  { label: "Net Float", value: "$21.4B" },
                  { label: "Avg. Settlement Time", value: "8.4s" },
                  { label: "Success Rate", value: "99.97%" },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-mono text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Regulatory Regimes</h3>
              <div className="flex flex-wrap gap-2">
                {["MiCA (EU)", "MAS (SG)", "FCA (UK)", "DFSA (UAE)", "FINMA (CH)", "ADGM (AD)", "QFC (QA)"].map((r) => (
                  <span key={r} className="text-[10px] px-2 py-1 bg-background border border-border rounded text-foreground">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
