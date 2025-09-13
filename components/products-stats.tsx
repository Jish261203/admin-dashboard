import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp, AlertTriangle, IndianRupee  } from "lucide-react"
import type { Product } from "@/app/page"

interface ProductsStatsProps {
  products: Product[]
}

export function ProductsStats({ products }: ProductsStatsProps) {
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const lowStockProducts = products.filter((p) => p.stock < 10 && p.stock > 0).length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Low Stock Alert",
      value: lowStockProducts,
      icon: AlertTriangle,
      color: "text-amber-600",
    },
    {
      title: "Total Inventory Value",
      value: `₹${totalValue.toLocaleString()}`,
      icon: IndianRupee ,
      color: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
