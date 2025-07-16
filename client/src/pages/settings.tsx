
import React, { useState } from 'react';
import { Layout, Typography, Card, Row, Col, Input, Button, Select, Avatar, Space, Tabs } from 'antd';
import { 
  UserOutlined, 
   
  FileTextOutlined, 
  CreditCardOutlined, 
  BellOutlined, 
  LinkOutlined, 
  SecurityScanOutlined, 
  SettingOutlined,
  CameraOutlined
} from '@ant-design/icons';
import { Sidebar } from '@/components/dashboard/sidebar';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabItems = [
    {
      key: 'profile',
      label: (
        <Space>
          <UserOutlined />
          Profile
        </Space>
      ),
    },
    {
      key: 'company',
      label: (
        <Space>

          Company
        </Space>
      ),
    },
    {
      key: 'travel-policy',
      label: (
        <Space>
          <FileTextOutlined />
          Travel Policy
        </Space>
      ),
    },
    {
      key: 'payment-methods',
      label: (
        <Space>
          <CreditCardOutlined />
          Payment Methods
        </Space>
      ),
    },
    {
      key: 'notifications',
      label: (
        <Space>
          <BellOutlined />
          Notifications
        </Space>
      ),
    },
    {
      key: 'integrations',
      label: (
        <Space>
          <LinkOutlined />
          Integrations
        </Space>
      ),
    },
    {
      key: 'security',
      label: (
        <Space>
          <SecurityScanOutlined />
          Security
        </Space>
      ),
    },
    {
      key: 'preferences',
      label: (
        <Space>
          <SettingOutlined />
          Preferences
        </Space>
      ),
    },
  ];

  const ProfileContent = () => (
    <div>
      <Title level={3} style={{ marginBottom: 8 }}>
        Profile Settings
      </Title>
      <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 32 }}>
        Manage your personal information and preferences
      </Text>

      <Row gutter={[32, 24]}>
        <Col xs={24} lg={8}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
              <Avatar 
                size={120} 
                style={{ backgroundColor: '#f5f5f5', color: '#8c8c8c', fontSize: 48 }}
                icon={<UserOutlined />}
              />
              <Button
                type="text"
                icon={<CameraOutlined />}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #d9d9d9',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </div>
            <Button type="link" style={{ padding: 0 }}>
              Change Photo
            </Button>
          </div>
        </Col>

        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  First Name
                </Text>
                <Input defaultValue="John" />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Last Name
                </Text>
                <Input defaultValue="Doe" />
              </div>
            </Col>
            <Col xs={24}>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Email
                </Text>
                <Input defaultValue="john.doe@example.com" />
              </div>
            </Col>
            <Col xs={24}>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Phone Number
                </Text>
                <Input defaultValue="+1 (555) 123-4567" />
              </div>
            </Col>
            <Col xs={24}>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Job Title
                </Text>
                <Input defaultValue="Senior Product Manager" />
              </div>
            </Col>
            <Col xs={24}>
              <div style={{ marginBottom: 24 }}>
                <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Department
                </Text>
                <Select defaultValue="Product" style={{ width: '100%' }}>
                  <Option value="Product">Product</Option>
                  <Option value="Engineering">Engineering</Option>
                  <Option value="Sales">Sales</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Finance">Finance</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Title level={3} style={{ marginTop: 40, marginBottom: 16 }}>
        Travel Preferences
      </Title>

      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: 16 }}>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Seat Preference
            </Text>
            <Select defaultValue="Window" style={{ width: '100%' }}>
              <Option value="Window">Window</Option>
              <Option value="Aisle">Aisle</Option>
              <Option value="Middle">Middle</Option>
            </Select>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: 16 }}>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Meal Preference
            </Text>
            <Select defaultValue="Regular" style={{ width: '100%' }}>
              <Option value="Regular">Regular</Option>
              <Option value="Vegetarian">Vegetarian</Option>
              <Option value="Vegan">Vegan</Option>
              <Option value="Halal">Halal</Option>
              <Option value="Kosher">Kosher</Option>
            </Select>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: 16 }}>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Frequent Flyer Programs
            </Text>
            <Input defaultValue="AA 123456789, DL 987654321" />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: 16 }}>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Hotel Loyalty Programs
            </Text>
            <Input defaultValue="Marriott Bonvoy, Hilton Honors" />
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 32, textAlign: 'right' }}>
        <Space>
          <Button>Cancel</Button>
          <Button type="primary">Save Changes</Button>
        </Space>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Text style={{ color: '#8c8c8c', fontSize: 16 }}>
              {tabItems.find(item => item.key === activeTab)?.label} content coming soon...
            </Text>
          </div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Sidebar />
      
      <Layout style={{ marginLeft: 256 }}>
        {/* Header */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 32px'
        }}>
          <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
            Settings
          </Title>
          <Text style={{ color: '#8c8c8c' }}>
            Manage your account and application preferences
          </Text>
        </div>

        <Content style={{ padding: '32px' }}>
          <Row gutter={32}>
            {/* Left Sidebar Tabs */}
            <Col xs={24} lg={6}>
              <Card style={{ marginBottom: 24 }}>
                <Tabs
                  tabPosition="left"
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  items={tabItems.map(item => ({
                    ...item,
                    children: null
                  }))}
                  style={{
                    '.ant-tabs-tab': {
                      justifyContent: 'flex-start'
                    }
                  }}
                />
              </Card>
            </Col>

            {/* Main Content */}
            <Col xs={24} lg={18}>
              <Card>
                {renderTabContent()}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
