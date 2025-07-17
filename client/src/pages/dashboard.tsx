
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
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

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
            {/* Custom Tab Navigation */}
            <div className="dashboard-tabs-container mb-6">
              <div className="dashboard-tabs">
                {tabItems.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`dashboard-tab ${activeTab === tab.key ? 'active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {activeTab === 'expense-breakdown' && (
              <ExpenseCharts metrics={metrics} />
            )}
            
            {activeTab === 'vendor-performance' && (
              <div className="bg-white rounded-lg" style={{ minHeight: 400, border: '1px solid #d1d5db' }}>
                <div style={{ padding: '24px 24px 0' }}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Vendor Performance</h3>
                  <p className="text-gray-600 mb-6">Compare performance metrics across vendors</p>
                  
                  {/* Filter tabs and dropdown */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md border">
                        All Vendors
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                        Airlines
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                        Hotels
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                        Transport
                      </button>
                    </div>
                    
                    <Select
                      defaultValue="Performance"
                      style={{ width: 140 }}
                      options={[
                        { value: 'performance', label: 'Performance' },
                        { value: 'cost', label: 'Cost' },
                        { value: 'satisfaction', label: 'Satisfaction' },
                      ]}
                    />
                  </div>
                </div>
                
                {/* Chart area */}
                <div style={{ padding: '0 24px 24px' }}>
                  <div style={{ height: 350, position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'AirCorp', efficiency: 85, satisfaction: 75 },
                          { name: 'TravelEase', efficiency: 92, satisfaction: 68 },
                          { name: 'GlobalStay', efficiency: 78, satisfaction: 85 },
                          { name: 'RideShare', efficiency: 88, satisfaction: 70 }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tickFormatter={(value) => `${value}%`}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                        />
                        <Bar
                          dataKey="efficiency"
                          fill="#4F46E5"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={60}
                        />
                        <Bar
                          dataKey="satisfaction"
                          fill="#EC4899"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={60}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    
                    {/* Legend */}
                    <div style={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 30,
                      display: 'flex',
                      gap: 20
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                          width: 12,
                          height: 12,
                          backgroundColor: '#4F46E5',
                          borderRadius: 2
                        }}></div>
                        <span style={{ fontSize: 12, color: '#6b7280' }}>Cost Efficiency</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                          width: 12,
                          height: 12,
                          backgroundColor: '#EC4899',
                          borderRadius: 2
                        }}></div>
                        <span style={{ fontSize: 12, color: '#6b7280' }}>Satisfaction</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'compliance' && (
              <div className="bg-white rounded-lg p-8 text-center" style={{ minHeight: 400 }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance</h3>
                <p className="text-gray-600">Compliance metrics coming soon...</p>
              </div>
            )}
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
