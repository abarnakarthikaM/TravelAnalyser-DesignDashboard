import React, { useEffect, useState } from "react";
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
  Select,
} from "antd";
import {
  CalendarOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import dayjs from 'dayjs'
import { Sidebar } from "@/components/dashboard/sidebar";
import { useLazyGettopSpenderQuery } from "@/services/dashboard/dashboard";
import { formatDate,calculateDateValues } from "@/utils/dateFunctions";
import { Filter } from "lucide-react";

const TopSpenders = () => {
  const [dateFilter, setDateFilter] = useState("today");
  const [tabValue, setTabValue] = useState("department");
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<any>([]);
  const [resDatpickerValues, setDatpickerValues] = useState<any>([]);
const [resTopSpender_S,setTopSpender_S] = useState<any>([]);

const [reqTopSpender,resTopSpender]=useLazyGettopSpenderQuery();
const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
let topSpenderCards:any;
let deptSpendingBreakdown:any;
let topIndividualSpenders:any;
let topCategorySpenders:any;
  // Department breakdown data
 
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
    return (change=='up') ? "#52c41a" : "#ff4d4f";
  };
  
    /***********
   * Des:this function call's when change the date picker option
   */
    const handleDateFilterChange = (value: any) => {
      console.log(value)
        setDateFilter(value);
      if (value === "date-range") {
        setOpen(true);
        setDateFilter(value);
      } else {
        setDateRange([]);
        setDatpickerValues(calculateDateValues(value))
        setOpen(false);
      }
      console.log(resDatpickerValues)
    };
   
    const getStrokeColor = (percentage:any)=>{
        if(percentage < 30) return '#722ed1'
        if (percentage > 30 && percentage < 50) return '#1890ff'; // red
        if (percentage > 50 && percentage < 75) return '#fa8c16'; // orange
        if (percentage > 75 && percentage < 99) return '#eb2f96'; // orange

        return '#52c41a'; // green
    }
    /******
     * Des:this function hanndles the date range picker value changes
     */
      const handleDateRangeChange = (dates: any, dateStrings: [any,any]) => {
         setDateFilter("date-range");
        setDateRange(dates);
        setOpen(false);
        if (dates && dates.length === 2) {
          if (dateFilter === "date-range" && dateStrings && dateStrings.length === 2) {
            setDatpickerValues(dateStrings);
          }
          setDateFilter(formatDate(dateStrings[0]) +' - '+ formatDate(dateStrings[1]));
        }
      };
   useEffect(() => {
      console.log(tabValue)
       const urlType = (tabValue==='individual') ? "topspenders/individual/"
                      : (tabValue==='category') ? "topspenders/category/"
                      :"topspenders/department/"
      if(resDatpickerValues.length===2){
      let reqData:any={
        data: {
          start_date: resDatpickerValues[0],
          end_date: resDatpickerValues[1],
        },
        url:urlType
      };
        if(tabValue==='department' || tabValue==='band'){
          reqData.data.grouping_type=tabValue
        }
        console.log(reqData)
       reqTopSpender({ RequestDataFormat: reqData }) ;
      }
    }, [resDatpickerValues,tabValue]);
     /********
       *get response for Expense card and Top Expenses  service call
       */
    
      useEffect(() => {
       setTopSpender_S(resTopSpender)
      }, [resTopSpender])
      console.log(resTopSpender_S)
      if(resTopSpender_S !=undefined){
        console.log(tabValue)
        topSpenderCards=resTopSpender_S?.data?.data?.top_spenders?.cards;
        deptSpendingBreakdown=resTopSpender_S?.data?.data?.spending_breakdown?.groups;
        if(tabValue==='individual') topIndividualSpenders= resTopSpender_S.data;
        if(tabValue==='category') topCategorySpenders= resTopSpender_S.data;
        console.log(topIndividualSpenders)
        console.log(topCategorySpenders)
      }
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

         <Space size="middle">
              <Select
                value={dateFilter}
                style={{ width: 215 }}
                onChange={handleDateFilterChange}
              >
                <Option value="today">Today</Option>
                <Option value="yesterday">Yesterday</Option>
                 <Option value="this-week">This week</Option>
                <Option value="last-week">Last week</Option>
                <Option value="this-month">This month</Option>
                <Option value="last-month">Last month</Option>
                <Option value="date-range">Date range</Option>
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

        <Content style={{ padding: "32px"}}>
          {/* Tabs */}
          <Tabs
            defaultActiveKey={tabValue}
            style={{ marginBottom: 32 }}
            className="custom-tabs cls-topspender"
            onChange={setTabValue}
          >
            <TabPane tab="By department" key="department">
              {/* Department content - existing code */}
              {/* Department Metrics Cards */}
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {topSpenderCards!=undefined}{
                  <>
                  {topSpenderCards?.map((metric:any, index:number) => (
                  <Col xs={24} lg={6} key={index}>
                    <Card style={{ height: "100%" }}>
                      <Title
                        level={4}
                        style={{ marginBottom: 16, fontSize: 16 }}
                      >
                        {metric.name}
                      </Title>

                      <Title
                        level={3}
                        style={{ margin: 0, marginBottom: 8, color: "#1890ff" }}
                      >
                        {metric.spend}
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
                              metric.trend === "up"
                                ? "#52c41a"
                                : "#ff4d4f",
                            fontWeight: 500,
                          }}
                        >
                          {metric.change_percentage}
                        </Text>
                        <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                          from previous period
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
                  </>
                }
                
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

                <div style={{ marginBottom: 24 ,overflowY:"scroll",height:'300px'}}>
                  {(deptSpendingBreakdown !=undefined) && deptSpendingBreakdown?.map((dept:any, index:number) => (
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
                            {dept.name}
                          </Text>
                          <Text
                            style={{
                              color: dept.trend=="up"
                                ? "#52c41a"
                                : "#ff4d4f",
                              fontWeight: 500,
                              fontSize: 12,
                            }}
                          >
                            {dept.percentage_of_total} %
                          </Text>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Text style={{ fontWeight: 600, fontSize: 16 }}>
                            {dept.spend}
                          </Text>
                          <br />
                          <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                            {dept.change_percentage}%
                          </Text>
                        </div>
                      </div>
                      <Progress
                        percent={dept.percentage_of_total}
                        showInfo={false}
                        strokeColor={getProgressColor(dept.trend)}
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

            <TabPane tab="By individual" key="individual">
             
              {/* Top Individual Spenders */}
              <Card style={{ marginBottom: 32 }}>
                {topIndividualSpenders?.data?.top_individual_spenders !=undefined && 
                   <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                  }} >
                  <div >
                    <Title level={4} style={{ marginBottom: 8 }}>
                      {topIndividualSpenders?.data?.top_individual_spenders.title}
                    </Title>
                    <Text style={{ color: "#8c8c8c" }}>
                      {topIndividualSpenders?.data.top_individual_spenders.description}
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
              
                }
               

                {/* Individual Spenders List */}
                <div style={{ marginBottom: 32 }}>
                  {(topIndividualSpenders !=undefined && topIndividualSpenders?.data?.top_individual_spenders?.individuals !=undefined) && 
                  <>
                    {topIndividualSpenders?.data?.top_individual_spenders?.individuals.map((person:any) => (
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
                            {person.designation}
                          </Text>
                          <div style={{ marginTop: 4 }}>
                            <Text style={{ color: "#595959", fontSize: 12 }}>
                              Trips: {person.trip_count} | Avg per trip: $
                              {person.avg_per_trip.toLocaleString()}
                            </Text>
                          </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <Text style={{ fontWeight: 600, fontSize: 18 }}>
                            ${person.total_spend.toLocaleString()}
                          </Text>
                          <br />
                          <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                            Total spend
                          </Text>
                        </div>
                      </div>
                    ))}
                  </>
                }
                </div>
              </Card>

              {/* Bottom Charts Row */}
              <Row gutter={[24, 24]}>
                {/* Expense Distribution by Role */}
                <Col xs={24} lg={12}>
                  <Card style={{ height: 400 }}>
                    <Title level={4} style={{ marginBottom: 16 }}>
                      {topIndividualSpenders?.data?.expense_distribution_by_role?.title}
                    </Title>
                    <Text
                      style={{
                        color: "#8c8c8c",
                        display: "block",
                        marginBottom: 24,
                      }}>
                       {topIndividualSpenders?.data?.expense_distribution_by_role?.description}
                    </Text>
                    <div style={{ marginBottom: 24 }}>
                      {topIndividualSpenders?.data?.expense_distribution_by_role?.roles.map((item:any, index:any) => (
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
                              ${item.spend.toLocaleString()}
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
                      {topIndividualSpenders?.data?.policy_compliance_by_spenders?.title}
                    </Title>
                    <Text
                      style={{
                        color: "#8c8c8c",
                        display: "block",
                        marginBottom: 24,
                      }}
                    >
                      {topIndividualSpenders?.data?.policy_compliance_by_spenders?.description}
                    </Text>

                    <div style={{ marginBottom: 24 }}>
                      {topIndividualSpenders?.data?.policy_compliance_by_spenders?.compliance_data.map((person:any, index:any) => (
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
                              {person.compliance_rating}
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
                              percent={person.compliance_rate}
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
                              {person.compliance_rate}% policy compliance
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="By category" key="category">
              {/* Category Summary Cards */}
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {/* category Card */}
                { topCategorySpenders?.data?.category_overview?.categories.map((data:any)=>{
                    return ( 
                    <Col xs={24} lg={8}>
                  <Card style={{ height: "100%" }} className="cls-spender-cards">
                    <Title
                      level={4}
                      style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}
                    >
                     {data.category}
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
                      {data.total_spend}
                    </Title>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 9,
                      }}
                    >
                      <Text
                        style={{
                          color: data.trend=="up" ? "#52c41a" : "#dd1515",
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      >
                        {data.trend=='up'?'+' : '-'}
                        {data.change_percentage}%
                      </Text>
                      <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                        from previous period
                      </Text>
                    </div>
                    {data.subcategories.map((subdata:any)=>(
                         <div style={{ marginBottom: 12 }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 4,
                              }}
                            >
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>
                          {subdata.name}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: 600 }}>
                         {subdata.spend} ( {subdata.percentage} %)
                        </Text>
                      </div>
                      <Progress
                        percent={subdata.percentage}
                        showInfo={false}
                        strokeColor={getStrokeColor(subdata.percentage)}
                        strokeWidth={6}
                      />
                    </div>
                ))}
                  </Card>
                </Col>)
                })}
              </Row>

              {/* Category Spending by Department Table */}
               {(topCategorySpenders !=undefined && topCategorySpenders?.data?.category_spending_by_department !=undefined)&&
                <Card style={{ marginBottom: 32 }}>
                  <Title level={4} style={{ marginBottom: 8 }}>
                  { topCategorySpenders?.data?.category_spending_by_department?.title}
                  </Title>
                  <Text
                    style={{
                      color: "#8c8c8c",
                      display: "block",
                      marginBottom: 24,
                    }}
                  >
                    { topCategorySpenders?.data?.category_spending_by_department.description}
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
                        {topCategorySpenders?.data?.category_spending_by_department.table_data.map((tableData:any, index:any) => (
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
                              {tableData.department}
                            </td>
                            <td
                              style={{
                                padding: "16px",
                                textAlign: "right",
                                fontWeight: 500,
                                color: "#595959",
                              }}
                            >
                              {tableData.air_travel}
                            </td>
                            <td
                              style={{
                                padding: "16px",
                                textAlign: "right",
                                fontWeight: 500,
                                color: "#595959",
                              }}
                            >
                              {tableData.hotels}
                            </td>
                            <td
                              style={{
                                padding: "16px",
                                textAlign: "right",
                                fontWeight: 500,
                                color: "#595959",
                              }}
                            >
                              {tableData.ground_transport}
                            </td>
                            <td
                              style={{
                                padding: "16px",
                                textAlign: "right",
                                fontWeight: 600,
                                color: "#1f2937",
                              }}
                            >
                              {tableData.total}
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
                          {topCategorySpenders?.data?.category_spending_by_department?.totals?.air_travel}
                          </td>
                          <td
                            style={{
                              padding: "16px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#1f2937",
                            }}
                          >
                            {topCategorySpenders?.data?.category_spending_by_department?.totals?.hotels}
                          </td>
                          <td
                            style={{
                              padding: "16px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#1f2937",
                            }}
                          >
                            {topCategorySpenders?.data?.category_spending_by_department?.totals?.ground_transport}
                          </td>
                          <td
                            style={{
                              padding: "16px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#1f2937",
                            }}
                          >
                          {topCategorySpenders?.data?.category_spending_by_department.totals?.total}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              }
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
              <TabPane tab="By band" key="band">
              {/* Department content - existing code */}
              {/* Department Metrics Cards */}
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {topSpenderCards!=undefined}{
                  <>
                  {topSpenderCards?.map((metric:any, index:number) => (
                  <Col xs={24} lg={6} key={index}>
                    <Card style={{ height: "100%" }}>
                      <Title
                        level={4}
                        style={{ marginBottom: 16, fontSize: 16 }}
                      >
                        {metric.name}
                      </Title>

                      <Title
                        level={3}
                        style={{ margin: 0, marginBottom: 8, color: "#1890ff" }}
                      >
                        {metric.spend}
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
                              metric.trend === "up"
                                ? "#52c41a"
                                : "#ff4d4f",
                            fontWeight: 500,
                          }}
                        >
                          {metric.change_percentage}
                        </Text>
                        <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                          from previous period
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
                  </>
                }
                
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

                <div style={{ marginBottom: 24 ,overflowY:"scroll",height:'300px'}}>
                  {(deptSpendingBreakdown !=undefined) && deptSpendingBreakdown?.map((dept:any, index:number) => (
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
                            {dept.name}
                          </Text>
                          <Text
                            style={{
                              color: dept.trend=="up"
                                ? "#52c41a"
                                : "#ff4d4f",
                              fontWeight: 500,
                              fontSize: 12,
                            }}
                          >
                            {dept.percentage_of_total} %
                          </Text>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Text style={{ fontWeight: 600, fontSize: 16 }}>
                            {dept.spend}
                          </Text>
                          <br />
                          <Text style={{ color: "#8c8c8c", fontSize: 12 }}>
                            {dept.change_percentage}%
                          </Text>
                        </div>
                      </div>
                      <Progress
                        percent={dept.percentage_of_total}
                        showInfo={false}
                        strokeColor={getProgressColor(dept.trend)}
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
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TopSpenders;


