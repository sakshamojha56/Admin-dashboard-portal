"use client";

import { deleteProduct } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function DeleteButton({ productId }: { productId: string }) {
  const queryClient = useQueryClient();

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: async () => {
      const result = await deleteProduct(productId);
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete product");
    },
  });

  const confirmDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      handleDelete();
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={confirmDelete}
      disabled={isPending}
      className="shadow-sm hover:shadow-md transition-all"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
