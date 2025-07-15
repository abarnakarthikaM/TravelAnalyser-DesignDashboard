import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Plane, Bed, Car } from "lucide-react";

interface MetricsCardsProps {
  metrics: {
    totalExpenses: number;
    airTravel: number;
    hotelStays: number;
    groundTransport: number;
  } | undefined;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    {
      title: "Total Expenses",
      value: metrics?.totalExpenses || 0,
      change: "+12%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "Air Travel",
      value: metrics?.airTravel || 0,
      change: "+8%",
      changeType: "positive",
      icon: Plane,
    },
    {
      title: "Hotel Stays",
      value: metrics?.hotelStays || 0,
      change: "-4%",
      changeType: "negative",
      icon: Bed,
    },
    {
      title: "Ground Transport",
      value: metrics?.groundTransport || 0,
      change: "+6%",
      changeType: "positive",
      icon: Car,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(card.value)}
                </p>
                <p className={`text-sm ${
                  card.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {card.change} from previous period
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
