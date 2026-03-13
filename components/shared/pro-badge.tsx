"use client";

import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUpgradeModal } from "@/lib/hooks/use-upgrade-modal";

interface ProBadgeProps {
  className?: string;
}

export function ProBadge({ className }: ProBadgeProps) {
  const { open } = useUpgradeModal();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
      }}
      className={cn(
        "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white",
        "bg-gradient-to-r from-blue-500 to-purple-500",
        "hover:from-blue-600 hover:to-purple-600 transition-all cursor-pointer",
        className
      )}
    >
      <Sparkle className="w-2.5 h-2.5 fill-white" />
      PRO
    </button>
  );
}
