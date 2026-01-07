"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createProduct } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "@/components/products/ImageUpload";
import { ArrowLeft, ArrowRight, Check, Package, DollarSign, Image as ImageIcon } from "lucide-react";

interface MultiStepProductFormProps {
  categories: Array<{ id: string; name: string }>;
}

type Step = 1 | 2 | 3;

export function MultiStepProductForm({ categories }: MultiStepProductFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: categories[0]?.id || "",
    price: "",
    stock: "",
    image: "",
  });

  const steps = [
    { number: 1, name: "Basic Info", icon: Package },
    { number: 2, name: "Pricing", icon: DollarSign },
    { number: 3, name: "Images", icon: ImageIcon },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    const result = await createProduct(formDataToSubmit);

    if (result.success) {
      toast.success(result.message);
      router.push("/products");
      router.refresh();
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.categoryId;
      case 2:
        return formData.price && formData.stock;
      case 3:
        return true; // Image is optional
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 page-transition max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient-teal mb-2">
          Create New Product
        </h1>
        <p className="text-muted-foreground">Add a product to your inventory in 3 easy steps</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all ${
                      isCompleted
                        ? "gradient-green shadow-lg"
                        : isActive
                        ? "gradient-teal shadow-lg"
                        : "bg-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    ) : (
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                    )}
                  </motion.div>
                  <span className={`mt-2 text-xs sm:text-sm font-semibold ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-full mx-2 rounded-full transition-all ${currentStep > step.number ? "gradient-teal" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Steps */}
      <Card className="border-0 shadow-premium bg-card">
        <CardContent className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                    placeholder="E.g., Wireless Headphones"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your product..."
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId" className="text-sm font-semibold">
                    Category *
                  </Label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
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
              </motion.div>
            )}

            {/* Step 2: Pricing */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-semibold">
                    Price ($) *
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">Set the selling price for this product</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-sm font-semibold">
                    Stock Quantity *
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">How many units are available?</p>
                </div>

                <div className="mt-8 p-4 sm:p-6 rounded-xl bg-muted/50 border border-border">
                  <h3 className="font-semibold mb-3">Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product:</span>
                      <span className="font-medium">{formData.name || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">${formData.price || "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stock:</span>
                      <span className="font-medium">{formData.stock || "0"} units</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Images */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Product Image (Optional)</Label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    onRemove={() => setFormData({ ...formData, image: "" })}
                  />
                  <p className="text-xs text-muted-foreground">Upload a high-quality image of your product</p>
                </div>

                <div className="mt-8 p-4 sm:p-6 rounded-xl gradient-teal text-white">
                  <h3 className="font-bold text-lg mb-4">Ready to Create!</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between opacity-90">
                      <span>Product:</span>
                      <span className="font-semibold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between opacity-90">
                      <span>Price:</span>
                      <span className="font-semibold">${formData.price}</span>
                    </div>
                    <div className="flex justify-between opacity-90">
                      <span>Stock:</span>
                      <span className="font-semibold">{formData.stock} units</span>
                    </div>
                    <div className="flex justify-between opacity-90">
                      <span>Image:</span>
                      <span className="font-semibold">{formData.image ? "✓ Uploaded" : "No image"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-border">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="h-11"
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex-1 h-11 gradient-teal text-white shadow-premium hover:shadow-premium-lg transition-all font-semibold ml-auto"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepValid()}
                className="flex-1 h-11 gradient-teal text-white shadow-premium hover:shadow-premium-lg transition-all font-semibold ml-auto"
              >
                {isSubmitting ? "Creating..." : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Create Product
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
