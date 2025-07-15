
import { useQuery } from "@tanstack/react-query";
import { Layout, Typography, Button, Select, Space, Spin } from "antd";
import { FilterOutlined, CalendarOutlined } from "@ant-design/icons";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ExpenseCharts } from "@/components/dashboard/expense-charts";
import { TopExpenses } from "@/components/dashboard/top-expenses";
import { AlertsInsights } from "@/components/dashboard/alerts-insights";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function Dashboard() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  if (isLoading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <div style={{ 
          display: 'flex', 
          height: '100vh', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Spin size="large" />
          <Text style={{ marginLeft: 16, fontSize: 18 }}>Loading dashboard...</Text>
        </div>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Sidebar />
      
      <Layout style={{ marginLeft: 256 }}>
        <Header style={{ 
          backgroundColor: '#fff', 
          borderBottom: '1px solid #f0f0f0',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <Title level={2} style={{ margin: 0, color: '#262626' }}>
              Travel Expense Dashboard
            </Title>
            <Text type="secondary">
              Monitor and analyze your corporate travel expenses across all vendors
            </Text>
          </div>
          
          <Space size="middle">
            <Space>
              <CalendarOutlined style={{ color: '#8c8c8c' }} />
              <Text type="secondary">Jan 01, 2023 - Jul 15, 2025</Text>
            </Space>
            
            <Button 
              type="primary" 
              icon={<FilterOutlined />}
              size="middle"
            >
              Filters
            </Button>
            
            <Select 
              defaultValue="all" 
              style={{ width: 120 }}
              size="middle"
            >
              <Option value="all">All Vendors</Option>
              <Option value="aircorp">AirCorp</Option>
              <Option value="globalstay">GlobalStay</Option>
              <Option value="rideshare">RideShare</Option>
            </Select>
          </Space>
        </Header>

        <Content style={{ 
          padding: 32, 
          overflow: 'auto',
          backgroundColor: '#f5f5f5'
        }}>
          <MetricsCards metrics={metrics} />
          <ExpenseCharts metrics={metrics} />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr',
            gap: 32,
            marginTop: 32
          }}>
            <TopExpenses expenses={metrics?.topExpenses || []} />
            <AlertsInsights />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
