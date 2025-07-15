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
    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
      <Col xs={24} lg={12}>
        <Card 
          bordered={false}
          style={{ 
            height: 400,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
          }}
        >
          <Title level={4} style={{ marginBottom: 16 }}>
            Expense Distribution
          </Title>
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
      </Col>

      <Col xs={24} lg={12}>
        <Card 
          bordered={false}
          style={{ 
            height: 400,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
          }}
        >
          <Title level={4} style={{ marginBottom: 16 }}>
            Monthly Trends
          </Title>
          <div style={{ 
            height: 300, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            borderRadius: 6,
            color: '#8c8c8c'
          }}>
            Line Chart Placeholder
          </div>
        </Card>
      </Col>
    </Row>
  );
}