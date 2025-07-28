
import React from 'react';
import { Layout, Typography, Button, Space, Row, Col, Card, Progress, Tabs, Tag, DatePicker, Select } from 'antd';
import { CalendarOutlined, FilterOutlined, DownloadOutlined, CheckCircleOutlined, ExclamationCircleOutlined, WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Sidebar } from '@/components/dashboard/sidebar';
import { PolicyViolations } from '@/components/dashboard/policy-violations';
import { DepartmentCompliance } from '@/components/dashboard/department-compliance';
import { useEffect, useState } from "react";
import { calculateDateValues, formatDate } from '@/utils/dateFunctions';
import { Filter } from 'lucide-react';
import { useLazyGetCompliancemetricsQuery } from '@/services/dashboard/dashboard';
import { CardLoader, DepartmentSkeleton, LoaderCard } from '@/components/Loader/Loader';
import { Rupees } from '@/components/ui/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function ComplianceMetrics() {
  const [resDatpickerValues, setDatpickerValues] = useState<any>([]);
  const [dateFilter, setDateFilter] = useState("today");
  const [tabValue, setTabValue] = useState("overview");
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<any>([]);
  const { Option } = Select;
  const [reqComplainceTabdata, resComplainceTabData] = useLazyGetCompliancemetricsQuery();
  const [reqComplainceCardData, resComplainceCardData] = useLazyGetCompliancemetricsQuery();
  const [resComplainceCards_S, setComplainceCards_S] = useState<any>([]);
  const [resComplainceOverview_S, setComplainceOverview_S] = useState<any>([]);
  const [resComplainceViolation_S, setComplainceViolation_S] = useState<any>([]);
  const [resComplainceDepartment_S, setComplainceDepartment_S] = useState<any>([]);
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

  useEffect(() => {
    if (resDatpickerValues?.length=== 0) {
      setDatpickerValues(calculateDateValues(dateFilter))
    }
    console.log(tabValue)
    if (resDatpickerValues.length === 2) {
      let reqData: any = {
        data: {
          start_date: resDatpickerValues[0],
          end_date: resDatpickerValues[1],
        },
        url: "compliance/metrics/"
      }
      reqComplainceCardData({ RequestDataFormat: reqData });
    }
  }, [resDatpickerValues]);

  useEffect(() => {
    setComplainceCards_S(resComplainceCardData)
  }, [resComplainceCardData])
  console.log(resComplainceCards_S)
  /********
     * request service call for Expense card and Top Expenses  service call
     */
  useEffect(() => {
    console.log(tabValue)
    const url =
      (tabValue == 'department') ? "compliance/by_department/" :
        (tabValue == 'violations') ? "compliance/violations/" :
          "compliance/overview/";
    if (resDatpickerValues.length === 2) {
      let reqData: any = {
        data: {
          start_date: resDatpickerValues[0],
          end_date: resDatpickerValues[1],
        },
        url: url
      }
      reqComplainceTabdata({ RequestDataFormat: reqData });
    }
  }, [resDatpickerValues, tabValue]);
  /********
    *get response for Expense card and Top Expenses  service call
    */

  useEffect(() => {
    console.log(tabValue)
    if (resComplainceTabData?.isSuccess) {
      (tabValue == 'overview') && setComplainceOverview_S(resComplainceTabData.data);
      (tabValue == 'violations') && setComplainceViolation_S(resComplainceTabData.data);
      (tabValue == 'department') && setComplainceDepartment_S(resComplainceTabData.data);
    }

    // if(resExpenseBreakdown?.isSuccess && resExpenseBreakdown?.data){
    //   setCommonTabResponse_S(resExpenseBreakdown)
    // }
  }, [resComplainceTabData])

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

  const tabItems = [
    {
      key: 'overview',
      label: 'Compliance Overview',
      children: (
        <div>
          {/* Compliance by Policy Category */}
          {resComplainceTabData.isSuccess && !resComplainceTabData.isLoading ?
            (resComplainceOverview_S?.data?.compliance_by_category != undefined &&
              <div style={{ marginBottom: 32 }}>
                <Title level={3} style={{ marginBottom: 8 }}>
                  {resComplainceOverview_S?.data?.compliance_by_category?.title}
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  {resComplainceOverview_S?.data?.compliance_by_category.description}
                </Text>

                <div style={{ maxWidth: 800 }}>
                  {resComplainceOverview_S?.data?.compliance_by_category?.data.map((policy: any, index: any) => (
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
              </div>)
            : (
              <DepartmentSkeleton />
            )
          }

          {/* Employee Lists Section */}
          <Row gutter={[24, 24]}>
            {resComplainceTabData.isSuccess && !resComplainceTabData.isLoading ?
              (<>
                {resComplainceOverview_S?.data?.top_compliant_employees != undefined &&
                  <Col xs={24} lg={12}>
                    <Card style={{ height: 400 }}>
                      <Title level={4} style={{ marginBottom: 8 }}>
                        Top Compliant Employees
                      </Title>
                      <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                        Employees with highest policy adherence
                      </Text>

                      <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                        {resComplainceOverview_S?.data?.top_compliant_employees?.data.map((employee: any, index: any) => (
                          <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 0',
                            borderBottom: index < topCompliantEmployees.length - 1 ? '1px solid #f0f0f0' : 'none'
                          }}>
                            <div>
                              <Text style={{ fontWeight: 500, display: 'block' }}>{employee.employee_name}</Text>
                              <Text style={{ color: '#8c8c8c', fontSize: 12 }}>{employee.department}</Text>
                            </div>
                            <Tag color={employee.status_color} style={{ fontWeight: 'bold' }}>
                              {employee.compliance_rate}%
                            </Tag>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </Col>
                }
                {resComplainceOverview_S?.data?.needs_improvement_employees != undefined &&
                  <Col xs={24} lg={12}>
                    <Card style={{ height: 400 }}>
                      <Title level={4} style={{ marginBottom: 8 }}>
                        {resComplainceOverview_S?.data?.needs_improvement_employees.title}
                      </Title>
                      <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                        {resComplainceOverview_S?.data?.needs_improvement_employees.description}
                      </Text>

                      <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                        {resComplainceOverview_S?.data?.needs_improvement_employees.data.map((employee: any, index: number) => (
                          <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 0',
                            borderBottom: index < needsImprovementEmployees.length - 1 ? '1px solid #f0f0f0' : 'none'
                          }}>
                            <div>
                              <Text style={{ fontWeight: 500, display: 'block' }}>{employee.employee_name}</Text>
                              <Text style={{ color: '#8c8c8c', fontSize: 12 }}>{employee.department}</Text>
                            </div>
                            <Tag color={employee.status_color}>
                              {employee.compliance_rate}%
                            </Tag>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </Col>
                }
              </>)
              : (
              <LoaderCard/>
              )
            }
          </Row>
        </div>
      )
    },
    {
      key: 'violations',
      label: 'Policy Violations',
      children: <PolicyViolations violationComplaince={resComplainceViolation_S} />
    },
    {
      key: 'department',
      label: 'By Department',
      children: <DepartmentCompliance departmentComplianceData={resComplainceDepartment_S} />
    },
    {
      key: 'trends',
      label: 'Trends & Analysis',
      children: <div style={{ padding: 24 }}>Trends and analysis content</div>
    }
  ];
  console.log(resComplainceCards_S?.data?.data?.compliance);

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
                <Option value="this-month">This month</Option>
                <Option value="last-month">Last month</Option>
                <Option value="date-range">Date range</Option>
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

        <Content style={{ padding: '32px' }}>
          {/* Top Metrics Cards */}
          {resComplainceCardData.isSuccess && !resComplainceCardData.isLoading ?
            (
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {resComplainceCards_S?.data?.data?.compliance.map((metric: any, index: any) => (
                  <Col xs={24} lg={6} key={index}>
                    <Card style={{ height: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <Title level={4} style={{ margin: 0, fontSize: 16 }}>
                          {metric.name}
                        </Title>
                        {metric.icon}
                      </div>

                      <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
                        {metric.total}
                      </Title>
                      {metric.name == "Overall Compliance" && <Progress percent={metric.change_percent} size="small" showInfo={false} style={{ width: 80 }} />}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <Text style={{
                          color: metric.changeType === 'positive' ? '#52c41a' : '#ff4d4f',
                          fontWeight: 500
                        }}>
                          {metric.change_percent} <span style={{ color: "#8C8C8C" }}>vs previous</span>
                        </Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                          {metric.subtitle}
                        </Text>
                      </div>
                      {/* {metric.details && (
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                      {metric.details.map((detail, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span>{detail.label}</span>
                          <span style={{ fontWeight: 500 }}>{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )} */}
                    </Card>
                  </Col>
                ))}
              </Row>
            )
            : (
              <CardLoader />
            )
          }


          {/* Tabs Section */}
          <Card style={{ marginBottom: 32 }}>
            <Tabs
              defaultActiveKey="overview"
              items={tabItems}
            />
          </Card>

        </Content>
      </Layout>
    </Layout>
  );
}
