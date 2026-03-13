"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  Calendar,
  Building2,
  Settings,
  Shield,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, APP_NAME } from "@/lib/utils/constants";
import { getBadgeCounts } from "@/lib/utils/calculations";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Receipt,
  FileText,
  Calendar,
  Building2,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const { grants, taxCredits, applications, deadlines, business } =
    useCredStackData();
  const badges = getBadgeCounts(grants, taxCredits, applications, deadlines);

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 border-r border-border bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cred-blue">
          <Shield className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="text-lg font-bold text-cred-blue">{APP_NAME}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const badgeCount = item.badgeKey
            ? badges[item.badgeKey]
            : null;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                isActive
                  ? "bg-blue-50 text-blue-700 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:rounded-full before:bg-cred-blue"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "text-cred-blue" : "text-slate-400"
                  )}
                />
              )}
              <span className="flex-1">{item.label}</span>
              {badgeCount != null && badgeCount > 0 && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold",
                    isActive
                      ? "bg-cred-blue text-white"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-border space-y-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-cred-blue/10 flex items-center justify-center text-sm font-semibold text-cred-blue">
            {business.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {business.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {business.city}, {business.state}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-cred-blue border-cred-blue/30 hover:bg-cred-blue/5"
        >
          <Sparkles className="w-4 h-4" />
          Upgrade to Pro
        </Button>
      </div>
    </aside>
  );
}
