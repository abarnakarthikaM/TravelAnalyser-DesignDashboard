
import { useState } from "react";
import { Layout, Menu, Typography, Avatar } from "antd";
import { 
  BuildingOutlined, 
  BarChartOutlined, 
  CompareOutlined, 
  TrendingUpOutlined, 
  UserOutlined, 
  ShieldOutlined, 
  BulbOutlined, 
  SwapOutlined, 
  SettingOutlined 
} from "@ant-design/icons";

const { Sider } = Layout;
const { Text, Title } = Typography;

const menuItems = [
  { key: "corporate", label: "Corporate View", icon: <BuildingOutlined /> },
  { key: "dashboard", label: "Dashboard Overview", icon: <BarChartOutlined /> },
  { key: "vendor", label: "Vendor Comparison", icon: <CompareOutlined /> },
  { key: "spending", label: "Spending Trends", icon: <TrendingUpOutlined /> },
  { key: "spenders", label: "Top Spenders", icon: <UserOutlined /> },
  { key: "compliance", label: "Compliance Metrics", icon: <ShieldOutlined /> },
  { key: "insights", label: "AI Insights", icon: <BulbOutlined /> },
  { key: "transactions", label: "Transactions", icon: <SwapOutlined /> },
  { key: "settings", label: "Settings", icon: <SettingOutlined /> },
];

export function Sidebar() {
  const [selectedKey, setSelectedKey] = useState("corporate");

  return (
    <Sider
      width={256}
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, #1f2937 0%, #374151 100%)',
        zIndex: 100,
      }}
    >
      {/* INFINITI Logo Section */}
      <div style={{ 
        padding: 24, 
        borderBottom: '1px solid #4b5563',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <div style={{
          width: 32,
          height: 32,
          backgroundColor: '#fff',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text strong style={{ color: '#1890ff', fontSize: 14 }}>I</Text>
        </div>
        <div>
          <Title level={4} style={{ margin: 0, color: '#fff' }}>INFINITI</Title>
          <Text style={{ fontSize: 12, color: '#d1d5db' }}>
            Inspiring Travel Innovation
          </Text>
        </div>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => setSelectedKey(key)}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          paddingTop: 16,
        }}
        theme="dark"
        items={menuItems.map(item => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          style: {
            margin: '4px 16px',
            borderRadius: 6,
            height: 48,
            lineHeight: '48px',
          }
        }))}
      />

      {/* User Profile Section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        borderTop: '1px solid #4b5563',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <Avatar 
          size={40} 
          style={{ backgroundColor: '#6b7280' }}
        >
          JD
        </Avatar>
        <div>
          <Text strong style={{ color: '#fff', display: 'block' }}>John Doe</Text>
          <Text style={{ fontSize: 12, color: '#d1d5db' }}>Admin</Text>
        </div>
      </div>
    </Sider>
  );
}
