"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TaxCredit } from "@/lib/types";
import { formatCurrencyCompact, formatCurrency } from "@/lib/utils/format";

interface CreditEstimateChartProps {
  credits: TaxCredit[];
}

export function CreditEstimateChart({ credits }: CreditEstimateChartProps) {
  const data = credits.map((c) => ({
    name: c.name.length > 25 ? c.name.slice(0, 22) + "..." : c.name,
    fullName: c.name,
    low: c.estimatedValueLow / 100,
    high: c.estimatedValueHigh / 100,
    range: (c.estimatedValueHigh - c.estimatedValueLow) / 100,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Estimate Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
              <XAxis
                type="number"
                tickFormatter={(v: number) => formatCurrencyCompact(v * 100)}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value, name) => {
                  const numVal = typeof value === "number" ? value : 0;
                  const label = name === "low" ? "Low Estimate" : "Additional Range";
                  return [formatCurrency(numVal * 100), label];
                }}
                labelFormatter={(label) => {
                  const item = data.find((d) => d.name === label);
                  return item?.fullName || String(label);
                }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="low" stackId="stack" radius={[0, 0, 0, 0]} fill="#F59E0B" />
              <Bar dataKey="range" stackId="stack" radius={[0, 4, 4, 0]} fill="#FBBF24" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
