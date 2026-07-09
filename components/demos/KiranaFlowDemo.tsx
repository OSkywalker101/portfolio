"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ShoppingCart, IndianRupee, TrendingUp, Users, DollarSign, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  stock: number;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  khataBalance: number;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: "1", name: "Parle-G", price: 25, emoji: "🍪", stock: 45, category: "Biscuits" },
  { id: "2", name: "GoodDay", price: 30, emoji: "🍪", stock: 32, category: "Biscuits" },
  { id: "3", name: "Maggi", price: 28, emoji: "🍜", stock: 38, category: "Noodles" },
  { id: "4", name: "Amul Butter", price: 250, emoji: "🧈", stock: 15, category: "Dairy" },
  { id: "5", name: "Tide Detergent", price: 180, emoji: "🧴", stock: 8, category: "Household" },
  { id: "6", name: "Colgate", price: 85, emoji: "🦷", stock: 22, category: "Personal" },
  { id: "7", name: "Fortune Oil", price: 160, emoji: "🫒", stock: 18, category: "Cooking" },
  { id: "8", name: "Aashirvaad Atta", price: 240, emoji: "🌾", stock: 12, category: "Flour" },
];

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "1", name: "Ramesh Kumar", phone: "9876543210", khataBalance: 450 },
  { id: "2", name: "Sunita Devi", phone: "9876543211", khataBalance: 1200 },
  { id: "3", name: "Mahesh Sharma", phone: "9876543212", khataBalance: 0 },
  { id: "4", name: "Priya Singh", phone: "9876543213", khataBalance: 780 },
];

const INITIAL_STATS = {
  todaySales: 4250,
  profit: 1120,
  outstanding: 2340,
  revenue: 18450,
};

const STORAGE_KEY = "kiranaflow-demo-state";

export default function KiranaFlowDemo() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { cart: savedCart, stats: savedStats, products: savedProducts } = JSON.parse(saved);
        setCart(savedCart || []);
        setStats(savedStats || INITIAL_STATS);
        if (savedProducts) {
          const mergedProducts = INITIAL_PRODUCTS.map(p => {
            const saved = savedProducts.find((sp: Product) => sp.id === p.id);
            return saved ? { ...p, stock: saved.stock } : p;
          });
          setProducts(mergedProducts);
        }
      } catch {
        console.log("Failed to load saved state");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, stats, products }));
  }, [cart, stats, products]);

  const handleRefresh = () => {
    setCart([]);
    setSelectedCustomer(null);
    setProducts(INITIAL_PRODUCTS);
    setStats(INITIAL_STATS);
    localStorage.removeItem(STORAGE_KEY);
    toast.info("KiranaFlow POS reset", { duration: 1500 });
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error(`${product.name} is out of stock!`, { duration: 2000 });
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 500);

    toast.success(`Added ${product.name} to cart`, {
      duration: 1500,
      icon: "🛒",
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const completeSale = () => {
    const total = getCartTotal();

    if (cart.length === 0) {
      toast.error("Cart is empty!", { duration: 2000 });
      return;
    }

    const soldAmount = total;
    const profitAmount = total * 0.26;

    setProducts(prev =>
      prev.map(p => {
        const cartItem = cart.find(ci => ci.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: p.stock - cartItem.quantity };
        }
        return p;
      })
    );

    setStats(prev => ({
      todaySales: prev.todaySales + soldAmount,
      profit: prev.profit + profitAmount,
      outstanding: selectedCustomer ? prev.outstanding + (selectedCustomer.khataBalance > 0 ? total : 0) : prev.outstanding,
      revenue: prev.revenue + soldAmount,
    }));

    const customerInfo = selectedCustomer ? ` for ${selectedCustomer.name}` : "";
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold">Sale Complete!</span>
        <span className="text-sm">₹{soldAmount.toLocaleString("en-IN")}{customerInfo}</span>
      </div>,
      { duration: 3000 }
    );

    if (selectedCustomer && selectedCustomer.khataBalance > 0) {
      toast.info(`Khata updated for ${selectedCustomer.name}`, { duration: 2000 });
    }

    setCart([]);
    setSelectedCustomer(null);
  };

  const lowStockItems = products.filter(p => p.stock <= 10);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-mono text-indigo-400">{"// KIRANAFLOW_POS"}</span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Today Sales", value: stats.todaySales, icon: IndianRupee, color: "indigo" },
          { label: "Profit", value: stats.profit, icon: TrendingUp, color: "emerald" },
          { label: "Outstanding", value: stats.outstanding, icon: Users, color: "amber" },
          { label: "Revenue MTD", value: stats.revenue, icon: DollarSign, color: "purple" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className={`p-2 rounded-lg bg-gradient-to-br ${
              color === "indigo" ? "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30" :
              color === "emerald" ? "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30" :
              color === "amber" ? "from-amber-500/20 to-amber-600/10 border-amber-500/30" :
              "from-purple-500/20 to-purple-600/10 border-purple-500/30"
            } border`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Icon className={`w-3 h-3 ${
                color === "indigo" ? "text-indigo-400" :
                color === "emerald" ? "text-emerald-400" :
                color === "amber" ? "text-amber-400" :
                "text-purple-400"
              }`} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{label}</span>
            </div>
            <div className={`text-lg font-bold ${
              color === "indigo" ? "text-indigo-300" :
              color === "emerald" ? "text-emerald-300" :
              color === "amber" ? "text-amber-300" :
              "text-purple-300"
            }`}>
              ₹{value.toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <div className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Products</div>
          <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto pr-1 scrollbar-emerald">
            {products.map(product => (
              <motion.button
                key={product.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className={`relative p-2 rounded-lg border bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-600 transition-all ${
                  product.stock <= 10 ? "border-amber-500/50" : "border-zinc-800"
                } ${justAdded === product.id ? "ring-2 ring-emerald-500" : ""}`}
              >
                <div className="text-xl mb-1">{product.emoji}</div>
                <div className="text-xs font-mono text-zinc-300 truncate">{product.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-white">₹{product.price}</span>
                  <span className={`text-[10px] font-mono ${
                    product.stock <= 5 ? "text-red-400" :
                    product.stock <= 10 ? "text-amber-400" :
                    "text-zinc-500"
                  }`}>
                    {product.stock} left
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="w-64">
          <div className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Cart</div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
            {cart.length === 0 ? (
              <div className="p-4 text-center text-zinc-600 text-xs font-mono">
                Cart is empty
              </div>
            ) : (
              <div className="max-h-[120px] overflow-y-auto">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between p-2 border-b border-zinc-800 last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-mono text-zinc-300 truncate">{item.product.name}</div>
                      <div className="text-[10px] text-zinc-500">₹{item.product.price} × {item.quantity}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-5 h-5 rounded bg-zinc-800 text-zinc-400 text-xs hover:bg-zinc-700"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-5 h-5 rounded bg-zinc-800 text-zinc-400 text-xs hover:bg-zinc-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-2 border-t border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400">Total</span>
                <span className="text-sm font-bold text-white">₹{getCartTotal().toLocaleString("en-IN")}</span>
              </div>

              <select
                value={selectedCustomer?.id || ""}
                onChange={(e) => {
                  const c = customers.find(c => c.id === e.target.value);
                  setSelectedCustomer(c || null);
                  if (c) {
                    toast.info(`Customer: ${c.name} (Khata: ₹${c.khataBalance})`, { duration: 2000 });
                  }
                }}
                className="w-full mb-2 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-300"
              >
                <option value="">Walk-in Customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.khataBalance > 0 ? `(₹${c.khataBalance})` : ""}
                  </option>
                ))}
              </select>

              <button
                onClick={completeSale}
                className="w-full py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                COMPLETE SALE
              </button>
            </div>
          </div>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span className="text-xs font-mono text-amber-400 uppercase">Low Stock Alert</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {lowStockItems.map(p => (
              <span key={p.id} className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded">
                {p.name}: {p.stock} left
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}