
import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Row, Col, Progress, Table, Tag, Button, Space, DatePicker, Select, Tabs, Empty } from 'antd';
import { DownloadOutlined, FilterOutlined, CalendarOutlined, InfoCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useLazyGetVendorComparisionQuery } from '@/services/dashboard/dashboard';
import { calculateDateValues, formatDate } from '@/utils/dateFunctions';
import { Filter, Loader } from "lucide-react";
import { Rupees } from '@/components/ui/icons';
import { LoaderCard, RecommendationSkeleton, TableLoader } from '@/components/Loader/Loader';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
export default function VendorComparison() {
  const [selectedTab, setSelectedTab] = useState("Airlines");
  const [selectedTravelMode, setSelectedTravelMode] = useState("airline");
  const [dateFilter, setDateFilter] = useState("today");
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<any>([]);
  const [resDatpickerValues, setDatpickerValues] = useState<any>([]);
  const [resVendorResponse_S, setVendorResponse_S] = useState<any>([]);
  const currency: string = "INR"
  const [tableData, SetTableData] = useState<any>([])
  const [reqVandorComparission, resVendorComparission] = useLazyGetVendorComparisionQuery();
  const [loader, setLoader] = useState<boolean>(true)
  const tabs = [
    { key: "Airlines", label: "Airlines" },
    { key: "Hotels", label: "Hotels" },
    { key: "Ground Transport", label: "Ground Transport" },
  ];

  // Sample data for the metrics cards
  const allMetricsData = [
    {
      category: 'Airlines',
      totalSpent: 567890,
      companies: [
        { name: 'AirCorp', amount: 245670, percentage: 43 },
        { name: 'SkyJet', amount: 198450, percentage: 35 },
        { name: 'GlobalAir', amount: 123770, percentage: 22 }
      ],
      onTimePerformance: { value: 87.5, status: 'excellent' },
      customerSatisfaction: { value: 4.2, max: 5 }
    },
    {
      category: 'Hotels',
      totalSpent: 425300,
      companies: [
        { name: 'GlobalStay', amount: 195200, percentage: 46 },
        { name: 'HotelPlus', amount: 142600, percentage: 34 },
        { name: 'ComfortInn', amount: 87500, percentage: 20 }
      ],
      onTimePerformance: { value: 92.3, status: 'excellent' },
      customerSatisfaction: { value: 4.5, max: 5 }
    },
    {
      category: 'Ground Transport',
      totalSpent: 156780,
      companies: [
        { name: 'RideShare', amount: 78900, percentage: 50 },
        { name: 'CabCorp', amount: 47268, percentage: 30 },
        { name: 'TransportEase', amount: 30612, percentage: 20 }
      ],
      onTimePerformance: { value: 78.4, status: 'average' },
      customerSatisfaction: { value: 4.0, max: 5 }
    }
  ];

  // Filter metrics data based on selected tab
  const metricsData = allMetricsData.filter(metric => metric.category === selectedTab);

  // Table columns for detailed vendor comparison
  const tableColumns = [
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      width: 120,
    },
    {
      title: 'Cost Efficiency',
      dataIndex: 'cost_efficiency',
      key: 'costEfficiency',
      width: 150,
      render: (value: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress percent={value} size="small" showInfo={false} style={{ width: 80 }} />
          <Text>{value}%</Text>
        </div>
      ),
    },
    {
      title: 'On-Time Performance',
      dataIndex: 'on_time_performance',
      key: 'onTimePerformance',
      width: 180,
      render: (value: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress percent={value} size="small" showInfo={false} style={{ width: 80 }} />
          <Text>{value}%</Text>
        </div>
      ),
    },
    {
      title: 'Customer Satisfaction',
      dataIndex: 'customer_satisfaction',
      key: 'customerSatisfaction',
      width: 180,
      render: (value: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress percent={value} size="small" showInfo={false} style={{ width: 80 }} />
          <Text>{value}%</Text>
        </div>
      ),
    },
    {
      title: 'Policy Compliance',
      dataIndex: 'policy_compliance',
      key: 'policyCompliance',
      width: 160,
      render: (value: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress percent={value} size="small" showInfo={false} style={{ width: 80 }} />
          <Text>{value}%</Text>
        </div>
      ),
    },
    {
      title: 'Overall Rating',
      dataIndex: 'overall_rating',
      key: 'overallRating',
      width: 120,
      render: (rating: string) => {
        const color = rating === 'Excellent' ? 'green' : rating === 'Good' ? 'blue' : 'orange';
        return <Tag color={color}>{rating}</Tag>;
      },
    },
  ];
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
     setDatpickerValues(calculateDateValues(value))
      setOpen(false);
    }
  };
  /******
   * Des:this function hanndles the date range picker value changes
   */
  const handleDateRangeChange = (dates: any, dateStrings: [any, any]) => {
    setDateFilter("date-range");
    setDateRange(dates);
    setOpen(false);
    if (dates && dates.length === 2) {
      if (dateFilter === "date-range" && dateStrings && dateStrings.length === 2) {
        setDatpickerValues(dateStrings);
      }
      setDateFilter(formatDate(dateStrings[0]) + ' - ' + formatDate(dateStrings[1]));
    }
  };
  useEffect(() => {
    if(resDatpickerValues.length===0){
      setDatpickerValues(calculateDateValues(dateFilter))
    }
    if (resDatpickerValues.length === 2) {
       let travelType = (selectedTab == 'Airlines') ? 'airline'
      : (selectedTab == 'Hotels') ? 'hotel'
        : (selectedTab == 'Ground Transport') && 'ground'
      let reqData: any = {
        data: {
          start_date: resDatpickerValues[0],
          end_date: resDatpickerValues[1],
          travel_type: travelType
        },
        url: 'vendorcomparison/vendor_comparison/'
      }
      reqVandorComparission({ RequestDataFormat: reqData });
      setLoader(true);
    }
  }, [resDatpickerValues, selectedTab]);
  /********
    *get response for Expense card and Top Expenses  service call
    */

  useEffect(() => {
    setVendorResponse_S(resVendorComparission)
  }, [resVendorComparission])
  console.log(resVendorResponse_S)

  useEffect(() => {
    if (resVendorResponse_S.isSuccess) {
      SetTableData(resVendorResponse_S?.data?.data?.detailed_vendor_comparison);
      setLoader(false);
    }
  }, [resVendorResponse_S])
  // Sample table data based on selected tab

  // AI Recommendations data
  const recommendations = [
    {
      icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
      title: 'Optimize Vendor Mix',
      description: 'Increasing AirCorp bookings by 15% while reducing GlobalAir usage could save approximately $45,000 annually based on current travel patterns and performance metrics.',
      actionText: 'View Detailed Analysis',
      type: 'info' as const,
    },
    {
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      title: 'Contract Renegotiation Opportunity',
      description: "SkyJet's contract is due for renewal in 60 days. Based on current market rates and your usage patterns, you could negotiate a 7-10% reduction in base fares with minimal impact on service quality.",
      actionText: 'View Negotiation Points',
      type: 'success' as const,
    },
    {
      icon: <WarningOutlined style={{ color: '#faad14' }} />,
      title: 'Policy Adjustment Suggestion',
      description: 'Consider implementing a 14-day advance booking policy for non-urgent travel. This could increase on-time performance by 8% and reduce average ticket costs by approximately 12% based on historical booking patterns.',
      actionText: 'Simulate Impact',
      type: 'warning' as const,
    },
  ];

  const renderStars = (rating: number, max: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div style={{ display: 'flex', gap: 2 }}>
        {[...Array(max)].map((_, i) => (
          <span key={i} style={{ color: i < fullStars ? '#faad14' : i === fullStars && hasHalfStar ? '#faad14' : '#d9d9d9' }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />

      <Layout style={{ marginLeft: 256, background: '#f9fafb' }}>
        {/* Header */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>
              Vendor Comparison
            </Title>
            <Text style={{ color: '#8c8c8c' }}>
              Compare performance metrics across all vendors
            </Text>
          </div>
          
         <Space size="middle" className="cls-datefilter-space">
              <Select
                value={dateFilter}
                style={{ width: 215 }}
                onChange={handleDateFilterChange}
              >
                <Option value="today">Today</Option>
                <Option value="yesterday">Yesterday</Option>
                <Option value="this-week">This week</Option>
                <Option value="last-week">Last week</Option>
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
            </Space>
        </div>

        {/* Tab Navigation */}
        <div style={{
          background: '#00000000',
          padding: '0 32px',
        }}>
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "4px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              display: "inline-flex",
              gap: "2px",
              width: "50%",
              marginTop: "10px"
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: selectedTab === tab.key ? "500" : "400",
                  color: selectedTab === tab.key ? "#fff" : "#6b7280",
                  backgroundColor: selectedTab === tab.key ? "#0c265a" : "transparent",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: selectedTab === tab.key ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none",
                  width: "33%"
                }}
                onMouseEnter={(e) => {
                  if (selectedTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <Content style={{ padding: '32px' }}>
          {/* Top Metrics Cards */}
          {resVendorComparission.isSuccess && metricsData.length > 0 && !loader ?
            (<Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
              {metricsData.map((metric, index) => (
                <Col xs={24} lg={24} key={index}>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} lg={8} style={{ height:resVendorResponse_S?.data?.data?.summary_card?.per_vendor.length>0?'305px':"auto" }}>

                      <Card style={{ height: '100%' }}>
                        <Title level={4} style={{ marginBottom: 6 }}>
                          Total Spend
                        </Title>

                        <div style={{ marginBottom: 24 }}>
                          <Title level={4} style={{ margin: 0 }}>
                            <Rupees className='inline-block' height={"25px"} width={"25px"} />{resVendorResponse_S?.data?.data?.summary_card.total_spend}
                          </Title>
                        </div>

                        {resVendorResponse_S?.data?.data?.summary_card?.per_vendor.map((company: any, idx: any) => (
                          <div style={{ marginBottom: 16 }}>

                            <div key={idx} style={{ marginBottom: 8 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <Text style={{ fontSize: 12 }}>{company.vendor}</Text>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <Text style={{ fontSize: 12 }}>{company.on_time_performance}%</Text>
                                  <Tag 
                                    color={(company.on_time_performance > 90) ? 'green' : (company.on_time_performance > 60) ? 'orange' : 'red'}
                                    style={{ fontSize: 10, padding: '2px 6px' }}
                                  >
                                    {company.on_time_performance_status}
                                  </Tag>
                                </div>                              </div>
                              <Progress
                                percent={company.spend_percentage}
                                size="small"
                                showInfo={false}
                                strokeColor={company.spend_percentage >= 85 ? '#52c41a'
                                  : company.spend_percentage >= 65 ? '#722ed1'
                                    : '#1890ff'}

                              //  strokeColor={company.spend_percentage >= 85 ? '#1890ff' : idx === 1 ? '#722ed1' : '#52c41a'}
                              />
                            </div>
                          </div>

                        ))}
                      </Card>
                    </Col>


                    <Col xs={24} lg={8} style={{ height:resVendorResponse_S?.data?.data?.summary_card?.per_vendor.length>0?'305px':"auto" }}>
                      <Card style={{ height: '100%' }}>
                        <Title level={4} style={{ marginBottom: 6 }}>
                          On-Time Performance
                        </Title>

                        <div style={{ marginBottom: 24 }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {resVendorResponse_S?.data?.data?.summary_card?.overall_on_time_performance &&resVendorResponse_S?.data?.data?.summary_card?.overall_on_time_performance!==null?resVendorResponse_S?.data?.data?.summary_card?.overall_on_time_performance:'0'}%
                          </Title>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                          {resVendorResponse_S?.data?.data?.summary_card?.per_vendor.map((company: any, idx: any) => {
                            const performanceValues = selectedTab === 'Airlines' ? [92.3, 85.7, 78.4] :
                              selectedTab === 'Hotels' ? [95.1, 88.2, 82.4] :
                                [85.2, 80.1, 75.3];
                            const performanceLabels = selectedTab === 'Airlines' ? ['Excellent', 'Average', 'Poor'] :
                              selectedTab === 'Hotels' ? ['Excellent', 'Good', 'Average'] :
                                ['Good', 'Average', 'Poor'];
                            return (
                              <div key={idx} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                  <Text style={{ fontSize: 12 }}>{company.vendor}</Text>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Text style={{ fontSize: 12 }}>{company.on_time_performance}%</Text>
                                    <Tag
                                      color={(company.on_time_performance_status > 90) ? 'green' : (company.on_time_performance_status > 60) ? 'orange' : 'red'}
                                      style={{ fontSize: 10, padding: '2px 6px' }}
                                    >
                                      {company.on_time_performance_status}
                                    </Tag>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </Col>


                    <Col xs={24} lg={8} style={{ height:resVendorResponse_S?.data?.data?.summary_card?.per_vendor.length>0?'305px':"auto" }}>
                      <Card style={{ height: '100%' }}>
                        <Title level={4} style={{ marginBottom: 6 }}>
                          Customer Satisfaction
                        </Title>

                        <div style={{ marginBottom: 24 }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {resVendorResponse_S?.data?.data?.summary_card?.overall_customer_satisfaction!==null?resVendorResponse_S?.data?.data?.summary_card?.overall_customer_satisfaction:"0"} / 5
                          </Title>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                          {resVendorResponse_S?.data?.data?.summary_card?.per_vendor.map((company: any, idx: any) => {
                            return (
                              <div key={idx} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                  <Text style={{ fontSize: 12 }}>{company.vendor}</Text>
                                  <Text style={{ fontSize: 12 }}>{company.customer_satisfaction} /5</Text>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  {renderStars(company.customer_satisfaction, 5)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>)
            :
            (<LoaderCard count={3} />)
          }
          {/* Detailed Vendor Comparison Table */}
          <Card style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 2 }}>
              Detailed Vendor Comparison
            </Title>
            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
              Compare key metrics across {selectedTab.toLowerCase()} vendors
            </Text>
            {resVendorResponse_S.isSuccess && !loader?
              (tableData && tableData !== undefined ?
                (
                  <Table
                    columns={tableColumns}
                    dataSource={tableData}
                    pagination={false}
                    size="middle"
                  />
                )
                : (
                  <Empty />
                ))
              : (
                <TableLoader />
              )
            }
          </Card>
          {/* <LoaderCard count={2} /> */}
          {/* Bottom Section - Charts and AI Recommendations */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card style={{ height: 'auto' }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Cost Comparison
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Average cost per mile across vendors
                </Text>

                <div style={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: 6,
                  color: '#8c8c8c'
                }}>
                  Cost comparison chart would appear here
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card style={{ height: 'auto' }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Service Quality Metrics
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Detailed breakdown of service quality indicators
                </Text>

                <div style={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: 6,
                  color: '#8c8c8c'
                }}>
                  Service quality chart would appear here
                </div>
              </Card>
            </Col>
          </Row>
          {/* AI Recommendations */}
          <Card style={{ marginTop: 32 }}>
            {/* <RecommendationSkeleton /> */}
            <Title level={4} style={{ marginBottom: 8 }}>
              AI Recommendations
            </Title>
            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
              Smart suggestions based on vendor performance analysis
            </Text>
            {recommendations.length > 0 && recommendations !== undefined ?
              (
                <Row gutter={[16, 16]}>
                  {recommendations.map((rec, index) => (
                    <Col xs={24} key={index}>
                      <Card
                        size="small"
                        style={{
                          borderLeft: `4px solid ${rec.type === 'info' ? '#1890ff' : rec.type === 'success' ? '#52c41a' : '#faad14'}`
                        }}
                      >
                        <div style={{ display: 'flex', gap: 16 }}>
                          <div style={{ fontSize: 20 }}>
                            {rec.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
                              {rec.title}
                            </Title>
                            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 16 }}>
                              {rec.description}
                            </Text>
                            <Button type="link" style={{ padding: 0, height: 'auto' }}>
                              {rec.actionText}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )
              : (
                <Empty />
              )
            }
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
