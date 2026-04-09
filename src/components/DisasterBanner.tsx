import Link from "next/link";
import { DisasterInfo } from "@/types";

/** 深刻度ごとの表示設定（背景色・パルスアニメ・ラベル） */
const severityConfig = {
  critical: {
    bg: "bg-red-600",
    pulse: true,
    label: "重大災害",
  },
  warning: {
    bg: "bg-orange-500",
    pulse: true,
    label: "警報",
  },
  advisory: {
    bg: "bg-yellow-600",
    pulse: false,
    label: "注意報",
  },
};

/** 災害種別に対応するアイコン */
const typeIcons: Record<DisasterInfo["type"], string> = {
  earthquake: "🔴",
  tsunami: "🌊",
  typhoon: "🌀",
  flood: "🌧️",
  fire: "🔥",
  other: "⚠️",
};

/** 災害速報バナー — トップページに表示し、タップで特設ページへ遷移する */
export default function DisasterBanner({
  disaster,
}: {
  disaster: DisasterInfo;
}) {
  const config = severityConfig[disaster.severity];

  return (
    <Link href={`/disaster/${disaster.id}`}>
      <div
        className={`${config.bg} text-white rounded-2xl p-6 cursor-pointer hover:opacity-95 transition-all`}
        style={{ boxShadow: "var(--md-elevation-3)" }}
      >
        <div className="flex items-start gap-4">
          <span className="text-3xl mt-0.5" role="img" aria-label={disaster.type}>
            {typeIcons[disaster.type]}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {config.pulse && (
                <span className="flex items-center gap-1.5 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  速報
                </span>
              )}
              <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                {config.label}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-snug mb-2">
              {disaster.title}
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              {disaster.summary}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-white/70">
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
          <span className="text-white/50 text-2xl font-light">›</span>
        </div>
      </div>
    </Link>
  );
}
