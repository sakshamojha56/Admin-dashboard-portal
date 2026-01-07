import { prisma } from "@/lib/db";
import { MultiStepProductForm } from "@/components/products/MultiStepProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <MultiStepProductForm categories={categories} />;
}
