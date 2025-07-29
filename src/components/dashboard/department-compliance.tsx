
import React from 'react';
import { Card, Progress, Button, Row, Col, Typography, Empty } from 'antd';
import { BarChartLoader, DepartmentSkeleton, LoaderCard } from '../Loader/Loader';


const { Title, Text } = Typography;

interface DepartmentComplianceData {
  department: string;
  compliance: number;
  violations: number;
  status: 'Excellent' | 'Good' | 'Needs Improvement';
  change: string;
}

interface ViolationDetail {
  type: string;
  count: number;
  description: string;
}

interface RecommendationItem {
  title: string;
  description: string;
}

export function DepartmentCompliance(departmentCompliance:any) {
  const departmentData: DepartmentComplianceData[] = [
    { department: 'Finance', compliance: 96, violations: 5, status: 'Excellent', change: '+2.1%' },
    { department: 'HR', compliance: 94, violations: 7, status: 'Excellent', change: '+1.5%' },
    { department: 'Engineering', compliance: 89, violations: 18, status: 'Good', change: '+4.2%' },
    { department: 'Marketing', compliance: 85, violations: 22, status: 'Good', change: '+3.7%' },
    { department: 'Executive', compliance: 92, violations: 8, status: 'Excellent', change: '+0.8%' },
    { department: 'Sales', compliance: 76, violations: 83, status: 'Needs Improvement', change: '-1.3%' }
  ];

  const salesViolations: ViolationDetail[] = [
    {
      type: 'Last-minute bookings',
      count: 48,
      description: '58% of all Sales department violations are due to booking less than 7 days before travel.'
    },
    {
      type: 'Premium class upgrades',
      count: 21,
      description: '25% of violations are due to unauthorized premium class air travel.'
    },
    {
      type: 'Non-preferred hotels',
      count: 14,
      description: '17% of violations are from booking hotels outside the preferred vendor list.'
    }
  ];

  const recommendations: RecommendationItem[] = [
    {
      title: 'Targeted Training',
      description: 'Schedule refresher training sessions specifically for the Sales team on advance booking requirements.'
    },
    {
      title: 'Approval Workflow Adjustment',
      description: 'Implement a stricter approval process for premium class requests with clear business justification requirements.'
    },
    {
      title: 'Incentive Program',
      description: 'Create a department-specific incentive program that rewards teams with highest compliance improvement.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return '#52c41a';
      case 'Good': return '#1890ff';
      case 'Needs Improvement': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  const getProgressColor = (compliance: number) => {
    if (compliance >= 90) return '#52c41a';
    if (compliance >= 80) return '#1890ff';
    return '#faad14';
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* <DepartmentSkeleton /> */}
      {/* Compliance by Department Section */}
      <div style={{ marginBottom: 32 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
         {departmentCompliance?.departmentComplianceData?.data?.departments_compliance?.title}
        </Title>
        <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
          {departmentCompliance?.departmentComplianceData?.data?.departments_compliance?.description}
        </Text>

        <div style={{ maxWidth: "100%" }}>
          {departmentData.length > 0 && departmentData !== undefined ? (
            departmentData.map((dept, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                    <Text style={{ fontWeight: 500, minWidth: 100 }}>
                      {dept.department}
                    </Text>
                    <div style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      backgroundColor: getStatusColor(dept.status),
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 500
                    }}>
                      {dept.status}
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    minWidth: 200,
                    justifyContent: 'flex-end'
                  }}>
                    <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                      Violations: {dept.violations}
                    </Text>
                    <Text style={{ fontWeight: 600, minWidth: 40 }}>
                      {dept.compliance}%
                    </Text>
                    <Text style={{
                      color: dept.change.startsWith('+') ? '#52c41a' : '#ff4d4f',
                      fontWeight: 500,
                      minWidth: 50,
                      fontSize: 12
                    }}>
                      {dept.change}
                    </Text>
                  </div>
                </div>
                <Progress 
                  percent={dept.compliance}
                  strokeColor={getProgressColor(dept.compliance)}
                  showInfo={false}
                  strokeWidth={8}
                />
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
      {/* <BarChartLoader /> */}

      {/* Chart Placeholder */}
      <div style={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 8,
        marginBottom: 32,
        border: '2px dashed #d9d9d9'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 8 }}>📊</div>
          <Text style={{ color: '#8c8c8c', fontSize: 14 }}>
            Department compliance comparison chart would appear here
          </Text>
        </div>
      </div>
      
      {/* <LoaderCard count={3}/> */}

      {/* Department Deep Dive: Sales */}
      <div style={{ marginBottom: 32 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Department Deep Dive: Sales
        </Title>
        <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
          Detailed analysis of the department with lowest compliance
        </Text>

        <Row gutter={[24, 24]}>
          {/* Common Violations */}
          <Col xs={24} lg={12}>
            <Card style={{ height: '100%' }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                Common Violations
              </Title>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {salesViolations.length > 0 && salesViolations !== undefined ?
                  (
                    salesViolations.map((violation, index) => (
                      <div key={index} style={{
                        padding: 16,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 8,
                        border: '1px solid #f0f0f0'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 8
                        }}>
                          <Text style={{ fontWeight: 600 }}>
                            {violation.type}
                          </Text>
                          <Text style={{
                            fontWeight: 600,
                            color: '#1890ff',
                            fontSize: 16
                          }}>
                            {violation.count} violations
                          </Text>
                        </div>
                        <Text style={{ color: '#666', fontSize: 13 }}>
                          {violation.description}
                        </Text>
                      </div>
                    ))
                  )
                  : (
                    <Empty />
                  )}
              </div>
            </Card>
          </Col>

          {/* Improvement Recommendations */}
          <Col xs={24} lg={12}>
            <Card style={{ height: '100%' }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                Improvement Recommendations
              </Title>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {recommendations.length > 0 && recommendations !== undefined ?
                  (recommendations.map((rec, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      gap: 12,
                      padding: 16,
                      backgroundColor: '#f6f8ff',
                      borderRadius: 8,
                      border: '1px solid #e6f0ff'
                    }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        backgroundColor: '#1890ff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2
                      }}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
                          {index + 1}
                        </Text>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>
                          {rec.title}
                        </Text>
                        <Text style={{ color: '#666', fontSize: 13 }}>
                          {rec.description}
                        </Text>
                      </div>
                    </div>
                  )))
                  : (
                    <Empty />
                  )}
              </div>
            </Card>
          </Col>
        </Row>

        {/* View Detailed Report Button */}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: '#1c3a5e',
              borderColor: '#1c3a5e',
              minWidth: 200,
              height: 48
            }}
          >
            View Detailed Department Report
          </Button>
        </div>
      </div>
    </div>
  );
}
