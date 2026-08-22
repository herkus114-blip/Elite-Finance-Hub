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

const DEMO_PASSWORD = "ESN-SUPER-APP";

function AccessGate({ onAccess }: { onAccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAccess = () => {
    if (password === DEMO_PASSWORD) {
      sessionStorage.setItem("esn_demo_access", "granted");
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
          maxWidth: "710px",
          background: "#071326",
          border: "1px solid #18365a",
          borderRadius: "28px",
          padding: "72px 78px",
          boxSizing: "border-box",
          boxShadow:
            "0 0 0 1px rgba(14,165,233,0.04), 0 25px 80px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: "0 0 30px 0",
              color: "#f8fafc",
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 400,
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
            }}
          >
            ESN Network Demo
          </h1>

          <p
            style={{
              margin: "0 auto 42px auto",
              maxWidth: "540px",
              color: "#94a3b8",
              fontSize: "clamp(19px, 2.5vw, 26px)",
              fontWeight: 400,
              lineHeight: 1.55,
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
              height: "104px",
              boxSizing: "border-box",
              padding: "0 28px",
              borderRadius: "16px",
              border: "2px solid #263b5a",
              outline: "none",
              background: "#020817",
              color: "#f8fafc",
              fontSize: "28px",
              fontWeight: 400,
              fontFamily: "inherit",
            }}
          />

          {error && (
            <div
              style={{
                marginTop: "16px",
                color: "#f87171",
                fontSize: "16px",
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
              height: "102px",
              marginTop: "36px",
              border: "none",
              borderRadius: "16px",
              background: "#12b5d0",
              color: "#00131b",
              fontSize: "27px",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(18,181,208,0.18)",
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
    return sessionStorage.getItem("esn_demo_access") === "granted";
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="esn-theme">
        <TooltipProvider>
          <WouterRouter
            base={import.meta.env.BASE_URL.replace(/\/$/, "")}
          >
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
