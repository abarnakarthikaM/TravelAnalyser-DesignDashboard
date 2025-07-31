
import React, { useMemo, useState } from 'react';
import { Card, Select, Space, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;
const { Option } = Select;

interface ExpenseTrendsChartProps {
    chartData:any
}

export const ExpenseTrendsChart: React.FC<ExpenseTrendsChartProps> = ({chartData}) => {
const [timePeriod, setTimePeriod] = useState('monthly');
const [travelMode, setTravelMode] = useState('all');

    console.log(chartData)
 

  // Transform data based on selected filters
  const expenseTrendsData = useMemo(() => {
    const dataSource = timePeriod === 'quarterly' ? 'quarterly' : 'monthly';
    
    if (timePeriod === 'yearly') {
      // For yearly view, aggregate the data
      return [{
        period: '2025-2026',
        airline: Math.round(chartData?.service_type_breakdown?.airline.total / 1000000),
        hotel: Math.round(chartData?.service_type_breakdown?.hotel.total / 1000000),
        ground: Math.round(chartData?.service_type_breakdown?.ground.total / 1000000)
      }];
    }

    const periods = Object.keys(chartData?.service_type_breakdown?.airline[dataSource]);
    
    return periods.map(period => ({
      period: period,
      airline: Math.round(chartData?.service_type_breakdown?.airline[dataSource][period] / 1000000),
      hotel: Math.round(chartData?.service_type_breakdown?.hotel[dataSource][period] / 1000000),
      ground: Math.round(chartData?.service_type_breakdown?.ground[dataSource][period] / 1000000)
    }));
  }, [timePeriod]);

  // Filter data based on travel mode selection
  const filteredData = useMemo(() => {
    console.log(travelMode)
    if (travelMode === 'all') return expenseTrendsData;
    
    return expenseTrendsData.map(item => {
      const filtered:any = { period: item.period };
      if (travelMode === 'airline' || travelMode === 'air') filtered.airline = item.airline;
      if (travelMode === 'hotel' || travelMode === 'hotels') filtered.hotel = item.hotel;
      if (travelMode === 'ground' || travelMode === 'transport') filtered.ground = item.ground;
      return filtered;
    });
  }, [expenseTrendsData, travelMode]);

  return (
    <Card style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
            Expense Trends Over Time
          </Title>
          <Text style={{ color: '#8c8c8c' }}>
            {timePeriod[0].toUpperCase() + timePeriod.slice(1)} expense breakdown by category
          </Text>
        </div>
        <Space>
          <Select 
            value={timePeriod} 
           onChange={(value) => setTimePeriod(value)} 
            style={{ width: 120 }}
          >
            <Option value="monthly">Monthly</Option>
            <Option value="quarterly">Quarterly</Option>
            {/* <Option value="yearly">Yearly</Option> */}
          </Select>
          <Select 
            value={travelMode} 
            onChange={(value)=>setTravelMode(value)} 
            style={{ width: 140 }}
          >
            <Option value="all">All Categories</Option>
            <Option value="airline">Airline</Option>
            <Option value="hotel">Hotels</Option>
            <Option value="ground">Ground Transport</Option>
          </Select>
        </Space>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="period" stroke="#8c8c8c" />
          <YAxis stroke="#8c8c8c" tickFormatter={(value) => `$${value}M`} />
          <Tooltip 
            formatter={(value, name) => [`$${value}M`, name]}
            labelStyle={{ color: '#1f2937' }}
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '6px'
            }}
          />
          {(travelMode === 'all' || travelMode === 'airline') && (
            <Line 
              type="monotone" 
              dataKey="airline" 
              stroke="#6366f1" 
              strokeWidth={2}
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
              name="Airline"
            />
          )}
          {(travelMode === 'all' || travelMode === 'hotel') && (
            <Line 
              type="monotone" 
              dataKey="hotel" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              name="Hotels"
            />
          )}
          {(travelMode === 'all' || travelMode === 'ground') && (
            <Line 
              type="monotone" 
              dataKey="ground" 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
              name="Ground Transport"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
