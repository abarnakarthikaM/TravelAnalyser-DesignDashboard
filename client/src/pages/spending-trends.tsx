
import React from 'react';
import { Calendar, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/dashboard/sidebar';

// Updated to use shadcn/ui components

const SpendingTrends = () => {
  // Metrics data for the top cards
  const metricsData = [
    {
      title: 'YTD Expenses',
      value: '$1,248,567',
      change: '+5.2%',
      changeType: 'positive',
      subtitle: 'vs. previous year'
    },
    {
      title: 'Monthly Average',
      value: '$156,071',
      change: '+2.1%',
      changeType: 'positive',
      subtitle: 'vs. previous period'
    },
    {
      title: 'Projected Q4',
      value: '$487,250',
      change: '+8.3%',
      changeType: 'positive',
      subtitle: 'vs. previous Q4'
    },
    {
      title: 'Annual Forecast',
      value: '$1,735,817',
      change: '+6.7%',
      changeType: 'positive',
      subtitle: 'vs. previous year'
    }
  ];

  // Category breakdown data
  const categoryData = [
    { category: 'Air Travel', percentage: '45%', amount: '$567,800' },
    { category: 'Hotels', percentage: '35%', amount: '$435,900' },
    { category: 'Ground Transport', percentage: '20%', amount: '$248,521' }
  ];

  // Projections data
  const projectionsData = [
    { period: 'Q4 2023 Projection', subtitle: 'Based on current trends', amount: '$487,250' },
    { period: 'Q1 2024 Projection', subtitle: 'Based on historical patterns', amount: '$512,800' },
    { period: 'Annual 2024 Forecast', subtitle: 'Full year estimate', amount: '$1,925,000' }
  ];

  // Anomalies insights data
  const insightsData = [
    {
      title: 'Seasonal Spike Detected',
      description: 'Air travel expenses consistently increase by 22-38% during Q4 each year. Consider adjusting budget allocations accordingly.',
      type: 'warning'
    },
    {
      title: 'Cost Reduction Trend',
      description: 'Ground transport costs have decreased by 15% since implementing the new travel policy in March. Projected annual savings: $32,000.',
      type: 'success'
    },
    {
      title: 'Budget Optimization',
      description: 'Based on spending patterns, reallocating 8% from hotel to air travel budget could better align with actual expenses.',
      type: 'info'
    }
  ];

  // Year-over-year comparison table data
  const comparisonData = [
    {
      key: '1',
      category: 'Air Travel',
      ytd2022: '$481,790',
      ytd2023: '$567,800',
      change: '+17.9%',
      projected2023: '$750,500',
      projected2024: '$865,750'
    },
    {
      key: '2',
      category: 'Hotels',
      ytd2022: '$445,320',
      ytd2023: '$435,900',
      change: '-2.1%',
      projected2023: '$586,000',
      projected2024: '$623,000'
    },
    {
      key: '3',
      category: 'Ground Transport',
      ytd2022: '$209,450',
      ytd2023: '$248,521',
      change: '+18.7%',
      projected2023: '$340,317',
      projected2024: '$434,250'
    },
    {
      key: '4',
      category: 'Total',
      ytd2022: '$1,156,920',
      ytd2023: '$1,248,567',
      change: '+7.9%',
      projected2023: '$1,735,817',
      projected2024: '$1,925,000'
    }
  ];

  const comparisonColumns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: '2022 YTD',
      dataIndex: 'ytd2022',
      key: 'ytd2022',
      width: 120,
    },
    {
      title: '2023 YTD',
      dataIndex: 'ytd2023',
      key: 'ytd2023',
      width: 120,
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      width: 100,
      render: (change: string) => (
        <Tag color={change.startsWith('+') ? 'green' : 'red'}>
          {change.startsWith('+') ? <RiseOutlined /> : <FallOutlined />} {change}
        </Tag>
      ),
    },
    {
      title: 'Projected 2023',
      dataIndex: 'projected2023',
      key: 'projected2023',
      width: 130,
    },
    {
      title: 'Projected 2024',
      dataIndex: 'projected2024',
      key: 'projected2024',
      width: 130,
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
              Spending Trends & Projections
            </Title>
            <Text style={{ color: '#8c8c8c' }}>
              Analyze historical spending patterns and view future projections
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
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card style={{ height: '100%', textAlign: 'center' }}>
                  <Title level={4} style={{ color: '#8c8c8c', fontSize: 14, fontWeight: 400, marginBottom: 8 }}>
                    {metric.title}
                  </Title>
                  <Title level={2} style={{ margin: 0, marginBottom: 4, fontSize: 28 }}>
                    {metric.value}
                  </Title>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Tag color="green" style={{ margin: 0 }}>
                      <RiseOutlined /> {metric.change}
                    </Tag>
                  </div>
                  <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                    {metric.subtitle}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Expense Trends Chart */}
          <Card style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
                  Expense Trends Over Time
                </Title>
                <Text style={{ color: '#8c8c8c' }}>
                  Monthly expense breakdown by category
                </Text>
              </div>
              <Space>
                <Select defaultValue="monthly" style={{ width: 120 }}>
                  <Option value="monthly">Monthly</Option>
                  <Option value="quarterly">Quarterly</Option>
                  <Option value="yearly">Yearly</Option>
                </Select>
                <Select defaultValue="all" style={{ width: 140 }}>
                  <Option value="all">All Categories</Option>
                  <Option value="air">Air Travel</Option>
                  <Option value="hotels">Hotels</Option>
                  <Option value="transport">Transport</Option>
                </Select>
              </Space>
            </div>
            
            <div style={{ 
              height: 300, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#fafafa',
              borderRadius: 6,
              color: '#8c8c8c',
              flexDirection: 'column',
              gap: 8
            }}>
              <RiseOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
              <Text style={{ color: '#8c8c8c' }}>
                Expense trend chart would appear here
              </Text>
              <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                Showing monthly trends across all expense categories
              </Text>
            </div>
          </Card>

          {/* Bottom Row - Category Distribution and Spending Projections */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            {/* Category Distribution */}
            <Col xs={24} lg={12}>
              <Card style={{ height: 400 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Category Distribution
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Breakdown of expenses by category
                </Text>
                
                <div style={{ 
                  height: 200, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: 6,
                  marginBottom: 24
                }}>
                  <Text style={{ color: '#8c8c8c' }}>
                    Category distribution chart would appear here
                  </Text>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {categoryData.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: index === 0 ? '#1890ff' : index === 1 ? '#52c41a' : '#faad14' 
                      }} />
                      <Text style={{ flex: 1 }}>{item.category}</Text>
                      <Text strong>{item.percentage}</Text>
                      <Text style={{ color: '#8c8c8c' }}>({item.amount})</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* Spending Projections */}
            <Col xs={24} lg={12}>
              <Card style={{ height: 400 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Spending Projections
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Forecasted expenses for the next 6 months
                </Text>
                
                <div style={{ 
                  height: 200, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: 6,
                  marginBottom: 24
                }}>
                  <Text style={{ color: '#8c8c8c' }}>
                    Spending projection chart would appear here
                  </Text>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {projectionsData.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text strong style={{ display: 'block' }}>{item.period}</Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 12 }}>{item.subtitle}</Text>
                      </div>
                      <Text strong style={{ color: '#1890ff', fontSize: 16 }}>{item.amount}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          {/* Spending Anomalies & Insights */}
          <Card style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Spending Anomalies & Insights
            </Title>
            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
              AI-identified patterns and anomalies in spending data
            </Text>
            
            <Row gutter={[16, 16]}>
              {insightsData.map((insight, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card 
                    size="small" 
                    style={{ 
                      height: '100%',
                      borderLeft: `4px solid ${insight.type === 'warning' ? '#faad14' : insight.type === 'success' ? '#52c41a' : '#1890ff'}`
                    }}
                  >
                    <Title level={5} style={{ margin: 0, marginBottom: 8, fontSize: 14 }}>
                      {insight.title}
                    </Title>
                    <Text style={{ color: '#8c8c8c', fontSize: 12, lineHeight: 1.5 }}>
                      {insight.description}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Year-over-Year Comparison */}
          <Card>
            <Title level={4} style={{ marginBottom: 16 }}>
              Year-over-Year Comparison
            </Title>
            <Table
              dataSource={comparisonData}
              columns={comparisonColumns}
              pagination={false}
              size="small"
              style={{ backgroundColor: '#fafafa' }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SpendingTrends;
