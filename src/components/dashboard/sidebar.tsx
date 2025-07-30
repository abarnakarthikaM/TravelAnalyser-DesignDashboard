import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  BarChartOutlined,
  SwapOutlined,
  RiseOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  BulbOutlined,
  TransactionOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutService } from '@/services/common/common';

const { Sider } = Layout;
const { Text } = Typography;

const menuItems: MenuProps['items'] = [
  {
    key: 'corporate',
    icon: <HomeOutlined />,
    label: 'Corporate View',
  },
  {
    key: 'dashboard',
    icon: <BarChartOutlined />,
    label: 'Dashboard Overview',
  },
  {
    key: 'vendor',
    icon: <SwapOutlined />,
    label: 'Vendor Comparison',
  },
  {
    key: 'spending',
    icon: <RiseOutlined />,
    label: 'Spending Trends',
  },
  {
    key: 'spenders',
    icon: <UserOutlined />,
    label: 'Top Spenders',
  },
  {
    key: 'compliance',
    icon: <SafetyCertificateOutlined />,
    label: 'Compliance Metrics',
  },
  {
    key: 'insights',
    icon: <BulbOutlined />,
    label: 'AI Insights',
  },
  {
    key: 'transactions',
    icon: <TransactionOutlined />,
    label: 'Transactions',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

export function Sidebar() {
  const[reqLogOut,resLogOut]=logoutService();
  const location = useLocation();
  const navigate = useNavigate();
  const loginDetails = JSON.parse(atob(localStorage.getItem("user") || ""));

  const logout=async()=>{
          localStorage.removeItem('isAuthenticated')
          localStorage.removeItem('user');
          navigate('/login');
           let data:any=await reqLogOut({Authorization:'Token '+loginDetails.token});
  }
  const getSelectedKey = () => {
    if (location.pathname === '/vendor-comparison') return 'vendor';
    if (location.pathname === '/spending-trends') return 'spending';
    if (location.pathname === '/top-spenders') return 'spenders';
    if (location.pathname === '/compliance-metrics') return 'compliance';
    if (location.pathname === '/ai-insights') return 'insights';
    if (location.pathname === '/transactions') return 'transactions';
    if (location.pathname === '/settings') return 'settings';
    return 'dashboard';
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'dashboard':
        navigate('/');
        break;
      case 'vendor':
        navigate('/vendor-comparison');
        break;
      case 'spending':
        navigate('/spending-trends');
        break;
      case 'spenders':
        navigate('/top-spenders');
        break;
      case 'compliance':
        navigate('/compliance-metrics');
        break;
      case 'insights':
        navigate('/ai-insights');
        break;
      case 'transactions':
        navigate('/transactions');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        break;
    }
  };

  return (
    <Sider
      width={256}
      style={{
        background: '#0a2559',
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
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
        }}
        onClick={handleMenuClick}
      />

      {/* User Profile Section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
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
          {loginDetails?.user?.first_name?.charAt(0)} {loginDetails?.user?.last_name?.charAt(0)}
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
            {loginDetails?.user?.username}
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
      <Button
        title="Logout"
        type="primary"
        danger
        icon={<LogoutOutlined />}
        onClick={logout}
        block
        style={{
          background: 'unset',
          position: 'absolute',
          left: 210,
          bottom: 25,
          color: '#fff',
          border:'none',
          fontSize:'18px',
          boxShadow:'none',
          width:'30px'
        }}
      >
      </Button>

      <style>
        {`
          .ant-menu-item-selected {
            background-color: #1a3a7a !important;
          }
          .ant-menu-item-selected::after {
            border-right-color: #1a3a7a !important;
          }
          .ant-menu-item:hover {
            background-color: #1a3a7a !important;
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