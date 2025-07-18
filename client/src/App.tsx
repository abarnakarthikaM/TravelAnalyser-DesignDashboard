
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import VendorComparison from "@/pages/vendor-comparison";
import SpendingTrends from "@/pages/spending-trends";
import TopSpenders from "@/pages/top-spenders";
import ComplianceMetrics from "@/pages/compliance-metrics";
import AIInsights from "@/pages/ai-insights";
import Transactions from "@/pages/transactions";
import Settings from "@/pages/settings";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vendor-comparison" element={<VendorComparison />} />
          <Route path="/spending-trends" element={<SpendingTrends />} />
          <Route path="/top-spenders" element={<TopSpenders />} />
          <Route path="/compliance-metrics" element={<ComplianceMetrics />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
