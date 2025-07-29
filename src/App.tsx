import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";
import VendorComparison from "./pages/vendor-comparison";
import SpendingTrends from "./pages/spending-trends";
import TopSpenders from "./pages/top-spenders";
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import ComplianceMetrics from "./pages/compliance-metrics";
import AIInsights from "./pages/ai-insights";
import Transactions from "./pages/transactions";
import Login from './pages/unAuth/login';
import Settings from "./pages/settings";
import { store } from "./stores/Store";
import { Provider } from "react-redux";
import './index.css';

// const queryClient = new queryClient();

function App() {
  return (
     <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <BrowserRouter> */}
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/top-spenders" element={<ProtectedRoute><TopSpenders /></ProtectedRoute>} />
            <Route path="/spending-trends" element={<ProtectedRoute><SpendingTrends /></ProtectedRoute>} />
            <Route path="/vendor-comparison" element={<ProtectedRoute><VendorComparison /></ProtectedRoute>} />
            <Route path="/compliance-metrics" element={<ProtectedRoute><ComplianceMetrics /></ProtectedRoute>} />
            <Route path="/ai-insights" element={<ProtectedRoute><AIInsights /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
        {/* </BrowserRouter> */}
      </QueryClientProvider>
      </Provider>
  );
}

export default App;
