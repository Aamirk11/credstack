"use client";

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      {/* Greeting skeleton */}
      <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />

      {/* Page header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-56 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-72 bg-slate-100 rounded animate-pulse" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/50 bg-white p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-slate-200 animate-pulse" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                <div className="h-6 w-12 bg-slate-300 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Savings summary skeleton */}
      <div className="rounded-xl border border-border/50 bg-gradient-to-br from-blue-50/50 to-white p-5 space-y-3">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-slate-200 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-9 w-64 bg-slate-300 rounded animate-pulse" />
            <div className="h-3 w-48 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Chart + list skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Grant list skeleton */}
        <div className="lg:col-span-2 space-y-3">
          {/* Filter bar skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-16 bg-slate-200 rounded-md animate-pulse"
                />
              ))}
            </div>
            <div className="h-9 w-[180px] bg-slate-200 rounded-md animate-pulse" />
          </div>

          {/* Grant cards skeleton */}
          <div className="rounded-xl border border-border/50 bg-white">
            <div className="p-4 border-b border-border/50">
              <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg border-l-[3px] border-l-slate-200 bg-slate-50/50"
                >
                  <div className="h-10 w-10 rounded-lg bg-slate-200 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
                      <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="hidden sm:block space-y-1">
                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-12 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="space-y-4">
          {/* Chart skeleton */}
          <div className="rounded-xl border border-border/50 bg-white p-4 space-y-3">
            <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-[200px] bg-slate-100 rounded-lg animate-pulse" />
          </div>
          {/* Deadline ticker skeleton */}
          <div className="rounded-xl border border-border/50 bg-white p-4 space-y-3">
            <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GrantCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-white p-4 space-y-3 border-l-3 border-l-slate-200">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-slate-200 animate-pulse shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-7 w-7 rounded bg-slate-100 animate-pulse" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-5 w-14 bg-slate-200 rounded-full animate-pulse" />
      </div>
      <div className="h-8 w-full bg-slate-100 rounded animate-pulse" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-slate-300 rounded animate-pulse" />
        <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="h-7 w-44 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-64 bg-slate-100 rounded animate-pulse" />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/50 bg-white p-3 flex items-center gap-2.5"
          >
            <div className="h-9 w-9 rounded-lg bg-slate-200 animate-pulse" />
            <div className="space-y-1">
              <div className="h-5 w-8 bg-slate-300 rounded animate-pulse" />
              <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border/50 bg-white p-4">
          {/* Month header */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" />
            ))}
          </div>
          {/* Date cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="h-10 bg-slate-50 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
        {/* Deadline list */}
        <div className="rounded-xl border border-border/50 bg-white p-4 space-y-3">
          <div className="h-5 w-28 bg-slate-200 rounded animate-pulse" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="h-2 w-2 rounded-full bg-slate-200 animate-pulse" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
