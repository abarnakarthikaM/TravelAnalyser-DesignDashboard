
import { useQuery } from "@tanstack/react-query";
import { Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ExpenseCharts } from "@/components/dashboard/expense-charts";
import { TopExpenses } from "@/components/dashboard/top-expenses";
import { AlertsInsights } from "@/components/dashboard/alerts-insights";

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="ml-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 m-0">
              Travel Expense Dashboard
            </h2>
            <p className="text-gray-600">
              Monitor and analyze your corporate travel expenses across all vendors
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Jan 01, 2023 - Jul 15, 2025</span>
            </div>
            
            <Button className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </header>

        <main className="p-8">
          <MetricsCards metrics={metrics} />
          <ExpenseCharts metrics={metrics} />
          
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="col-span-2">
              <TopExpenses expenses={metrics?.topExpenses || []} />
            </div>
            <div className="col-span-1">
              <AlertsInsights />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
