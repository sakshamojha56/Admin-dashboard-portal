"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Package, DollarSign, TrendingUp, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: "Package" | "DollarSign" | "TrendingUp";
  gradient: string;
  delay: number;
  change?: string;
}

const iconMap = {
  Package,
  DollarSign,
  TrendingUp,
};

export function StatCard({ title, value, description, icon, gradient, delay, change }: StatCardProps) {
  const [count, setCount] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const Icon = iconMap[icon];

  useEffect(() => {
    if (typeof numericValue === 'number' && !isNaN(numericValue)) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [numericValue]);

  const displayValue = typeof value === 'string' && value.includes('$')
    ? `$${count.toFixed(2)}`
    : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-premium hover:shadow-premium-lg transition-all duration-300 bg-white">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`} />

        {/* Animated shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="animate-shimmer absolute inset-0" />
        </div>

        <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">
              {title}
            </p>
            {change && (
              <div className="flex items-center gap-1 text-xs text-blue-800 font-medium">
                <ArrowUp className="h-3 w-3" />
                <span>{change}</span>
              </div>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className={`absolute inset-0 blur-xl opacity-40 ${gradient}`} />
            <div className={`relative p-3 rounded-2xl ${gradient} shadow-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-gradient-blue mb-1">
            {displayValue}
          </div>
          <p className="text-xs text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
