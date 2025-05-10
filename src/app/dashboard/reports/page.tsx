"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Table,} from '@/components/ui/table';

const data = [
  {
    category: 'TÀI SẢN NGẮN HẠN',
    subCategory: 'Tiền và các khoản tương đương tiền',
    values: ['9,109,949', '9,226,757', '10,424,428']
  },
  {
    category: '',
    subCategory: 'Đầu tư tài chính ngắn hạn',
    values: ['3,155,834', '2,292,625', '2,631,627']
  },
  {
    category: 'TÀI SẢN DÀI HẠN',
    subCategory: 'Bất động sản đầu tư',
    values: ['513,827', '523,767', '543,647']
  },
  {
    category: 'NGUỒN VỐN',
    subCategory: 'Nợ ngắn hạn',
    values: ['7,842,749', '6,706,433', '8,177,306']
  }
];

export default function FinancialReportComponent() {
  return (
    <Tabs defaultValue="balanceSheet" className="w-full p-6">
      <TabsList className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-4">
        <TabsTrigger value="balanceSheet">CÂN ĐỐI KẾ TOÁN</TabsTrigger>
        <TabsTrigger value="incomeStatement">KẾT QUẢ KINH DOANH</TabsTrigger>
        <TabsTrigger value="cashFlow">LƯU CHUYỂN TIỀN TỆ</TabsTrigger>
        <TabsTrigger value="document">TÀI LIỆU</TabsTrigger>
      </TabsList>

      <TabsContent value="balanceSheet">
        <Card>
          <CardContent>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Head>Danh mục</Table.Head>
                  <Table.Head>Q4/2024</Table.Head>
                  <Table.Head>Q3/2024</Table.Head>
                  <Table.Head>Q2/2024</Table.Head>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {data.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{item.category || '-'}</Table.Cell>
                    <Table.Cell>{item.subCategory}</Table.Cell>
                    {item.values.map((value, i) => (
                      <Table.Cell key={i}>{value}</Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
