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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ShoppingCart, CheckCircle2, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { useEffect } from "react";

type ApiProduct = { id: number; name: string; sku: string; price: number | string; stock: number };
type ApiSale = { id: number; product_id: number; quantity: number; total_amount: number | string; sold_at: string };

const products: ApiProduct[] = [];

const initialSales: ApiSale[] = [];

export function SalesPage() {
  const [sales, setSales] = useState<ApiSale[]>(initialSales);
  const [productOptions, setProductOptions] = useState<ApiProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, salesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/sales')
        ]);
        const [prodData, salesData] = await Promise.all([prodRes.json(), salesRes.json()]);
        setProductOptions(prodData);
        setSales(salesData);
      } catch {}
    };
    load();
  }, []);

  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);
    const product = productOptions.find((p) => String(p.id) === productId);
    if (product) {
      setPrice(String(product.price));
      if (quantity) {
        setSubtotal(parseFloat(String(product.price)) * parseInt(quantity));
      }
    }
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
    if (price && value) {
      setSubtotal(parseFloat(price) * parseInt(value));
    }
  };

  const handleRecordSale = async () => {
    if (selectedProduct && quantity) {
      const productIdNum = parseInt(selectedProduct);
      const qtyNum = parseInt(quantity);
      const total = parseFloat(price) * qtyNum;
      try {
        await fetch('/api/sales', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: productIdNum, quantity: qtyNum, total_amount: total })
        });
        const refreshed = await fetch('/api/sales').then(r => r.json());
        setSales(refreshed);
        setSelectedProduct("");
        setQuantity("");
        setPrice("");
        setSubtotal(0);
      } catch {}
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Sales Management</h1>
        <p className="text-muted-foreground">
          Record new sales and view transaction history
        </p>
      </div>

      {/* Record New Sale Form */}
      <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/50">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            Record New Sale
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select value={selectedProduct} onValueChange={handleProductChange}>
                <SelectTrigger id="product" className="bg-slate-800/50 border-border/50">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                  {productOptions.map((product) => (
                    <SelectItem key={product.id} value={String(product.id)}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="bg-slate-800/50 border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Unit Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="$0.00"
                value={price}
                disabled
                className="bg-slate-800/50 border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtotal">Subtotal</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                <Input
                  id="subtotal"
                  value={`$${subtotal.toFixed(2)}`}
                  disabled
                  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 text-green-400 pl-10"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleRecordSale}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/50 hover:shadow-green-600/50 transition-all duration-300"
              disabled={!selectedProduct || !quantity}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Record Sale
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sales Table */}
      <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Sales</span>
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              {sales.length} Transactions
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="text-muted-foreground">Sale ID</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Product Name</TableHead>
                  <TableHead className="text-muted-foreground">Quantity</TableHead>
                  <TableHead className="text-muted-foreground">Unit Price</TableHead>
                  <TableHead className="text-right text-muted-foreground">Total Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale, index) => (
                  <TableRow 
                    key={sale.id} 
                    className="hover:bg-slate-800/30 transition-all duration-300 border-border/30"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <TableCell className="text-primary">{sale.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                        {sale.sold_at}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{sale.product_id}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                        {sale.quantity}x
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{sale.total_amount}</TableCell>
                    <TableCell className="text-right text-green-400">{sale.total_amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
