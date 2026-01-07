import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "@/components/charts/OverviewChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const aggregateData = await prisma.product.aggregate({
    where: { userId },
    _sum: {
      stock: true,
      price: true,
    },
  });

  const totalStock = aggregateData._sum.stock || 0;
  const totalValue = aggregateData._sum.price || 0;


  const products = await prisma.product.findMany({
    where: { userId },
    take: 10,
    select: {
      name: true,
      stock: true,
    },
    orderBy: {
      stock: 'desc',
    },
  });

  const chartData = products.map((product) => ({
    name: product.name,
    stock: product.stock,
  }));

  return (
    <div className="min-h-screen p-8 page-transition">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient-blue mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <StatCard
          title="Total Stock"
          value={totalStock}
          description="Units across all products"
          icon="TrendingUp"
          gradient="gradient-blue"
          delay={0}
        />
        <StatCard
          title="Total Value"
          value={`$${Number(totalValue).toFixed(2)}`}
          description="Combined inventory value"
          icon="DollarSign"
          gradient="gradient-yellow"
          delay={0.1}
        />
      </div>


      {/* Chart Card */}
      <Card className="border-0 shadow-premium bg-white">
        <CardHeader className="pb-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gradient-blue">Stock Overview</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Top 10 products by stock quantity</p>
          </div>
        </CardHeader>
        <CardContent>
          <OverviewChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
