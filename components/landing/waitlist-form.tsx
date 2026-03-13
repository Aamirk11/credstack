"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list! We'll be in touch soon.");
    setEmail("");
    setBusinessType("");
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
            Join 2,400+ businesses. Limited early-bird pricing available.
          </p>

          <div className="mx-auto mt-6 max-w-lg rounded-xl border border-white/20 bg-white/5 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 flex-1 border-white/20 bg-white/10 text-white placeholder:text-blue-200 focus-visible:border-white focus-visible:ring-white/30"
              />
              <Select value={businessType} onValueChange={(val: string | null) => setBusinessType(val ?? "")}>
                <SelectTrigger className="h-11 w-full border-white/20 bg-white/10 text-white data-placeholder:text-blue-200 sm:w-48">
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
              <Button
                type="submit"
                size="lg"
                className="h-11 gap-2 bg-white px-6 text-cred-blue hover:bg-blue-50"
              >
                Join Waitlist
                <ArrowRight className="size-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-blue-200/80">
              Free to join. No credit card required.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
