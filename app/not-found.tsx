import Link from "next/link";
import { SearchX, LayoutDashboard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CredStackLogo } from "@/components/shared/credstack-logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="text-center max-w-sm space-y-6">
        <CredStackLogo size="lg" className="justify-center" />

        <div className="flex justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-100">
            <SearchX className="w-10 h-10 text-slate-300" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="bg-cred-blue hover:bg-cred-blue-dark text-white gap-2"
            render={<Link href="/dashboard" />}
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            render={<Link href="/" />}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
