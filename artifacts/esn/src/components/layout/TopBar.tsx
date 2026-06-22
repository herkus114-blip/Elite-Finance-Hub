import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Bell, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const routeNames: Record<string, string> = {
  "/": "Executive Command Center",
  "/assets": "RWA Tokenization Platform",
  "/ai": "AI Intelligence Center",
  "/treasury": "Treasury Tokenization Platform",
  "/settlement": "Global Settlement Network",
  "/deposits": "Tokenized Deposit Network",
  "/gateway": "FX Gateway",
  "/demo": "Investor Demo Mode",
};

export function TopBar() {
  const [location] = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const routeName = routeNames[location] || "Elite Settlement Network";

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border glass sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Network</span>
        <span className="text-muted-foreground text-sm">/</span>
        <span className="text-foreground font-semibold tracking-tight">{routeName}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-sm font-mono text-muted-foreground">
          <span>{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
          <span>{time.toLocaleTimeString('en-US', { hour12: false })}</span>
          <span className="text-[10px] bg-muted px-1 rounded border border-border">UTC</span>
        </div>

        {location !== '/demo' && (
          <Link href="/demo" className="hidden sm:flex">
            <Button variant="outline" size="sm" className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              <PlayCircle size={14} />
              Demo Mode
            </Button>
          </Link>
        )}

        <div className="flex items-center gap-4">
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></span>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border text-xs font-bold text-foreground">
            ESN
          </div>
        </div>
      </div>
    </header>
  );
}
