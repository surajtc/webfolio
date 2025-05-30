import {
  Home,
  ShoppingCart,
  Heart,
  Download,
  Gift,
  MessageSquare,
  Star,
  Percent,
  Eye,
  LogOut,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Page() {
  const navItems = [
    { label: "Orders", icon: Home },
    { label: "Wish List", icon: Heart },
    { label: "Cart", icon: ShoppingCart },
    { label: "Offers", icon: Gift },
    { label: "Saved", icon: Star },
    { label: "Rewards", icon: Percent },
    { label: "Support", icon: MessageSquare },
    { label: "Download", icon: Download },
  ];

  const stats = [
    {
      label: "Orders",
      value: 4,
      color: "bg-chart-2",
    },
    {
      label: "Rewards Points",
      value: 0,
      color: "bg-chart-3",
    },
    {
      label: "WishList",
      value: 0,
      color: "bg-chart-4",
    },
    {
      label: "Downloads",
      value: 1,
      color: "bg-chart-5",
    },
  ];

  const orders = [
    {
      id: "#18849",
      date: "December 14, 2022",
      status: "Completed",
      total: "$20 for 1 item",
    },
    {
      id: "#18848",
      date: "December 14, 2022",
      status: "On hold",
      total: "$20 for 1 item",
    },
    {
      id: "#18843",
      date: "December 14, 2022",
      status: "On hold",
      total: "$47 for 3 items",
    },
    {
      id: "#18842",
      date: "December 14, 2022",
      status: "On hold",
      total: "$13 for 1 item",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted p-4 flex flex-col">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-24 h-24 bg-chart-1 rounded-full" />
          <div className="text-center text-sm">
            <div className="font-medium">Demo</div>
            <div className="text-muted-foreground">demo@gmail.com</div>
            <Button
              variant="link"
              className="text-xs text-destructive mt-1 p-0"
            >
              <LogOut className="w-3 h-3 mr-1" /> Logout
            </Button>
          </div>
        </div>

        <nav className="space-y-2 text-sm">
          {navItems.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <Icon className="w-4 h-4" /> {label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className={cn(
                "cursor-pointer hover:shadow-md transition",
                stat.color,
              )}
            >
              <CardContent className="p-4">
                <div className="text-lg font-semibold">{stat.label}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="mt-2 text-sm underline">View More</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Orders Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent orders</h2>
          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 font-medium">Order</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Total</th>
                  <th className="p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-accent">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.date}</td>
                    <td className="p-3">{order.status}</td>
                    <td className="p-3">{order.total}</td>
                    <td className="p-3">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="w-4 h-4" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
