
import { Card, Statistic, Row, Col } from "antd";
import { 
  DollarOutlined, 
  SendOutlined, 
  HomeOutlined, 
  CarOutlined 
} from "@ant-design/icons";

interface MetricsCardsProps {
  metrics?: {
    totalExpenses: number;
    airTravel: number;
    accommodation: number;
    groundTransport: number;
  };
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: "Total Expenses",
      value: metrics?.totalExpenses || 0,
      prefix: "$",
      icon: <DollarOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      suffix: "",
    },
    {
      title: "Air Travel",
      value: metrics?.airTravel || 0,
      prefix: "$",
      icon: <SendOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      suffix: "",
    },
    {
      title: "Accommodation", 
      value: metrics?.accommodation || 0,
      prefix: "$",
      icon: <HomeOutlined style={{ fontSize: 24, color: '#fa8c16' }} />,
      suffix: "",
    },
    {
      title: "Ground Transport",
      value: metrics?.groundTransport || 0,
      prefix: "$",
      icon: <CarOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
      suffix: "",
    },
  ];

  return (
    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
      {cards.map((card, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card 
            bordered={false}
            style={{ 
              textAlign: 'center',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
            }}
          >
            <div style={{ marginBottom: 16 }}>
              {card.icon}
            </div>
            <Statistic
              title={card.title}
              value={card.value}
              prefix={card.prefix}
              suffix={card.suffix}
              valueStyle={{ 
                fontSize: 28, 
                fontWeight: 600,
                color: '#262626'
              }}
              titleStyle={{
                fontSize: 14,
                color: '#8c8c8c',
                fontWeight: 500
              }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
