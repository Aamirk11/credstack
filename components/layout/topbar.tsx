"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/tax-credits": "Tax Credits",
  "/dashboard/applications": "Applications",
  "/dashboard/calendar": "Calendar",
  "/dashboard/profile": "Business Profile",
  "/dashboard/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const { business } = useCredStackData();

  const title =
    PAGE_TITLES[pathname] ||
    Object.entries(PAGE_TITLES).find(([path]) =>
      pathname.startsWith(path) && path !== "/dashboard"
    )?.[1] ||
    "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-border">
      {/* Left: Page Title */}
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cred-blue ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full",
            "bg-cred-blue text-white text-sm font-semibold cursor-pointer",
            "hover:ring-2 hover:ring-cred-blue/30 transition-shadow"
          )}
          title={business.name}
        >
          {business.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}
