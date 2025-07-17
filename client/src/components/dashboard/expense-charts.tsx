import { Card, Row, Col, Typography } from "antd";

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
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Expense Breakdown
        </Title>
        <p style={{ color: '#8c8c8c', margin: 0 }}>
          View your expense distribution across categories
        </p>
      </div>
      
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
          <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
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
        </div>
        <div style={{ 
          height: 300, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          borderRadius: 6,
          color: '#8c8c8c'
        }}>
          Pie Chart Placeholder
        </div>
      </Card>
    </div>
  );
}