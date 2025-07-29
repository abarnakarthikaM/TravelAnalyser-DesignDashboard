
import React from 'react';
import { Table, Card, Progress, Tag, Pagination, Select, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatDate } from '@/utils/dateFunctions';
import { Rupees } from '../ui/icons';
import { LoaderCard, TableLoader } from '../Loader/Loader';


interface PolicyViolation {
  key: string;
  date: string;
  employee: string;
  department: string;
  violationType: string;
  severity: 'High' | 'Medium' | 'Low';
  costImpact: number;
  status: 'Pending Review' | 'Approved' | 'Rejected';
}

const data: PolicyViolation[] = [
  {
    key: '1',
    date: '2023-11-15',
    employee: 'David Rodriguez',
    department: 'Sales',
    violationType: 'Last-minute booking',
    severity: 'High',
    costImpact: 850,
    status: 'Pending Review'
  },
  {
    key: '2',
    date: '2023-11-14',
    employee: 'Jennifer Smith',
    department: 'Marketing',
    violationType: 'Non-preferred vendor',
    severity: 'Medium',
    costImpact: 320,
    status: 'Approved'
  },
  {
    key: '3',
    date: '2023-11-13',
    employee: 'Michael Brown',
    department: 'Engineering',
    violationType: 'Missing receipt',
    severity: 'Low',
    costImpact: 0,
    status: 'Rejected'
  },
  {
    key: '4',
    date: '2023-11-12',
    employee: 'Amanda Lee',
    department: 'Sales',
    violationType: 'Premium class upgrade',
    severity: 'High',
    costImpact: 1250,
    status: 'Rejected'
  },
  {
    key: '5',
    date: '2023-11-10',
    employee: 'Kevin Patel',
    department: 'Product',
    violationType: 'Exceeding hotel limit',
    severity: 'Medium',
    costImpact: 175,
    status: 'Approved'
  }
];

const violationTypes = [
  { type: 'Last-minute booking', count: 42, percentage: 29 },
  { type: 'Non-preferred vendor', count: 35, percentage: 24 },
  { type: 'Missing receipt', count: 28, percentage: 20 },
  { type: 'Premium class upgrade', count: 21, percentage: 15 },
  { type: 'Exceeding hotel limit', count: 17, percentage: 12 }
];

const costImpactData = [
  { type: 'Last-minute booking', amount: 52435, percentage: 42 },
  { type: 'Premium class upgrade', amount: 37455, percentage: 30 },
  { type: 'Exceeding hotel limit', amount: 18728, percentage: 15 },
  { type: 'Non-preferred vendor', amount: 12485, percentage: 10 },
  { type: 'Other violations', amount: 3747, percentage: 3 }
];

export function PolicyViolations({
  violationComplaince,
  resComplainceTabData
}: {
  violationComplaince: any;
  resComplainceTabData:any;
}) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'blue';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'orange';
      case 'Approved': return 'green';
      case 'Rejected': return 'red';
      default: return 'default';
    }
  };

  const columns: ColumnsType<PolicyViolation> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      render: (date: any) => (formatDate(date))
    },
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Violation Type',
      dataIndex: 'violation_type',
      key: 'violation_type',
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={getSeverityColor(severity)}>{severity}</Tag>
      ),
    },
    {
      title: 'Cost Impact',
      dataIndex: 'cost_impact',
      key: 'cost_impact',
      render: (amount: number) => amount === 0 ? '0' : <> <Rupees className='inline-block' />{`${amount.toLocaleString()}`}</>,
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    }
  ];return (

    <div style={{ padding: '24px' }}>
      {/* Recent Policy Violations Table */}
      

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0, marginBottom: 4, fontSize: 18, fontWeight: 600 }}>
              Recent Policy Violations
            </h3>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              Details of recent travel policy violations
            </p>
          </div>
          <Select
            defaultValue="All Severities"
            style={{ width: 140 }}
            options={[
              { value: 'all', label: 'All Severities' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' }
            ]}
          />
        </div>

        {resComplainceTabData?.data?.data?.recent_policy_violations ?
          (<>
            {violationComplaince?.data?.recent_policy_violations?.data!==undefined && violationComplaince?.data?.recent_policy_violations?.data.length>0 ?
              (
                <>
                  <Table
                    columns={columns}
                    dataSource={violationComplaince?.data?.recent_policy_violations?.data}
                    pagination={false}
                    size="middle"
                    style={{ marginBottom: 16 }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#8c8c8c', fontSize: 14 }}>
                      Showing 5 of {violationComplaince?.data?.recent_policy_violations?.data.length} violations
                    </span>
                    <Pagination
                      current={1}
                      total={violationComplaince?.data?.recent_policy_violations?.data?.length}
                      pageSize={5}
                      showSizeChanger={false}
                      simple
                    />
                  </div>
                </>
              ) : (
                <Empty className='cls-whole-empty' />
              )
            }
          </>)
          :(
            <TableLoader />
          )
        }
      </div>
      {/* Bottom Cards Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Violation Types Card */}
        <Card>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ margin: 0, marginBottom: 4, fontSize: 18, fontWeight: 600 }}>
              {violationComplaince?.data?.violation_types?.title}
            </h3>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              {violationComplaince?.data?.violation_types?.description}
            </p>
          </div>

          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {violationTypes.length > 0 && violationTypes !== undefined && violationComplaince?.data?.violation_types?.data.length>0 ?
              (
                <>
                  {violationComplaince?.data?.violation_types?.data.map((violation: any, index: any) => (
                    <div key={index} style={{ marginBottom: 20 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 8
                      }}>
                        <span style={{ fontWeight: 500, fontSize: 14 }}>
                          {violation.violation_type}
                        </span>
                        <span style={{ fontWeight: 600, fontSize: 16 }}>
                          {violation.count}
                        </span>
                      </div>
                      <Progress
                        percent={violation.percentage}
                        showInfo={false}
                        strokeColor="#1890ff"
                        strokeWidth={8}
                      />
                      <div style={{
                        fontSize: 12,
                        color: '#8c8c8c',
                        marginTop: 4,
                        textAlign: 'right'
                      }}>
                        {violation.percentage}% of total violations
                      </div>
                    </div>
                  ))}
                </>
              )
              : (
                <Empty />
              )
            }
          </div>

          {/* Placeholder for pie chart */}
          <div style={{
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            borderRadius: 8,
            marginTop: 16,
            border: '2px dashed #d9d9d9'
          }}>
            <span style={{ color: '#8c8c8c', fontSize: 14 }}>
              Violation type distribution chart would appear here
            </span>
          </div>
        </Card>

        {/* Cost Impact Card */}
        <Card >
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ margin: 0, marginBottom: 4, fontSize: 18, fontWeight: 600 }}>
              {violationComplaince?.data?.cost_impact?.title}
            </h3>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              {violationComplaince?.data?.cost_impact?.description}

            </p>

          </div>

          {/* Summary metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 24,
            padding: 16,
            backgroundColor: '#fafafa',
            borderRadius: 8
          }}>
            <div>
              <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>
                Total Cost Impact
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#1f2937' }}>
                <Rupees className='inline-block' height={"20px"} width={"20px"} />{violationComplaince?.data?.cost_impact?.total_cost_impact}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>
                Average per Violation
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#1f2937' }}>
                <Rupees className='inline-block' height={"20px"} width={"20px"} />{violationComplaince?.data?.cost_impact?.average_per_violation}

              </div>
            </div>
          </div>

          {/* Impact by Violation Type */}
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: 0, marginBottom: 16, fontSize: 14, fontWeight: 500 }}>
              Impact by Violation Type
            </h4>

            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {violationComplaince?.data?.cost_impact?.impact_by_violation_type.length > 0 && costImpactData !== undefined ?

                (violationComplaince?.data?.cost_impact?.impact_by_violation_type
                  .map((item: any, index: any) => (
                    <div key={index} style={{ marginBottom: 12 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 4
                      }}>
                        <span style={{ fontSize: 13, color: '#4b5563' }}>
                          {item.violation_type}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>
                          ${item.cost_impact.toLocaleString()} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress
                        percent={item.percentage}
                        showInfo={false}
                        strokeColor={index === 0 ? '#1890ff' : index === 1 ? '#52c41a' : '#faad14'}
                        strokeWidth={6}
                      />
                    </div>
                  )))
                : (
                  <Empty />
                )
              }
            </div>
          </div>
        </Card>
        {/* <LoaderCard count={2} /> */}
      </div>
    </div>

  );

}
