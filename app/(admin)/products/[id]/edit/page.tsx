import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditProductForm } from "@/components/products/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <EditProductForm
      product={{
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock,
        categoryId: product.categoryId,
        image: product.image,
      }}
      categories={categories}
    />
  );
}
