"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CredStackLogo } from "@/components/shared/credstack-logo";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
          <div className="text-center max-w-sm space-y-6">
            <CredStackLogo size="lg" className="justify-center" />

            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold text-slate-900">
                Something went wrong
              </h1>
              <p className="text-sm text-slate-500">
                Please try refreshing the page. If the problem persists, contact our support team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-cred-blue hover:bg-cred-blue-dark text-white gap-2"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                render={<a href="mailto:support@credstack.com" />}
              >
                <Mail className="w-4 h-4" />
                Report Issue
              </Button>
            </div>

            <p className="text-xs text-slate-400">
              support@credstack.com
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
