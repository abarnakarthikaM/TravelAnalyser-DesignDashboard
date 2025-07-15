import { Card, Alert, List, Typography, Space } from "antd";
import { 
  ExclamationCircleOutlined, 
  InfoCircleOutlined,
  CheckCircleOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;

export function AlertsInsights() {
  const alerts = [
    {
      type: "warning" as const,
      message: "Budget exceeded by 15% this month",
      icon: <ExclamationCircleOutlined />,
    },
    {
      type: "info" as const,
      message: "New vendor partnership available",
      icon: <InfoCircleOutlined />,
    },
    {
      type: "success" as const,
      message: "Cost savings of $2,500 achieved",
      icon: <CheckCircleOutlined />,
    },
  ];

  const insights = [
    "Air travel costs increased 12% vs last quarter",
    "Hotel bookings show 8% cost reduction opportunity",
    "Ground transport efficiency improved by 5%",
    "Compliance rate maintained at 98%"
  ];

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card 
        bordered={false}
        style={{ 
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
        }}
      >
        <Title level={4} style={{ marginBottom: 16 }}>
          Alerts
        </Title>

        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              message={alert.message}
              type={alert.type}
              showIcon
              style={{ fontSize: 13 }}
            />
          ))}
        </Space>
      </Card>

      <Card 
        bordered={false}
        style={{ 
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
        }}
      >
        <Title level={4} style={{ marginBottom: 16 }}>
          AI Insights
        </Title>

        <List
          size="small"
          dataSource={insights}
          renderItem={(item) => (
            <List.Item style={{ padding: '8px 0', borderBottom: 'none' }}>
              <Text style={{ fontSize: 13, color: '#595959' }}>• {item}</Text>
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
}