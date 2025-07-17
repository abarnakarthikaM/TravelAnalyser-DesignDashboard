
import { Card, Typography, Tabs } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

interface ExpenseChartsProps {
  metrics?: {
    totalExpenses: number;
    airTravel: number;
    accommodation: number;
    groundTransport: number;
  };
}

export function ExpenseCharts({ metrics }: ExpenseChartsProps) {
  const [timePeriod, setTimePeriod] = useState('monthly');

  const timePeriodItems = [
    {
      key: 'monthly',
      label: 'Monthly',
    },
    {
      key: 'quarterly', 
      label: 'Quarterly',
    },
    {
      key: 'yearly',
      label: 'Yearly',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Expense Breakdown
        </Title>
        <p style={{ color: '#8c8c8c', margin: 0 }}>
          View your expense distribution across categories
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Monthly Expense Trend */}
        <Card 
          bordered={false}
          style={{ 
            height: 400,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
          }}
        >
          <Title level={4} style={{ margin: 0, marginBottom: 16 }}>
            Monthly Expense Trend
          </Title>
          <div style={{ 
            height: 280, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            borderRadius: 6,
            color: '#8c8c8c'
          }}>
            Monthly expense trend chart would appear here
          </div>
        </Card>

        {/* Expense Distribution */}
        <Card 
          bordered={false}
          style={{ 
            height: 400,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={4} style={{ margin: 0 }}>
              Expense Distribution
            </Title>
          </div>
          
          <Tabs
            activeKey={timePeriod}
            onChange={setTimePeriod}
            items={timePeriodItems}
            size="small"
            style={{ marginBottom: 16 }}
            className="custom-tabs"
          />
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, fontSize: 12, marginBottom: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 12, height: 12, backgroundColor: '#1890ff', borderRadius: '50%' }}></span>
              Air Travel
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 12, height: 12, backgroundColor: '#52c41a', borderRadius: '50%' }}></span>
              Hotels
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 12, height: 12, backgroundColor: '#fa8c16', borderRadius: '50%' }}></span>
              Ground Transport
            </span>
          </div>
          
          <div style={{ 
            height: 200, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            borderRadius: 6,
            color: '#8c8c8c'
          }}>
            {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} expense distribution chart would appear here
          </div>
        </Card>
      </div>
    </div>
  );
}
