import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Package, DollarSign, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "./ui/badge";

const summaryData = [
  {
    title: "Total Products",
    value: "1,234",
    icon: Package,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/50",
    change: "+12%",
    isPositive: true,
  },
  {
    title: "Total Sales",
    value: "$45,678",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-500",
    shadow: "shadow-green-500/50",
    change: "+8%",
    isPositive: true,
  },
  {
    title: "Low Stock",
    value: "23",
    icon: AlertTriangle,
    gradient: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/50",
    change: "-5%",
    isPositive: false,
  },
  {
    title: "Daily Revenue",
    value: "$2,340",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/50",
    change: "+15%",
    isPositive: true,
  },
];

const recentSales = [
  { id: "#001", product: "Laptop Dell XPS 13", quantity: 2, total: "$2,400", status: "completed" },
  { id: "#002", product: "iPhone 14 Pro", quantity: 1, total: "$1,200", status: "completed" },
  { id: "#003", product: "Samsung Galaxy S23", quantity: 3, total: "$2,700", status: "pending" },
  { id: "#004", product: "MacBook Pro M2", quantity: 1, total: "$2,500", status: "completed" },
  { id: "#005", product: "Sony WH-1000XM5", quantity: 5, total: "$1,750", status: "completed" },
  { id: "#006", product: "iPad Air", quantity: 2, total: "$1,200", status: "processing" },
];

const salesChartData = [
  { name: "Mon", sales: 4000, revenue: 2400 },
  { name: "Tue", sales: 3000, revenue: 1398 },
  { name: "Wed", sales: 2000, revenue: 9800 },
  { name: "Thu", sales: 2780, revenue: 3908 },
  { name: "Fri", sales: 1890, revenue: 4800 },
  { name: "Sat", sales: 2390, revenue: 3800 },
  { name: "Sun", sales: 3490, revenue: 4300 },
];

export function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 group overflow-hidden relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-muted-foreground">{item.title}</CardTitle>
                <div className={`bg-gradient-to-br ${item.gradient} w-12 h-12 rounded-xl flex items-center justify-center ${item.shadow} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-end justify-between">
                  <h2 className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{item.value}</h2>
                  <div className={`flex items-center space-x-1 ${item.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {item.isPositive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{item.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sales Trend</span>
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/30">This Week</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesChartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e', 
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#e8eaf0'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Revenue Overview</span>
              <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/30">Growth +18%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e', 
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#e8eaf0'
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
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

      {/* Recent Sales Table */}
      <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Sales</span>
            <Badge variant="outline" className="border-primary/50 text-primary">Live Updates</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="text-muted-foreground">Order ID</TableHead>
                <TableHead className="text-muted-foreground">Product Name</TableHead>
                <TableHead className="text-muted-foreground">Quantity</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-muted-foreground">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale, index) => (
                <TableRow 
                  key={sale.id} 
                  className="hover:bg-slate-800/30 transition-all duration-300 border-border/30"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="text-primary">{sale.id}</TableCell>
                  <TableCell className="text-foreground">{sale.product}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                      {sale.quantity}x
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={sale.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        sale.status === 'completed' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                          : sale.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }
                    >
                      {sale.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{sale.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
