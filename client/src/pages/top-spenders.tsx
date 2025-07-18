import React from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Progress,
  Tabs,
  Button,
  Space,
  DatePicker,
} from "antd";
import {
  CalendarOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Sidebar } from "@/components/dashboard/sidebar";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const TopSpenders = () => {
  // Department metrics data
  const departmentMetrics = [
    {
      department: "Sales Department",
      amount: "$524,398",
      change: "+8.2%",
      changeType: "positive",
      subtitle: "from previous period",
    },
    {
      department: "Engineering",
      amount: "$287,170",
      change: "+5.4%",
      changeType: "positive",
      subtitle: "from previous period",
    },
    {
      department: "Marketing",
      amount: "$224,742",
      change: "+3.1%",
      changeType: "positive",
      subtitle: "from previous period",
    },
    {
      department: "Executive",
      amount: "$124,857",
      change: "+2.8%",
      changeType: "positive",
      subtitle: "from previous period",
    },
  ];

  // Department breakdown data
  const departmentBreakdown = [
    {
      department: "Sales",
      percentage: 42,
      amount: "$524,398",
      change: "+8.2%",
    },
    {
      department: "Engineering",
      percentage: 23,
      amount: "$287,170",
      change: "+5.4%",
    },
    {
      department: "Marketing",
      percentage: 18,
      amount: "$224,742",
      change: "+2.3%",
    },
    {
      department: "Executive",
      percentage: 10,
      amount: "$124,857",
      change: "+12.4%",
    },
    {
      department: "Other Departments",
      percentage: 7,
      amount: "$87,400",
      change: "+1.2%",
    },
  ];

  // Top expense categories by department
  const salesCategories = [
    { category: "Air Travel", amount: "$262,199", percentage: "50%" },
    { category: "Hotels", amount: "$157,319", percentage: "30%" },
    { category: "Ground Transport", amount: "$104,880", percentage: "20%" },
  ];

  const engineeringCategories = [
    { category: "Air Travel", amount: "$143,585", percentage: "50%" },
    { category: "Hotels", amount: "$114,868", percentage: "40%" },
    { category: "Ground Transport", amount: "$28,717", percentage: "10%" },
  ];

  const getProgressColor = (change: string) => {
    return change.startsWith("+") ? "#52c41a" : "#ff4d4f";
  };

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
              Top Spenders
            </Title>
            <Text style={{ color: "#8c8c8c" }}>
              Analyze spending patterns across departments and individuals
            </Text>
          </div>

          <Space>
            <DatePicker.RangePicker
              suffixIcon={<CalendarOutlined />}
              defaultValue={[null, null]}
              placeholder={['Jan 01, 2023', 'Jul 15, 2025']}
              style={{ width: 240 }}
            />
            <Button icon={<FilterOutlined />}>Filters</Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Space>
        </div>

        <Content style={{ padding: "32px"}}>
          {/* Tabs */}
          <Tabs
            defaultActiveKey="category"
            style={{ marginBottom: 32 }}
            className="custom-tabs cls-topspender"
          >
            <TabPane tab="By Department" key="department">
              {/* Department content - existing code */}
              {/* Department Metrics Cards */}
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {departmentMetrics.map((metric, index) => (
                  <Col xs={24} lg={6} key={index}>
                    <Card style={{ height: "100%" }}>
                      <Title
                        level={4}
                        style={{ marginBottom: 16, fontSize: 16 }}
                      >
                        {metric.department}
                      </Title>

                      <Title
                        level={2}
                        style={{ margin: 0, marginBottom: 8, color: "#1890ff" }}
                      >
                        {metric.amount}
                      </Title>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Text
                          style={{
                            color:
                              metric.changeType === "positive"
                                ? "#52c41a"
                                : "#ff4d4f",
                            fontWeight: 500,
                          }}
                        >
                          {metric.change}
                        </Text>
                        <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                          {metric.subtitle}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* Department Spending Breakdown */}
              <Card style={{ marginBottom: 32 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  Department Spending Breakdown
                </Title>
                <Text
                  style={{
                    color: "#8c8c8c",
                    display: "block",
                    marginBottom: 24,
                  }}
                >
                  Detailed analysis of departmental travel expenses
                </Text>

                <div style={{ marginBottom: 24 }}>
                  {departmentBreakdown.map((dept, index) => (
                    <div key={index} style={{ marginBottom: 20 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                          }}
                        >
                          <Text style={{ fontWeight: 500, minWidth: 120 }}>
                            {dept.department}
                          </Text>
                          <Text
                            style={{
                              color: dept.change.startsWith("+")
                                ? "#52c41a"
                                : "#ff4d4f",
                              fontWeight: 500,
                              fontSize: 12,
                            }}
                          >
                            {dept.change}
                          </Text>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Text style={{ fontWeight: 600, fontSize: 16 }}>
                            {dept.amount}
                          </Text>
                          <br />
                          <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                            {dept.percentage}%
                          </Text>
                        </div>
                      </div>
                      <Progress
                        percent={dept.percentage}
                        showInfo={false}
                        strokeColor={getProgressColor(dept.change)}
                        style={{ marginBottom: 4 }}
                      />
                    </div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    borderRadius: 6,
                    marginTop: 24,
                  }}
                >
                  <Text style={{ color: "#8c8c8c" }}>
                    Department spending comparison chart would appear here
                  </Text>
                </div>
              </Card>
            </TabPane>

            <TabPane tab="By Individual" key="individual">
              {/* Top Individual Spenders */}
              <Card style={{ marginBottom: 32 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <div>
                    <Title level={4} style={{ marginBottom: 8 }}>
                      Top Individual Spenders
                    </Title>
                    <Text style={{ color: "#8c8c8c" }}>
                      Employees with highest travel expenses
                    </Text>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Text style={{ color: "#8c8c8c", fontSize: 14 }}>
                      Sort by:
                    </Text>
                    <select
                      style={{
                        padding: "4px 8px",
                        border: "1px solid #d9d9d9",
                        borderRadius: 4,
                        fontSize: 14,
                      }}
                    >
                      <option>Total Spend</option>
                      <option>Trip Count</option>
                      <option>Avg per Trip</option>
                    </select>
                  </div>
                </div>

                {/* Individual Spenders List */}
                <div style={{ marginBottom: 32 }}>
                  {[
                    {
                      rank: 1,
                      name: "Sarah Johnson",
                      department: "Sales",
                      role: "Sales Director",
                      trips: 18,
                      avgPerTrip: 2366,
                      totalSpend: 42580,
                    },
                    {
                      rank: 2,
                      name: "Michael Chen",
                      department: "Executive",
                      role: "VP of Business Development",
                      trips: 12,
                      avgPerTrip: 3229,
                      totalSpend: 38750,
                    },
                    {
                      rank: 3,
                      name: "David Rodriguez",
                      department: "Sales",
                      role: "Senior Account Manager",
                      trips: 15,
                      avgPerTrip: 2361,
                      totalSpend: 35420,
                    },
                    {
                      rank: 4,
                      name: "Emily Wilson",
                      department: "Marketing",
                      role: "Marketing Director",
                      trips: 10,
                      avgPerTrip: 3215,
                      totalSpend: 32150,
                    },
                    {
                      rank: 5,
                      name: "James Taylor",
                      department: "Engineering",
                      role: "Chief Technology Officer",
                      trips: 8,
                      avgPerTrip: 3621,
                      totalSpend: 28970,
                    },
                  ].map((person) => (
                    <div
                      key={person.rank}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "16px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: "#1890ff",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 16,
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: 600 }}>
                          {person.rank}
                        </Text>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 4,
                          }}
                        >
                          <Text style={{ fontWeight: 600, fontSize: 16 }}>
                            {person.name}
                          </Text>
                          <span
                            style={{
                              backgroundColor:
                                person.department === "Sales"
                                  ? "#e6f7ff"
                                  : person.department === "Executive"
                                    ? "#f6ffed"
                                    : person.department === "Marketing"
                                      ? "#fff2e6"
                                      : "#f0f5ff",
                              color:
                                person.department === "Sales"
                                  ? "#1890ff"
                                  : person.department === "Executive"
                                    ? "#52c41a"
                                    : person.department === "Marketing"
                                      ? "#fa8c16"
                                      : "#722ed1",
                              padding: "2px 8px",
                              borderRadius: 4,
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {person.department}
                          </span>
                        </div>
                        <Text style={{ color: "#8c8c8c", fontSize: 14 }}>
                          {person.role}
                        </Text>
                        <div style={{ marginTop: 4 }}>
                          <Text style={{ color: "#595959", fontSize: 12 }}>
                            Trips: {person.trips} | Avg per trip: $
                            {person.avgPerTrip.toLocaleString()}
                          </Text>
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <Text style={{ fontWeight: 600, fontSize: 18 }}>
                          ${person.totalSpend.toLocaleString()}
                        </Text>
                        <br />
                        <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                          Total spend
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Bottom Charts Row */}
              <Row gutter={[24, 24]}>
                {/* Expense Distribution by Role */}
                <Col xs={24} lg={12}>
                  <Card style={{ height: 400 }}>
                    <Title level={4} style={{ marginBottom: 16 }}>
                      Expense Distribution by Role
                    </Title>
                    <Text
                      style={{
                        color: "#8c8c8c",
                        display: "block",
                        marginBottom: 24,
                      }}
                    >
                      Spending patterns across job functions
                    </Text>

                    <div style={{ marginBottom: 24 }}>
                      {[
                        {
                          role: "Directors & VPs",
                          amount: 425780,
                          percentage: 34,
                        },
                        { role: "Managers", amount: 312142, percentage: 25 },
                        {
                          role: "Sales Representatives",
                          amount: 249713,
                          percentage: 20,
                        },
                        { role: "Engineers", amount: 174799, percentage: 14 },
                        { role: "Other Roles", amount: 86133, percentage: 7 },
                      ].map((item, index) => (
                        <div key={index} style={{ marginBottom: 16 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 8,
                            }}
                          >
                            <Text style={{ fontWeight: 500 }}>{item.role}</Text>
                            <Text style={{ fontWeight: 600 }}>
                              ${item.amount.toLocaleString()}
                            </Text>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <Progress
                              percent={item.percentage}
                              showInfo={false}
                              strokeColor={`hsl(${210 + index * 30}, 70%, 50%)`}
                              style={{ flex: 1 }}
                            />
                            <Text
                              style={{
                                color: "#8c8c8c",
                                fontSize: 12,
                                minWidth: 40,
                              }}
                            >
                              {item.percentage}% of total expenses
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>

                {/* Policy Compliance by Top Spenders */}
                <Col xs={24} lg={12}>
                  <Card style={{ height: 400 }}>
                    <Title level={4} style={{ marginBottom: 16 }}>
                      Policy Compliance by Top Spenders
                    </Title>
                    <Text
                      style={{
                        color: "#8c8c8c",
                        display: "block",
                        marginBottom: 24,
                      }}
                    >
                      Adherence to travel policies
                    </Text>

                    <div style={{ marginBottom: 24 }}>
                      {[
                        {
                          name: "Sarah Johnson",
                          compliance: 92,
                          status: "Excellent",
                        },
                        {
                          name: "Michael Chen",
                          compliance: 88,
                          status: "Good",
                        },
                        {
                          name: "David Rodriguez",
                          compliance: 76,
                          status: "Needs Improvement",
                        },
                        {
                          name: "Emily Wilson",
                          compliance: 95,
                          status: "Excellent",
                        },
                        {
                          name: "James Taylor",
                          compliance: 90,
                          status: "Good",
                        },
                      ].map((person, index) => (
                        <div key={index} style={{ marginBottom: 20 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 8,
                            }}
                          >
                            <Text style={{ fontWeight: 500 }}>
                              {person.name}
                            </Text>
                            <span
                              style={{
                                backgroundColor:
                                  person.status === "Excellent"
                                    ? "#f6ffed"
                                    : person.status === "Good"
                                      ? "#e6f7ff"
                                      : "#fff2e6",
                                color:
                                  person.status === "Excellent"
                                    ? "#52c41a"
                                    : person.status === "Good"
                                      ? "#1890ff"
                                      : "#fa8c16",
                                padding: "2px 8px",
                                borderRadius: 4,
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              {person.status}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <Progress
                              percent={person.compliance}
                              showInfo={false}
                              strokeColor={
                                person.status === "Excellent"
                                  ? "#52c41a"
                                  : person.status === "Good"
                                    ? "#1890ff"
                                    : "#fa8c16"
                              }
                              style={{ flex: 1 }}
                            />
                            <Text
                              style={{
                                color: "#8c8c8c",
                                fontSize: 12,
                                minWidth: 60,
                              }}
                            >
                              {person.compliance}% policy compliance
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="By Category" key="category">
              {/* Category Summary Cards */}
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {/* Air Travel Card */}
                <Col xs={24} lg={8}>
                  <Card style={{ height: "100%" }}>
                    <Title
                      level={4}
                      style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}
                    >
                      Air Travel
                    </Title>
                    <Title
                      level={2}
                      style={{
                        margin: 0,
                        marginBottom: 8,
                        color: "#1f2937",
                        fontSize: 32,
                      }}
                    >
                      $567,890
                    </Title>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 16,
                      }}
                    >
                      <Text
                        style={{
                          color: "#52c41a",
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      >
                        +8.2%
                      </Text>
                      <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                        from previous period
                      </Text>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                          International Flights
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 600 }}>
                          $340,734 (60%)
                        </Text>
                      </div>
                      <Progress
                        percent={60}
                        showInfo={false}
                        strokeColor="#1890ff"
                        strokeWidth={6}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                          Domestic Flights
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 600 }}>
                          $227,156 (40%)
                        </Text>
                      </div>
                      <Progress
                        percent={40}
                        showInfo={false}
                        strokeColor="#52c41a"
                        strokeWidth={6}
                      />
                    </div>
                  </Card>
                </Col>

                {/* Hotel Stays Card */}
                <Col xs={24} lg={8}>
                  <Card style={{ height: "100%" }}>
                    <Title
                      level={4}
                      style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}
                    >
                      Hotel Stays
                    </Title>
                    <Title
                      level={2}
                      style={{
                        margin: 0,
                        marginBottom: 8,
                        color: "#1f2937",
                        fontSize: 32,
                      }}
                    >
                      $432,156
                    </Title>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 16,
                      }}
                    >
                      <Text
                        style={{
                          color: "#52c41a",
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      >
                        +5.1%
                      </Text>
                      <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                        from previous period
                      </Text>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                          Premium Hotels
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 600 }}>
                          $172,862 (40%)
                        </Text>
                      </div>
                      <Progress
                        percent={40}
                        showInfo={false}
                        strokeColor="#722ed1"
                        strokeWidth={6}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                          Standard Hotels
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 600 }}>
                          $259,294 (60%)
                        </Text>
                      </div>
                      <Progress
                        percent={60}
                        showInfo={false}
                        strokeColor="#fa8c16"
                        strokeWidth={6}
                      />
                    </div>
                  </Card>
                </Col>

                {/* Ground Transport Card */}
                <Col xs={24} lg={8}>
                  <Card style={{ height: "100%" }}>
                    <Title
                      level={4}
                      style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}
                    >
                      Ground Transport
                    </Title>
                    <Title
                      level={2}
                      style={{
                        margin: 0,
                        marginBottom: 8,
                        color: "#1f2937",
                        fontSize: 32,
                      }}
                    >
                      $248,521
                    </Title>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 16,
                      }}
                    >
                      <Text
                        style={{
                          color: "#52c41a",
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      >
                        +18.7%
                      </Text>
                      <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                        from previous period
                      </Text>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                          Ride Sharing
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 600 }}>
                          $149,113 (60%)
                        </Text>
                      </div>
                      <Progress
                        percent={60}
                        showInfo={false}
                        strokeColor="#13c2c2"
                        strokeWidth={6}
                      />
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                          Car Rentals
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 600 }}>
                          $74,556 (30%)
                        </Text>
                      </div>
                      <Progress
                        percent={30}
                        showInfo={false}
                        strokeColor="#eb2f96"
                        strokeWidth={6}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                          Taxis & Other
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 600 }}>
                          $24,852 (10%)
                        </Text>
                      </div>
                      <Progress
                        percent={10}
                        showInfo={false}
                        strokeColor="#f5222d"
                        strokeWidth={6}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* Category Spending by Department Table */}
              <Card style={{ marginBottom: 32 }}>
                <Title level={4} style={{ marginBottom: 8 }}>
                  Category Spending by Department
                </Title>
                <Text
                  style={{
                    color: "#8c8c8c",
                    display: "block",
                    marginBottom: 24,
                  }}
                >
                  Breakdown of expense categories across departments
                </Text>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "#1f2937",
                            backgroundColor: "#fafafa",
                          }}
                        >
                          Department
                        </th>
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#1f2937",
                            backgroundColor: "#fafafa",
                          }}
                        >
                          Air Travel
                        </th>
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#1f2937",
                            backgroundColor: "#fafafa",
                          }}
                        >
                          Hotels
                        </th>
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#1f2937",
                            backgroundColor: "#fafafa",
                          }}
                        >
                          Ground Transport
                        </th>
                        <th
                          style={{
                            padding: "12px 16px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#1f2937",
                            backgroundColor: "#fafafa",
                          }}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          department: "Sales",
                          airTravel: "$262,199",
                          hotels: "$157,319",
                          groundTransport: "$104,880",
                          total: "$524,398",
                        },
                        {
                          department: "Engineering",
                          airTravel: "$143,585",
                          hotels: "$114,868",
                          groundTransport: "$28,717",
                          total: "$287,170",
                        },
                        {
                          department: "Marketing",
                          airTravel: "$89,897",
                          hotels: "$101,134",
                          groundTransport: "$33,711",
                          total: "$224,742",
                        },
                        {
                          department: "Executive",
                          airTravel: "$49,943",
                          hotels: "$37,457",
                          groundTransport: "$37,457",
                          total: "$124,857",
                        },
                        {
                          department: "Other Departments",
                          airTravel: "$22,266",
                          hotels: "$21,378",
                          groundTransport: "$43,756",
                          total: "$87,400",
                        },
                      ].map((row, index) => (
                        <tr
                          key={index}
                          style={{ borderBottom: "1px solid #f0f0f0" }}
                        >
                          <td
                            style={{
                              padding: "16px",
                              fontWeight: 500,
                              color: "#1f2937",
                            }}
                          >
                            {row.department}
                          </td>
                          <td
                            style={{
                              padding: "16px",
                              textAlign: "right",
                              fontWeight: 500,
                              color: "#595959",
                            }}
                          >
                            {row.airTravel}
                          </td>
                          <td
                            style={{
                              padding: "16px",
                              textAlign: "right",
                              fontWeight: 500,
                              color: "#595959",
                            }}
                          >
                            {row.hotels}
                          </td>
                          <td
                            style={{
                              padding: "16px",
                              textAlign: "right",
                              fontWeight: 500,
                              color: "#595959",
                            }}
                          >
                            {row.groundTransport}
                          </td>
                          <td
                            style={{
                              padding: "16px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#1f2937",
                            }}
                          >
                            {row.total}
                          </td>
                        </tr>
                      ))}
                      {/* Total Row */}
                      <tr
                        style={{
                          borderTop: "2px solid #d9d9d9",
                          backgroundColor: "#fafafa",
                          fontWeight: 600,
                        }}
                      >
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: 600,
                            color: "#1f2937",
                          }}
                        >
                          Total
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#1f2937",
                          }}
                        >
                          $567,890
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#1f2937",
                          }}
                        >
                          $432,156
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#1f2937",
                          }}
                        >
                          $248,521
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#1f2937",
                          }}
                        >
                          $1,248,567
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Chart Placeholder */}
              <Card style={{ marginBottom: 32 }}>
                <div
                  style={{
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    borderRadius: 6,
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: "#d9d9d9",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        alignItems: "end",
                      }}
                    >
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          style={{
                            width: 8,
                            height: Math.random() * 30 + 20,
                            backgroundColor: "#8c8c8c",
                            borderRadius: 2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <Text style={{ color: "#8c8c8c", fontSize: 14 }}>
                    Category spending by department chart would appear here
                  </Text>
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TopSpenders;
