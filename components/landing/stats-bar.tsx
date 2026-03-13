"use client";

import { motion } from "framer-motion";

const STATS = [
  {
    value: "$10.2B+",
    description: "in R&D credits unclaimed annually",
  },
  {
    value: "95%",
    description: "of eligible businesses never apply",
  },
  {
    value: "$47K",
    description: "Average user finds in opportunities",
  },
];

export function StatsBar() {
  return (
    <section className="bg-blue-50 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-3xl font-extrabold text-cred-gold sm:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-600">{stat.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
