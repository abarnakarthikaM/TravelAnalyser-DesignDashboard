
import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Space, Card, Row, Col, Tabs, Badge, Progress, DatePicker, Select } from 'antd';
import {
  CalendarOutlined,
  FilterOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons';
import { Sidebar } from '@/components/dashboard/sidebar';
import { calculateDateValues, formatDate } from '@/utils/dateFunctions';
import { useLazyGetinsightServiceQuery } from '@/services/dashboard/dashboard';
import Header from "@/components/dashboard/header";
import { useDispatch, useSelector } from "react-redux";
import { setFilterdate } from "../stores/Headerslice"
const { Title, Text } = Typography;
const { Option } = Select;

const AIInsights = () => {
  const dispatch = useDispatch();
  const { dateFilter: Datetype, filterValue: DateRange } = useSelector(
    (state: any) => state.header
  );
  const [dateFilter, setDateFilter] = useState(Datetype);
  const [loader, setLoader] = useState<boolean>(true)
  const [activeTab, setActiveTab] = React.useState('insights');
  const [reqAiInsightTab, resAiInsightTab] = useLazyGetinsightServiceQuery();
  const [resAiInsightTab_S, setresAiInsightTab_S] = useState<any>([])

  const tabItems = [
    { key: 'insights', label: 'Key Insights' },
    { key: 'recommendations', label: 'Recommendations' },
    { key: 'predictions', label: 'Predictions' }
  ];

  const costSavingOpportunities = [
    {
      title: 'Vendor Consolidation',
      description: 'Consolidating hotel bookings to preferred vendors could save $45,000 annually.',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    },
    {
      title: 'Advance Booking Policy',
      description: 'Implementing a 14-day advance booking policy could reduce air travel costs by $82,500 annually.',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    },
  ];

  const spendingAnomalies = [
    {
      title: 'Marketing Department',
      description: '35% increase in premium air travel bookings in the last 30 days.',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
    },
    {
      title: 'Engineering Team',
      description: 'Unusual pattern of last-minute hotel cancellations resulting in $12,450 in fees.',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
    },
  ];

  const improvingDepartments = [
    {
      title: 'Improving Departments',
      description: 'Sales team improved compliance from 72% to 91% after training.',
      icon: <RiseOutlined style={{ color: '#1890ff' }} />,
    },
    {
      title: 'Needs Improvement',
      description: 'Research team compliance dropped to 68% in the last quarter.',
      icon: <FallOutlined style={{ color: '#faad14' }} />,
    },
  ];

  const trendInsights = [
    {
      title: 'Q4 Travel Spike',
      description: 'Travel expenses consistently increase by 25-30% in Q4 each year, primarily driven by conference attendance and client meetings.',
    },
    {
      title: 'AirCorp Improvement',
      description: "AirCorp's on-time performance has improved by 12% over the past 6 months, making it the most reliable airline partner.",
    },
    {
      title: 'Summer Lull',
      description: 'June-August shows 15-20% reduction in overall travel expenses, suggesting an opportunity for budget reallocation.',
    },
    {
      title: 'GlobalStay Pricing',
      description: "GlobalStay's average nightly rates have increased by 8% while competitors have maintained stable pricing.",
    },
  ];
  /********
   * Des:initial service call for insights
   */
  useEffect(() => {

    if (DateRange.length === 0) {
      dispatch(setFilterdate({ date: calculateDateValues(dateFilter) }))
    }
    if (DateRange.length === 2) {
      let insightType = (activeTab == 'insights') ? 'keyinsights'
        : (activeTab == 'recommendations') ? 'recommendations' : 'predictions'
      let reqData: any = {
        data: {
          start_date: DateRange[0],
          end_date: DateRange[1],
        },
        url: 'aiinsights/' + insightType + '/'
      }
      setLoader(true);
      reqAiInsightTab({ RequestDataFormat: reqData });

    }
  }, [DateRange, activeTab])

  /**
   * Des:ersponse for the insight 
   */
  useEffect(() => {

    if (resAiInsightTab.isSuccess) {
      setLoader(false);
      setresAiInsightTab_S(resAiInsightTab.data)
    }
  }, [resAiInsightTab])

  
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Sidebar />

      <Layout style={{ marginLeft: 256 }}>
        {/* Header */}
        <Header Title={"AI-Powered Insights"} description={"Smart recommendations and predictive analytics for your travel expenses"} />

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Tabs */}
          <Tabs
            defaultActiveKey="insights"
            items={tabItems}
            style={{ marginBottom: 32 }}
            onChange={(activeKey) => setActiveTab(activeKey)}
          />

          {/* Render content based on active tab */}
          {activeTab === 'insights' && (
            <>
              {/* Top Metrics Cards */}
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {resAiInsightTab_S?.data?.cost_saving_opportunities &&
                  <Col xs={24} md={8}>
                    <Card>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>
                          {resAiInsightTab_S?.data?.cost_saving_opportunities?.title}
                        </Text>
                        <Badge count="High impact" style={{ backgroundColor: '#1890ff' }} />
                      </div>
                      <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                        {resAiInsightTab_S?.data?.cost_saving_opportunities?.potential_savings}
                      </Title>
                      <Text style={{ color: '#8c8c8c' }}>
                        Potential annual savings identified
                      </Text>

                      <div style={{ marginTop: 16 }}>
                        {resAiInsightTab_S?.data?.cost_saving_opportunities?.message?.map((item: any, index: any) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                            <CheckCircleOutlined style={{ color: '#52c41a' }} />
                            <div>
                              <Text style={{ fontWeight: 500, display: 'block', fontSize: 14 }}>
                                {item.title}
                              </Text>
                              <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                                {item.message}
                              </Text>
                            </div>
                          </div>
                        ))}
                      </div>
                      {resAiInsightTab_S?.data?.cost_saving_opportunities?.message?.lenght > 2 &&
                        <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                          View All Opportunities
                        </Button>
                      }
                    </Card>
                  </Col>
                }
                {resAiInsightTab_S?.data?.spending_anomalies &&
                  <Col xs={24} md={8}>
                    <Card>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>
                          {resAiInsightTab_S?.data?.spending_anomalies?.title}
                        </Text>
                        <Badge count="Attention Needed" style={{ backgroundColor: '#ff4d4f' }} />
                      </div>
                      <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                        {resAiInsightTab_S?.data?.spending_anomalies?.anomalies_count}
                      </Title>
                      <Text style={{ color: '#8c8c8c' }}>
                        Unusual spending patterns detected
                      </Text>

                      <div style={{ marginTop: 16 }}>
                        {resAiInsightTab_S?.data?.spending_anomalies?.message?.map((item: any, index: any) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                            <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                            <div>
                              <Text style={{ fontWeight: 500, display: 'block', fontSize: 14 }}>
                                {item.title}
                              </Text>
                              <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                                {item.message}
                              </Text>
                            </div>
                          </div>
                        ))}
                      </div>
                      {resAiInsightTab_S?.data?.spending_anomalies?.message?.lenght > 2 &&
                        <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                          View All Anomalies
                        </Button>
                      }
                    </Card>
                  </Col>
                }
                {resAiInsightTab_S?.data?.policy_violations_summary &&
                  <Col xs={24} md={8}>
                    <Card>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>
                          {resAiInsightTab_S?.data?.policy_violations_summary?.title}
                        </Text>
                        <Badge count="Improving" style={{ backgroundColor: '#52c41a' }} />
                      </div>
                      <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                        {resAiInsightTab_S?.data?.policy_violations_summary?.policy_compliance}
                      </Title>
                      <Text style={{ color: '#8c8c8c' }}>
                        Overall policy compliance rate
                      </Text>

                      <div style={{ marginTop: 16 }}>
                        {resAiInsightTab_S?.data?.policy_violations_summary?.message?.map((item: any, index: any) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                            <RiseOutlined style={{ color: '#1890ff' }} />
                            <div>
                              <Text style={{ fontWeight: 500, display: 'block', fontSize: 14 }}>
                                {item.title}
                              </Text>
                              <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                                {item.message}
                              </Text>
                            </div>
                          </div>
                        ))}
                      </div>
                      {resAiInsightTab_S?.data?.spending_anomalies?.message?.lenght > 2 &&
                        <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                          View Compliance Details
                        </Button>
                      }
                    </Card>
                  </Col>
                }
              </Row>

              {/* Trend Analysis */}
              <Card style={{ marginBottom: 32 }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Trend Analysis
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  AI-detected patterns in your expense data
                </Text>

                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Card
                      size="small"
                      title="Seasonal Patterns"
                      style={{ height: 300 }}
                    >
                      <div style={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fafafa',
                        borderRadius: 6,
                        color: '#8c8c8c'
                      }}>
                        Seasonal trend chart would appear here
                      </div>
                    </Card>
                  </Col>

                  <Col xs={24} md={12}>
                    <Card
                      size="small"
                      title="Vendor Performance Trends"
                      style={{ height: 300 }}
                    >
                      <div style={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fafafa',
                        borderRadius: 6,
                        color: '#8c8c8c'
                      }}>
                        Vendor performance chart would appear here
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>

              {/* Trend Insights Grid */}
              <Row gutter={[24, 24]}>
                {trendInsights.map((insight, index) => (
                  <Col xs={24} md={12} key={index}>
                    <Card size="small" style={{ height: '100%' }}>
                      <Title level={5} style={{ margin: 0, marginBottom: 8, fontSize: 16 }}>
                        {insight.title}
                      </Title>
                      <Text style={{ color: '#8c8c8c', fontSize: 14, lineHeight: 1.5 }}>
                        {insight.description}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {/* Recommendations Tab Content */}
          {(activeTab === 'recommendations' && resAiInsightTab_S?.data?.strategic_recommendations) && (
            <div>
              {/* Header with filters */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24
              }}>
                <Title level={3} style={{ margin: 0 }}>
                  Strategic Recommendations
                </Title>
                <Space>
                  <Button>
                    Sort by Impact
                  </Button>
                  <Button icon={<FilterOutlined />}>
                    Filter
                  </Button>
                </Space>
              </div>

              {/* Recommendations Grid */}
              <Row gutter={[24, 24]}>
                {/* Vendor Optimization */}
                {resAiInsightTab_S?.data?.strategic_recommendations?.map((recommendationData: any) => (
                  <Col xs={24} lg={12}>
                    <Card style={{ height: '100%' }}>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {recommendationData.title}
                          </Title>
                          <Badge count="High Impact" style={{ backgroundColor: '#52c41a' }} />
                        </div>
                        <Text style={{ color: '#8c8c8c' }}>
                          Consolidate vendors for better rates and service
                        </Text>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <Text strong style={{ display: 'block', marginBottom: 8 }}>Current Situation</Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 14, lineHeight: 1.5 }}>
                          {recommendationData.message}
                        </Text>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <Text strong style={{ display: 'block', marginBottom: 8 }}>Recommendation</Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 14, lineHeight: 1.5 }}>
                          Consolidate to 3 preferred hotel vendors (GlobalStay, TravelEase, and LuxStay) based on coverage, service quality, and pricing. Negotiate volume-based discounts with these vendors.
                        </Text>
                      </div>

                      <Row gutter={16} style={{ marginBottom: 20 }}>
                        <Col span={12}>
                          <div>
                            <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Potential Savings</Text>
                            <Title level={3} style={{ margin: 0, color: '#52c41a' }}>$000000</Title>
                            <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Annual estimate</Text>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div>
                            <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Implementation Effort</Text>
                            <Title level={3} style={{ margin: 0 }}>Medium</Title>
                            <Text style={{ fontSize: 12, color: '#8c8c8c' }}>3-4 months to fully implement</Text>
                          </div>
                        </Col>
                      </Row>

                      <Button type="primary" block style={{ backgroundColor: '#1e3a8a' }}>
                        View Implementation Plan
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Predictions Tab Content */}
          {activeTab === 'predictions' && (
            <div>
              {/* Expense Forecasts Section */}
              <div style={{ marginBottom: 32 }}>
                <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
                  Expense Forecasts
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  AI-powered predictions for future spending
                </Text>

                {/* Main Forecast Chart */}
                <Card style={{ marginBottom: 24 }}>
                  <div style={{
                    height: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fafafa',
                    borderRadius: 6,
                    color: '#8c8c8c'
                  }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
                    <Text>Expense forecast chart would appear here</Text>
                    <Text style={{ fontSize: 12, marginTop: 4 }}>
                      Showing 12-month projections with confidence intervals
                    </Text>
                  </div>
                </Card>

                {/* Forecast Cards */}
                <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                  <Col xs={24} md={8}>
                    <Card>
                      <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Q4 2023 Forecast</Text>
                        <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                          $487,250
                        </Title>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          -31% vs Q3 actual
                        </Text>
                        <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block' }}>
                          Confidence: 92%
                        </Text>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Air Travel</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$210,260</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2, marginBottom: 4 }}>
                          <div style={{ width: '43%', height: '100%', backgroundColor: '#1890ff', borderRadius: 2 }}></div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Hotels</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$179,540</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2, marginBottom: 4 }}>
                          <div style={{ width: '37%', height: '100%', backgroundColor: '#52c41a', borderRadius: 2 }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Ground Transport</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$97,450</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2 }}>
                          <div style={{ width: '20%', height: '100%', backgroundColor: '#722ed1', borderRadius: 2 }}></div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={24} md={8}>
                    <Card>
                      <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Q1 2024 Forecast</Text>
                        <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                          $512,800
                        </Title>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          +5% vs Q4 forecast
                        </Text>
                        <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block' }}>
                          Confidence: 85%
                        </Text>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Air Travel</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$230,760</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2, marginBottom: 4 }}>
                          <div style={{ width: '45%', height: '100%', backgroundColor: '#1890ff', borderRadius: 2 }}></div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Hotels</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$179,480</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2, marginBottom: 4 }}>
                          <div style={{ width: '35%', height: '100%', backgroundColor: '#52c41a', borderRadius: 2 }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Ground Transport</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$102,560</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2 }}>
                          <div style={{ width: '20%', height: '100%', backgroundColor: '#722ed1', borderRadius: 2 }}></div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={24} md={8}>
                    <Card>
                      <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Annual 2024 Forecast</Text>
                        <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                          $1,925,000
                        </Title>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          +8.5% vs 2023 projected
                        </Text>
                        <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block' }}>
                          Confidence: 78%
                        </Text>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Air Travel</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$866,250</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2, marginBottom: 4 }}>
                          <div style={{ width: '45%', height: '100%', backgroundColor: '#1890ff', borderRadius: 2 }}></div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Hotels</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$673,750</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2, marginBottom: 4 }}>
                          <div style={{ width: '35%', height: '100%', backgroundColor: '#52c41a', borderRadius: 2 }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>Ground Transport</Text>
                          <Text style={{ fontSize: 12, fontWeight: 500 }}>$385,000</Text>
                        </div>
                        <div style={{ height: 4, backgroundColor: '#f0f0f0', borderRadius: 2 }}>
                          <div style={{ width: '20%', height: '100%', backgroundColor: '#722ed1', borderRadius: 2 }}></div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>

              {/* Bottom Section - Budget Impact and Market Trends */}
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <Card style={{ height: '100%' }}>
                    <Title level={4} style={{ marginBottom: 8 }}>
                      Budget Impact Analysis
                    </Title>
                    <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                      Projected impact on departmental budgets
                    </Text>

                    <div style={{
                      height: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fafafa',
                      borderRadius: 6,
                      color: '#8c8c8c',
                      marginBottom: 24
                    }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
                      <Text>Budget impact chart would appear here</Text>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <Text strong style={{ display: 'block', marginBottom: 8 }}>Budget Risk Assessment</Text>

                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 14 }}>Sales Department</Text>
                          <Badge count="High Risk" style={{ backgroundColor: '#ff4d4f' }} />
                        </div>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          Projected to exceed annual budget by 16% based on current spending patterns.
                        </Text>
                      </div>

                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 14 }}>Engineering Department</Text>
                          <Badge count="Medium Risk" style={{ backgroundColor: '#faad14' }} />
                        </div>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          Projected to exceed annual budget by 7% based on current spending patterns.
                        </Text>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 14 }}>Marketing Department</Text>
                          <Badge count="Low Risk" style={{ backgroundColor: '#52c41a' }} />
                        </div>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          Projected to remain 5% under budget based on current spending patterns.
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card style={{ height: '100%' }}>
                    <Title level={4} style={{ marginBottom: 8 }}>
                      Market Trend Predictions
                    </Title>
                    <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                      Forecasted changes in travel market conditions
                    </Text>

                    <div style={{
                      height: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fafafa',
                      borderRadius: 6,
                      color: '#8c8c8c',
                      marginBottom: 24
                    }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>📈</div>
                      <Text>Market trend chart would appear here</Text>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <Text strong style={{ display: 'block', marginBottom: 8 }}>Predicted Market Changes</Text>

                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 14 }}>Airline Pricing</Text>
                          <Text style={{ fontSize: 14, color: '#ff4d4f', fontWeight: 500 }}>+6-10%</Text>
                        </div>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          Industry forecasts predict 6-10% increase in business airfares over the next 6 months due to increased demand.
                        </Text>
                      </div>

                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 14 }}>Hotel Rates</Text>
                          <Text style={{ fontSize: 14, color: '#faad14', fontWeight: 500 }}>+4-6%</Text>
                        </div>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          Moderate increases expected in major business hubs, stable in secondary markets.
                        </Text>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 14 }}>Ground Transport</Text>
                          <Text style={{ fontSize: 14, color: '#52c41a', fontWeight: 500 }}>-2-3%</Text>
                        </div>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                          Increased competition in ride-sharing market expected to drive slight price decreases.
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </Layout>
    </Layout>
  );
};

export default AIInsights;
