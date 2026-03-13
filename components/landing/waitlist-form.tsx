"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-cred-blue py-20 sm:py-24">
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
          <p className="mt-4 text-blue-100">
            Join 2,400+ businesses already discovering free money
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-blue-200 focus-visible:border-white focus-visible:ring-white/30"
              />
              <Select value={businessType} onValueChange={(val: string | null) => setBusinessType(val ?? "")}>
                <SelectTrigger className="h-12 w-full border-white/20 bg-white/10 text-white data-placeholder:text-blue-200 sm:w-48">
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
                className="h-12 gap-2 bg-white px-6 text-cred-blue hover:bg-blue-50"
              >
                Join the Waitlist
                <ArrowRight className="size-4" />
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex flex-col items-center gap-3 rounded-xl bg-white/10 px-6 py-8 backdrop-blur"
            >
              <CheckCircle className="size-12 text-cred-green-light" />
              <p className="text-lg font-semibold text-white">
                You&apos;re on the list!
              </p>
              <p className="text-sm text-blue-100">
                We&apos;ll be in touch soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
