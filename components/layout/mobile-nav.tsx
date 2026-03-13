"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOBILE_NAV_ITEMS } from "@/lib/utils/constants";
import { getBadgeCounts } from "@/lib/utils/calculations";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Receipt,
  FileText,
  Calendar,
};

export function MobileNav() {
  const pathname = usePathname();
  const { grants, taxCredits, applications, deadlines } = useCredStackData();
  const badges = getBadgeCounts(grants, taxCredits, applications, deadlines);

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const badgeCount = item.badgeKey ? badges[item.badgeKey] : null;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors relative",
                isActive ? "text-cred-blue" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="relative">
                {Icon && <Icon className="w-5 h-5" />}
                {badgeCount != null && badgeCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-cred-blue" />
                )}
              </div>
              <span className="text-[10px] font-medium leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
