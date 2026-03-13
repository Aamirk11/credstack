"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Search, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const BUSINESS_TYPES = [
  "Technology",
  "Professional Services",
  "Manufacturing",
  "Healthcare",
  "Retail",
  "Restaurant",
  "Construction",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "200+"];

const REPORT_PREVIEW = [
  { icon: Search, label: "Matched grants for your industry" },
  { icon: DollarSign, label: "Available tax credits" },
  { icon: FileText, label: "Estimated total savings" },
];

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [companySize, setCompanySize] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    toast.success(
      "Your free grant report is on the way! Check your inbox in 24 hours."
    );
    setEmail("");
    setBusinessName("");
    setBusinessType("");
    setCompanySize("");
  }

  return (
    <section className="bg-cred-blue py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Find Your Free Money?
          </h2>
          <p className="mt-3 text-blue-100">
            Join 2,400+ businesses. Get your personalized grant report free.
          </p>

          <div className="mx-auto mt-6 max-w-lg rounded-xl border border-white/20 bg-white/5 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Row 1: Email + Business Name */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  type="email"
                  placeholder="you@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 border-white/20 bg-white/10 text-white placeholder:text-blue-200 focus-visible:border-white focus-visible:ring-white/30"
                />
                <Input
                  type="text"
                  placeholder="Business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-11 border-white/20 bg-white/10 text-white placeholder:text-blue-200 focus-visible:border-white focus-visible:ring-white/30"
                />
              </div>

              {/* Row 2: Business Type + Company Size */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Select
                  value={businessType}
                  onValueChange={(val: string | null) =>
                    setBusinessType(val ?? "")
                  }
                >
                  <SelectTrigger className="h-11 w-full border-white/20 bg-white/10 text-white data-placeholder:text-blue-200">
                    <SelectValue placeholder="Business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={companySize}
                  onValueChange={(val: string | null) =>
                    setCompanySize(val ?? "")
                  }
                >
                  <SelectTrigger className="h-11 w-full border-white/20 bg-white/10 text-white data-placeholder:text-blue-200">
                    <SelectValue placeholder="Company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="h-11 gap-2 bg-white px-6 text-cred-blue hover:bg-blue-50"
              >
                Get My Free Grant Report
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <p className="mt-3 text-xs text-blue-200/80">
              No credit card required &middot; Free forever plan available
            </p>
          </div>

          {/* Report preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-8 max-w-md rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue-200">
              Your personalized report will include
            </p>
            <div className="space-y-2">
              {REPORT_PREVIEW.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex size-7 items-center justify-center rounded-md bg-white/10">
                    <item.icon className="size-4 text-blue-200" />
                  </div>
                  <span className="text-sm text-white">{item.label}</span>
                  <CheckCircle className="ml-auto size-4 text-cred-green" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
