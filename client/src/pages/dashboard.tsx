
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

// Vendor Performance Tab Component
function VendorPerformanceTab() {
  const [selectedVendorTab, setSelectedVendorTab] = useState('all-vendors');
  
  const vendorTabs = [
    { key: 'all-vendors', label: 'All Vendors' },
    { key: 'airlines', label: 'Airlines' },
    { key: 'hotels', label: 'Hotels' },
    { key: 'transport', label: 'Transport' },
  ];

  const getChartData = (vendorType: string) => {
    const data = {
      'all-vendors': [
        { name: 'AirCorp', efficiency: 85, satisfaction: 75 },
        { name: 'TravelEase', efficiency: 92, satisfaction: 68 },
        { name: 'GlobalStay', efficiency: 78, satisfaction: 85 },
        { name: 'RideShare', efficiency: 88, satisfaction: 70 }
      ],
      'airlines': [
        { name: 'AirCorp', efficiency: 85, satisfaction: 75 },
        { name: 'SkyJet', efficiency: 90, satisfaction: 72 },
        { name: 'GlobalAir', efficiency: 82, satisfaction: 78 }
      ],
      'hotels': [
        { name: 'GlobalStay', efficiency: 78, satisfaction: 85 },
        { name: 'HotelPlus', efficiency: 88, satisfaction: 82 },
        { name: 'ComfortInn', efficiency: 75, satisfaction: 80 }
      ],
      'transport': [
        { name: 'RideShare', efficiency: 88, satisfaction: 70 },
        { name: 'CabCorp', efficiency: 85, satisfaction: 75 },
        { name: 'TransportEase', efficiency: 80, satisfaction: 72 }
      ]
    };
    return data[vendorType as keyof typeof data] || data['all-vendors'];
  };

  return (
    <div className="bg-white rounded-lg" style={{ minHeight: 400, border: '1px solid #d1d5db' }}>
      <div style={{ padding: '24px 24px 0' }}>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Vendor Performance</h3>
        <p className="text-gray-600 mb-6">Compare performance metrics across vendors</p>
        
        {/* Filter tabs and dropdown */}
        <div className="flex items-center justify-between mb-6">
          <div 
            className="vendor-tabs-container"
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              gap: '2px'
            }}
          >
            {vendorTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedVendorTab(tab.key)}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: selectedVendorTab === tab.key ? '500' : '400',
                  color: selectedVendorTab === tab.key ? '#374151' : '#6b7280',
                  backgroundColor: selectedVendorTab === tab.key ? '#fff' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedVendorTab === tab.key ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedVendorTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedVendorTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
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
              data={getChartData(selectedVendorTab)}
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
        
        {/* Vendor Performance Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(225px, 1fr))', 
          gap: 16, 
          marginTop: 24 
        }}>
          {getChartData(selectedVendorTab).map((vendor, index) => {
            // Determine performance categories
            const getPerformanceCategory = (efficiency: number, satisfaction: number) => {
              if (efficiency >= 90 && satisfaction >= 85) return { title: 'Top Performer', color: '#10b981' };
              if (efficiency >= 85 && satisfaction >= 80) return { title: 'Most Cost-Effective', color: '#3b82f6' };
              if (satisfaction >= 80) return { title: 'Highest Satisfaction', color: '#8b5cf6' };
              return { title: 'Needs Improvement', color: '#ef4444' };
            };
            
            const category = getPerformanceCategory(vendor.efficiency, vendor.satisfaction);
            
            return (
              <div
                key={vendor.name}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  <div style={{
                    fontSize: 12,
                    color: '#6b7280',
                    fontWeight: 500,
                    marginBottom: 4
                  }}>
                    {category.title}
                  </div>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#1f2937'
                  }}>
                    {vendor.name}
                  </div>
                </div>
                
                <div style={{ marginBottom: 8 }}>
                  <div style={{
                    fontSize: 12,
                    color: '#6b7280',
                    marginBottom: 4
                  }}>
                    Cost Efficiency
                  </div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: category.color
                  }}>
                    {vendor.efficiency}%
                  </div>
                </div>
                
                <div>
                  <div style={{
                    fontSize: 12,
                    color: '#6b7280',
                    marginBottom: 4
                  }}>
                    Satisfaction Rate
                  </div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: category.color
                  }}>
                    {vendor.satisfaction}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
              <VendorPerformanceTab />
            )}
                
                
            
            {activeTab === 'compliance' && (
              <div className="bg-white rounded-lg" style={{ minHeight: 400, border: '1px solid #d1d5db' }}>
                <div style={{ padding: '24px' }}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Compliance Overview</h3>
                  <p className="text-gray-600 mb-6">Monitor policy compliance across departments</p>
                  
                  {/* Compliance Metrics Cards */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: 24,
                    marginBottom: 32
                  }}>
                    {/* Overall Compliance Card */}
                    <div style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '24px',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{
                          fontSize: 14,
                          color: '#6b7280',
                          fontWeight: 500,
                          marginBottom: 8
                        }}>
                          Overall Compliance
                        </div>
                        <div style={{
                          fontSize: 32,
                          fontWeight: 600,
                          color: '#10b981',
                          marginBottom: 12
                        }}>
                          87%
                        </div>
                        {/* Progress bar */}
                        <div style={{
                          width: '100%',
                          height: 8,
                          backgroundColor: '#f3f4f6',
                          borderRadius: 4,
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: '87%',
                            height: '100%',
                            backgroundColor: '#10b981',
                            borderRadius: 4
                          }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Policy Violations Card */}
                    <div style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '24px',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{
                          fontSize: 14,
                          color: '#6b7280',
                          fontWeight: 500,
                          marginBottom: 8
                        }}>
                          Policy Violations
                        </div>
                        <div style={{
                          fontSize: 32,
                          fontWeight: 600,
                          color: '#ef4444',
                          marginBottom: 8
                        }}>
                          143
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{
                            fontSize: 14,
                            color: '#10b981',
                            fontWeight: 500
                          }}>
                            ↓ -12%
                          </span>
                          <span style={{
                            fontSize: 12,
                            color: '#6b7280'
                          }}>
                            from previous period
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pending Approvals Card */}
                    <div style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '24px',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{
                          fontSize: 14,
                          color: '#6b7280',
                          fontWeight: 500,
                          marginBottom: 8
                        }}>
                          Pending Approvals
                        </div>
                        <div style={{
                          fontSize: 32,
                          fontWeight: 600,
                          color: '#1f2937',
                          marginBottom: 8
                        }}>
                          27
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{
                            fontSize: 14,
                            color: '#ef4444',
                            fontWeight: 500
                          }}>
                            ↑ +8%
                          </span>
                          <span style={{
                            fontSize: 12,
                            color: '#6b7280'
                          }}>
                            from previous period
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-8 mt-8">
            <div className="col-span-2">
              <TopExpenses expenses={metrics?.topExpenses || []} />
            </div>
            {/* <div className="col-span-1">
              <AlertsInsights />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
