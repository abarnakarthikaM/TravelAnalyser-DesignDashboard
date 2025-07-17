
import { useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ExpenseCharts } from "@/components/dashboard/expense-charts";
import { TopExpenses } from "@/components/dashboard/top-expenses";
import { AlertsInsights } from "@/components/dashboard/alerts-insights";
import { DatePicker, Select, Space, Tabs } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useState } from "react";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('expense-breakdown');
  
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  const tabItems = [
    {
      key: 'expense-breakdown',
      label: 'Expense Breakdown',
    },
    {
      key: 'vendor-performance',
      label: 'Vendor Performance',
    },
    {
      key: 'compliance',
      label: 'Compliance',
    },
  ];

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
            <Space size="middle">
              <RangePicker
                suffixIcon={<CalendarOutlined />}
                defaultValue={[
                  // Using moment is deprecated, but for demo purposes
                  null, null
                ]}
                placeholder={['Jan 01, 2023', 'Jan 27, 2023']}
                style={{ width: 240 }}
              />
              
              <Select
                defaultValue="All Vendors"
                style={{ width: 140 }}
              >
                <Option value="all">All Vendors</Option>
                <Option value="airlines">Airlines</Option>
                <Option value="hotels">Hotels</Option>
              </Select>
              
              <Button className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </Space>
          </div>
        </header>

        <main className="p-8">
          <MetricsCards metrics={metrics} />
          
          <div className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                size="large"
                style={{ 
                  marginBottom: 24,
                  '--ant-primary-color': '#0a2559'
                }}
                className="custom-tabs"
              />
              
              {activeTab === 'expense-breakdown' && (
                <ExpenseCharts metrics={metrics} />
              )}
              
              {activeTab === 'vendor-performance' && (
                <div className="bg-white rounded-lg p-8 text-center" style={{ minHeight: 400 }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Performance</h3>
                  <p className="text-gray-600">Vendor performance metrics coming soon...</p>
                </div>
              )}
              
              {activeTab === 'compliance' && (
                <div className="bg-white rounded-lg p-8 text-center" style={{ minHeight: 400 }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance</h3>
                  <p className="text-gray-600">Compliance metrics coming soon...</p>
                </div>
              )}
            </div>
          </div>
          
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
