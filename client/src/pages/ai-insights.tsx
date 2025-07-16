
import React from 'react';
import { Layout, Typography, Button, Space, Card, Row, Col, Tabs, Badge, Progress } from 'antd';
import { 
  CalendarOutlined, 
  FilterOutlined, 
  DownloadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined
} from '@ant-design/icons';
import { Sidebar } from '@/components/dashboard/sidebar';

const { Title, Text } = Typography;

const AIInsights = () => {
  const tabItems = [
    { key: 'insights', label: 'Key Insights' },
    { key: 'recommendations', label: 'Recommendations' },
    { key: 'predictions', label: 'Predictions' },
    { key: 'assistant', label: 'AI Assistant' },
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
      icon: <TrendingUpOutlined style={{ color: '#1890ff' }} />,
    },
    {
      title: 'Needs Improvement',
      description: 'Research team compliance dropped to 68% in the last quarter.',
      icon: <TrendingDownOutlined style={{ color: '#faad14' }} />,
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
              AI-Powered Insights
            </Title>
            <Text style={{ color: '#8c8c8c' }}>
              Smart recommendations and predictive analytics for your travel expenses
            </Text>
          </div>
          
          <Space>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8c8c8c' }}>
              <CalendarOutlined />
              <Text style={{ color: '#8c8c8c' }}>Jan 01, 2023 - Jul 15, 2025</Text>
            </div>
            <Button icon={<FilterOutlined />}>Filters</Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Space>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Tabs */}
          <Tabs 
            defaultActiveKey="insights" 
            items={tabItems}
            style={{ marginBottom: 32 }}
          />

          {/* Top Metrics Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Col xs={24} md={8}>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>Cost Saving Opportunities</Text>
                  <Badge count="High Impact" style={{ backgroundColor: '#1890ff' }} />
                </div>
                <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                  $127,500
                </Title>
                <Text style={{ color: '#8c8c8c' }}>
                  Potential annual savings identified
                </Text>
                
                <div style={{ marginTop: 16 }}>
                  {costSavingOpportunities.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                      {item.icon}
                      <div>
                        <Text style={{ fontWeight: 500, display: 'block', fontSize: 14 }}>
                          {item.title}
                        </Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                          {item.description}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                  View All Opportunities
                </Button>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>Spending Anomalies</Text>
                  <Badge count="Attention Needed" style={{ backgroundColor: '#ff4d4f' }} />
                </div>
                <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                  7
                </Title>
                <Text style={{ color: '#8c8c8c' }}>
                  Unusual spending patterns detected
                </Text>
                
                <div style={{ marginTop: 16 }}>
                  {spendingAnomalies.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                      {item.icon}
                      <div>
                        <Text style={{ fontWeight: 500, display: 'block', fontSize: 14 }}>
                          {item.title}
                        </Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                          {item.description}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                  View All Anomalies
                </Button>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>Policy Compliance</Text>
                  <Badge count="Improving" style={{ backgroundColor: '#52c41a' }} />
                </div>
                <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                  87%
                </Title>
                <Text style={{ color: '#8c8c8c' }}>
                  Overall policy compliance rate
                </Text>
                
                <div style={{ marginTop: 16 }}>
                  {improvingDepartments.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                      {item.icon}
                      <div>
                        <Text style={{ fontWeight: 500, display: 'block', fontSize: 14 }}>
                          {item.title}
                        </Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                          {item.description}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                  View Compliance Details
                </Button>
              </Card>
            </Col>
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
        </div>
      </Layout>
    </Layout>
  );
};

export default AIInsights;
