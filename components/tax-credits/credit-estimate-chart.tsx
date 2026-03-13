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
  LabelList,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TaxCredit } from "@/lib/types";
import { formatCurrencyCompact, formatCurrency } from "@/lib/utils/format";

interface CreditEstimateChartProps {
  credits: TaxCredit[];
}

function GoldGradientDefs() {
  return (
    <defs>
      <linearGradient id="goldGradientLow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#D97706" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.9} />
      </linearGradient>
      <linearGradient id="goldGradientRange" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.7} />
        <stop offset="100%" stopColor="#FCD34D" stopOpacity={0.7} />
      </linearGradient>
    </defs>
  );
}

export function CreditEstimateChart({ credits }: CreditEstimateChartProps) {
  const data = credits.map((c) => ({
    name: c.name.length > 25 ? c.name.slice(0, 22) + "..." : c.name,
    fullName: c.name,
    low: c.estimatedValueLow / 100,
    high: c.estimatedValueHigh / 100,
    range: (c.estimatedValueHigh - c.estimatedValueLow) / 100,
    total: c.estimatedValueHigh / 100,
  }));

  const totalHigh = data.reduce((sum, d) => sum + d.total, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Credit Estimate Breakdown</CardTitle>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Potential</p>
            <p className="text-sm font-bold text-cred-gold">{formatCurrency(totalHigh * 100)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
            >
              <GoldGradientDefs />
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.2}
                stroke="#CBD5E1"
              />
              <XAxis
                type="number"
                tickFormatter={(v: number) => formatCurrencyCompact(v * 100)}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={{ stroke: "#E2E8F0" }}
                tickLine={{ stroke: "#E2E8F0" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fontSize: 11, fill: "#64748B" }}
                axisLine={false}
                tickLine={false}
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
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
                cursor={{ fill: "rgba(245, 158, 11, 0.05)" }}
              />
              <Bar
                dataKey="low"
                stackId="stack"
                radius={[0, 0, 0, 0]}
                fill="url(#goldGradientLow)"
              />
              <Bar
                dataKey="range"
                stackId="stack"
                radius={[0, 4, 4, 0]}
                fill="url(#goldGradientRange)"
              >
                <LabelList
                  dataKey="total"
                  position="right"
                  formatter={((v: unknown) => v != null ? formatCurrencyCompact(Number(v) * 100) : "") as never}
                  style={{ fontSize: 10, fill: "#64748B", fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2.5 rounded-sm bg-amber-600/90" />
            <span className="text-[10px] text-slate-500">Low Estimate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2.5 rounded-sm bg-amber-400/70" />
            <span className="text-[10px] text-slate-500">Potential Upside</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
