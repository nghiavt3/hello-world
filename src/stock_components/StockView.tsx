import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const buyData = [
  { name: 'GVR', value: 260.1 },
  { name: 'VCI', value: 230.4 },
  { name: 'SHS', value: 207.7 },
  { name: 'VND', value: 203.5 },
  { name: 'HCM', value: 203.5 }
];

const sellData = [
  { name: 'FPT', value: 694.5 },
  { name: 'VCB', value: 591.3 },
  { name: 'STB', value: 512.5 },
  { name: 'VNM', value: 434.6 },
  { name: 'CTG', value: 434.6 }
];

export default function StockViewComponent() {
  return (
    <Tabs defaultValue="month" className="w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Bản đồ thị trường - Khối ngoại</h2>
        <TabsList className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="day">Ngày</TabsTrigger>
          <TabsTrigger value="week">Tuần</TabsTrigger>
          <TabsTrigger value="month" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Tháng</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="month">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <h3 className="text-blue-500 font-semibold mb-4">TOP MUA RÒNG</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={buyData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1d4ed8" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-red-500 font-semibold mb-4">TOP BÁN RÒNG</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sellData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#dc2626" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}