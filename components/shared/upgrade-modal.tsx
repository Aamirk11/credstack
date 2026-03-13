"use client";

import { FileCheck, Shield, Download, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpgradeModal } from "@/lib/hooks/use-upgrade-modal";
import { toast } from "sonner";

const BENEFITS = [
  {
    icon: FileCheck,
    title: "AI-Powered Applications",
    description: "Save 12+ hours per application with AI pre-fill",
    color: "text-cred-blue",
    bg: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Full Eligibility Details",
    description: "See exactly what you need to qualify",
    color: "text-cred-green",
    bg: "bg-green-50",
  },
  {
    icon: Download,
    title: "CPA-Ready Reports",
    description: "One-click tax credit reports for your accountant",
    color: "text-cred-gold",
    bg: "bg-amber-50",
  },
];

export function UpgradeModal() {
  const { isOpen, close } = useUpgradeModal();

  const handleStartTrial = () => {
    toast("Trial started! Welcome to CredStack Pro.");
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-cred-blue to-blue-700 px-6 pt-6 pb-5 text-white">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-5 h-5 text-cred-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                      Pro
                    </span>
                  </div>
                  <DialogTitle className="text-xl font-bold text-white">
                    Unlock Full Access with CredStack Pro
                  </DialogTitle>
                  <DialogDescription className="text-sm text-blue-100 mt-1">
                    Everything you need to maximize your funding potential.
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Benefits */}
              <div className="px-6 py-5 space-y-3">
                {BENEFITS.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-lg ${benefit.bg} shrink-0`}
                    >
                      <benefit.icon className={`w-4.5 h-4.5 ${benefit.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {benefit.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing + CTA */}
              <div className="px-6 pb-6 space-y-4">
                {/* Price */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-slate-900">$29</span>
                    <span className="text-sm text-slate-500">/month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    or $24/mo billed annually
                  </p>
                </div>

                {/* CTA */}
                <Button
                  className="w-full bg-cred-blue hover:bg-cred-blue-dark text-white h-10 text-sm font-semibold gap-2"
                  onClick={handleStartTrial}
                >
                  <Sparkles className="w-4 h-4" />
                  Start 14-Day Free Trial
                </Button>

                {/* Trust */}
                <p className="text-center text-[10px] text-slate-400">
                  30-day money-back guarantee
                </p>

                {/* Compare link */}
                <button
                  onClick={() => {
                    toast("Full feature comparison coming soon!");
                    close();
                  }}
                  className="block mx-auto text-xs text-cred-blue hover:text-cred-blue-dark underline underline-offset-2 transition-colors"
                >
                  See all Pro features
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
