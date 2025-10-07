import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle, TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const dailySalesData = [
  { day: "Mon", sales: 4200, orders: 45 },
  { day: "Tue", sales: 3800, orders: 38 },
  { day: "Wed", sales: 5100, orders: 52 },
  { day: "Thu", sales: 4600, orders: 48 },
  { day: "Fri", sales: 6200, orders: 65 },
  { day: "Sat", sales: 7800, orders: 78 },
  { day: "Sun", sales: 5400, orders: 56 },
];

const weeklySalesData = [
  { week: "Week 1", sales: 32000 },
  { week: "Week 2", sales: 38000 },
  { week: "Week 3", sales: 35000 },
  { week: "Week 4", sales: 42000 },
];

const monthlySalesData = [
  { month: "Jan", sales: 145000 },
  { month: "Feb", sales: 138000 },
  { month: "Mar", sales: 162000 },
  { month: "Apr", sales: 155000 },
  { month: "May", sales: 178000 },
  { month: "Jun", sales: 185000 },
];

const categoryDistribution = [
  { name: "Electronics", value: 45, color: "#3b82f6" },
  { name: "Audio", value: 25, color: "#10b981" },
  { name: "Cameras", value: 15, color: "#f59e0b" },
  { name: "Accessories", value: 15, color: "#8b5cf6" },
];

const lowStockProducts = [
  { name: "Samsung Galaxy S23", quantity: 8, reorderLevel: 15, status: "Critical" },
  { name: "Canon EOS R6", quantity: 5, reorderLevel: 10, status: "Critical" },
  { name: "LG OLED TV 55\"", quantity: 12, reorderLevel: 20, status: "Low" },
  { name: "MacBook Pro M2", quantity: 15, reorderLevel: 25, status: "Low" },
  { name: "iPad Pro", quantity: 18, reorderLevel: 30, status: "Low" },
];

export function ReportsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          View comprehensive sales trends and inventory insights
        </p>
      </div>

      {/* Sales Trends Tabs */}
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md bg-slate-800/50 border border-border/50">
          <TabsTrigger value="daily" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600">Daily</TabsTrigger>
          <TabsTrigger value="weekly" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  Daily Sales Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1f2e', 
                        border: '1px solid #1e293b',
                        borderRadius: '12px',
                        color: '#e8eaf0'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/50">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  Daily Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1f2e', 
                        border: '1px solid #1e293b',
                        borderRadius: '12px',
                        color: '#e8eaf0'
                      }} 
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", r: 5, strokeWidth: 2, stroke: "#0f1419" }}
                      activeDot={{ r: 8, fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                Weekly Sales Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f2e', 
                      border: '1px solid #1e293b',
                      borderRadius: '12px',
                      color: '#e8eaf0'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Monthly Sales Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f2e', 
                      border: '1px solid #1e293b',
                      borderRadius: '12px',
                      color: '#e8eaf0'
                    }} 
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 5, strokeWidth: 2, stroke: "#0f1419" }}
                    activeDot={{ r: 8, fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Category Distribution and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                <PieChartIcon className="w-5 h-5 text-white" />
              </div>
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#0f1419"
                  strokeWidth={2}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e', 
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#e8eaf0'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-3">
              {lowStockProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex-1">
                    <p className="text-foreground">{product.name}</p>
                    <p className="text-muted-foreground">
                      Stock: {product.quantity} / Reorder: {product.reorderLevel}
                    </p>
                  </div>
                  <Badge
                    variant={product.status === "Critical" ? "destructive" : "default"}
                    className={
                      product.status === "Low"
                        ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Products Table */}
      <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Low Stock Products - Detailed View</span>
            <Badge variant="outline" className="border-red-500/50 text-red-400">
              {lowStockProducts.length} Items
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="text-muted-foreground">Product Name</TableHead>
                <TableHead className="text-muted-foreground">Current Stock</TableHead>
                <TableHead className="text-muted-foreground">Reorder Level</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-muted-foreground">Action Required</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockProducts.map((product, index) => (
                <TableRow 
                  key={index} 
                  className="hover:bg-slate-800/30 transition-all duration-300 border-border/30"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell className="text-foreground">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
                      {product.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.reorderLevel}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.status === "Critical" ? "destructive" : "default"}
                      className={
                        product.status === "Low"
                          ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                          : "bg-red-500/10 text-red-400 border-red-500/30"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-primary hover:text-primary/80 cursor-pointer transition-colors">Reorder Now</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
