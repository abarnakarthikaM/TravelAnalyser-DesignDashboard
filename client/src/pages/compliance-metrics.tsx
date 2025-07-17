
import React from 'react';
import { Layout, Typography, Button, Space, Row, Col, Card, Progress, Tabs, Tag } from 'antd';
import { CalendarOutlined, FilterOutlined, DownloadOutlined, CheckCircleOutlined, ExclamationCircleOutlined, WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Sidebar } from '@/components/dashboard/sidebar';
import { PolicyViolations } from '@/components/dashboard/policy-violations';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function ComplianceMetrics() {
  // Metrics data
  const metricsData = [
    {
      title: 'Overall Compliance',
      value: '87%',
      change: '+3.5%',
      changeType: 'positive',
      subtitle: 'from previous period',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    },
    {
      title: 'Policy Violations',
      value: '143',
      change: '-12%',
      changeType: 'positive',
      subtitle: 'from previous period',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      details: [
        { label: 'High Severity', value: 28 },
        { label: 'Medium Severity', value: 67 },
        { label: 'Low Severity', value: 48 }
      ]
    },
    {
      title: 'Pending Approvals',
      value: '27',
      change: '+34%',
      changeType: 'negative',
      subtitle: 'from previous period',
      icon: <WarningOutlined style={{ color: '#faad14' }} />,
      details: [
        { label: 'Awaiting Manager', value: 18 },
        { label: 'Awaiting Finance', value: 9 },
        { label: 'Average Wait Time', value: '2.3 days' }
      ]
    },
    {
      title: 'Policy Savings',
      value: '$87,450',
      change: '+16.2%',
      changeType: 'positive',
      subtitle: 'from previous period',
      icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
      details: [
        { label: 'Estimated Annual Savings', value: '$349,800' }
      ]
    }
  ];

  // Policy compliance data
  const policyComplianceData = [
    { category: 'Advance Booking', percentage: 92, status: 'Excellent', change: '+4.5%', color: '#52c41a' },
    { category: 'Preferred Vendors', percentage: 88, status: 'Good', change: '+2.1%', color: '#1890ff' },
    { category: 'Expense Documentation', percentage: 85, status: 'Good', change: '+5.3%', color: '#1890ff' },
    { category: 'Approval Workflow', percentage: 95, status: 'Excellent', change: '+1.2%', color: '#52c41a' },
    { category: 'Lodging Limits', percentage: 76, status: 'Needs Improvement', change: '-2.8%', color: '#faad14' },
    { category: 'Class of Service', percentage: 82, status: 'Good', change: '+3.7%', color: '#1890ff' }
  ];

  // Employee data
  const topCompliantEmployees = [
    { name: 'Emily Wilson', department: 'Marketing', compliance: 100 },
    { name: 'Robert Chen', department: 'Finance', compliance: 100 },
    { name: 'Sarah Johnson', department: 'Sales', compliance: 98 },
    { name: 'Thomas Garcia', department: 'Engineering', compliance: 97 },
    { name: 'Lisa Wong', department: 'HR', compliance: 96 }
  ];

  const needsImprovementEmployees = [
    { name: 'David Rodriguez', department: 'Sales', compliance: 68 },
    { name: 'Jennifer Smith', department: 'Marketing', compliance: 72 },
    { name: 'Michael Brown', department: 'Engineering', compliance: 75 },
    { name: 'Amanda Lee', department: 'Sales', compliance: 76 },
    { name: 'Kevin Patel', department: 'Product', compliance: 78 }
  ];

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return '#52c41a';
    if (compliance >= 80) return '#faad14';
    return '#ff4d4f';
  };

  const tabItems = [
    {
      key: 'overview',
      label: 'Compliance Overview',
      children: (
        <div>
          {/* Compliance by Policy Category */}
          <div style={{ marginBottom: 32 }}>
            <Title level={3} style={{ marginBottom: 8 }}>
              Compliance by Policy Category
            </Title>
            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
              Breakdown of compliance across different policy areas
            </Text>

            <div style={{ maxWidth: 800 }}>
              {policyComplianceData.map((policy, index) => (
                <div key={index} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Text style={{ fontWeight: 500, minWidth: 150 }}>{policy.category}</Text>
                      <Tag color={policy.status === 'Excellent' ? 'green' : policy.status === 'Good' ? 'blue' : 'orange'}>
                        {policy.status}
                      </Tag>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Text style={{ fontWeight: 'bold' }}>{policy.percentage}%</Text>
                      <Text style={{ 
                        color: policy.change.startsWith('+') ? '#52c41a' : '#ff4d4f',
                        fontWeight: 500,
                        minWidth: 50,
                        textAlign: 'right'
                      }}>
                        {policy.change}
                      </Text>
                    </div>
                  </div>
                  <Progress 
                    percent={policy.percentage} 
                    strokeColor={policy.color}
                    showInfo={false}
                    strokeWidth={8}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'violations',
      label: 'Policy Violations',
      children: <PolicyViolations />
    },
    {
      key: 'department',
      label: 'By Department',
      children: <div style={{ padding: 24 }}>Department view content</div>
    },
    {
      key: 'trends',
      label: 'Trends & Analysis',
      children: <div style={{ padding: 24 }}>Trends and analysis content</div>
    }
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
              Compliance Metrics
            </Title>
            <Text style={{ color: '#8c8c8c' }}>
              Monitor and improve travel policy compliance across your organization
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
          {/* Top Metrics Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            {metricsData.map((metric, index) => (
              <Col xs={24} lg={6} key={index}>
                <Card style={{ height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <Title level={4} style={{ margin: 0, fontSize: 16 }}>
                      {metric.title}
                    </Title>
                    {metric.icon}
                  </div>
                  
                  <Title level={1} style={{ margin: 0, marginBottom: 8, fontSize: 32 }}>
                    {metric.value}
                  </Title>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
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

                  {metric.details && (
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                      {metric.details.map((detail, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span>{detail.label}</span>
                          <span style={{ fontWeight: 500 }}>{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          {/* Tabs Section */}
          <Card style={{ marginBottom: 32 }}>
            <Tabs 
              defaultActiveKey="overview" 
              items={tabItems}
            />
          </Card>

          {/* Bottom Section - Employee Lists */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card style={{ height: 400 }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Top Compliant Employees
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Employees with highest policy adherence
                </Text>
                
                <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                  {topCompliantEmployees.map((employee, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: index < topCompliantEmployees.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                      <div>
                        <Text style={{ fontWeight: 500, display: 'block' }}>{employee.name}</Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 12 }}>{employee.department}</Text>
                      </div>
                      <Tag color={getComplianceColor(employee.compliance)} style={{ fontWeight: 'bold' }}>
                        {employee.compliance}%
                      </Tag>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card style={{ height: 400 }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Needs Improvement
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Employees with lowest policy adherence
                </Text>
                
                <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                  {needsImprovementEmployees.map((employee, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: index < needsImprovementEmployees.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                      <div>
                        <Text style={{ fontWeight: 500, display: 'block' }}>{employee.name}</Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 12 }}>{employee.department}</Text>
                      </div>
                      <Tag color={getComplianceColor(employee.compliance)} style={{ fontWeight: 'bold' }}>
                        {employee.compliance}%
                      </Tag>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
