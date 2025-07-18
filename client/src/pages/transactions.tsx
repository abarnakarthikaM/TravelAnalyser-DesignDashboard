import React from "react";
import {
  Layout,
  Card,
  Table,
  Button,
  Input,
  Select,
  Space,
  Typography,
  Tag,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  FilterOutlined,
  DownloadOutlined,
  CalendarOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;
const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface Transaction {
  key: string;
  id: string;
  date: string;
  employee: string;
  category: string;
  description: string;
  amount: number;
  status: "Approved" | "Pending" | "Rejected";
}

const mockTransactions: Transaction[] = [
  {
    key: "1",
    id: "TRX-1248",
    date: "2023-11-15",
    employee: "Sarah Johnson",
    category: "Air Travel",
    description: "Flight to New York - Client...",
    amount: 450.75,
    status: "Approved",
  },
  {
    key: "2",
    id: "TRX-1247",
    date: "2023-11-14",
    employee: "Michael Chen",
    category: "Hotel",
    description: "Marriott - 3 nights - Chi...",
    amount: 825.5,
    status: "Approved",
  },
  {
    key: "3",
    id: "TRX-1246",
    date: "2023-11-14",
    employee: "David Rodriguez",
    category: "Ground Transport",
    description: "Taxi from Airport to Hotel",
    amount: 65.25,
    status: "Pending",
  },
  {
    key: "4",
    id: "TRX-1245",
    date: "2023-11-13",
    employee: "Emily Wilson",
    category: "Meals",
    description: "Dinner with Client - Bos...",
    amount: 128.4,
    status: "Approved",
  },
  {
    key: "5",
    id: "TRX-1244",
    date: "2023-11-13",
    employee: "James Taylor",
    category: "Air Travel",
    description: "Flight to San Francisco -...",
    amount: 685.3,
    status: "Rejected",
  },
  {
    key: "6",
    id: "TRX-1243",
    date: "2023-11-12",
    employee: "Lisa Wang",
    category: "Hotel",
    description: "Hilton - 2 nights - Dalla...",
    amount: 425.0,
    status: "Approved",
  },
  {
    key: "7",
    id: "TRX-1242",
    date: "2023-11-12",
    employee: "Robert Chen",
    category: "Meals",
    description: "Breakfast Meeting - Chi...",
    amount: 48.75,
    status: "Pending",
  },
  {
    key: "8",
    id: "TRX-1241",
    date: "2023-11-11",
    employee: "Jennifer Smith",
    category: "Ground Transport",
    description: "Rental Car - Los Angeles",
    amount: 275.8,
    status: "Approved",
  },
  {
    key: "9",
    id: "TRX-1240",
    date: "2023-11-10",
    employee: "Thomas Garcia",
    category: "Air Travel",
    description: "Flight to Miami - Sales...",
    amount: 520.45,
    status: "Approved",
  },
  {
    key: "10",
    id: "TRX-1239",
    date: "2023-11-10",
    employee: "Amanda Lee",
    category: "Hotel",
    description: "Westin - 4 nights - Seat...",
    amount: 1250.0,
    status: "Pending",
  },
];

const topSpendersData = [
  {
    key: "1",
    employee: "Sarah Johnson",
    department: "Sales",
    transactions: 48,
    totalAmount: 24689.75,
    average: 512,
    status: "Within Budget",
  },
  {
    key: "2",
    employee: "Michael Chen",
    department: "Executive",
    transactions: 32,
    totalAmount: 18750.5,
    average: 586,
    status: "Within Budget",
  },
  {
    key: "3",
    employee: "David Rodriguez",
    department: "Sales",
    transactions: 45,
    totalAmount: 15430.25,
    average: 343,
    status: "Near Limit",
  },
  {
    key: "4",
    employee: "Emily Wilson",
    department: "Marketing",
    transactions: 28,
    totalAmount: 12150.8,
    average: 434,
    status: "Within Budget",
  },
  {
    key: "5",
    employee: "James Taylor",
    department: "Engineering",
    transactions: 22,
    totalAmount: 9670.3,
    average: 440,
    status: "Near Limit",
  },
];

export default function Transactions() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 110,
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: 140,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
      render: (category: string) => {
        const color =
          category === "Air Travel"
            ? "blue"
            : category === "Hotel"
              ? "green"
              : category === "Ground Transport"
                ? "orange"
                : "purple";
        return <Tag color={color}>{category}</Tag>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        const color =
          status === "Approved"
            ? "green"
            : status === "Pending"
              ? "orange"
              : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: () => <Button type="text" icon={<MoreOutlined />} />,
    },
  ];

  const topSpendersColumns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Transactions",
      dataIndex: "transactions",
      key: "transactions",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: "Average",
      dataIndex: "average",
      key: "average",
      render: (avg: number) => `$${avg}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Within Budget"
            ? "green"
            : status === "Near Limit"
              ? "orange"
              : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Sidebar />

      <Layout style={{ marginLeft: 256 }}>
        {/* Header */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
              Transactions
            </Title>
            <Text style={{ color: "#8c8c8c" }}>
              View and manage all travel expense transactions
            </Text>
          </div>

          <Space>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#8c8c8c",
              }}
            >
              <RangePicker />
            </div>
            <Button icon={<FilterOutlined />}>Filters</Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Space>
        </div>

        <Content style={{ padding: "32px" }}>
          {/* Metrics Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Transactions"
                  value={1248}
                  suffix="in current period"
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Approved"
                  value={1052}
                  suffix="in this period"
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Pending"
                  value={156}
                  suffix="pending transactions"
                  valueStyle={{ color: "#faad14" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Rejected"
                  value={40}
                  suffix="rejected transactions"
                  valueStyle={{ color: "#ff4d4f" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Recent Transactions */}
          <Card style={{ marginBottom: 32 }}>
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                Recent Transactions
              </Title>
              <Space>
                <Input
                  placeholder="Search transactions..."
                  prefix={<SearchOutlined />}
                  style={{ width: 200 }}
                />
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Option value="all">All Statuses</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                </Select>
                <Select defaultValue="all" style={{ width: 140 }}>
                  <Option value="all">All Categories</Option>
                  <Option value="air">Air Travel</Option>
                  <Option value="hotel">Hotel</Option>
                  <Option value="transport">Ground Transport</Option>
                  <Option value="meals">Meals</Option>
                </Select>
              </Space>
            </div>

            <Table
              columns={columns}
              dataSource={mockTransactions}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${range[1]} of ${total} transactions`,
              }}
              scroll={{ x: 1000 }}
            />
          </Card>

          {/* Bottom Section - Charts and Top Spenders */}
          <Row gutter={[24, 24]}>
            {/* Transaction Volume Chart */}
            <Col xs={24} lg={12}>
              <Card style={{ height: 400 }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Transaction Volume
                </Title>
                <Text
                  style={{
                    color: "#8c8c8c",
                    display: "block",
                    marginBottom: 24,
                  }}
                >
                  Monthly transaction count and amount
                </Text>
                <div
                  style={{
                    height: 280,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    borderRadius: 6,
                    color: "#8c8c8c",
                  }}
                >
                  Transaction volume chart would appear here
                </div>
              </Card>
            </Col>

            {/* Transaction Status Chart */}
            <Col xs={24} lg={12}>
              <Card style={{ height: 400 }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Transaction Status
                </Title>
                <Text
                  style={{
                    color: "#8c8c8c",
                    display: "block",
                    marginBottom: 24,
                  }}
                >
                  Breakdown by approval status
                </Text>
                <div
                  style={{
                    height: 280,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    borderRadius: 6,
                    color: "#8c8c8c",
                  }}
                >
                  Transaction status chart would appear here
                </div>
              </Card>
            </Col>

            {/* Top Spenders */}
            <Col xs={24} lg={24}>
              <Card style={{ height: 400 }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Top Spenders
                </Title>
                <Text
                  style={{
                    color: "#8c8c8c",
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  Employees with highest transaction volume
                </Text>
                <Table
                  columns={topSpendersColumns}
                  dataSource={topSpendersData}
                  pagination={false}
                  size="small"
                  scroll={{ y: 240 }}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
