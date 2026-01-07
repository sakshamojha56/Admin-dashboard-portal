"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      setUploadError("Failed to upload image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative group"
          >
            <div className="relative h-64 w-full rounded-2xl overflow-hidden border-2 border-border shadow-lg">
              <Image
                src={value}
                alt="Product image"
                fill
                className="object-cover"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onRemove}
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.label
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative flex flex-col items-center justify-center h-64 w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
              isUploading
                ? "border-teal-500 bg-teal-50 dark:bg-teal-950/20"
                : "border-border hover:border-teal-400 hover:bg-muted/50"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={isUploading}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              {isUploading ? (
                <>
                  <Loader2 className="h-12 w-12 text-teal-600 animate-spin" />
                  <p className="text-sm font-medium text-foreground">Uploading...</p>
                </>
              ) : (
                <>
                  <div className="h-14 w-14 rounded-full gradient-teal flex items-center justify-center shadow-lg">
                    <Upload className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      Click to upload product image
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.label>
        )}
      </AnimatePresence>

      {uploadError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 font-medium"
        >
          {uploadError}
        </motion.p>
      )}
    </div>
  );
}
