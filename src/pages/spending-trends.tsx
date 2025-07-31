
import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card, Row, Col, Select, Button, Space, Table, Tag, DatePicker, Empty, Tooltip } from 'antd';
import { CalendarOutlined, FilterOutlined, DownloadOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Rupees } from '@/components/ui/icons';
import { BarChartLoader, CardLoader, LoaderCard, TableLoader } from '@/components/Loader/Loader';
import { useLazyGetSpendingTrendsServiceQuery } from '@/services/dashboard/dashboard';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ExpenseTrendsChart } from '@/components/dashboard/spendingTrends/expense-trends-chart';

const { Content } = Layout;
const { Title, Text } = Typography;
const SpendingTrends = () => {
    const [reqSpendingTrendsData, resSpendingTrendsData] = useLazyGetSpendingTrendsServiceQuery();
    const [resSpendingTrendsData_S, setSpendingTrendsData_S] = useState<any>([]);
    
    let YTYKeys:any=[];
    let comparisonColumns:any;
  // Category breakdown data
  const categoryData = [
    { category: 'Air Travel', percentage: '45%', amount: '567,800' },
    { category: 'Hotels', percentage: '35%', amount: '435,900' },
    { category: 'Ground Transport', percentage: '20%', amount: '248,521' }
  ];

  // Projections data
  const projectionsData = [
    { period: 'Q4 2023 Projection', subtitle: 'Based on current trends', amount: '487,250' },
    { period: 'Q1 2024 Projection', subtitle: 'Based on historical patterns', amount: '512,800' },
    { period: 'Annual 2024 Forecast', subtitle: 'Full year estimate', amount: '1,925,000' }
  ];

  // Anomalies insights data
  const insightsData = [
    {
      title: 'Seasonal Spike Detected',
      description: 'Air travel expenses consistently increase by 22-38% during Q4 each year. Consider adjusting budget allocations accordingly.',
      type: 'warning'
    },
    {
      title: 'Cost Reduction Trend',
      description: 'Ground transport costs have decreased by 15% since implementing the new travel policy in March. Projected annual savings: $32,000.',
      type: 'success'
    },
    {
      title: 'Budget Optimization',
      description: 'Based on spending patterns, reallocating 8% from hotel to air travel budget could better align with actual expenses.',
      type: 'info'
    }
  ];
    useEffect(() => {
        let reqData: any = {
          url: "spendingtrend/spending-trends/"
        }
        reqSpendingTrendsData({ RequestDataFormat: reqData });
    }, []);
    useEffect(()=>{
       setSpendingTrendsData_S(resSpendingTrendsData.data)
    })
  console.log(resSpendingTrendsData_S)

 if(resSpendingTrendsData_S?.data !=undefined){
    YTYKeys=Object.keys(resSpendingTrendsData_S?.data?.year_over_year_comparison[0]) as Array <any>;
  console.log(YTYKeys);
 }

  if(YTYKeys.length>0){
    comparisonColumns = [
      {
        title: 'Category',
        dataIndex: YTYKeys[0],
        key: YTYKeys[0],
        width: 150,
      },
      {
        title: YTYKeys[1],
        dataIndex: YTYKeys[1],
        key: YTYKeys[1],
        width: 120,
        render:(data:any)=>(
          <span><Rupees className='inline-block'/>{data}</span>
        )
      },
      {
        title:  YTYKeys[2],
        dataIndex:  YTYKeys[2],
        key:  YTYKeys[2],
        width: 120,
        render:(data:any)=>(
          <span><Rupees className='inline-block'/>{data}</span>
        )
      },
      {
        title:  YTYKeys[3],
        dataIndex:  YTYKeys[3],
        key:  YTYKeys[3],
        width: 100,
        render: (change: string) => (
          <Tag color={change.startsWith('+') ? 'green' : 'red'}>
            {change.startsWith('+') ? <RiseOutlined /> : <FallOutlined />} {change}
          </Tag>
        ),
      },
      {
        title:  YTYKeys[4],
        dataIndex:  YTYKeys[4],
        key:  YTYKeys[4],
        width: 130,
        render:(data:any)=>(
          <span><Rupees className='inline-block'/>{data}</span>
        )
      },
      {
        title:  YTYKeys[5],
        dataIndex:  YTYKeys[5],
        key:  YTYKeys[5],
        width: 130,
        render:(data:any)=>(
          <span><Rupees className='inline-block'/>{data}</span>
        )
      },
    ];
  }
  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sidebar />

      <Layout style={{ marginLeft: 256 , background: '#f9fafb' }}>
        {/* Header */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Title level={3} style={{ margin: 0, marginBottom: 4 }}>
              Spending Trends & Projections
            </Title>
            <Text style={{ color: '#8c8c8c' }}>
              Analyze historical spending patterns and view future projections
            </Text>
          </div>
        </div>

        <Content style={{ padding: '32px' }}>
          {resSpendingTrendsData_S?.data===undefined && <CardLoader showBorder={false}/>}
          {/* Top Metrics Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            {resSpendingTrendsData_S?.data?.spending_trends?.map((metric:any, index:number) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card style={{ height: '100%', textAlign: 'center' }}>
                  <Title level={4} style={{ color: '#8c8c8c', fontSize: 14, fontWeight: 400, marginBottom: 4 }}>
                    {metric.label}
                  </Title>
                  <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
                    {metric.value}
                  </Title>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Tag color={parseInt(metric.growth)>0 ?'green' : 'red'} style={{ margin: 0 }}>
                      {parseInt(metric.growth) >0 ? <RiseOutlined /> : <FallOutlined /> } {metric.growth}
                      
                    </Tag>
                     <Text style={{ color: '#8c8c8c', fontSize: 12 }}>
                    {metric.comparison}
                  </Text>
                  </div>
                 
                </Card>
              </Col>
            ))}
          </Row>
          {resSpendingTrendsData_S==undefined || resSpendingTrendsData_S.length==0 && <BarChartLoader />}
          

          {/* Expense Trends Chart */}
         {/* Expense Trends Chart */}
         { resSpendingTrendsData_S?.data?.expense_forcast !=undefined && 
            <ExpenseTrendsChart chartData={resSpendingTrendsData_S?.data?.expense_forcast}/>
         }
           {resSpendingTrendsData_S?.data===undefined && <LoaderCard count={2} />}
          {/* Bottom Row - Category Distribution and Spending Projections */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            {/* Category Distribution */}
            <Col xs={24} lg={12}>
              <Card style={{ height: "100%" }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Category Distribution
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Breakdown of expenses by category
                </Text>

                <div style={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: 6,
                  marginBottom: 24
                }}>
                  <Text style={{ color: '#8c8c8c' }}>
                    Category distribution chart would appear here
                  </Text>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {categoryData.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: index === 0 ? '#1890ff' : index === 1 ? '#52c41a' : '#faad14'
                      }} />
                      <Text style={{ flex: 1 }}>{item.category}</Text>
                      <Text strong>{item.percentage}</Text>
                      <Text style={{ color: '#8c8c8c' }}>({item.amount})</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* Spending Projections */}
            <Col xs={24} lg={12}>
              <Card style={{ height: "100%" }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Spending Projections
                </Title>
                <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
                  Forecasted expenses for the next 6 months
                </Text>

                <div style={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: 6,
                  marginBottom: 24
                }}>
                  <Text style={{ color: '#8c8c8c' }}>
                    Spending projection chart would appear here
                  </Text>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {projectionsData.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text strong style={{ display: 'block' }}>{item.period}</Text>
                        <Text style={{ color: '#8c8c8c', fontSize: 12 }}>{item.subtitle}</Text>
                      </div>
                      <Text strong style={{ color: '#000', fontSize: 16 }}>{item.amount}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          {/* Spending Anomalies & Insights */}
          <Card style={{ marginBottom: 32 }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              Spending Anomalies & Insights
            </Title>
            <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: 24 }}>
              AI-identified patterns and anomalies in spending data
            </Text>
            {insightsData.length > 0 && insightsData !== undefined ?
              (<Row gutter={[16, 16]}>
                {insightsData.map((insight, index) => (
                  <Col xs={24} md={8} key={index}>
                    <Card
                      size="small"
                      style={{
                        height: '100%',
                        borderLeft: `4px solid ${insight.type === 'warning' ? '#faad14' : insight.type === 'success' ? '#52c41a' : '#1890ff'}`
                      }}
                    >
                      <Title level={5} style={{ margin: 0, marginBottom: 8, fontSize: 14 }}>
                        {insight.title}
                      </Title>
                      <Text style={{ color: '#8c8c8c', fontSize: 12, lineHeight: 1.5 }}>
                        {insight.description}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>)
              : (
                <Empty />
              )
            }
          </Card>
           {resSpendingTrendsData_S?.data===undefined&& <TableLoader />}
          {/* Year-over-Year Comparison */}
          <Card>
            <Title level={4} style={{ marginBottom: 16 }}>
              Year-over-Year Comparison
            </Title>
           
            {resSpendingTrendsData_S?.data?.year_over_year_comparison?.length > 0 && resSpendingTrendsData_S?.data?.year_over_year_comparison !== undefined ?
              (
                <Table
                  dataSource={resSpendingTrendsData_S?.data?.year_over_year_comparison}
                  columns={comparisonColumns}
                  pagination={false}
                  size="middle"
                  style={{ backgroundColor: '#fafafa' }}
                />
              )
              : (
                <Empty />
              )
            }
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SpendingTrends;
