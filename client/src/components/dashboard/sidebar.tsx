
import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
  BuildingOutlined,
  DashboardOutlined,
  CompareOutlined,
  TrendingUpOutlined,
  UserOutlined,
  SafetyOutlined,
  BulbOutlined,
  SwapOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

const menuItems = [
  {
    key: 'corporate',
    icon: <BuildingOutlined />,
    label: 'Corporate View',
  },
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard Overview',
  },
  {
    key: 'vendor',
    icon: <CompareOutlined />,
    label: 'Vendor Comparison',
  },
  {
    key: 'spending',
    icon: <TrendingUpOutlined />,
    label: 'Spending Trends',
  },
  {
    key: 'spenders',
    icon: <UserOutlined />,
    label: 'Top Spenders',
  },
  {
    key: 'compliance',
    icon: <SafetyOutlined />,
    label: 'Compliance Metrics',
  },
  {
    key: 'insights',
    icon: <BulbOutlined />,
    label: 'AI Insights',
  },
  {
    key: 'transactions',
    icon: <SwapOutlined />,
    label: 'Transactions',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

export function Sidebar() {
  const [selectedKey, setSelectedKey] = useState('corporate');

  return (
    <Sider
      width={256}
      style={{
        background: 'linear-gradient(to bottom, #374151, #4b5563)',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 50,
      }}
    >
      {/* INFINITI Logo Section */}
      <div
        style={{
          padding: '24px',
          borderBottom: '1px solid #6b7280',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#2563eb', fontWeight: 'bold', margin: 0 }}>
            I
          </Text>
        </div>
        <div>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '18px',
              margin: 0,
              display: 'block',
            }}
          >
            INFINITI
          </Text>
          <Text
            style={{
              color: '#d1d5db',
              fontSize: '14px',
              margin: 0,
              display: 'block',
            }}
          >
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
          paddingTop: '16px',
        }}
        theme="dark"
        items={menuItems}
      />

      {/* User Profile Section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px',
          borderTop: '1px solid #6b7280',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Avatar
          size={40}
          style={{
            backgroundColor: '#6b7280',
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        >
          JD
        </Avatar>
        <div>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: 500,
              margin: 0,
              display: 'block',
            }}
          >
            John Doe
          </Text>
          <Text
            style={{
              color: '#d1d5db',
              fontSize: '14px',
              margin: 0,
              display: 'block',
            }}
          >
            Admin
          </Text>
        </div>
      </div>

      <style>
        {`
          .ant-menu-item-selected {
            background-color: #1a3a7a !important;
          }
          .ant-menu-item-selected::after {
            border-right-color: #1a3a7a !important;
          }
          .ant-menu-item:hover {
            background-color: #4b5563 !important;
            color: #ffffff !important;
          }
          .ant-menu-dark .ant-menu-item {
            color: #d1d5db;
          }
          .ant-menu-dark .ant-menu-item-selected {
            color: #ffffff !important;
          }
        `}
      </style>
    </Sider>
  );
}
