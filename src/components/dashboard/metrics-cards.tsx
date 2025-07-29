
import {
  DollarSign,
  Send,
  Home,
  Car,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hamburger, Rupees } from "../ui/icons";
import { Col } from "antd";

interface MetricsCardsProps {
  metrics?: {
    totalExpenses: number;
    airTravel: number;
    accommodation: number;
    groundTransport: number;
  };
  pathName?: any;
}

export function MetricsCards({ metrics, pathName }: MetricsCardsProps) {
  var cards: any;
  cards = JSON.parse(JSON.stringify(metrics));
  const borderColor = ["border-t-red-400", "border-t-blue-400", "border-t-orange-400", "border-t-teal-400", "border-t-green-400"]
  if (cards != undefined) {
    cards?.map((data: any) => {
      switch (data.category) {
        case 'Total expance':
          data.icon = <Rupees className="w-6 h-6 text-blue-600" />;
          data.bgColor = "bg-red-50",
            data.changeType = (data.previous_prd > 0) ? "positive" as const : "negative" as const
          break;
        case 'Air Travel':
          data.icon = <Send className="w-6 h-6 text-green-600" />;
          data.bgColor = "bg-blue-50",
            data.changeType = (data.previous_prd > 0) ? "positive" as const : "negative" as const
          break;
        case 'Hotel Stays':
          data.icon = <Home className="w-6 h-6 text-orange-600" />;
          data.bgColor = "bg-orange-50",
            data.changeType = (data.previous_prd > 0) ? "positive" as const : "negative" as const
          break;
        case 'Ground Transport':
          data.icon = <Car className="w-6 h-6 text-purple-600" />;
          data.bgColor = "bg-teal-50",
            data.changeType = (data.previous_prd > 0) || (data.percentage > 0) ? "positive" as const : "negative" as const
          break;
        case 'Hotels':
          data.icon = <Home className="w-6 h-6 text-orange-600" />;
          data.bgColor = "bg-orange-50",
            data.changeType = (data.previous_prd > 0) ? "positive" as const : "negative" as const
          break;
        case 'Meals & Entertainment':
          data.icon = <Hamburger className="w-6 h-6 text-purple-600" />;
          data.bgColor = "bg-teal-50",
            data.changeType = (data.percentage > 0) ? "positive" as const : "negative" as const
          break;
        default:
          data.borderColor = "border-t-gray-400";
      }
    })
  }
  return (
    // <Col span={24} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <Col span={24} className={pathName === "Transaction" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"}>
      {cards.map((card: any, index: any) => (
        <Card key={index} className={`cls-metrics-card border-t-4 ${borderColor[index]} border-l-gray-200 border-r-gray-200 border-b-gray-200 border-l border-r border-b`} style={{ backgroundColor: "#f9fafb" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" style={{ padding: "12px 14px 8px 14px" }} >
            <CardTitle className="cls-cards text-sm font-medium text-gray-600 truncate"
              title={
                pathName === "Dashboard"
                  ? card.category
                  : pathName === "Transaction"
                    ? card.title
                    : pathName === "Transaction_category"
                      ? card.category
                      : pathName === "Transaction_payments"
                        ? card.method
                        : card.name
              }
            >
              {pathName === "Dashboard" || pathName === "Transaction_category" ? card.category : pathName === "Transaction" ? card.title : pathName === "Transaction_payments" ? card.method : card.name}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent style={{ padding: "0px 14px 14px 14px" }}>
            <div className=" font-bold text-gray-900" style={{ marginBottom: "8px" }}>
              {pathName === "Dashboard" ?
                <>
                  <Rupees className="inline-block align-middle" />
                  {card?.amount}
                </>
                : pathName === "Compliance_metrics" ? card.total
                  : pathName === "Transaction" ? card.count :
                    <>
                      <Rupees className="inline-block align-middle" />
                      {card?.spend || card?.total_amount}
                    </>
              }
            </div>
            {pathName === "Transaction" && card.title !== "Total Transactions" ?
              (
                <div className="flex items-center text-xs">
                  <span className="font-medium " style={{ color: "#8c8c8c" }}>
                    {card.description}
                  </span>
                </div>

              ) : (
                <>
                  <div className="flex items-center text-xs space-x-1 w-full overflow-hidden">
                    {/* Icon */}
                    {(pathName === "Dashboard" && card.changeType === "positive") ||
                      (pathName === "Compliance_metrics" && card.change_percent > 0) ||
                      (pathName === "Transaction_payments" && card.percentage > 0) ||
                      (pathName === "Transaction_category" && card.changeType === "positive") || (card.trend === "up") ? (
                      <TrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500 flex-shrink-0" />
                    )}

                    <div title={`${pathName === "Dashboard" ? card.previous_prd : pathName === "Compliance_metrics" ? card.change_percent : card.change_percentage} from previous period`}>
                      <span className={`font-medium ${(pathName === "Dashboard" && card.changeType === "positive") ||
                        (pathName === "Compliance_metrics" && card.change_percent > 0) ||
                        (pathName === "Transaction_category" && card.changeType === "positive") ||
                        (pathName === "Transaction_payments" && card.percentage > 0) ||
                        (card.trend === "up")
                        ? "text-green-500"
                        : "text-red-500"
                        }`}>
                        {pathName === "Dashboard"
                          ? card.previous_prd
                          : pathName === "Compliance_metrics"
                            ? card.change_percent
                            : pathName === "Transaction_category" || pathName === "Transaction_payments" ?
                              card.percentage :
                              card.change_percentage}
                      </span>
                      <span className="text-gray-500 ml-1">from previous period</span>
                    </div>
                  </div>
                </>
              )
            }

          </CardContent>
        </Card>
      ))}
    </Col>
  );
}
