import React, { useEffect, useState } from "react";
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
  Empty,
  Tabs,
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
import { CardLoader, LoaderCard, TableLoader } from "@/components/Loader/Loader";
import { calculateDateValues, formatDate } from "@/utils/dateFunctions";
import { Filter } from "lucide-react";
import { useLazyGetTransactionServiceQuery } from "@/services/dashboard/dashboard";
import { Rupees } from "@/components/ui/icons";
import { MetricsCards } from "@/components/dashboard/metrics-cards";

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
export default function Transactions() {
  const [activeTab, setActiveTab] = useState("transactionsummary");
  const [dateFilter, setDateFilter] = useState("today");
  const [tabValue, setTabValue] = useState("overview");
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<any>([]);
  const { Option } = Select;
  const [resDatpickerValues, setDatpickerValues] = useState<any>([]);
  const [resTransactionOverview_S, setTransactionOverview_S] = useState<any>([])
  const [resRecentTransaction_S, setRecentTransaction_S] = useState<any>([])
  const [resTransactiontabData_S, setResTransactiontabData_S] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // Calculate paginated data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  // const paginatedTransactions = resRecentTransaction_S.data.transactions.slice(startIndex, endIndex);



  const [reqTransactionOverview, resTransactionOverview] = useLazyGetTransactionServiceQuery();
  const [reqRecentTransaction, resRecentTransaction] = useLazyGetTransactionServiceQuery();
  const [reqTransactionTabData, resTransactiontabData] = useLazyGetTransactionServiceQuery();



  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
      setCurrentPage(1); // Reset to first page when page size changes
    }
  };

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
      render: (amount: any) => {
        const num = Number(amount);
        return (
          <>
            <Rupees className="inline-block" />
            {isNaN(num) ? "--" : num.toFixed(2)}
          </>
        );
      },
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
      dataIndex: "total_amount",
      key: "totalAmount",
      render: (amount: number) =>
        <>
          <Rupees className="inline-block" />
          {amount}
        </>,
    },
    {
      title: "Average",
      dataIndex: "average",
      key: "average",
      render: (avg: number) =>
        <>
          <Rupees className="inline-block" />
          {avg}
        </>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => {
        const color = record.status_color; // fallback color
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];
  /***********
    * Des:this function call's when change the date picker option
    */
  const handleDateFilterChange = (value: any) => {
    setDateFilter(value);
    if (value === "date-range") {
      setOpen(true);
      setDateFilter(value);
    } else {
      setDateRange([]);
      setDatpickerValues(calculateDateValues(value))
      setOpen(false);
    }
  };
  /******
   * Des:this function hanndles the date range picker value changes
   */
  const handleDateRangeChange = (dates: any, dateStrings: [any, any]) => {
    setDateFilter("date-range");
    setDateRange(dates);
    setOpen(false);
    if (dates && dates.length === 2) {
      if (dateFilter === "date-range" && dateStrings && dateStrings.length === 2) {
        setDatpickerValues(dateStrings);
      }
      setDateFilter(formatDate(dateStrings[0]) + ' - ' + formatDate(dateStrings[1]));
    }
  };
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };
  /**********
   * Des:transaction over view service call
   */
  useEffect(() => {
    if (resDatpickerValues?.length === 0) {
      setDatpickerValues(calculateDateValues(dateFilter))
    }
    else if (resDatpickerValues.length === 2) {
      let reqData: any = {
        data: {
          start_date: resDatpickerValues[0],
          end_date: resDatpickerValues[1],
        },
        url: "transactions/overview/"
      }
      reqTransactionOverview({ RequestDataFormat: reqData });
    }
  }, [resDatpickerValues]);

  /**********
 * Des:transaction over view service call response
 */
  useEffect(() => {
    if (resTransactionOverview.isSuccess) {
      setTransactionOverview_S(resTransactionOverview)
    }
  }, [resTransactionOverview])
  /**************
   * Des: Recent Transactions table data service call
   */
  useEffect(() => {
    if (resDatpickerValues?.length === 0) {
      setDatpickerValues(calculateDateValues(dateFilter))
    }
    else if (resDatpickerValues.length === 2) {
      let reqData: any = {
        data: {
          start_date: resDatpickerValues[0],
          end_date: resDatpickerValues[1],
          status: 'all',
          travel_type: 'all',
          page: 1,
          page_size: 10
        },
        url: "transactions/recent/"
      }
      reqRecentTransaction({ RequestDataFormat: reqData });
    }
  }, [resDatpickerValues]);
  /**********
 * Des:transaction over view service call response
 */
  useEffect(() => {
    if (resRecentTransaction.isSuccess) {
      setRecentTransaction_S(resRecentTransaction.data)

    }
  }, [resRecentTransaction])

  /*******************
   * Des:transaction tab based service call
   */
  useEffect(() => {
    if (resDatpickerValues.length === 2) {
      let reqData: any = {
        data: {
          start_date: '2025-03-15',
          end_date: '2025-06-15'
        },
        url: "transactions/" + activeTab + '/'
      }
      reqTransactionTabData({ RequestDataFormat: reqData });
    }
  }, [resDatpickerValues, activeTab]);

  /**********
 * Des:transaction over view service call response
 */
  useEffect(() => {

    if (resTransactiontabData.isSuccess) {
      setResTransactiontabData_S(resTransactiontabData)
    }
  }, [resTransactiontabData])
  // Filter transactions based on search and filters
  const filteredTransactions = resRecentTransaction_S?.data?.transactions.filter((transaction: any) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.employee.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = statusFilter === "all" ||
      transaction.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesCategory = categoryFilter === "all" ||
      (categoryFilter === "air" && transaction.category === "Air Travel") ||
      (categoryFilter === "hotel" && transaction.category === "Hotel") ||
      (categoryFilter === "transport" && transaction.category === "Ground Transport") ||
      (categoryFilter === "meals" && transaction.category === "Meals");

    return matchesSearch && matchesStatus && matchesCategory;
  });
  const paginatedTransactions = filteredTransactions?.slice(startIndex, endIndex);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout style={{ marginLeft: 256, background: '#f9fafb' }}>
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
            <Title level={3} style={{ margin: 0, marginBottom: 4 }}>
              Transactions
            </Title>
            <Text style={{ color: "#8c8c8c" }}>
              View and manage all travel expense transactions
            </Text>
          </div>

          <Space size="middle" className="cls-datefilter-space">
            <Select
              value={dateFilter}
              style={{ width: 215 }}
              onChange={handleDateFilterChange}
            >
              <Option value="today">Today</Option>
              <Option value="yesterday">Yesterday</Option>
              <Option value="this-week">This week</Option>
              <Option value="last-week">Last week</Option>
              <Option value="this-month">This Month</Option>
              <Option value="last-month">Last Month</Option>
              <Option value="date-range">Date Range</Option>
            </Select>

            <DatePicker.RangePicker
              open={open}
              value={dateRange}
              onChange={handleDateRangeChange}
              onOpenChange={(status) => setOpen(status)}
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
          </Space>
        </div>

        <Content style={{ padding: "32px" }}>
          {/* Metrics Cards */}
          {resTransactionOverview.isSuccess && !resTransactionOverview.isLoading && resTransactionOverview_S?.data?.data?.overview_cards !== undefined ?
            (
              <Row gutter={[24, 24]} style={{ marginTop: 16 }}>
                {/* {resTransactionOverview_S?.data?.data?.overview_cards.map((overviewData: any) => (
                  <Col style={{ width: "196px", height: "150px" }}>
                    <Card style={{ height: "100%" }}>
                      <Statistic
                        title={overviewData.title}
                        value={overviewData.count}
                        suffix={
                          <span style={{ color: "#8C8C8C", fontSize: "12px", lineHeight: "1.5", display: "inline-block" }}>
                            {overviewData.description ? overviewData.description : overviewData.change_percentage + 'in current period'}
                          </span>
                        }
                      />
                    </Card>
                  </Col>
                ))} */}
                <MetricsCards metrics={resTransactionOverview_S?.data?.data?.overview_cards} pathName={"Transaction"} />
              </Row>
            ) :
            (
              <CardLoader showBorder={false} />
            )
          }


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
                  value={searchText}
                  onChange={handleSearchChange}
                />
                <Select defaultValue="all" style={{ width: 120 }} value={statusFilter}
                  onChange={handleStatusFilterChange}>
                  <Option value="all">All Statuses</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                </Select>
                <Select defaultValue="all" style={{ width: 140 }} value={categoryFilter}
                  onChange={handleCategoryFilterChange}>
                  <Option value="all">All Categories</Option>
                  <Option value="air">Air Travel</Option>
                  <Option value="hotel">Hotel</Option>
                  <Option value="transport">Ground Transport</Option>
                </Select>
              </Space>
            </div>
            {resRecentTransaction.isSuccess && !resRecentTransaction.isLoading ?
              (<>
                {paginatedTransactions && paginatedTransactions !== undefined ?
                  (
                    <Table
                      columns={columns}
                      dataSource={paginatedTransactions}
                      pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: filteredTransactions?.length,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        onChange: handlePageChange,
                        onShowSizeChange: handlePageChange,
                        showTotal: (total, range) =>
                          `Showing ${range[0]}-${range[1]} of ${total} transactions`,
                        pageSizeOptions: ['5', '10', '20', '50'],
                      }}
                    />
                  )
                  : (
                    <Empty className="cls-whole-empty" />
                  )}
              </>) : (
                <TableLoader />
              )
            }

          </Card>
          {/* Bottom Section - Charts and Top Spenders */}
          <Row gutter={[24, 24]}>
            {/* Transaction Volume Chart */}
            {/* <Col xs={24} lg={12}>
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
            </Col> */}

            {/* Tab Section */}
            <Col xs={24} lg={24}>
              <div style={{ marginBottom: 32 }}>
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  items={[
                    {
                      key: "transactionsummary",
                      label: "Transaction Summary",
                      children: (
                        <>
                          <Row gutter={[24, 24]}>
                            {/* <LoaderCard count={2} /> */}
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
                          </Row>

                          {/* Top Spenders */}
                          {resTransactiontabData_S?.data?.data?.top_spenders != undefined &&
                            <Card style={{ height: 400, marginTop: 24 }}>
                              <Title level={4} style={{ marginBottom: 8 }}>
                                {resTransactiontabData_S?.data?.data?.top_spenders?.title}
                              </Title>
                              <Text
                                style={{
                                  color: "#8c8c8c",
                                  display: "block",
                                  marginBottom: 16,
                                }}
                              >
                                {resTransactiontabData_S?.data?.data?.top_spenders?.description}

                              </Text>
                              {resTransactiontabData_S?.data?.data?.top_spenders?.data && resTransactiontabData_S?.data?.data?.top_spenders?.data !== undefined ?
                                (<Table
                                  columns={topSpendersColumns}
                                  dataSource={resTransactiontabData_S?.data?.data?.top_spenders?.data}
                                  pagination={false}
                                  size="small"
                                  scroll={{ y: 240 }}
                                />)
                                : (
                                  <Empty />
                                )}
                            </Card>
                          }
                        </>
                      ),
                    },
                    {
                      key: "by_category",
                      label: "By Category",
                      children: (
                        // {resTransactiontabData?.data?.data?.category_overview}
                        <div>
                          {/* Category Summary Cards */}
                          {resTransactiontabData.isSuccess && !resTransactiontabData.isLoading && resTransactiontabData_S?.data?.data?.category_overview?.cards !== undefined ?
                            (<Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                              {/* {resTransactiontabData_S?.data?.data?.category_overview?.cards?.map((data: any) => (
                                <Col xs={24} sm={12} lg={6}>
                                  <Card style={{ height: "100%" }}>
                                    <Title
                                      level={4}
                                      style={{ marginBottom: 8, fontWeight: 600 }}
                                    >
                                      {data.category}
                                    </Title>
                                    <Title
                                      level={4}
                                      style={{
                                        margin: 0,
                                        marginBottom: 8,
                                        color: "#1f2937",
                                      }}
                                    >
                                      {data.total_amount}
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
                                        {data.percentage} % of total
                                      </Text>
                                    </div>
                                    <Text style={{ color: "#8c8c8c", fontSize: 14 }}>
                                      {data.transaction_count} transactions
                                    </Text>
                                  </Card>
                                </Col>
                              ))} */}
                              <MetricsCards metrics={resTransactiontabData_S?.data?.data?.category_overview?.cards} pathName={"Transaction_category"} />
                            </Row>
                            ) :
                            (
                              <CardLoader showBorder={false} />
                            )
                          }

                          {/* Category Breakdown */}
                          <Card style={{ marginBottom: 32 }}>
                            <Title level={4} style={{ marginBottom: 8 }}>
                              Category Breakdown
                            </Title>
                            <Text
                              style={{
                                color: "#8c8c8c",
                                display: "block",
                                marginBottom: 24,
                              }}
                            >
                              Detailed analysis of spending by category
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
                              Category breakdown chart would appear here
                            </div>
                          </Card>
                          {resTransactiontabData.isSuccess && !resTransactiontabData.isLoading ?
                            (<Row gutter={[24, 24]}>
                              {/* Top Vendors */}
                              {resTransactiontabData_S?.data?.data?.top_vendors != undefined &&
                                <Col xs={24} lg={12}>
                                  <Card style={{ height: 400 }}>
                                    <Title level={4} style={{ marginBottom: 8 }}>
                                      {resTransactiontabData_S?.data?.data?.top_vendors?.title}
                                    </Title>
                                    <Text
                                      style={{
                                        color: "#8c8c8c",
                                        display: "block",
                                        marginBottom: 16,
                                      }}>
                                      {resTransactiontabData_S?.data?.data?.top_vendors?.description}
                                    </Text>
                                    <Table
                                      columns={[
                                        {
                                          title: "Vendor",
                                          dataIndex: "vendor",
                                          key: "vendor",
                                        },
                                        {
                                          title: "Category",
                                          dataIndex: "category",
                                          key: "category",
                                        },
                                        {
                                          title: "Transactions",
                                          dataIndex: "transaction_count",
                                          key: "transaction_count",
                                        },
                                        {
                                          title: "Amount",
                                          dataIndex: "total_amount",
                                          key: "total_amount"
                                        },
                                      ]}
                                      dataSource={resTransactiontabData_S?.data?.data?.top_vendors.data}
                                      pagination={false}
                                      size="small"
                                      scroll={{ y: 240 }}
                                    />
                                  </Card>
                                </Col>
                              }

                              {/* Category Trends */}
                              <Col xs={24} lg={12}>
                                <Card style={{ height: 400 }}>
                                  <Title level={4} style={{ marginBottom: 8 }}>
                                    Category Trends
                                  </Title>
                                  <Text
                                    style={{
                                      color: "#8c8c8c",
                                      display: "block",
                                      marginBottom: 24,
                                    }}
                                  >
                                    Monthly spending trends by category
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
                                    Category trends chart would appear here
                                  </div>
                                </Card>
                              </Col>
                            </Row>)
                            : (
                              <LoaderCard count={2} />
                            )
                          }
                        </div>
                      ),
                    },

                    {
                      key: "payment_methods",
                      label: "Payment Methods",
                      children: (
                        <div>
                          {/* Payment Method Summary Cards */}
                          {resTransactiontabData.isSuccess && !resTransactiontabData.isLoading && resTransactiontabData_S?.data?.data?.payment_method_overview?.cards !== undefined ?
                            (<Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                              {/* {resTransactiontabData_S?.data?.data?.payment_method_overview?.cards?.map((data: any) => (
                              <Col xs={24} sm={12} lg={6}>
                                <Card style={{ height: "100%" }}>

                                  <Title
                                    level={4}
                                    style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}
                                  >
                                    {data.method}
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
                                    {data.total_amount}
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
                                      {data.percentage}
                                    </Text>
                                    <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                                      of total
                                    </Text>
                                  </div>
                                  <Text style={{ color: "#8c8c8c", fontSize: 14 }}>
                                    {data.transaction_count} transactions
                                  </Text>
                                </Card>
                              </Col>
                            ))} */}
                              <MetricsCards metrics={resTransactiontabData_S?.data?.data?.payment_method_overview?.cards} pathName={"Transaction_payments"} />
                            </Row>) :
                            (
                              <CardLoader showBorder={false} />
                            )
                          }

                          {/* Payment Method Analysis */}
                          <Card style={{ marginBottom: 32 }}>
                            <Title level={4} style={{ marginBottom: 8 }}>
                              Payment Method Analysis
                            </Title>
                            <Text
                              style={{
                                color: "#8c8c8c",
                                display: "block",
                                marginBottom: 24,
                              }}
                            >
                              Comparison analysis over time by type
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
                              Payment method analysis chart would appear here
                            </div>
                          </Card>

                          {/* Corporate Card Usage */}
                          {resTransactiontabData.isSuccess && !resTransactiontabData.isLoading ?
                            (
                              <Card>
                                <Title level={4} style={{ marginBottom: 8 }}>
                                  {resTransactiontabData_S?.data?.data?.corporate_card_usage?.title}
                                </Title>
                                <Text
                                  style={{
                                    color: "#8c8c8c",
                                    display: "block",
                                    marginBottom: 24,
                                  }}
                                >
                                  {resTransactiontabData_S?.data?.data?.corporate_card_usage?.description}
                                </Text>

                                {/* Corporate Card Statistics */}
                                <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                                  <Col xs={24} sm={8}>
                                    <div style={{ textAlign: "center" }}>
                                      <Text style={{ color: "#8c8c8c", fontSize: 14, display: "block" }}>
                                        Total Avg Transaction
                                      </Text>
                                      <Title level={2} style={{ margin: 0, color: "#1f2937" }}>
                                        {resTransactiontabData_S?.data?.data?.corporate_card_usage?.overview.average_transaction}
                                      </Title>
                                      {/* <Text style={{ color: "#52c41a", fontSize: 14 }}>
                                            +8% from last month
                                          </Text> */}
                                    </div>
                                  </Col>
                                  <Col xs={24} sm={8}>
                                    <div style={{ textAlign: "center" }}>
                                      <Text style={{ color: "#8c8c8c", fontSize: 14, display: "block" }}>
                                        First Time Rate
                                      </Text>
                                      <Title level={2} style={{ margin: 0, color: "#1f2937" }}>
                                        {resTransactiontabData_S?.data?.data?.corporate_card_usage?.overview.utilization_rate}
                                      </Title>
                                      {/* <Text style={{ color: "#52c41a", fontSize: 14 }}>
                                            +2% from last filing
                                          </Text> */}
                                    </div>
                                  </Col>
                                  <Col xs={24} sm={8}>
                                    <div style={{ textAlign: "center" }}>
                                      <Text style={{ color: "#8c8c8c", fontSize: 14, display: "block" }}>
                                        Policy Compliance
                                      </Text>
                                      <Title level={2} style={{ margin: 0, color: "#1f2937" }}>
                                        {resTransactiontabData_S?.data?.data?.corporate_card_usage?.overview.utilization_rate}
                                      </Title>
                                      {/* <Text style={{ color: "#52c41a", fontSize: 14 }}>
                                            +5% from last review period
                                          </Text> */}
                                    </div>
                                  </Col>
                                </Row>

                                {/* Top Corporate Card Users Table */}
                                <div style={{ marginBottom: 16 }}>
                                  <Title level={5} style={{ margin: 0, marginBottom: 16 }}>
                                    {resTransactiontabData_S?.data?.data?.corporate_card_usage?.top_corporate_card_users.title}
                                  </Title>
                                </div>
                                <Table
                                  columns={[
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
                                      title: "Amount",
                                      dataIndex: "amount",
                                      key: "amount",
                                      render: (amount: number) => `$${amount.toLocaleString()}`,
                                    },
                                    {
                                      title: "Card Type",
                                      dataIndex: "card_types",
                                      key: "card_types",
                                      render: (type: string) => {
                                        const color = type === "BTA" ? "blue" : type === "Gold" ? "orange" : "purple";
                                        return <Tag color={color}>{type}</Tag>;
                                      },
                                    },
                                  ]}
                                  dataSource={resTransactiontabData_S?.data?.data?.corporate_card_usage?.top_corporate_card_users.data}
                                  pagination={false}
                                  size="small"
                                />
                              </Card>
                            ) : (
                              <TableLoader />
                            )
                          }
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
