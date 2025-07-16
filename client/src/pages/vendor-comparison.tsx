
import React from 'react';
import { Download, Filter, Calendar, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/dashboard/sidebar';

// Updated to use shadcn/ui components

export default function VendorComparison() {
  // Sample data for the metrics cards
  const metricsData = [
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
      dataIndex: 'costEfficiency',
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
      dataIndex: 'onTimePerformance',
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
      dataIndex: 'customerSatisfaction',
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
      dataIndex: 'policyCompliance',
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
      dataIndex: 'overallRating',
      key: 'overallRating',
      width: 120,
      render: (rating: string) => {
        const color = rating === 'Excellent' ? 'green' : rating === 'Good' ? 'blue' : 'orange';
        return <Tag color={color}>{rating}</Tag>;
      },
    },
  ];

  // Sample table data
  const tableData = [
    {
      key: '1',
      vendor: 'AirCorp',
      costEfficiency: 75,
      onTimePerformance: 92,
      customerSatisfaction: 85,
      policyCompliance: 95,
      overallRating: 'Excellent',
    },
    {
      key: '2',
      vendor: 'SkyJet',
      costEfficiency: 82,
      onTimePerformance: 86,
      customerSatisfaction: 80,
      policyCompliance: 88,
      overallRating: 'Good',
    },
    {
      key: '3',
      vendor: 'GlobalAir',
      costEfficiency: 68,
      onTimePerformance: 78,
      customerSatisfaction: 60,
      policyCompliance: 70,
      overallRating: 'Average',
    },
  ];

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
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Sidebar />
      
      <Layout style={{ marginLeft: 256 }}>
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
            <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
              Vendor Comparison
            </Title>
            <Text style={{ color: '#8c8c8c' }}>
              Compare performance metrics across all vendors
            </Text>
          </div>
          
          <Space>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8c8c8c' }}>
              <CalendarOutlined />
              <Text style={{ color: '#8c8c8c' }}>Jan 01, 2023 - Jul 16, 2025</Text>
            </div>
            <Button icon={<FilterOutlined />}>Filters</Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Space>
        </div>

        <Content style={{ padding: '32px' }}>
          {/* Top Metrics Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            {metricsData.map((metric, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card style={{ height: '100%' }}>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    {metric.category}
                  </Title>
                  
                  <div style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block' }}>Total Spend</Text>
                    <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                      ${metric.totalSpent.toLocaleString()}
                    </Title>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    {metric.companies.map((company, idx) => (
                      <div key={idx} style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12 }}>{company.name}</Text>
                          <Text style={{ fontSize: 12 }}>${company.amount.toLocaleString()}</Text>
                        </div>
                        <Progress 
                          percent={company.percentage} 
                          size="small" 
                          showInfo={false}
                          strokeColor={idx === 0 ? '#1890ff' : idx === 1 ? '#722ed1' : '#52c41a'}
                        />
                      </div>
                    ))}
                  </div>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block' }}>On-Time Performance</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontWeight: 'bold' }}>{metric.onTimePerformance.value}%</Text>
                        {metric.onTimePerformance.status === 'excellent' && (
                          <Tag color="green">Excellent</Tag>
                        )}
                        {metric.onTimePerformance.status === 'average' && (
                          <Tag color="orange">Average</Tag>
                        )}
                      </div>
                    </Col>
                    <Col span={12}>
                      <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block' }}>Customer Satisfaction</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontWeight: 'bold' }}>{metric.customerSatisfaction.value}/{metric.customerSatisfaction.max}</Text>
                        {renderStars(metric.customerSatisfaction.value, metric.customerSatisfaction.max)}
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Detailed Vendor Comparison Table */}
          <Card style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 8 }}>
              Detailed Vendor Comparison
            </Title>
            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
              Compare key metrics across airline vendors
            </Text>
            
            <Table
              columns={tableColumns}
              dataSource={tableData}
              pagination={false}
              size="middle"
            />
          </Card>

          {/* Bottom Section - Charts and AI Recommendations */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card style={{ height: 400 }}>
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
              <Card style={{ height: 400 }}>
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
            <Title level={4} style={{ marginBottom: 8 }}>
              AI Recommendations
            </Title>
            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
              Smart suggestions based on vendor performance analysis
            </Text>

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
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
