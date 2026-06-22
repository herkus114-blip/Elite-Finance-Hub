import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Layers, 
  Brain, 
  TrendingUp, 
  Globe2, 
  Landmark, 
  ArrowLeftRight, 
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { icon: LayoutDashboard, label: "Command Center", path: "/" },
  { icon: Layers, label: "RWA Assets", path: "/assets" },
  { icon: Brain, label: "AI Intelligence", path: "/ai" },
  { icon: TrendingUp, label: "Treasury", path: "/treasury" },
  { icon: Globe2, label: "Settlement Network", path: "/settlement", isLive: true },
  { icon: Landmark, label: "Deposit Network", path: "/deposits" },
  { icon: ArrowLeftRight, label: "FX Gateway", path: "/gateway" },
];

export function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-full bg-sidebar border-r border-sidebar-border flex flex-col z-20 flex-shrink-0"
    >
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border justify-between">
        <AnimatePresence mode="popLayout">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 overflow-hidden"
            >
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20 glow-cyan">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12L12 2L22 12L12 22L2 12Z" stroke="currentColor" strokeWidth="2" className="text-primary"/>
                  <circle cx="12" cy="12" r="4" fill="currentColor" className="text-primary"/>
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight gradient-text">ESN</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto"
            >
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20 glow-cyan">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12L12 2L22 12L12 22L2 12Z" stroke="currentColor" strokeWidth="2" className="text-primary"/>
                  <circle cx="12" cy="12" r="4" fill="currentColor" className="text-primary"/>
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 group relative
                  ${isActive 
                    ? "bg-primary/10 text-primary font-medium border border-primary/20 glow-cyan" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border border-transparent"}
                `}
                title={collapsed ? item.label : undefined}
              >
                {isActive && !collapsed && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-full bg-primary rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                
                <item.icon size={20} className={`flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"}`} />
                
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex-1 whitespace-nowrap flex items-center justify-between overflow-hidden"
                    >
                      <span className="text-sm">{item.label}</span>
                      {item.isLive && (
                        <div className="flex items-center gap-1.5 bg-destructive/10 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-destructive border border-destructive/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-glow" />
                          LIVE
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}

        <div className="mt-8 mb-2 px-3">
          <div className="h-px w-full bg-sidebar-border" />
        </div>

        <Link href="/demo">
          <div
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 group
              ${location === "/demo"
                ? "bg-accent/10 text-accent font-medium border border-accent/20 glow-violet" 
                : "text-muted-foreground hover:bg-accent/10 hover:text-accent border border-transparent"}
            `}
            title={collapsed ? "Investor Demo" : undefined}
          >
            <PlayCircle size={20} className={`flex-shrink-0 ${location === "/demo" ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm whitespace-nowrap overflow-hidden"
                >
                  Investor Demo
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>
      </div>

      <div className="p-4 border-t border-sidebar-border flex flex-col gap-4 bg-sidebar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden"
                >
                  Network Active
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded border border-border"
              >
                v4.2.0
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-sidebar-accent"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
