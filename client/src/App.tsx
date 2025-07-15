import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import VendorComparison from "@/pages/vendor-comparison";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/vendor-comparison" component={VendorComparison} />
        <Route component={NotFound} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;