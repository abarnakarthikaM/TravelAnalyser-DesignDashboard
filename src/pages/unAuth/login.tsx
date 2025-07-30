import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Alert, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, LineChartOutlined, DollarOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {loginAuthService} from '../../services/common/common';


const { Title, Text } = Typography;

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [reqCommonService,resCommonService]=loginAuthService();


  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate login API call
      // await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any login
      if (values.username && values.password) {
        let data:any=await reqCommonService({  username: values.username, password: values.password});
        
        if(data.data.success){
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem("user", btoa(JSON.stringify(data.data)));
            navigate('/dashboard');
        }
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Side - Analytics Content */}
      <div 
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '30px 40px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflowY: 'hidden',
          maxHeight: '100vh'
        }}
      >
        <div style={{ maxWidth: 530, paddingTop: '20px', paddingBottom: '20px' }}>
          <div style={{ marginBottom: 30 }}>
            <div
              style={{
                marginBottom: 24,
                display:'flex',
              
              }}
            >
              <span style={{ width: 80,height: 80, background: 'rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: 32,  fontWeight: 'bold',padding:'12px',marginRight:'20px'}}>
               TE
              </span>
             
               <Title level={1} style={{ color: 'white', margin: 0, marginBottom: 8}}>
              Travel Expense
              <Title level={3} style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontWeight: 400 }}>
              Complete Analytics Platform
            </Title>
            </Title>
            
            </div>
           
          </div>

          <div style={{ marginBottom: 40 }}>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, lineHeight: 1.6 }}>
              Comprehensive travel expense management solution with real-time analytics, 
              compliance monitoring, AI-powered insights, and vendor performance tracking. 
              Everything you need to optimize corporate travel spending.
            </Text>
          </div>

          {/* Key Features */}
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: 20, 
                borderRadius: 12,
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <LineChartOutlined style={{ fontSize: 20, marginRight: 8 }} />
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: 500 }}>Dashboard Analytics</Text>
                </div>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.4 }}>
                  Real-time expense tracking with interactive charts and vendor performance metrics
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: 20, 
                borderRadius: 12,
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <DollarOutlined style={{ fontSize: 20, marginRight: 8 }} />
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: 500 }}>Transaction Management</Text>
                </div>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.4 }}>
                  Complete transaction history with advanced filtering and search capabilities
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: 20, 
                borderRadius: 12,
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <RiseOutlined style={{ fontSize: 20, marginRight: 8 }} />
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: 500 }}>AI Insights & Trends</Text>
                </div>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.4 }}>
                  Predictive analytics and automated spending pattern recommendations
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: 20, 
                borderRadius: 12,
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <FallOutlined style={{ fontSize: 20, marginRight: 8 }} />
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: 500 }}>Compliance Monitoring</Text>
                </div>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.4 }}>
                  Policy compliance tracking with violation alerts and approval workflows
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div 
        style={{
          flex: 1,
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          overflowY: 'auto',
          maxHeight: '100vh'
        }}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div
              style={{
                width: 60,
                height: 60,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold'
              }}
            >
              TE
            </div>
            <Title level={2} style={{ margin: 0, marginBottom: 8, color: '#1a1a1a' }}>
              Travel Expense
            </Title>
            <Text style={{ color: '#666', fontSize: 16 }}>
              Sign in to your account
            </Text>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
            />
          )}

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please enter your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#999' }} />}
                placeholder="Username"
                style={{ 
                  borderRadius: 8,
                  height: 48,
                  fontSize: 16
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{ 
                  borderRadius: 8,
                  height: 48,
                  fontSize: 16
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ fontSize: 14 }}>Remember me</Checkbox>
                </Form.Item>
                <Button type="link" style={{ padding: 0, color: '#667eea', fontSize: 14 }}>
                  Forgot password?
                </Button>
              </div>
            </Form.Item>

            <Form.Item style={{ marginBottom: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  height: 48,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Text style={{ color: '#666', fontSize: 14 }}>
                Don't have an account?{' '}
                <Button type="link" style={{ padding: 0, color: '#667eea', fontSize: 14 }}>
                  Sign up here
                </Button>
              </Text>
            </div>
          </Form>

        </div>
      </div>
    </div>
  );
}
