"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Moon, Sun, Bell, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 page-transition max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-blue mb-2 md:mb-3">
          Settings
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Customize your dashboard experience
        </p>
      </div>

      <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
        {/* Appearance Settings - Symmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.4 }}
        >
          <Card className="border-0 shadow-premium bg-card h-full">
            <CardHeader className="p-5 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl gradient-blue flex items-center justify-center shadow-lg flex-shrink-0">
                  <Palette className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-xl sm:text-2xl truncate">Appearance</CardTitle>
                  <CardDescription className="text-sm sm:text-base truncate">
                    Choose your theme
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-5 sm:p-6">
              <div>
                <Label className="text-sm font-semibold mb-5 block text-foreground/80">
                  Theme Mode
                </Label>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8 rounded-2xl border-2 transition-all ${theme === "light"
                        ? "border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-xl"
                        : "border-border hover:border-blue-600 dark:hover:border-blue-700 bg-muted/30"
                      }`}
                  >
                    <div className={`p-3 sm:p-4 rounded-2xl ${theme === "light" ? "gradient-blue shadow-lg" : "bg-muted"}`}>
                      <Sun className={`h-6 w-6 sm:h-8 sm:w-8 ${theme === "light" ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="text-center">
                      <span className={`block text-sm sm:text-base font-semibold ${theme === "light" ? "text-blue-900 dark:text-blue-400" : "text-foreground"}`}>
                        Light
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 block hidden sm:inline">
                        Bright
                      </span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8 rounded-2xl border-2 transition-all ${theme === "dark"
                        ? "border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-xl"
                        : "border-border hover:border-blue-600 dark:hover:border-blue-700 bg-muted/30"
                      }`}
                  >
                    <div className={`p-3 sm:p-4 rounded-2xl ${theme === "dark" ? "gradient-blue shadow-lg" : "bg-muted"}`}>
                      <Moon className={`h-6 w-6 sm:h-8 sm:w-8 ${theme === "dark" ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="text-center">
                      <span className={`block text-sm sm:text-base font-semibold ${theme === "dark" ? "text-blue-900 dark:text-blue-400" : "text-foreground"}`}>
                        Dark
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 block hidden sm:inline">
                        Easy
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>
              <div className="pt-2 px-3 sm:px-4 py-3 rounded-xl bg-muted/50 border border-border/50">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  💡 Your theme preference will be saved automatically
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Settings - Symmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="border-0 shadow-premium bg-card h-full">
            <CardHeader className="p-5 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl gradient-yellow flex items-center justify-center shadow-lg flex-shrink-0">
                  <Bell className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-xl sm:text-2xl truncate">Notifications</CardTitle>
                  <CardDescription className="text-sm sm:text-base truncate">
                    Manage alerts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex-1 pr-4 min-w-0">
                  <p className="font-semibold text-foreground text-sm sm:text-base truncate">Email Updates</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">Product & inventory alerts</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all flex-shrink-0 ${emailNotifications ? "gradient-blue shadow-lg" : "bg-muted-foreground/30"
                    }`}
                >
                  <motion.span
                    layout
                    className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md"
                    style={{
                      x: emailNotifications ? 24 : 4,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex-1 pr-4 min-w-0">
                  <p className="font-semibold text-foreground text-sm sm:text-base truncate">Push Alerts</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">Instant notifications</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all flex-shrink-0 ${pushNotifications ? "gradient-blue shadow-lg" : "bg-muted-foreground/30"
                    }`}
                >
                  <motion.span
                    layout
                    className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md"
                    style={{
                      x: pushNotifications ? 24 : 4,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
              <div className="pt-2 px-3 sm:px-4 py-3 rounded-xl bg-muted/50 border border-border/50">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  🔔 Manage how you receive updates about your store
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
