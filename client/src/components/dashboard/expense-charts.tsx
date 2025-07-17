import { Card, Row, Col, Typography, Flex } from "antd";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const { Title } = Typography;

interface ExpenseChartsProps {
  metrics?: {
    totalExpenses: number;
    airTravel: number;
    accommodation: number;
    groundTransport: number;
  };
}

export function ExpenseCharts({ metrics }: ExpenseChartsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

  // Monthly expense trend data
  const monthlyData = [
    { month: "Jan", amount: 65000 },
    { month: "Feb", amount: 85000 },
    { month: "Mar", amount: 45000 },
    { month: "Apr", amount: 75000 },
    { month: "May", amount: 55000 },
  ];

  // Pie chart data for expense distribution
  const distributionData = [
    { name: "Air Travel", value: 45, color: "#4F46E5" },
    { name: "Hotels", value: 35, color: "#8B5CF6" },
    { name: "Ground Transport", value: 20, color: "#EC4899" },
  ];

  const COLORS = ["#4F46E5", "#8B5CF6", "#EC4899"];

  const formatYAxis = (value: number) => {
    return `$${value / 1000}k`;
  };

  const formatTooltip = (value: number, name: string) => {
    return [`$${value.toLocaleString()}`, name];
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ border: "1px solid #ccc" }}>
      <div style={{ borderBottom: "1px solid #ccc", padding: "10px 15px" }}>
        <Title
          level={3}
          style={{ marginBottom: 8, color: "#1f2937", fontWeight: 600 }}
        >
          Expense Breakdown
        </Title>
        <p style={{ color: "#6b7280", margin: 0, fontSize: 14 }}>
          View your expense distribution across categories
        </p>
      </div>

      {/* Time Period Tabs */}
      <div
        style={{
          marginBottom: 24,
          display: "Flex",
          justifyContent: "space-between",
          padding: "13px 15px",
        }}
      >
        <div style={{ display: "flex", gap: 0 }}>
          {["Monthly", "Quarterly", "Yearly"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              style={{
                padding: "8px 16px",
                border: "none",
                background:
                  selectedPeriod === period ? "#1f2937" : "transparent",
                color: selectedPeriod === period ? "white" : "#6b7280",
                fontSize: 14,
                fontWeight: selectedPeriod === period ? 500 : 400,
                cursor: "pointer",
                borderRadius: selectedPeriod === period ? "4px" : "0",
                transition: "all 0.2s ease",
              }}
            >
              {period}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#4F46E5",
                borderRadius: "50%",
              }}
            ></div>
            <span style={{ fontSize: 12, color: "#6b7280" }}>Air Travel</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#8B5CF6",
                borderRadius: "50%",
              }}
            ></div>
            <span style={{ fontSize: 12, color: "#6b7280" }}>Hotels</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#EC4899",
                borderRadius: "50%",
              }}
            ></div>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Ground Transport
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}

      <Row gutter={24} style={{ margin: 0, padding: "10px,15px" }}>
        {/* Monthly Expense Trend Chart */}
        <Col xs={24} lg={12}>
          <Card
            bordered={false}
            style={{
              height: 350,
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <Title
                level={4}
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1f2937",
                }}
              >
                Monthly Expense Trend
              </Title>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <Bar
                  dataKey="amount"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Expense Distribution Pie Chart */}
        <Col xs={24} lg={12}>
          <Card
            bordered={false}
            style={{
              height: 350,
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <Title
                level={4}
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1f2937",
                }}
              >
                Expense Distribution
              </Title>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
