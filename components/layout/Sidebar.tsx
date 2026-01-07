"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings, BookOpen, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r border-border shadow-xl">
      {/* Logo Area */}
      <div className="flex h-20 items-center gap-3 border-b border-border px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl gradient-blue shadow-premium"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="h-7 w-7 text-white fill-white" />
          </motion.div>
          <div className="absolute inset-0 rounded-2xl gradient-blue blur-md opacity-50" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold text-gradient-blue tracking-tight">AdminHub</h1>
          <p className="text-xs text-muted-foreground font-medium">Dashboard v1.0</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-white shadow-premium"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl gradient-blue"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative h-5 w-5 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-muted-foreground"
                  )}
                />
                <span className="relative font-semibold">{item.name}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative ml-auto h-2 w-2 rounded-full bg-white shadow-sm"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="border-t border-border p-4"
      >
        <Link href="/help.md" target="_blank" className="block">
          <div className="rounded-2xl gradient-yellow p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h3 className="mb-1 font-bold text-white text-base">Need Help?</h3>
            <p className="text-sm text-white/90 mb-3">
              Check our comprehensive guide
            </p>
            <button className="w-full rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-yellow-800 shadow-sm hover:shadow-md transition-all">
              View Documentation
            </button>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
