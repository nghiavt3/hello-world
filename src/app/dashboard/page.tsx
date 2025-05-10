'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, LineChart } from 'recharts';
import StockViewComponent from '@/stock_components/StockView';

const sampleData = [
  { name: 'GAS', value: 120 },
  { name: 'HPG', value: 100 },
  { name: 'VNM', value: 80 },
  { name: 'MWG', value: 60 },
  { name: 'VCB', value: 150 }
];

export default function Dashboard() {
  const [news, setNews] = useState<string[]>([]);

  useEffect(() => {
    setNews([
      'FED có thể giữ lãi suất ở mức hiện tại',
      'Cổ phiếu ngân hàng tăng mạnh',
      'VN-Index vượt 1200 điểm',
      'Giá dầu giảm do lo ngại kinh tế'
    ]);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-10 bg-[#f4f5fa] min-h-screen">
      <Card className="col-span-2">
        <CardContent>
          <StockViewComponent></StockViewComponent>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Biến động VN-Index</h2>
          {typeof window !== 'undefined' && (
            <LineChart width={300} height={200} data={sampleData}></LineChart>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Tin tức nổi bật</h2>
          <ul className="space-y-2">
            {news.map((item, index) => (
              <li key={index} className="text-sm text-gray-700">{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Biểu đồ dữ liệu cổ phiếu</h2>

          {typeof window !== 'undefined' && (
            <BarChart width={600} height={300} data={sampleData}>
            </BarChart>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
