import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X, ChevronRight, ChevronLeft, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoSteps = [
  { id: 1, title: "Elite Settlement Network", subtitle: "The Future of Institutional Finance", desc: "A precision-engineered infrastructure for tokenized real-world assets, treasury products, and atomic cross-border settlements." },
  { id: 2, title: "Market Opportunity", subtitle: "$15.3 Trillion addressable market by 2030", desc: "The tokenization of global illiquid assets represents the largest structural shift in financial plumbing since electronic trading." },
  { id: 3, title: "RWA Tokenization", subtitle: "Fractionalize & Digitize", desc: "Transform real estate, infrastructure, and private credit into highly liquid, composable digital instruments with embedded compliance." },
  { id: 4, title: "ESN-Quant AI Engine", subtitle: "Institutional-grade risk modeling", desc: "Our proprietary AI models analyze 4.2M data points to generate real-time risk scores, liquidity ratings, and market forecasts." },
  { id: 5, title: "Treasury Issuance", subtitle: "T+0 Fixed Income", desc: "Issue and allocate tokenized government bonds and money market funds with instantaneous settlement finality." },
  { id: 6, title: "Global Settlement", subtitle: "Atomic Cross-Border Flows", desc: "Replace correspondent banking chains with direct peer-to-peer settlement across 127 active corridors globally." },
  { id: 7, title: "Deposit Network", subtitle: "Programmable Commercial Money", desc: "Tokenized deposits fully backed by central bank reserves, enabling seamless 24/7/365 liquidity management." },
  { id: 8, title: "Revenue Generation", subtitle: "Triple-Engine Model", desc: "Platform access fees (SaaS), basis point settlement fees on volume, and yield spread optimization on tokenized deposits." },
  { id: 9, title: "Growth & Adoption", subtitle: "Network Effects in Motion", desc: "47 tier-1 institutions already onboarded. Target: 500 connected entities generating $100B+ daily volume by 2027." },
  { id: 10, title: "Regulatory Posture", subtitle: "Compliance-First Architecture", desc: "Built to stringent institutional standards. Regulated in 12 major jurisdictions with 8 pending approvals in emerging hubs." },
];

export function InvestorDemo() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-advance
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev < demoSteps.length - 1 ? prev + 1 : prev));
      }, 15000); // 15 seconds per slide
    }
    return () => clearInterval(timer);
  }, [isActive, currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      if (e.key === "ArrowRight" || e.key === "Space") {
        setCurrentStep((prev) => Math.min(prev + 1, demoSteps.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        setIsActive(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  const step = demoSteps[currentStep];

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 glow-violet border border-accent/20">
          <Presentation size={40} />
        </div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4">Boardroom Presentation Mode</h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Launch the full-screen interactive investor presentation. This mode is designed for sovereign wealth funds, major institutional partners, and board-level demonstrations.
        </p>
        <Button 
          onClick={() => { setIsActive(true); setCurrentStep(0); }}
          className="h-16 px-10 text-lg gap-3 bg-accent text-white hover:bg-accent/90 glow-violet border-none rounded-full font-semibold tracking-wide transition-transform hover:scale-105"
        >
          <PlayCircle size={24} />
          Start Investor Demo
        </Button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col"
      >
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-muted overflow-hidden">
          <motion.div 
            className="h-full bg-accent glow-violet"
            initial={{ width: `${((currentStep) / demoSteps.length) * 100}%` }}
            animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Top Controls */}
        <div className="flex justify-between items-center p-6 lg:px-12">
          <div className="font-bold tracking-tight gradient-text text-xl">ESN</div>
          <button 
            onClick={() => setIsActive(false)}
            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
          {/* Abstract background elements */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-5xl mx-auto z-10"
            >
              <h2 className="text-2xl md:text-3xl font-mono text-accent mb-6 uppercase tracking-[0.2em]">{step.subtitle}</h2>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-8 leading-tight">{step.title}</h1>
              <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-light">
                {step.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Controls */}
        <div className="p-6 lg:px-12 pb-12 flex justify-between items-center z-10">
          <div className="text-sm font-mono text-muted-foreground">
            {String(currentStep + 1).padStart(2, '0')} / {String(demoSteps.length).padStart(2, '0')}
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/10 hover:bg-white/5 rounded-full px-8 h-14"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={20} className="mr-2" /> Previous
            </Button>
            
            {currentStep < demoSteps.length - 1 ? (
              <Button 
                size="lg"
                className="bg-accent text-white hover:bg-accent/90 glow-violet border-none rounded-full px-8 h-14 text-lg"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, demoSteps.length - 1))}
              >
                Next <ChevronRight size={20} className="ml-2" />
              </Button>
            ) : (
              <Button 
                size="lg"
                className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] border-none rounded-full px-8 h-14 text-lg"
                onClick={() => setIsActive(false)}
              >
                End Demo
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
