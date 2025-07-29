import { Card, Row, Col, Typography, Flex, Empty } from "antd";
import { useState, } from "react";
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
  Tooltip
} from "recharts";
import { Rupees } from "../ui/icons";

const { Title } = Typography;

interface ExpenseChartsProps {
  metrics?: {
    expense_breakdown: {
      totalExpenses: number;
      airTravel: number;
      accommodation: number;
      groundTransport: number;
    }

  };
}

export function ExpenseCharts({ metrics }: any) {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  // let initialata = metrics?.expense_breakdown[selectedPeriod].expense_trend;

  const selectedData = metrics?.expense_breakdown?.[selectedPeriod]?.expense_trend ?? [];

  const chartData = selectedData.map((data: any) => ({
    ...data,
    amount: parseFloat(data.amount.replace(/,/g, '')),
  }));
  const sortedChartData = [...chartData].sort((a, b) => {
    if (selectedPeriod === "Monthly") {
      const [monthA, yearA] = a.month.split("-").map(Number);
      const [monthB, yearB] = b.month.split("-").map(Number);
      return new Date(yearA, monthA - 1).getTime() - new Date(yearB, monthB - 1).getTime();
    } else if (selectedPeriod === "Quarterly") {
      const [quarterA, yearA] = a.q1.split("-"); // Q1-2025
      const [quarterB, yearB] = b.q1.split("-");
      const quarterMap = { Q1: 0, Q2: 1, Q3: 2, Q4: 3 };
      const dateA = new Date(parseInt(yearA), quarterMap[quarterA as keyof typeof quarterMap]);
      const dateB = new Date(parseInt(yearB), quarterMap[quarterB as keyof typeof quarterMap]);
      return dateA.getTime() - dateB.getTime();
    } else {
      return parseInt(a.year) - parseInt(b.year);
    }
  });

  const RupeesIcon = () => (
    <svg width="12" height="12" viewBox="0 0 256 256" fill="#6b7280">
      <path d="M208,80a8.00039,8.00039,0,0,1-8,8H167.85156c.08789,1.32373.14844,2.65454.14844,4a60.06812,60.06812,0,0,1-60,60H92.69238l72.68946,66.08008a8.0006,8.0006,0,0,1-10.76368,11.83984l-88-80A8.0004,8.0004,0,0,1,72,136h36a44.04978,44.04978,0,0,0,44-44c0-1.34912-.0708-2.68164-.18994-4H72a8,8,0,0,1,0-16h75.17188A44.03678,44.03678,0,0,0,108,48H72a8,8,0,0,1,0-16H200a8,8,0,0,1,0,16H148.73535a60.16006,60.16006,0,0,1,15.82422,24H200A8.00039,8.00039,0,0,1,208,80Z" />
    </svg>
  );
  // monthlyData=metrics.expense_breakdown[selectedPeriod].expense_trend
  // Pie chart data for expense distribution
  // expense_distribution
  // const distributionData = [
  //   { name: "Air Travel", value: 45, color: "#4F46E5" },
  //   { name: "Hotels", value: 35, color: "#8B5CF6" },
  //   { name: "Ground Transport", value: 20, color: "#EC4899" },
  // ];
  const distributionData = JSON.parse(JSON.stringify(metrics?.expense_breakdown[selectedPeriod].expense_distribution));
  const filteredDistributionData = distributionData.filter((data: any) => data.amount > 0);

  distributionData.map((data: any) => {
    switch (data.category) {
      case 'Air Travel':
        data.color = "#4F46E5"
        break;
      case 'Hotel Stays':
        data.color = "#8B5CF6"
        break;
      case 'Ground Transport':
        data.color = "#EC4899"
        break;
    }
  })
  const COLORS = ["#4F46E5", "#8B5CF6", "#EC4899"];

  // Format labels based on period
  const formatYAxis = (value: number): string => {
    if (value == null || isNaN(value)) return '0';

    if (value >= 1_000_000) {
      // Check if it's a whole million to avoid .0
      const millions = value / 1_000_000;
      if (millions % 1 === 0) { // If it's a whole number (e.g., 40.0)
        return `${millions.toFixed(0)}M`; // Format without decimals
      }
      return `${millions.toFixed(1)} M`;
    }
    if (value >= 1_000) {
      // Check if it's a whole thousand to avoid .0
      const thousands = value / 1_000;
      if (thousands % 1 === 0) { // If it's a whole number (e.g., 10.0)
        return `${thousands.toFixed(0)} K`; // Format without decimals
      }
      return `${thousands.toFixed(1)} K`;
    }
    return `${value}`;
  };

  const xAxisKey =
    selectedPeriod === "Monthly"
      ? "month"
      : selectedPeriod === "Quarterly"
        ? "q1"
        : "year";

  // Format labels based on period
  const formatXAxis = (value: string) => {
    if (selectedPeriod === "Monthly") {
      return value; // Shows as "MM-YYYY"
    } else if (selectedPeriod === "Quarterly") {
      return value; // Shows as "QX-YYYY"
    }
    return value; // Yearly shows as "YYYY"
  };

  const formatTooltip = (value: number, name: string) => {
    return [`$${value.toLocaleString()}`, name];
  };
  console.log(selectedPeriod)
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
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "6px" }}>
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "10px 15px" }}>
        <Title
          level={4}
          style={{ marginBottom: 4, color: "#1f2937", fontWeight: 600 }}
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
          display: "Flex",
          justifyContent: "space-between",
          padding: "13px 15px",
        }}
      >
        <div style={{ display: "flex", gap: 0, background: "#f5f5f5" }}>
          {["Monthly", "Quarterly", "Yearly"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              style={{
                padding: "8px 16px",
                border: "none",
                background:
                  selectedPeriod === period ? "#0c265a" : "transparent",
                color: selectedPeriod === period ? "white" : "#6b7280",
                fontSize: 14,
                fontWeight: selectedPeriod === period ? 500 : 400,
                cursor: "pointer",
                borderRadius: selectedPeriod === period ? "4px" : "0",
                transition: "all 0.2s ease",
                margin: '4px'
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
        <Col xs={24} lg={12} style={{ marginBottom: "15px" }}>
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
                {selectedPeriod} Expense Trend
              </Title>
            </div>
            {chartData.length > 0 ?
              (
                <ResponsiveContainer width="100%" height={250} style={{ position: "relative", right: "10px" }}>
                  <BarChart
                    data={sortedChartData}
                    margin={{ top: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                      dataKey={xAxisKey}
                      tickFormatter={formatXAxis}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={({ x, y, payload }) => (
                        <g transform={`translate(${x},${y})`}>
                          <foreignObject x={-60} y={-15} width={60} height={20}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: '#6b7280', fontSize: 12 }}>
                              <Rupees />
                              {payload.value / 1000}k
                            </div>
                          </foreignObject>
                        </g>
                      )}
                    />
                    <Tooltip
                      formatter={(value: number) => `${value.toLocaleString()}`}
                      labelStyle={{ fontWeight: 500, color: "#374151" }}
                      contentStyle={{ backgroundColor: "#fff", borderRadius: 8, border: "1px solid #e5e7eb" }}
                      cursor={{ fill: "#f9fafb" }}
                    />
                    <Bar
                      dataKey="amount"
                      fill="#4F46E5"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={15}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Empty />
              )
            }

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
            {distributionData.length > 0 ?
              (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={filteredDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      dataKey="amount"
                      nameKey="category"
                    >
                      {distributionData.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) =>
                        [`${ value.toLocaleString() }`, name]
                      }
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                      }}
                      labelStyle={{ fontWeight: 500, color: "#374151" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )
              : (
                <Empty />
              )
            }
          </Card>
        </Col>
      </Row>
    </div>
  );
}
