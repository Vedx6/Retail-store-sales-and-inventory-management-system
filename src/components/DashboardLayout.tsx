import { ReactNode } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Bell,
  LogOut,
  Menu,
  Sparkles,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function DashboardLayout({
  children,
  currentPage,
  onPageChange,
  onLogout,
}: DashboardLayoutProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "sales", label: "Sales", icon: ShoppingCart },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar with gradient background */}
      <aside className="w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-border/50 flex flex-col shadow-2xl relative overflow-hidden">
        {/* Ambient glow effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-purple-500/5 blur-3xl"></div>

        <div className="p-6 border-b border-border/30 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/80 transition-all">
              <Package className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-foreground bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Retail Hub</h2>
              <p className="text-muted-foreground">Pro Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 relative z-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-foreground hover:bg-slate-800/50 hover:text-blue-400"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
                <span className="relative z-10">{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 text-yellow-300 ml-auto animate-pulse" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/30 relative z-10">
          <div className="flex items-center space-x-3 px-4 py-3 bg-slate-800/50 backdrop-blur rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300">
            <Avatar className="w-10 h-10 ring-2 ring-primary/50">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-foreground">Admin User</p>
              <p className="text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar with glassmorphism */}
        <header className="h-20 bg-card/50 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-6 shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-foreground capitalize bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {currentPage}
              </h1>
              <p className="text-muted-foreground">
                Welcome back, Admin! 👋
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 relative z-10">
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
              <Input 
                placeholder="Search anything..." 
                className="w-64 pl-10 bg-slate-800/50 border-border/50 focus:border-primary/50 transition-all"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-slate-800/50 transition-all">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 text-white border-2 border-background animate-pulse">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="secondary">3 New</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-4 hover:bg-slate-800/50 transition-all">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <p>Low Stock Alert</p>
                    </div>
                    <p className="text-muted-foreground">5 products are running low on inventory</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-slate-800/50 transition-all">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p>New Sale Recorded</p>
                    </div>
                    <p className="text-muted-foreground">Sale #1234 completed successfully</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-slate-800/50 transition-all">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <p>Daily Report Ready</p>
                    </div>
                    <p className="text-muted-foreground">Your daily performance summary is available</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-slate-800/50 transition-all">
                  <Avatar className="w-8 h-8 ring-2 ring-primary/50">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">AD</AvatarFallback>
                  </Avatar>
                  <span>Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-slate-800/50">Profile Settings</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-800/50">Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
          {/* Ambient background effects */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
