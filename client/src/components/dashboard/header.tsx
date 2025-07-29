import { calculateDateValues, formatDate } from "@/utils/dateFunctions";
import { Select, DatePicker, Row, Space } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterdate, setDatetype } from "../../stores/Headerslice"

const { Option } = Select;

const Header = () => {
    const { dateFilter: DateRange, filterValue: Datetype } = useSelector(
        (state: any) => state.headerReducer
    );
    console.log(DateRange,Datetype)
    const dispatch = useDispatch();
    const [dateFilter, setDateFilter] = useState("today");
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState<any>([]);
    const [resDatpickerValues, setDatpickerValues] = useState<any>([]);
    const handleDateFilterChange = (value: any) => {
        setDateFilter(value);
        if (value === "date-range") {
            setOpen(true);
            setDateFilter(value);
            dispatch(setDatetype({ date: value }));
        } else {
            setDateRange([]);
            dispatch(setDatetype({ date: value }));
            dispatch(setFilterdate({ filtertype: calculateDateValues(value) }));
            setOpen(false);
        }
    };
    const handleDateRangeChange = (dates: any, dateStrings: [any, any]) => {

        setDateFilter("date-range");
        setDateRange(dates);
        setOpen(false);
        if (dates && dates.length === 2) {
            if (dateFilter === "date-range" && dateStrings && dateStrings.length === 2) {
                console.log(dateStrings)
                setDatpickerValues(dateStrings);
                dispatch(setFilterdate({ filtertype: dateStrings }));
            }
            setDateFilter(formatDate(dateStrings[0]) + ' - ' + formatDate(dateStrings[1]));
        }
    };
    console.log(resDatpickerValues)
    return (
        <Row className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 m-0">
                    Travel Expense Dashboard
                </h2>
                <p className="text-gray-600" style={{ color: '#8c8c8c' }}>
                    Monitor and analyze your corporate travel expenses across all
                    vendors
                </p>
            </div>

            <div className="flex items-center gap-4">
                <Space size="middle" className="cls-datefilter-space">
                    <Select
                        value={dateFilter}
                        style={{ width: 215 }}
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