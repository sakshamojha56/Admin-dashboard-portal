"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProduct } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/products/ImageUpload";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface EditProductFormProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    categoryId: string;
    image: string | null;
  };
  categories: Array<{ id: string; name: string }>;
}

export function EditProductForm({ product, categories }: EditProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(product.image || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("image", image);

    const result = await updateProduct(product.id, formData);

    if (result.success) {
      toast.success(result.message);
      router.push("/products");
      router.refresh();
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 page-transition max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/products">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient-teal mb-2">
          Edit Product
        </h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-0 shadow-premium bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Product Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={product.name}
                  required
                  className="h-11"
                  placeholder="Enter product name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={product.description || ""}
                  rows={4}
                  placeholder="Enter product description"
                  className="resize-none"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="categoryId" className="text-sm font-semibold">
                  Category *
                </Label>
                <select
                  id="categoryId"
                  name="categoryId"
                  defaultValue={product.categoryId}
                  required
                  className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-semibold">
                    Price ($) *
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={product.price}
                    required
                    className="h-11"
                    placeholder="0.00"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-sm font-semibold">
                    Stock Quantity *
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    defaultValue={product.stock}
                    required
                    className="h-11"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Product Image</Label>
                <ImageUpload
                  value={image}
                  onChange={setImage}
                  onRemove={() => setImage("")}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 gradient-teal text-white shadow-premium hover:shadow-premium-lg transition-all font-semibold"
                >
                  {isSubmitting ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/products")}
                  disabled={isSubmitting}
                  className="h-12"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
