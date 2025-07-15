import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, PiggyBank, Calculator, ThumbsUp } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "warning",
    icon: AlertTriangle,
    title: "Policy Violation Alert",
    description: "5 hotel bookings exceed the daily limit policy",
    action: "Review →",
    color: "orange",
  },
  {
    id: 2,
    type: "info",
    icon: TrendingUp,
    title: "Spending Trend",
    description: "Air travel expenses increased by 18% this month",
    action: "Analyze →",
    color: "blue",
  },
  {
    id: 3,
    type: "success",
    icon: PiggyBank,
    title: "Cost Saving Opportunity",
    description: "Switch to GlobalStay could save $12,500 annually",
    action: "Explore →",
    color: "green",
  },
  {
    id: 4,
    type: "info",
    icon: Calculator,
    title: "Budget Projection",
    description: "Q2 travel expenses projected to exceed budget by 8%",
    action: "Plan →",
    color: "purple",
  },
  {
    id: 5,
    type: "success",
    icon: ThumbsUp,
    title: "Positive Trend",
    description: "Ground transport costs reduced by 12% after policy update",
    action: "View →",
    color: "green",
  },
];

const colorClasses = {
  orange: {
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-800",
    description: "text-orange-700",
    action: "text-orange-600 hover:text-orange-800",
    icon: "text-orange-500",
  },
  blue: {
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-800",
    description: "text-blue-700",
    action: "text-blue-600 hover:text-blue-800",
    icon: "text-blue-500",
  },
  green: {
    border: "border-l-green-500",
    bg: "bg-green-50",
    text: "text-green-800",
    description: "text-green-700",
    action: "text-green-600 hover:text-green-800",
    icon: "text-green-500",
  },
  purple: {
    border: "border-l-purple-500",
    bg: "bg-purple-50",
    text: "text-purple-800",
    description: "text-purple-700",
    action: "text-purple-600 hover:text-purple-800",
    icon: "text-purple-500",
  },
};

export function AlertsInsights() {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Alerts & Insights</CardTitle>
        <p className="text-sm text-gray-500">AI-powered alerts and recommendations</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const colors = colorClasses[alert.color as keyof typeof colorClasses];
          
          return (
            <div
              key={alert.id}
              className={`border-l-4 ${colors.border} ${colors.bg} p-4 rounded-r-lg`}
            >
              <div className="flex items-start">
                <Icon className={`w-5 h-5 ${colors.icon} mr-3 mt-1`} />
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${colors.text}`}>
                    {alert.title}
                  </h4>
                  <p className={`text-sm ${colors.description} mt-1`}>
                    {alert.description}
                  </p>
                  <button className={`text-xs ${colors.action} mt-2`}>
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All Insights
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
