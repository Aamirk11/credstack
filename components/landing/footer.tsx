import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";
import { CredStackLogo } from "@/components/shared/credstack-logo";

const LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Grant Database", href: "#" },
      { label: "Tax Credit Guide", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <CredStackLogo size="sm" />
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Discover the funding your business deserves.
            </p>
            <p className="mt-2 text-xs font-medium text-cred-green">
              Helping small businesses find $47M+ in grants and credits
            </p>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 CredStack. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Not financial advice. CredStack helps you discover opportunities
              but does not guarantee eligibility or approval.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
