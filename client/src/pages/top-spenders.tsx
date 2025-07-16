
import React from 'react';
import { Calendar, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar } from '@/components/dashboard/sidebar';

// Updated to use shadcn/ui components

const TopSpenders = () => {
  // Department metrics data
  const departmentMetrics = [
    {
      department: 'Sales Department',
      amount: '$524,398',
      change: '+8.2%',
      changeType: 'positive',
      subtitle: 'from previous period'
    },
    {
      department: 'Engineering',
      amount: '$287,170',
      change: '+5.4%',
      changeType: 'positive',
      subtitle: 'from previous period'
    },
    {
      department: 'Marketing',
      amount: '$224,742',
      change: '+3.1%',
      changeType: 'positive',
      subtitle: 'from previous period'
    },
    {
      department: 'Executive',
      amount: '$124,857',
      change: '+2.8%',
      changeType: 'positive',
      subtitle: 'from previous period'
    }
  ];

  // Department breakdown data
  const departmentBreakdown = [
    { department: 'Sales', percentage: 42, amount: '$524,398', change: '+8.2%' },
    { department: 'Engineering', percentage: 23, amount: '$287,170', change: '+5.4%' },
    { department: 'Marketing', percentage: 18, amount: '$224,742', change: '+2.3%' },
    { department: 'Executive', percentage: 10, amount: '$124,857', change: '+12.4%' },
    { department: 'Other Departments', percentage: 7, amount: '$87,400', change: '+1.2%' }
  ];

  // Top expense categories by department
  const salesCategories = [
    { category: 'Air Travel', amount: '$262,199', percentage: '50%' },
    { category: 'Hotels', amount: '$157,319', percentage: '30%' },
    { category: 'Ground Transport', amount: '$104,880', percentage: '20%' }
  ];

  const engineeringCategories = [
    { category: 'Air Travel', amount: '$143,585', percentage: '50%' },
    { category: 'Hotels', amount: '$114,868', percentage: '40%' },
    { category: 'Ground Transport', amount: '$28,717', percentage: '10%' }
  ];

  const getProgressColor = (change: string) => {
    return change.startsWith('+') ? '#52c41a' : '#ff4d4f';
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
              Top Spenders
            </Title>
            <Text style={{ color: '#8c8c8c' }}>
              Analyze spending patterns across departments and individuals
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

        <Content style={{ padding: '32px' }}>
          {/* Tabs */}
          <Tabs defaultActiveKey="department" style={{ marginBottom: 32 }}>
            <TabPane tab="By Department" key="department" />
            <TabPane tab="By Individual" key="individual" />
            <TabPane tab="By Category" key="category" />
          </Tabs>

          {/* Department Metrics Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            {departmentMetrics.map((metric, index) => (
              <Col xs={24} lg={6} key={index}>
                <Card style={{ height: '100%' }}>
                  <Title level={4} style={{ marginBottom: 16, fontSize: 16 }}>
                    {metric.department}
                  </Title>
                  
                  <Title level={2} style={{ margin: 0, marginBottom: 8, color: '#1890ff' }}>
                    {metric.amount}
                  </Title>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Text style={{ 
                      color: metric.changeType === 'positive' ? '#52c41a' : '#ff4d4f',
                      fontWeight: 500
                    }}>
                      {metric.change}
                    </Text>
                    <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                      {metric.subtitle}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Department Spending Breakdown */}
          <Card style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Department Spending Breakdown
            </Title>
            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
              Detailed analysis of departmental travel expenses
            </Text>
            
            <div style={{ marginBottom: 24 }}>
              {departmentBreakdown.map((dept, index) => (
                <div key={index} style={{ marginBottom: 20 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <Text style={{ fontWeight: 500, minWidth: 120 }}>{dept.department}</Text>
                      <Text style={{ 
                        color: dept.change.startsWith('+') ? '#52c41a' : '#ff4d4f',
                        fontWeight: 500,
                        fontSize: 12
                      }}>
                        {dept.change}
                      </Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Text style={{ fontWeight: 600, fontSize: 16 }}>{dept.amount}</Text>
                      <br />
                      <Text style={{ color: '#8c8c8c', fontSize: 12 }}>{dept.percentage}%</Text>
                    </div>
                  </div>
                  <Progress 
                    percent={dept.percentage} 
                    showInfo={false}
                    strokeColor={getProgressColor(dept.change)}
                    style={{ marginBottom: 4 }}
                  />
                </div>
              ))}
            </div>

            {/* Chart Placeholder */}
            <div style={{ 
              height: 200, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#fafafa',
              borderRadius: 6,
              marginTop: 24
            }}>
              <Text style={{ color: '#8c8c8c' }}>
                Department spending comparison chart would appear here
              </Text>
            </div>
          </Card>

          {/* Bottom Row - Categories and Trends */}
          <Row gutter={[24, 24]}>
            {/* Top Expense Categories by Department */}
            <Col xs={24} lg={12}>
              <Card style={{ height: 600 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Top Expense Categories by Department
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Breakdown of major expense types
                </Text>
                
                <div style={{ marginBottom: 32 }}>
                  <Text style={{ fontWeight: 600, fontSize: 16, display: 'block', marginBottom: 16 }}>
                    Sales Department
                  </Text>
                  {salesCategories.map((category, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: 12,
                      padding: '8px 0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: index === 0 ? '#1890ff' : index === 1 ? '#ff4d4f' : '#52c41a'
                        }} />
                        <Text>{category.category}</Text>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Text style={{ fontWeight: 600 }}>{category.amount}</Text>
                        <Text style={{ color: '#8c8c8c', marginLeft: 8 }}>({category.percentage})</Text>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <Text style={{ fontWeight: 600, fontSize: 16, display: 'block', marginBottom: 16 }}>
                    Engineering Department
                  </Text>
                  {engineeringCategories.map((category, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: 12,
                      padding: '8px 0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: index === 0 ? '#1890ff' : index === 1 ? '#ff4d4f' : '#52c41a'
                        }} />
                        <Text>{category.category}</Text>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Text style={{ fontWeight: 600 }}>{category.amount}</Text>
                        <Text style={{ color: '#8c8c8c', marginLeft: 8 }}>({category.percentage})</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* Department Spending Trends */}
            <Col xs={24} lg={12}>
              <Card style={{ height: 600 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Department Spending Trends
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  6-month spending pattern analysis
                </Text>
                
                <div style={{ 
                  height: 400, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: 6
                }}>
                  <Text style={{ color: '#8c8c8c' }}>
                    Department spending trend chart would appear here
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TopSpenders;
