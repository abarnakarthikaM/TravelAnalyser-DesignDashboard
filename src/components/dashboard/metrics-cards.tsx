
import { 
  DollarSign, 
  Send, 
  Home, 
  Car,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rupees } from "../ui/icons";

interface MetricsCardsProps {
  metrics?: {
    totalExpenses: number;
    airTravel: number;
    accommodation: number;
    groundTransport: number;
  };
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
 
  //   {
  //     title: "Total Expenses",
  //     value: metrics?.totalExpenses || 1248567,
  //     prefix: "$",
  //     icon: <DollarSign className="w-5 h-5 text-gray-600" />,
  //     change: "+12.5%",
  //     changeType: "positive" as const,
  //     borderColor: "border-t-red-400",
  //     bgColor: "bg-red-50",
  //   },
  //   {
  //     title: "Air Travel",
  //     value: metrics?.airTravel || 567890,
  //     prefix: "$",
  //     icon: <Send className="w-5 h-5 text-gray-600" />,
  //     change: "+6.2%",
  //     changeType: "positive" as const,
  //     borderColor: "border-t-blue-400",
  //     bgColor: "bg-blue-50",
  //   },
  //   {
  //     title: "Hotel Stays",
  //     value: metrics?.accommodation || 432156,
  //     prefix: "$",
  //     icon: <Home className="w-5 h-5 text-gray-600" />,
  //     change: "-3.1%",
  //     changeType: "negative" as const,
  //     borderColor: "border-t-orange-400",
  //     bgColor: "bg-orange-50",
  //   },
  //   {
  //     title: "Ground Transport",
  //     value: metrics?.groundTransport || 248521,
  //     prefix: "$",
  //     icon: <Car className="w-5 h-5 text-gray-600" />,
  //     change: "+18.7%",
  //     changeType: "positive" as const,
  //     borderColor: "border-t-teal-400",
  //     bgColor: "bg-teal-50",
  //   },
  // ];
  var cards:any;
  cards=JSON.parse(JSON.stringify(metrics));
  if(cards !=undefined){
     cards?.map((data:any)=>{
      switch(data.category){
        case 'Total expance':
          data.icon = <Rupees className="w-6 h-6 text-blue-600" />;
          data. borderColor= "border-t-red-400",
          data.bgColor= "bg-red-50" ,
          data.changeType= (data.previous_prd > 0) ? "positive" as const : "negative" as const
        break;
        case 'Air Travel':
          data.icon = <Send className="w-6 h-6 text-green-600" />;
          data.borderColor= "border-t-blue-400",
          data.bgColor= "bg-blue-50",
          data.changeType= (data.previous_prd > 0) ? "positive" as const : "negative" as const
        break;
        case 'Hotel Stays':
          data.icon = <Home className="w-6 h-6 text-orange-600" />;
          data.borderColor= "border-t-orange-400",
          data.bgColor= "bg-orange-50",
          data.changeType= (data.previous_prd > 0) ? "positive" as const : "negative" as const
        break;
        case 'Ground Transport':
          data.icon= <Car className="w-6 h-6 text-purple-600" />;
          data.borderColor= "border-t-teal-400";
          data.bgColor= "bg-teal-50",
          data.changeType=(data.previous_prd > 0) ? "positive" as const : "negative" as const
        break;

      }
    })
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card:any, index:any) => (
        <Card key={index} className={`border-t-4 ${card.borderColor} border-l-gray-200 border-r-gray-200 border-b-gray-200 border-l border-r border-b`} style={{backgroundColor:"#f9fafb"}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" style={{padding:"12px 14px 14px 14px"}} >
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.category}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent style={{padding:"0px 14px 14px 14px"}}> 
            <div className=" font-bold text-gray-900 mb-1">
              <Rupees className="inline-block align-middle"/> {card.amount}
            </div>
            <div className="flex items-center text-xs">
              {card.changeType === "positive" ? (
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
              )}
              <span className={`font-medium ${
                card.changeType === "positive" ? "text-green-500" : "text-red-500"
              }`}>
                {card.previous_prd}
              </span>
              <span className="text-gray-500 ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
