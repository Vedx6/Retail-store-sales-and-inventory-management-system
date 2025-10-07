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
import { Plus, Search, Pencil, Trash2, Package2, Filter } from "lucide-react";
import { Badge } from "./ui/badge";

const initialProducts = [
  {
    id: "P001",
    name: "Laptop Dell XPS 13",
    category: "Electronics",
    price: "$1,200",
    quantity: 45,
    supplier: "Dell Inc.",
    status: "In Stock",
  },
  {
    id: "P002",
    name: "iPhone 14 Pro",
    category: "Electronics",
    price: "$1,200",
    quantity: 23,
    supplier: "Apple Inc.",
    status: "In Stock",
  },
  {
    id: "P003",
    name: "Samsung Galaxy S23",
    category: "Electronics",
    price: "$900",
    quantity: 8,
    supplier: "Samsung",
    status: "Low Stock",
  },
  {
    id: "P004",
    name: "MacBook Pro M2",
    category: "Electronics",
    price: "$2,500",
    quantity: 15,
    supplier: "Apple Inc.",
    status: "In Stock",
  },
  {
    id: "P005",
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: "$350",
    quantity: 67,
    supplier: "Sony",
    status: "In Stock",
  },
  {
    id: "P006",
    name: "LG OLED TV 55\"",
    category: "Electronics",
    price: "$1,800",
    quantity: 12,
    supplier: "LG Electronics",
    status: "In Stock",
  },
  {
    id: "P007",
    name: "Canon EOS R6",
    category: "Cameras",
    price: "$2,400",
    quantity: 5,
    supplier: "Canon",
    status: "Low Stock",
  },
  {
    id: "P008",
    name: "iPad Air",
    category: "Electronics",
    price: "$600",
    quantity: 34,
    supplier: "Apple Inc.",
    status: "In Stock",
  },
];

export function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    const product = {
      id: `P${String(products.length + 1).padStart(3, "0")}`,
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      quantity: parseInt(newProduct.quantity),
      supplier: newProduct.supplier,
      status: parseInt(newProduct.quantity) < 10 ? "Low Stock" : "In Stock",
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", category: "", price: "", quantity: "", supplier: "" });
    setIsAddDialogOpen(false);
  };

  const categories = ["all", "Electronics", "Audio", "Cameras"];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Products Management</h1>
          <p className="text-muted-foreground">
            Manage your inventory and product catalog
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/50 hover:shadow-blue-600/50 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border/50">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Package2 className="w-5 h-5 text-primary" />
                <span>Add New Product</span>
              </DialogTitle>
              <DialogDescription>
                Enter the details of the new product to add to inventory
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="bg-input-background border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) =>
                    setNewProduct({ ...newProduct, category: value })
                  }
                >
                  <SelectTrigger id="category" className="bg-input-background border-border/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Audio">Audio</SelectItem>
                    <SelectItem value="Cameras">Cameras</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="$0.00"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="bg-input-background border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  className="bg-input-background border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  placeholder="Enter supplier name"
                  value={newProduct.supplier}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, supplier: e.target.value })
                  }
                  className="bg-input-background border-border/50 focus:border-primary"
                />
              </div>
              <Button
                onClick={handleAddProduct}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name or ID..."
                className="pl-10 bg-slate-800/50 border-border/50 focus:border-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-border/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="text-muted-foreground">Product ID</TableHead>
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Category</TableHead>
                  <TableHead className="text-muted-foreground">Price</TableHead>
                  <TableHead className="text-muted-foreground">Quantity</TableHead>
                  <TableHead className="text-muted-foreground">Supplier</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow 
                    key={product.id} 
                    className="hover:bg-slate-800/30 transition-all duration-300 border-border/30"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <TableCell className="text-primary">{product.id}</TableCell>
                    <TableCell className="text-foreground">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{product.price}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                        {product.quantity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{product.supplier}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "In Stock" ? "default" : "destructive"
                        }
                        className={
                          product.status === "In Stock"
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : "bg-red-500/10 text-red-400 border-red-500/30"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-blue-500/10 hover:text-blue-400 transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-red-500/10 hover:text-red-400 transition-all"
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package2 className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}
