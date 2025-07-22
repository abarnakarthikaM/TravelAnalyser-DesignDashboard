
import { formatDate } from "@/utils/dateFunctions";
import { Card, Table, Tag, Typography } from "antd";
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

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
  
  const columns: ColumnsType<Expense> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => formatDate(date),
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const colors: { [key: string]: string } = {
          'Air Travel': 'blue',
          'Accommodation': 'green', 
          'Ground Transport': 'orange',
          'Meals': 'purple',
        };
        return <Tag color={colors[category] || 'default'}>{category}</Tag>;
      },
      width: 140,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount: string) => (
        <span style={{ fontWeight: 600, color: '#262626' }}>{amount}</span>
      ),
      width: 100,
    },
  ];

  return (
    <Card 
      bordered={false}
      style={{ 
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
      }}
    >
      <Title level={4} style={{ marginBottom: 16 }}>
        Top Expenses
      </Title>
      
      <Table
        columns={columns}
        dataSource={expenses}
        rowKey="id"
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
        size="middle"
      />
    </Card>
  );
}
