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
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="esn-theme">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
