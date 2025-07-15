import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ExpenseCharts } from "@/components/dashboard/expense-charts";
import { TopExpenses } from "@/components/dashboard/top-expenses";
import { AlertsInsights } from "@/components/dashboard/alerts-insights";
import { Button } from "@/components/ui/button";
import { Filter, Calendar } from "lucide-react";

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Travel Expense Dashboard</h2>
              <p className="text-sm text-gray-500">Monitor and analyze your corporate travel expenses across all vendors</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Jan 01, 2023 - Jul 15, 2025</span>
              </div>
              <Button variant="default" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Vendors</option>
                <option>AirCorp</option>
                <option>GlobalStay</option>
                <option>RideShare</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <MetricsCards metrics={metrics} />
          <ExpenseCharts metrics={metrics} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <TopExpenses expenses={metrics?.topExpenses || []} />
            <AlertsInsights />
          </div>
        </main>
      </div>
    </div>
  );
}
