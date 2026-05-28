"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenTool, CalendarClock, BarChart3, Settings, LogOut, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/articles", icon: FileText, label: "All Articles" },
    { href: "/admin/editor", icon: PenTool, label: "New Article" },
    { href: "/admin/scheduler", icon: CalendarClock, label: "Scheduler" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col fixed h-full z-10 hidden md:flex">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold tracking-tight">Aurvyz <span className="font-light text-blue-600 dark:text-blue-500">CMS</span></h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Publishing</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 transition-colors">
            <LogOut className="w-5 h-5 text-gray-400" /> Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
