import Link from "next/link";
import { DisasterInfo } from "@/types";

const severityConfig = {
  critical: {
    bg: "bg-red-600",
    border: "border-red-500",
    pulse: true,
    label: "重大災害",
  },
  warning: {
    bg: "bg-orange-500",
    border: "border-orange-400",
    pulse: true,
    label: "警報",
  },
  advisory: {
    bg: "bg-yellow-500",
    border: "border-yellow-400",
    pulse: false,
    label: "注意報",
  },
};

const typeIcons: Record<DisasterInfo["type"], string> = {
  earthquake: "🔴",
  tsunami: "🌊",
  typhoon: "🌀",
  flood: "🌧️",
  fire: "🔥",
  other: "⚠️",
};

export default function DisasterBanner({
  disaster,
}: {
  disaster: DisasterInfo;
}) {
  const config = severityConfig[disaster.severity];

  return (
    <Link href={`/disaster/${disaster.id}`}>
      <div
        className={`${config.bg} text-white rounded-xl p-4 shadow-lg cursor-pointer hover:opacity-95 transition-opacity`}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl" role="img" aria-label={disaster.type}>
            {typeIcons[disaster.type]}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {config.pulse && (
                <span className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  速報
                </span>
              )}
              <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                {config.label}
              </span>
            </div>
            <h2 className="text-lg font-bold leading-snug mb-1">
              {disaster.title}
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              {disaster.summary}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
              <span>📍 {disaster.region}</span>
              <span>
                🕐{" "}
                {new Date(disaster.occurredAt).toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <span className="text-white/60 text-xl">›</span>
        </div>
      </div>
    </Link>
  );
}
