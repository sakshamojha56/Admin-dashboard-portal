"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteButton } from "./delete-button";
import { Plus, Package as PackageIcon, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type ProductWithCategory = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  categoryId: string;
  category: {
    name: string;
  };
};

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useQuery<ProductWithCategory[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-blue-800">
        <p>Failed to load products</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gradient-blue mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory efficiently</p>
        </div>
        <Link href="/products/new">
          <Button className="gradient-blue text-white shadow-premium hover:shadow-premium-lg transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Create New Product
          </Button>
        </Link>
      </div>

      {/* Products Card */}
      <Card className="border-0 shadow-premium bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gradient-blue">All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {!products || products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-20 w-20 rounded-full gradient-blue flex items-center justify-center mb-4">
                <PackageIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first product</p>
              <Link href="/products/new">
                <Button className="gradient-blue text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Product
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                    <th className="px-4 py-4 text-left test-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <div className="relative h-10 w-10 rounded-lg overflow-hidden border border-gray-200">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                              <PackageIcon className="h-5 w-5" />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">{product.name}</div>
                            {product.description && (
                              <div className="text-sm text-gray-500 line-clamp-1 mt-1">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center rounded-full gradient-blue text-white px-3 py-1 text-xs font-semibold shadow-sm">
                          {product.category.name}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-lg text-gradient-blue">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${product.stock > 10
                            ? "bg-blue-100 text-blue-900"
                            : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/products/${product.id}/edit`}>
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-700">
                              Edit
                            </Button>
                          </Link>
                          <DeleteButton productId={product.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
