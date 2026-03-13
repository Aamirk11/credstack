import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumb?: string;
}

export function PageHeader({ title, description, action, breadcrumb }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {breadcrumb && (
          <p className="hidden sm:block text-xs text-slate-400 font-medium mb-0.5">
            {breadcrumb}
          </p>
        )}
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {description && (
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action && <div className="mt-2 sm:mt-0 shrink-0">{action}</div>}
    </div>
  );
}
