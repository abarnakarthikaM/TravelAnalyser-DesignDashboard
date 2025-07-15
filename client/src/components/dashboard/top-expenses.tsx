import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Expense {
  id: number;
  date: Date;
  description: string;
  category: string;
  amount: string;
  userId: number;
}

interface TopExpensesProps {
  expenses: Expense[];
}

export function TopExpenses({ expenses }: TopExpensesProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(amount));
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="border-b">
        <CardTitle>Top Expenses</CardTitle>
        <p className="text-sm text-gray-500">Highest expense transactions in the current period</p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">
                  {formatDate(expense.date)}
                </TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell className="text-gray-500">{expense.category}</TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(expense.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
