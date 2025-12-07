interface StatusBadgeProps {
  status: string;
  type?: "organization" | "booking" | "venue";
}

export default function StatusBadge({ status, type = "organization" }: StatusBadgeProps) {
  const getStatusConfig = () => {
    if (type === "organization") {
      const configs: Record<string, { label: string; color: string }> = {
        pending_verification: { label: "PENDING", color: "text-yellow-600" },
        verified: { label: "VERIFIED", color: "text-primary" },
        suspended: { label: "SUSPENDED", color: "text-red-400" },
        inactive: { label: "INACTIVE", color: "text-gray-400" },
      };
      return configs[status] || { label: status.toUpperCase(), color: "text-gray-400" };
    }

    if (type === "booking") {
      const configs: Record<string, { label: string; color: string }> = {
        pending: { label: "PENDING", color: "text-yellow-600" },
        confirmed: { label: "CONFIRMED", color: "text-primary" },
        cancelled: { label: "CANCELLED", color: "text-red-600" },
        completed: { label: "COMPLETED", color: "text-secondary" },
      };
      return configs[status] || { label: status.toUpperCase(), color: "text-gray-400" };
    }

    if (type === "venue") {
      const configs: Record<string, { label: string; color: string }> = {
        PENDING: { label: "PENDING", color: "text-yellow-400" },
        VERIFIED: { label: "VERIFIED", color: "text-primary" },
        REJECTED: { label: "REJECTED", color: "text-red-400" },
      };
      return configs[status] || { label: status.toUpperCase(), color: "text-gray-400" };
    }

    return { label: status.toUpperCase(), color: "text-gray-400" };
  };

  const config = getStatusConfig();

  return (
    <span className={`text-xs font-bold ${config.color}`}>
      {config.label}
    </span>
  );
}
