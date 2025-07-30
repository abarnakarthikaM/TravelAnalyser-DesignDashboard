import { calculateDateValues, formatDate } from "@/utils/dateFunctions";
import { Select, DatePicker, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterdate, setDatetype, setViewType } from "../../stores/Headerslice"

const { Option } = Select;

const Header = ({ Title, description }: any) => {
    const { dateFilter: Datetype, filterValue: DateRange,viewType:viewType } = useSelector(
        (state: any) => state.header
    );
    const dispatch = useDispatch();
    const [dateFilter, setDateFilter] = useState(Datetype);
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState<any>([]);
    /***********
   * Des:this function call's when change the date picker option* 
   */
    const handleDateFilterChange = (value: any) => {
        setDateFilter(value);
        if (value === "date-range") {
            setOpen(true);
            setDateFilter(value);
            dispatch(setDatetype({ filtertype: value }));
        } else {
            setDateRange([]);
            dispatch(setDatetype({ filtertype: value }));
            dispatch(setFilterdate({ date: calculateDateValues(value) }));
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
                dispatch(setFilterdate({ date: dateStrings }));
            }
            setDateFilter(formatDate(dateStrings[0]) + ' - ' + formatDate(dateStrings[1]));
        }
    };

    const handleviewChange =(value:any)=>{
        dispatch(setViewType({viewtype:value}));
    }
    return (
        <Row className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 m-0">
                    {Title}
                </h2>
                <p className="text-gray-600" style={{ color: '#8c8c8c' }}>
                    {description}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Space size="middle" className="cls-datefilter-space">
                    <Select 
                        value={viewType}
                        style={{ width: 150 }}
                        onChange={handleviewChange}
                    >
                        <Option value="corporate">Corporate view</Option>
                        <Option value="vendor">Vendor view</Option>
                    </Select>
                    <Select
                        value={dateFilter}
                        style={{ width: 150 }}
                        onChange={handleDateFilterChange}
                        onClear={() => {
                            setOpen(false);
                        }}
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
                            width: "0px"
                        }}
                        dropdownClassName="custom-range-picker-dropdown"
                    />
                </Space>
            </div>
        </Row>
    );
}
export default Header;