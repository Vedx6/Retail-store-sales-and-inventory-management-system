import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { UserPlus, Mail, Phone, Pencil, Trash2, Users, Shield, UserCheck } from "lucide-react";
import { useEffect } from "react";

type ApiUser = { id: number; name: string; email: string; role: string; created_at: string };
const initialUsers: ApiUser[] = [];

export function UsersPage() {
  const [users, setUsers] = useState<ApiUser[]>(initialUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<ApiUser | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/users');
        const data: ApiUser[] = await res.json();
        setUsers(data);
      } catch {}
    };
    load();
  }, []);

  const handleAddUser = async () => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUser.name, email: newUser.email, role: newUser.role || 'staff' })
      });
      const refreshed = await fetch('/api/users').then(r => r.json());
      setUsers(refreshed);
      setNewUser({ name: "", email: "", role: "" });
      setIsAddDialogOpen(false);
    } catch {}
  };
  
  const handleEditUser = async () => {
    if (!editUser) return;
    
    try {
      await fetch(`/api/users/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser)
      });
      const refreshed = await fetch('/api/users').then(r => r.json());
      setUsers(refreshed);
      setIsEditDialogOpen(false);
      setEditUser(null);
    } catch {}
  };
  
  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`/api/users/${userId}`, {
          method: 'DELETE'
        });
        const refreshed = await fetch('/api/users').then(r => r.json());
        setUsers(refreshed);
      } catch {}
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "Manager":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Cashier":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      default:
        return "";
    }
  };

  const getAvatarGradient = (role: string) => {
    switch (role) {
      case "Admin":
        return "from-purple-500 to-pink-500";
      case "Manager":
        return "from-blue-500 to-cyan-500";
      case "Cashier":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">User Management</h1>
          <p className="text-muted-foreground">
            Manage staff accounts and access permissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/50 hover:shadow-blue-600/50 transition-all duration-300">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border/50">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-primary" />
                <span>Add New User</span>
              </DialogTitle>
              <DialogDescription>
                Create a new staff account with role and permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Full Name</Label>
                <Input
                  id="userName"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="bg-input-background border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail">Email</Label>
                <Input
                  id="userEmail"
                  type="email"
                  placeholder="email@retailstore.com"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="bg-input-background border-border/50 focus:border-primary"
                />
              </div>
              {/* Phone removed for API parity */}
              <div className="space-y-2">
                <Label htmlFor="userRole">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger id="userRole" className="bg-input-background border-border/50">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAddUser}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Add User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-muted-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <h2 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{users.length}</h2>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-muted-foreground flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-400" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <h2 className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{users.filter((u) => u.role === "Admin").length}</h2>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-muted-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Administrators
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <h2 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{users.filter((u) => u.role === "Admin").length}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Staff Members</span>
            <Badge variant="outline" className="border-primary/50 text-primary">
              {users.length} Team Members
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="text-muted-foreground">User</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Phone</TableHead>
                  <TableHead className="text-muted-foreground">Role</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow 
                    key={user.id} 
                    className="hover:bg-slate-800/30 transition-all duration-300 border-border/30"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className={`w-10 h-10 ring-2 ring-offset-2 ring-offset-background bg-gradient-to-br ${getAvatarGradient(user.role)} shadow-lg`}>
                          <AvatarFallback className={`bg-gradient-to-br ${getAvatarGradient(user.role)} text-white`}>
                            {user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-foreground">{user.name}</p>
                          <p className="text-muted-foreground">{user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                    </TableCell>
                    {/* Phone column removed for API parity */}
                    <TableCell>
                      <Badge variant="outline" className={getRoleBadgeColor(user.role as any)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "Admin" ? "default" : "secondary"}
                        className={
                          user.role === "Admin"
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-blue-500/10 hover:text-blue-400 transition-all"
                          onClick={() => {
                            setEditUser(user);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-red-500/10 hover:text-red-400 transition-all"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Pencil className="w-5 h-5 text-primary" />
              <span>Edit User</span>
            </DialogTitle>
            <DialogDescription>
              Update user account details and role
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {editUser && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="editUserName">Full Name</Label>
                  <Input
                    id="editUserName"
                    placeholder="Enter full name"
                    value={editUser.name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
                    }
                    className="bg-input-background border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editUserEmail">Email</Label>
                  <Input
                    id="editUserEmail"
                    type="email"
                    placeholder="email@retailstore.com"
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                    className="bg-input-background border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editUserRole">Role</Label>
                  <Select
                    value={editUser.role}
                    onValueChange={(value) =>
                      setEditUser({ ...editUser, role: value })
                    }
                  >
                    <SelectTrigger id="editUserRole" className="bg-input-background border-border/50">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Cashier">Cashier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleEditUser}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Update User
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
