import { cn } from "@/lib/utils";

interface CredStackLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function CredStackLogo({ size = "md", showText = true, className }: CredStackLogoProps) {
  const iconSizes = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-10 h-10" };
  const textSizes = { sm: "text-base", md: "text-lg", lg: "text-xl" };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", iconSizes[size])}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Shield shape */}
          <path
            d="M20 2L4 10v12c0 9.55 6.84 18.48 16 20.5 9.16-2.02 16-10.95 16-20.5V10L20 2z"
            fill="url(#shield-gradient)"
          />
          {/* Inner shield highlight */}
          <path
            d="M20 5L7 11.5v10.5c0 7.97 5.55 15.4 13 17.12V5z"
            fill="url(#shield-highlight)"
            opacity="0.15"
          />
          {/* Stacked coins */}
          <ellipse cx="20" cy="24" rx="7" ry="2.5" fill="#F59E0B" opacity="0.9" />
          <ellipse cx="20" cy="21.5" rx="7" ry="2.5" fill="#FBBF24" />
          <rect x="13" y="21.5" width="14" height="2.5" fill="#F59E0B" opacity="0.6" />
          <ellipse cx="20" cy="19" rx="7" ry="2.5" fill="#FCD34D" />
          <rect x="13" y="19" width="14" height="2.5" fill="#FBBF24" opacity="0.6" />
          <ellipse cx="20" cy="16.5" rx="7" ry="2.5" fill="#FDE68A" />
          {/* Dollar sign on top coin */}
          <text x="20" y="18.5" textAnchor="middle" fill="#92400E" fontSize="5" fontWeight="bold" fontFamily="sans-serif">$</text>
          {/* Checkmark */}
          <circle cx="29" cy="11" r="5" fill="#16A34A" />
          <path d="M26.5 11L28.5 13L32 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <defs>
            <linearGradient id="shield-gradient" x1="20" y1="2" x2="20" y2="44.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="shield-highlight" x1="7" y1="5" x2="20" y2="39" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", textSizes[size])}>
          <span className="text-cred-blue">Cred</span>
          <span className="text-slate-800">Stack</span>
        </span>
      )}
    </div>
  );
}
