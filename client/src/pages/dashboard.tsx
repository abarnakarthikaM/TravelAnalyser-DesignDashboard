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
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useLazyGetDashboardOverviewQuery } from "@/services/dashboard/dashboard";
import { formatDate } from "@/utils/dateFunctions";
const tabItems = [
    {
      key: "expense-breakdown",
      label: "Expense Breakdown",
    },
    {
      key: "vendor-performance",
      label: "Vendor Performance",
    },
    {
      key: "compliance",
      label: "Compliance",
    },
  ];



const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("expense-breakdown");
  const [resDashboardOverviewData_S, setResDashboardOverviewData_S] = useState<any>();
  const [resCommonTabResponse_S,setCommonTabResponse_S] = useState<any>([]);
  const [resDatpickerValues, setDatpickerValues] = useState<any>(["2025-06-01",
    "2025-07-31"]);
  const [dateFilter, setDateFilter] = useState("today");
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<any>([]);
  const [selectedVendorTab, setSelectedVendorTab] = useState("all-vendors");
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  const [reqDashboardOverview, resDashboardOverview] = useLazyGetDashboardOverviewQuery();
  const [reqExpenseBreakdown, resExpenseBreakdown] = useLazyGetDashboardOverviewQuery();
   let vendorHighlights:any;
  /********
   * request service call for Expense card and Top Expenses  service call
   */
  useEffect(() => {
    if(resDatpickerValues.length===2){
    let reqData:any={
      data: {
        start_date: resDatpickerValues[0],
        end_date: resDatpickerValues[1],
      },
      url:'dashboard/overview/'
    }
     reqDashboardOverview({ RequestDataFormat: reqData }) ;
    }
  }, [resDatpickerValues]);
 /********
   *get response for Expense card and Top Expenses  service call
   */

  useEffect(() => {
    if(resDashboardOverview?.isSuccess && resDashboardOverview?.data){
      setResDashboardOverviewData_S(resDashboardOverview.data)
    }
    if(resExpenseBreakdown?.isSuccess && resExpenseBreakdown?.data){
      setCommonTabResponse_S(resExpenseBreakdown)
    }
  }, [resDashboardOverview,resExpenseBreakdown])
   console.log(resCommonTabResponse_S)
  /*******
   * service call for Expense Breakdown charts when ever we change the date picker value,outer tab value
   */
  useEffect(()=>{
    console.log(activeTab)
    const urlvalue = (activeTab==='vendor-performance') ? "dashboard/vendors_performance/"
                      : (activeTab==='compliance') ? "dashboard/compliance/"
                      : "dashboard/expense_breakdown/";
     let reqData:any={
      data: {
        start_date: resDatpickerValues[0],
        end_date: resDatpickerValues[1],
      },
      url:urlvalue
    }
    if(activeTab=='vendor-performance' && selectedVendorTab !='all-vendors'){
      reqData.data.travel_type=selectedVendorTab
    }
    reqExpenseBreakdown({ RequestDataFormat: reqData });
  },[resDatpickerValues,activeTab,selectedVendorTab])

  const getChartData = (vendorType: string) => {
    let vendorResData:any=[];
    console.log(resCommonTabResponse_S)
    if(resCommonTabResponse_S.data.data.vendor_performance!=undefined){
        console.log(vendorType)
        console.log(resCommonTabResponse_S)
        
        vendorResData= resCommonTabResponse_S?.data?.data?.vendor_performance?.chart_data

        console.log(vendorResData)
        
    }
    return vendorResData
  };
/***********
 * Des:this function call's when change the date picker option
 */
  const handleDateFilterChange = (value: any) => {
      setDateFilter(value);
    if (value === "date-range") {
      setOpen(true);
      setDateFilter(value);
    } else {
      setDateRange([]);
      setOpen(false);
    }
  };
/******
 * Des:this function hanndles the date range picker value changes
 */
  const handleDateRangeChange = (dates: any, dateStrings: [any,any]) => {
     setDateFilter("date-range");
    setDateRange(dates);
    setOpen(false);
    if (dates && dates.length === 2) {
      if (dateFilter === "date-range" && dateStrings && dateStrings.length === 2) {
        setDatpickerValues(dateStrings);
      }
      setDateFilter(formatDate(dateStrings[0]) +' - '+ formatDate(dateStrings[1]));
    }
  };

 
  const getVendorPerformancedata=((type:string)=>{
    console.log(resCommonTabResponse_S)
  })
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
              Monitor and analyze your corporate travel expenses across all
              vendors
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Space size="middle">
              <Select
                value={dateFilter}
                style={{ width: 215 }}
                onChange={handleDateFilterChange}
              >
                <Option value="today">Today</Option>
                <Option value="yesterday">Yesterday</Option>
                <Option value="this-month">This Month</Option>
                <Option value="last-month">Last Month</Option>
                <Option value="date-range">Date Range</Option>
              </Select>

              <DatePicker.RangePicker
                open={open}
                value={dateRange}
                onChange={handleDateRangeChange}
                onOpenChange={(status) => setOpen(status)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />

              <Select defaultValue="All Vendors" style={{ width: 140 }}>
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
          {/* dashboard cards view starts */}
          {resDashboardOverviewData_S?.data?.expense?.length && <MetricsCards metrics={resDashboardOverviewData_S?.data?.expense} />}

          {/* dashboard cards view starts */}

          <div className="mb-8">
            {/* Custom Tab Navigation */}
            <div className="dashboard-tabs-container mb-6">
              <div className="dashboard-tabs">
                {tabItems.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`dashboard-tab ${activeTab === tab.key ? "active" : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "expense-breakdown" && (
              <>
              {resCommonTabResponse_S?.data?.data?.expense_breakdown &&  <ExpenseCharts metrics={resCommonTabResponse_S?.data?.data} />}
              </>
             
            )}

            {/* { <VendorPerformanceTab  />} */}
            {(activeTab === "vendor-performance" ) && <VendorPerformanceTab  />}
            
            {(activeTab === "compliance" && resCommonTabResponse_S.data?.data?.compliance !=undefined) && (
              <div
                className="bg-white rounded-lg"
                style={{ minHeight: 400, border: "1px solid #d1d5db" }}
              >
                <div style={{ padding: "24px" }}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Compliance Overview
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Monitor policy compliance across departments
                  </p>

                  {/* Compliance Metrics Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: 24,
                      marginBottom: 32,
                    }}
                  >
                    {/* Overall Compliance Card */}
                    <div
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "24px",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#6b7280",
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Overall Compliance
                        </div>
                        <div
                          style={{
                            fontSize: 32,
                            fontWeight: 600,
                            color: "#10b981",
                            marginBottom: 12,
                          }}
                        >
                        {resCommonTabResponse_S.data?.data?.compliance?.overall_compliance.value}
                        </div>
                        {/* Progress bar */}
                        <div
                          style={{
                            width: "100%",
                            height: 8,
                            backgroundColor: "#f3f4f6",
                            borderRadius: 4,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: resCommonTabResponse_S.data?.data?.compliance?.overall_compliance.value,
                              height: "100%",
                              backgroundColor: "#10b981",
                              borderRadius: 4,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Policy Violations Card */}
                    <div
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "24px",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#6b7280",
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Policy Violations
                        </div>
                        <div
                          style={{
                            fontSize: 32,
                            fontWeight: 600,
                            color: "#ef4444",
                            marginBottom: 8,
                          }}
                        >
                           {resCommonTabResponse_S.data?.data?.compliance?.policy_violations.count}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              color: "#10b981",
                              fontWeight: 500,
                            }}
                          >
                            ↓{resCommonTabResponse_S.data?.data?.compliance?.policy_violations.trend}

                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "#6b7280",
                            }}
                          >
                            from previous period
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pending Approvals Card */}
                    <div
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "24px",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#6b7280",
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Late Approvals
                        </div>
                        <div
                          style={{
                            fontSize: 32,
                            fontWeight: 600,
                            color: "#1f2937",
                            marginBottom: 8,
                          }}
                        >
                          {resCommonTabResponse_S.data?.data?.compliance?.late_approvals.count}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              color: "#ef4444",
                              fontWeight: 500,
                            }}
                          >
                            ↑ {resCommonTabResponse_S.data?.data?.compliance?.late_approvals.trend}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "#6b7280",
                            }}
                          >
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
              {(resDashboardOverviewData_S?.data?.top_expenses?.length && resDashboardOverviewData_S?.data?.top_expenses !=undefined) && <TopExpenses expenses={resDashboardOverviewData_S?.data?.top_expenses} />}
            </div>
            {/* <div className="col-span-1">
              <AlertsInsights />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
  
 function VendorPerformanceTab() {
 console.log(resCommonTabResponse_S)
    vendorHighlights=resCommonTabResponse_S?.data?.data?.vendor_performance?.highlights;
    console.log(vendorHighlights)
   const vendorTabs = [
    { key: "all-modes", label: "All modes" ,id: "all-modes"},
    { key: "airline", label: "Airlines", id: "airlines"},
    { key: "hotels", label: "Hotels", id: "hotels"},
    { key: "ground", label: "Ground", id: "ground",},
  ];
 
  console.log(vendorTabs)


  return (
    <div
      className="bg-white rounded-lg"
      style={{ minHeight: 400, border: "1px solid #d1d5db" }}
    >
      <div style={{ padding: "24px 24px 0" }}>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Vendor Performance
        </h3>
        <p className="text-gray-600 mb-6">
          Compare performance metrics across vendors
        </p>

        {/* Filter tabs and dropdown */}
        <div className="flex items-center justify-between mb-6">
          <div
            className="vendor-tabs-container"
            style={{
              backgroundColor: "#f5f5f5",
              padding: "4px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              display: "flex",
              gap: "2px",
            }}
          >
            {vendorTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedVendorTab(tab.key)}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: selectedVendorTab === tab.key ? "500" : "400",
                  color: selectedVendorTab === tab.key ? "#374151" : "#6b7280",
                  backgroundColor:
                    selectedVendorTab === tab.id ? "#fff" : "transparent",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow:
                    selectedVendorTab === tab.key
                      ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (selectedVendorTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedVendorTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = "transparent";
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
              { value: "performance", label: "Performance" },
              { value: "cost_efficiency", label: "Cost" },
              { value: "customer_satisfaction", label: "Satisfaction" },
            ]}
          />
        </div>
      </div>

      {/* Chart area */}
      <div style={{ padding: "0 24px 24px" }}>
        <div style={{ height: 350, position: "relative" ,border:"1px solid #ccc",borderRadius:"8px"}}>
            {getChartData(selectedVendorTab).length > 0 ?
              <ResponsiveContainer width="100%" height="100%" >
                <BarChart
                  data={getChartData(selectedVendorTab)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="vendor"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <Bar
                    dataKey="cost_efficiency"
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={60}
                  />
                  <Bar
                    dataKey="customer_satisfaction"
                    fill="#EC4899"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
              :<>No data Found</>

              }
          {/* Legend */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 30,
              display: "flex",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: "#4F46E5",
                  borderRadius: 2,
                }}
              ></div>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Cost Efficiency
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: "#EC4899",
                  borderRadius: 2,
                }}
              ></div>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Satisfaction
              </span>
            </div>
          </div>
        </div>

        {/* Vendor Performance Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(225px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
            {vendorHighlights?.map((vendor:any, index:any) => {
              // Determine performance categories
              const getPerformanceCategory = (
                cost_efficiency: number,
                customer_satisfaction: number,
              ) => {
                if (cost_efficiency >= 90 && customer_satisfaction >= 85)
                  return { title: "Top Performer", color: "#10b981" };
                if (cost_efficiency >= 85 && customer_satisfaction >= 80)
                  return { title: "Most Cost-Effective", color: "#3b82f6" };
                if (customer_satisfaction >= 80)
                  return { title: "Highest Satisfaction", color: "#8b5cf6" };
                return { title: "Needs Improvement", color: "#ef4444" };
              };
              return (
                <div
                  key={vendor.vendor}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "14px 10px 10px",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      {vendor.name}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#1f2937",
                      }}
                    >
                      {vendor.vendor}
                    </div>
                  </div>

                  <div>
                    
                    <div
                      style={{
                        fontSize: 16,
                        // color: category.color,
                      }}
                    >
                      {vendor.score}  {vendor.metric}
                      
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
}
