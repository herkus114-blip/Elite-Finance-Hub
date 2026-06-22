import { AnimatePresence, motion } from "framer-motion";
import { Globe2, ArrowRight, Server, Activity, ShieldAlert, CheckCircle2, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { formatCompactCurrency } from "@/lib/format";

// ------------------------------------------------------------------
// Map nodes — lat/lng mapped to [0,100]% x/y within the SVG canvas
// x = (lng + 180) / 360 * 100, y = (90 - lat) / 180 * 100
// ------------------------------------------------------------------
const nodes = [
  { id: "NYC", name: "New York", institution: "Goldman Sachs / JPMorgan", x: 22, y: 31, type: "primary" },
  { id: "LON", name: "London", institution: "HSBC / Barclays", x: 45, y: 24, type: "primary" },
  { id: "SGP", name: "Singapore", institution: "DBS / Standard Chartered", x: 79, y: 55, type: "primary" },
  { id: "TOK", name: "Tokyo", institution: "MUFG Bank", x: 87, y: 30, type: "primary" },
  { id: "FRA", name: "Frankfurt", institution: "Deutsche Bank / Clearstream", x: 48, y: 25, type: "secondary" },
  { id: "DXB", name: "Dubai", institution: "Emirates NBD / FAB", x: 59, y: 40, type: "secondary" },
  { id: "HKG", name: "Hong Kong", institution: "Bank of China HK", x: 82, y: 40, type: "secondary" },
  { id: "SYD", name: "Sydney", institution: "ANZ Bank", x: 88, y: 78, type: "secondary" },
  { id: "ZUR", name: "Zurich", institution: "UBS / Credit Suisse / Sygnum", x: 47, y: 27, type: "secondary" },
  { id: "PAR", name: "Paris", institution: "BNP Paribas / Delubac", x: 46, y: 26, type: "tertiary" },
  { id: "MAD", name: "Madrid", institution: "Santander", x: 43, y: 30, type: "tertiary" },
  { id: "MIL", name: "Milan", institution: "UniCredit", x: 49, y: 28, type: "tertiary" },
  { id: "STO", name: "Stockholm", institution: "Nordea", x: 50, y: 18, type: "tertiary" },
  { id: "AMS", name: "Amsterdam", institution: "ING Bank", x: 46, y: 23, type: "tertiary" },
  { id: "IST", name: "Istanbul", institution: "İş Bankası / Garanti BBVA", x: 54, y: 29, type: "tertiary" },
  { id: "RUH", name: "Riyadh", institution: "Al Rajhi Bank", x: 57, y: 38, type: "tertiary" },
  { id: "DOH", name: "Doha", institution: "Qatar National Bank", x: 58, y: 39, type: "tertiary" },
  { id: "ABD", name: "Abu Dhabi", institution: "FAB / ADCB", x: 59, y: 40, type: "tertiary" },
  { id: "MUM", name: "Mumbai", institution: "HDFC Bank", x: 67, y: 43, type: "tertiary" },
  { id: "SEO", name: "Seoul", institution: "KB Kookmin Bank", x: 85, y: 32, type: "tertiary" },
  { id: "SAO", name: "São Paulo", institution: "Itaú Unibanco", x: 28, y: 68, type: "tertiary" },
  { id: "TOR", name: "Toronto", institution: "RBC Royal Bank", x: 21, y: 27, type: "tertiary" },
  { id: "LUX", name: "Luxembourg", institution: "Clearstream", x: 47, y: 24, type: "tertiary" },
];

const initialFlows = [
  { id: 1, from: "NYC", to: "LON", fromName: "Goldman Sachs", toName: "HSBC", amount: 145000000, currency: "USD", speed: 2.2 },
  { id: 2, from: "LON", to: "SGP", fromName: "Barclays", toName: "DBS Bank", amount: 89000000, currency: "USD", speed: 3.1 },
  { id: 3, from: "SGP", to: "TOK", fromName: "DBS Bank", toName: "MUFG Bank", amount: 210000000, currency: "SGD", speed: 2.6 },
  { id: 4, from: "TOK", to: "NYC", fromName: "MUFG Bank", toName: "JPMorgan Chase", amount: 340000000, currency: "JPY", speed: 1.8 },
  { id: 5, from: "FRA", to: "LON", fromName: "Deutsche Bank", toName: "HSBC", amount: 56000000, currency: "EUR", speed: 4.0 },
  { id: 6, from: "DXB", to: "SGP", fromName: "Emirates NBD", toName: "Standard Chartered", amount: 112000000, currency: "AED", speed: 3.5 },
  { id: 7, from: "ZUR", to: "FRA", fromName: "UBS Group", toName: "Deutsche Bank", amount: 92000000, currency: "CHF", speed: 2.8 },
  { id: 8, from: "HKG", to: "SGP", fromName: "Bank of China HK", toName: "OCBC Bank", amount: 178000000, currency: "HKD", speed: 2.0 },
];

const flowInstitutionPairs = [
  { fromNode: "NYC", toNode: "LON", from: "Goldman Sachs", to: "HSBC" },
  { fromNode: "NYC", toNode: "FRA", from: "JPMorgan Chase", to: "Deutsche Bank" },
  { fromNode: "LON", toNode: "SGP", from: "Barclays", to: "DBS Bank" },
  { fromNode: "LON", toNode: "ZUR", from: "HSBC", to: "UBS Group" },
  { fromNode: "SGP", toNode: "TOK", from: "Standard Chartered", to: "MUFG Bank" },
  { fromNode: "SGP", toNode: "HKG", from: "OCBC Bank", to: "Bank of China HK" },
  { fromNode: "FRA", toNode: "PAR", from: "Deutsche Bank", to: "BNP Paribas" },
  { fromNode: "ZUR", toNode: "FRA", from: "Credit Suisse", to: "Deutsche Bank" },
  { fromNode: "ZUR", toNode: "LON", from: "Pictet", to: "Barclays" },
  { fromNode: "DXB", toNode: "SGP", from: "Emirates NBD", to: "Standard Chartered" },
  { fromNode: "DXB", toNode: "LON", from: "First Abu Dhabi Bank (FAB)", to: "HSBC" },
  { fromNode: "RUH", toNode: "NYC", from: "Al Rajhi Bank", to: "JPMorgan Chase" },
  { fromNode: "DOH", toNode: "LON", from: "Qatar National Bank (QNB)", to: "HSBC" },
  { fromNode: "MUM", toNode: "SGP", from: "HDFC Bank", to: "DBS Bank" },
  { fromNode: "SEO", toNode: "TOK", from: "KB Kookmin Bank", to: "MUFG Bank" },
  { fromNode: "SAO", toNode: "NYC", from: "Itaú Unibanco", to: "Goldman Sachs" },
  { fromNode: "TOR", toNode: "NYC", from: "RBC Royal Bank", to: "State Street" },
  { fromNode: "IST", toNode: "FRA", from: "Türkiye İş Bankası", to: "Deutsche Bank" },
  { fromNode: "AMS", toNode: "FRA", from: "ING Bank", to: "Clearstream" },
  { fromNode: "MAD", toNode: "FRA", from: "Santander", to: "BNP Paribas" },
  { fromNode: "ABD", toNode: "DXB", from: "ADCB", to: "Emirates NBD" },
  { fromNode: "SYD", toNode: "SGP", from: "ANZ Bank", to: "OCBC Bank" },
  { fromNode: "NYC", toNode: "ZUR", from: "State Street", to: "Sygnum Bank" },
  { fromNode: "ZUR", toNode: "ZUR", from: "AMINA Bank", to: "Swissquote" },
];

const currencies = ["USD", "EUR", "GBP", "CHF", "AED", "SGD", "JPY", "HKD"];

// ------------------------------------------------------------------
// All institutions for the selectors, grouped by region
// ------------------------------------------------------------------
const INSTITUTION_GROUPS = [
  {
    region: "North America",
    institutions: [
      "Goldman Sachs (New York)",
      "JPMorgan Chase (New York)",
      "State Street (Boston)",
      "CACEIS Investor Services (Montreal)",
      "Capital Union Bank (Nassau)",
      "RBC Royal Bank (Toronto)",
      "Itaú Unibanco (São Paulo)",
    ],
  },
  {
    region: "Europe",
    institutions: [
      "HSBC (London)",
      "Barclays (London)",
      "Deutsche Bank (Frankfurt)",
      "BNP Paribas (Paris)",
      "Banque Delubac & Cie (Paris)",
      "Santander (Madrid)",
      "UniCredit (Milan)",
      "ING Bank (Amsterdam)",
      "Nordea Bank (Stockholm)",
      "DNB Bank (Oslo)",
      "UBS Group (Zurich)",
      "Credit Suisse (Zurich)",
      "Pictet (Geneva)",
      "Vontobel (Zurich)",
      "Swissquote (Gland)",
      "Sygnum Bank (Zurich)",
      "AMINA Bank (Zug)",
      "Hypothekarbank Lenzburg",
      "Clearstream (Luxembourg)",
      "AIB Group (Dublin)",
      "Erste Group (Vienna)",
      "PKO Bank Polski (Warsaw)",
      "Türkiye İş Bankası (Istanbul)",
      "Garanti BBVA (Istanbul)",
      "Misyon Bank (Istanbul)",
    ],
  },
  {
    region: "Middle East",
    institutions: [
      "Emirates NBD (Dubai)",
      "First Abu Dhabi Bank — FAB (Abu Dhabi)",
      "Abu Dhabi Commercial Bank — ADCB (Abu Dhabi)",
      "Zand Bank (Dubai)",
      "Mashreq Bank (Dubai)",
      "Al Rajhi Bank (Riyadh)",
      "Arab Bank (Amman)",
      "Qatar National Bank — QNB (Doha)",
      "CIB Egypt (Cairo)",
      "Attijariwafa Bank (Casablanca)",
    ],
  },
  {
    region: "Asia-Pacific",
    institutions: [
      "DBS Bank (Singapore)",
      "Standard Chartered (Singapore)",
      "OCBC Bank (Singapore)",
      "MUFG Bank (Tokyo)",
      "Bank of China HK (Hong Kong)",
      "ICBC (Beijing)",
      "HDFC Bank (Mumbai)",
      "KB Kookmin Bank (Seoul)",
      "ANZ Bank (Sydney)",
      "Kasikorn Bank (Bangkok)",
      "Standard Bank (Johannesburg)",
      "Equity Bank (Nairobi)",
    ],
  },
];

// ------------------------------------------------------------------
// Searchable grouped institution selector component
// ------------------------------------------------------------------
function InstitutionSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = INSTITUTION_GROUPS.map((g) => ({
    ...g,
    institutions: g.institutions.filter((inst) =>
      inst.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((g) => g.institutions.length > 0);

  return (
    <div ref={ref} className="relative">
      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors flex items-center justify-between gap-2 text-left"
      >
        <span className="truncate">{value || "Select institution…"}</span>
        <ChevronDown size={14} className="shrink-0 text-muted-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full mt-1 w-full bg-popover border border-border rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Search */}
            <div className="p-2 border-b border-border flex items-center gap-2 bg-background/50">
              <Search size={13} className="text-muted-foreground shrink-0" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search institutions…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            {/* Options */}
            <div className="max-h-60 overflow-y-auto">
              {filtered.map((group) => (
                <div key={group.region}>
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground bg-muted/40 border-b border-border/50">
                    {group.region}
                  </div>
                  {group.institutions.map((inst) => (
                    <button
                      key={inst}
                      type="button"
                      onClick={() => { onChange(inst); setOpen(false); setSearch(""); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors ${value === inst ? "bg-primary/10 text-primary font-medium" : "text-foreground"}`}
                    >
                      {inst}
                    </button>
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-sm text-muted-foreground text-center">No institutions found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------------------------
// Main page
// ------------------------------------------------------------------
export function SettlementNetwork() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [flows, setFlows] = useState(initialFlows);
  const [fromInstitution, setFromInstitution] = useState("Goldman Sachs (New York)");
  const [toInstitution, setToInstitution] = useState("DBS Bank (Singapore)");
  const [amount, setAmount] = useState("50000000");
  const [currency, setCurrency] = useState("USD");
  const [recentSettlements, setRecentSettlements] = useState<typeof initialFlows>([...initialFlows]);

  // Simulate new settlements
  useEffect(() => {
    const interval = setInterval(() => {
      const pair = flowInstitutionPairs[Math.floor(Math.random() * flowInstitutionPairs.length)];
      const fromNode = nodes.find((n) => n.id === pair.fromNode) || nodes[0];
      const toNode = nodes.find((n) => n.id === pair.toNode) || nodes[1];
      if (fromNode.id === toNode.id) return;

      const newFlow = {
        id: Date.now(),
        from: fromNode.id,
        to: toNode.id,
        fromName: pair.from,
        toName: pair.to,
        amount: Math.floor(Math.random() * 800_000_000) + 20_000_000,
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        speed: Math.random() * 2 + 1.5,
      };

      setFlows((prev) => [...prev.slice(-12), newFlow]);
      setRecentSettlements((prev) => [newFlow, ...prev.slice(0, 29)]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-12 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Globe2 className="text-primary" />
            Global Settlement Network
          </h1>
          <p className="text-sm text-muted-foreground">T+0 atomic cross-border settlement infrastructure</p>
        </div>

        <div className="flex items-center gap-4 bg-background/50 px-4 py-2 rounded-lg border border-border flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-foreground">59 Institutions</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-foreground">163 Corridors Active</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-xs font-mono text-muted-foreground">Avg: 1.4s</span>
          <div className="w-px h-4 bg-border" />
          <span className="text-xs font-mono text-muted-foreground">$18.6B Daily Vol.</span>
        </div>
      </div>

      {/* World Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[2/1] min-h-[400px] glass-dark rounded-xl border border-border overflow-hidden bg-[#050B14]"
      >
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(var(--primary)) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

        {/* SVG flow lines — viewBox 0 0 100 100 matches node x/y percentages */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <style>{`
              @keyframes flowDash {
                from { stroke-dashoffset: 12; }
                to   { stroke-dashoffset: 0; }
              }
              .flow-line {
                stroke-dasharray: 2 3;
                animation: flowDash linear infinite;
              }
            `}</style>
          </defs>

          {flows.map((flow) => {
            const start = nodes.find((n) => n.id === flow.from);
            const end = nodes.find((n) => n.id === flow.to);
            if (!start || !end || start.id === end.id) return null;

            const cpX = (start.x + end.x) / 2;
            const cpY = Math.min(start.y, end.y) - 14;
            const d = `M ${start.x} ${start.y} Q ${cpX} ${cpY} ${end.x} ${end.y}`;

            return (
              <g key={flow.id}>
                {/* Static track */}
                <path
                  d={d}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.3"
                  opacity="0.3"
                />
                {/* Animated flow line */}
                <path
                  d={d}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.6"
                  opacity="0.85"
                  filter="url(#glow)"
                  className="flow-line"
                  style={{ animationDuration: `${flow.speed}s` }}
                />
                {/* Accent colour overlay for variety */}
                <path
                  d={d}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="0.25"
                  opacity="0.3"
                  className="flow-line"
                  style={{ animationDuration: `${flow.speed * 1.4}s`, animationDelay: `${flow.speed * 0.5}s` }}
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isPrimary = node.type === "primary";
          const isSecondary = node.type === "secondary";
          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {isPrimary && (
                <div className="absolute rounded-full animate-ping opacity-60 bg-primary w-4 h-4 -m-1" />
              )}
              <div
                className={`relative rounded-full shadow-lg ${
                  isPrimary
                    ? "w-2.5 h-2.5 bg-primary shadow-primary/60"
                    : isSecondary
                    ? "w-2 h-2 bg-accent shadow-accent/50"
                    : "w-1.5 h-1.5 bg-emerald-400 shadow-emerald-400/40"
                }`}
              />
              <div
                className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-medium transition-opacity ${
                  activeNode === node.id || isPrimary ? "opacity-80 text-foreground" : "opacity-0"
                }`}
              >
                {node.name}
              </div>

              <AnimatePresence>
                {activeNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-popover/95 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl w-52 z-20 pointer-events-none"
                  >
                    <div className="flex justify-between items-center mb-2 border-b border-border/50 pb-2">
                      <span className="font-bold text-foreground text-xs">{node.name}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-1.5 rounded">Online</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-2">{node.institution}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Latency</span>
                        <span className="font-mono text-emerald-500">{Math.floor(Math.random() * 18 + 4)}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Volume (24h)</span>
                        <span className="font-mono text-foreground">{formatCompactCurrency(Math.random() * 8_000_000_000 + 500_000_000)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass-dark px-3 py-2 rounded-lg border border-border flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Primary Hub
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-accent" /> Secondary Node
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Partner Institution
          </div>
        </div>

        {/* Live counter */}
        <div className="absolute top-4 right-4 glass-dark px-3 py-2 rounded-lg border border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Live Settlements</p>
          <p className="text-lg font-mono font-bold text-primary">{(1247 + Math.floor(Date.now() / 60000) % 100).toLocaleString()}</p>
        </div>
      </motion.div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Live Settlement Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 glass-dark rounded-xl border border-border overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Activity size={16} className="text-primary" />
              Live Settlement Feed
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-time
            </div>
          </div>

          <div className="flex-1 overflow-y-auto h-[320px]">
            <AnimatePresence initial={false}>
              {recentSettlements.map((flow) => (
                <motion.div
                  key={flow.id}
                  initial={{ opacity: 0, x: -16, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-between px-4 py-3 hover:bg-white/5 border-b border-border/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-primary/10 p-1.5 rounded border border-primary/20 text-primary shrink-0">
                      <Server size={13} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-medium text-sm text-foreground truncate">
                        <span className="truncate max-w-[120px]">{flow.fromName}</span>
                        <ArrowRight size={12} className="text-muted-foreground shrink-0" />
                        <span className="truncate max-w-[120px]">{flow.toName}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                        ESN-{Math.random().toString(36).substring(2, 9).toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <p className="font-mono text-sm font-bold text-emerald-500">
                      {formatCompactCurrency(flow.amount)} <span className="text-[10px] text-muted-foreground">{flow.currency}</span>
                    </p>
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <CheckCircle2 size={10} className="text-emerald-500" />
                      <p className="text-[10px] text-muted-foreground uppercase">Settled T+0</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Initiate Settlement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col"
        >
          <h2 className="font-semibold text-foreground mb-5">Initiate Settlement</h2>

          <div className="space-y-4 flex-1">
            <InstitutionSelect
              label="From Institution"
              value={fromInstitution}
              onChange={setFromInstitution}
            />

            <div className="flex justify-center -my-1 relative z-10">
              <div className="bg-background border border-border rounded-full p-1.5 text-muted-foreground">
                <ArrowRight size={13} className="rotate-90" />
              </div>
            </div>

            <InstitutionSelect
              label="To Institution"
              value={toInstitution}
              onChange={setToInstitution}
            />

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Amount & Currency
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-background/50 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-20 bg-background/50 border border-border rounded-md px-2 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {currencies.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan border-none h-11 text-sm font-semibold tracking-wide">
            Execute T+0 Settlement
          </Button>

          <div className="flex items-start gap-2 mt-3 text-xs text-muted-foreground">
            <ShieldAlert size={13} className="shrink-0 mt-0.5 text-primary" />
            <p>Cryptographically signed. Settlement is final and immutable.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
