import { 
  AlertTriangle, 
  Info,
  CheckCircle2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AlertsInsights() {
  const alerts = [
    {
      type: "warning" as const,
      message: "Budget exceeded by 15% this month",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      type: "info" as const,
      message: "New vendor partnership available",
      icon: <Info className="w-4 h-4" />,
    },
    {
      type: "success" as const,
      message: "Cost savings of $2,500 achieved",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  const insights = [
    "Air travel costs increased 12% vs last quarter",
    "Hotel bookings show 8% cost reduction opportunity",
    "Ground transport efficiency improved by 5%",
    "Compliance rate maintained at 98%"
  ];

  return (
    <div className="space-y-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <Alert key={index} className={`${
                alert.type === 'warning' ? 'border-orange-200 bg-orange-50' :
                alert.type === 'info' ? 'border-blue-200 bg-blue-50' :
                'border-green-200 bg-green-50'
              }`}>
                <div className="flex items-center gap-2">
                  {alert.icon}
                  <AlertDescription>{alert.message}</AlertDescription>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {insights.map((item, index) => (
              <div key={index} className="py-2">
                <p className="text-sm text-gray-600">• {item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}