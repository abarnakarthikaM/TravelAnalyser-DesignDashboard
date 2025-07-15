
import { 
  DollarSign, 
  Send, 
  Home, 
  Car 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardsProps {
  metrics?: {
    totalExpenses: number;
    airTravel: number;
    accommodation: number;
    groundTransport: number;
  };
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: "Total Expenses",
      value: metrics?.totalExpenses || 0,
      prefix: "$",
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      suffix: "",
    },
    {
      title: "Air Travel",
      value: metrics?.airTravel || 0,
      prefix: "$",
      icon: <Send className="w-6 h-6 text-green-600" />,
      suffix: "",
    },
    {
      title: "Accommodation", 
      value: metrics?.accommodation || 0,
      prefix: "$",
      icon: <Home className="w-6 h-6 text-orange-600" />,
      suffix: "",
    },
    {
      title: "Ground Transport",
      value: metrics?.groundTransport || 0,
      prefix: "$",
      icon: <Car className="w-6 h-6 text-purple-600" />,
      suffix: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              {card.icon}
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {card.prefix}{card.value.toLocaleString()}{card.suffix}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
