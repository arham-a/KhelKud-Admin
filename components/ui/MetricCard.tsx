import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  href?: string;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  color = "primary",
  href,
}: MetricCardProps) {
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-primary",
    danger: "text-red-400",
    warning: "text-yellow-400",
    info: "text-secondary",
  };

  const content = (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-1 theme-muted">{title}</p>
        <p className="text-2xl font-semibold text-white theme-text">{value}</p>
      </div>
      {Icon && (
        <div className={`flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="h-8 w-8" />
        </div>
      )}
      {href && !Icon && (
        <div className={`flex items-center justify-center ${colorClasses[color]} transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-[-45deg]`}>
          <ArrowRightIcon className="h-6 w-6" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        <div className="bg-dark-50 rounded-lg shadow-lg border border-gray-800 p-5 hover:border-primary/30 transition-all duration-200 theme-card cursor-pointer">
          {content}
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-dark-50 rounded-lg shadow-lg border border-gray-800 p-5 hover:border-primary/30 transition-all duration-200 theme-card">
      {content}
    </div>
  );
}
