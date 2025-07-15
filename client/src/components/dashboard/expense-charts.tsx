import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface ExpenseChartsProps {
  metrics: {
    monthlyData: Array<{ month: string; amount: number }>;
    categoryDistribution: Array<{ category: string; amount: number; percentage: number }>;
  } | undefined;
}

const COLORS = ['#4f46e5', '#ec4899', '#8b5cf6'];

export function ExpenseCharts({ metrics }: ExpenseChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Expense Breakdown */}
      <Card className="lg:col-span-2">
        <CardHeader className="border-b">
          <CardTitle>Expense Breakdown</CardTitle>
          <p className="text-sm text-gray-500">View your expense distribution across categories</p>
        </CardHeader>
        
        <Tabs defaultValue="breakdown" className="w-full">
          <div className="border-b">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakdown">Expense Breakdown</TabsTrigger>
              <TabsTrigger value="vendor">Vendor Performance</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="breakdown" className="p-6">
            <div className="flex space-x-4 mb-6">
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Monthly</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Quarterly</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Yearly</button>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Monthly Expense Trend</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics?.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value/1000}K`} />
                    <Bar dataKey="amount" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vendor" className="p-6">
            <div className="text-center text-gray-500">Vendor performance data will be displayed here</div>
          </TabsContent>
          
          <TabsContent value="compliance" className="p-6">
            <div className="text-center text-gray-500">Compliance metrics will be displayed here</div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Expense Distribution */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Expense Distribution</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-64 flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics?.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {metrics?.categoryDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {metrics?.categoryDistribution?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-600">{item.category}</span>
                </div>
                <span className="text-sm font-medium">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
