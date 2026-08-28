import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";

import { MainLayout } from "@/components/layout/MainLayout";

import NotFound from "@/pages/not-found";
import { Dashboard } from "@/pages/Dashboard";
import { Assets } from "@/pages/Assets";
import { AiIntelligence } from "@/pages/AiIntelligence";
import { Treasury } from "@/pages/Treasury";
import { SettlementNetwork } from "@/pages/SettlementNetwork";
import { Deposits } from "@/pages/Deposits";
import { Gateway } from "@/pages/Gateway";
import { InvestorDemo } from "@/pages/InvestorDemo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const DEMO_PASSWORD = "ESN-SUPER-APP-V4.2.0";
const ACCESS_STORAGE_KEY = "esn_demo_access_v4_2_0";

function AccessGate({ onAccess }: { onAccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAccess = () => {
    if (password === DEMO_PASSWORD) {
      sessionStorage.setItem(ACCESS_STORAGE_KEY, "granted");
      onAccess();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAccess();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#020817",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "#071326",
          border: "1px solid #18365a",
          borderRadius: "22px",
          padding: "46px 50px",
          boxSizing: "border-box",
          boxShadow:
            "0 0 0 1px rgba(14,165,233,0.04), 0 20px 60px rgba(0,0,0,0.45)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: "0 0 22px 0",
              color: "#f8fafc",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              letterSpacing: "-1px",
              lineHeight: 1.15,
            }}
          >
            EIDB Elite Settlement Network Demo Access
          </h1>

          <p
            style={{
              margin: "0 auto 30px auto",
              maxWidth: "430px",
              color: "#94a3b8",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: 1.45,
            }}
          >
            Enter the password to access the demo
          </p>

          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="Password"
            autoComplete="off"
            style={{
              width: "100%",
              height: "68px",
              boxSizing: "border-box",
              padding: "0 20px",
              borderRadius: "12px",
              border: "2px solid #263b5a",
              outline: "none",
              background: "#020817",
              color: "#f8fafc",
              fontSize: "20px",
              fontWeight: 400,
              fontFamily: "inherit",
            }}
          />

          {error && (
            <div
              style={{
                marginTop: "12px",
                color: "#f87171",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleAccess}
            style={{
              width: "100%",
              height: "68px",
              marginTop: "22px",
              border: "none",
              borderRadius: "12px",
              background: "#12b5d0",
              color: "#00131b",
              fontSize: "20px",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: "0 7px 24px rgba(18,181,208,0.18)",
            }}
          >
            Access Demo
          </button>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/assets" component={Assets} />
        <Route path="/ai" component={AiIntelligence} />
        <Route path="/treasury" component={Treasury} />
        <Route path="/settlement" component={SettlementNetwork} />
        <Route path="/deposits" component={Deposits} />
        <Route path="/gateway" component={Gateway} />
        <Route path="/demo" component={InvestorDemo} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  const [hasAccess, setHasAccess] = useState(() => {
    return sessionStorage.getItem(ACCESS_STORAGE_KEY) === "granted";
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="esn-theme">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            {hasAccess ? (
              <Router />
            ) : (
              <AccessGate onAccess={() => setHasAccess(true)} />
            )}
          </WouterRouter>

          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
