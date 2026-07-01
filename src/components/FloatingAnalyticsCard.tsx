import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  accent?: "blue" | "cyan";
  className?: string;
  speed?: "slow" | "slower";
  delay?: string;
}

export function FloatingAnalyticsCard({ icon: Icon, label, value, trend, accent = "blue", className = "", speed = "slow", delay = "0s" }: Props) {
  const isCyan = accent === "cyan";
  const ring = isCyan ? "rgba(34,211,238,0.25)" : "rgba(59,130,246,0.25)";
  const iconBg = isCyan ? "rgba(34,211,238,0.12)" : "rgba(59,130,246,0.12)";
  const iconColor = isCyan ? "#22d3ee" : "#60a5fa";
  const trendColor = isCyan ? "#22d3ee" : "#60a5fa";

  return (
    <div
      className={`absolute ${speed === "slow" ? "animate-float-slow" : "animate-float-slower"} ${className}`}
      style={{ animationDelay: delay }}
    >
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{
          backgroundColor: "rgba(13,17,23,0.85)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${ring}`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <Icon className="w-4 h-4" strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <p className="text-[10px] font-medium" style={{ color: "#64748b" }}>{label}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-white font-display">{value}</span>
            {trend && <span className="text-[10px] font-semibold" style={{ color: trendColor }}>{trend}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
