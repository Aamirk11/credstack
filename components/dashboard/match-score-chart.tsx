"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { getMatchStrengthCounts } from "@/lib/utils/calculations";

const COLORS = {
  strong: "#16A34A",
  possible: "#F59E0B",
  exploring: "#94A3B8",
};

export function MatchScoreChart() {
  const { grants } = useCredStackData();
  const counts = getMatchStrengthCounts(grants);
  const total = counts.strong + counts.possible + counts.exploring;

  const data = [
    { name: "Strong Match", value: counts.strong, color: COLORS.strong },
    { name: "Possible Match", value: counts.possible, color: COLORS.possible },
    { name: "Worth Exploring", value: counts.exploring, color: COLORS.exploring },
  ].filter((d) => d.value > 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Match Strength</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center">
          <div className="relative w-36 h-36 min-h-[144px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900">{total}</span>
              <span className="text-[10px] text-slate-500">matches</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-1.5 mt-3 w-full">
            {[
              { label: "Strong Match", count: counts.strong, color: "bg-cred-green" },
              { label: "Possible Match", count: counts.possible, color: "bg-amber-500" },
              { label: "Worth Exploring", count: counts.exploring, color: "bg-slate-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-slate-600">{item.label}</span>
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  {item.count} <span className="text-slate-400 font-normal">({total > 0 ? Math.round((item.count / total) * 100) : 0}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
