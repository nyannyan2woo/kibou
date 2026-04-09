import Link from "next/link";
import { DisasterInfo } from "@/types";
import Icon from "@/components/Icon";
import ElapsedTime from "@/components/ElapsedTime";

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

/** 災害種別に対応するMaterial Symbolsアイコン名 */
const typeIcons: Record<DisasterInfo["type"], string> = {
  earthquake: "earthquake",
  tsunami: "tsunami",
  typhoon: "cyclone",
  flood: "flood",
  fire: "local_fire_department",
  other: "warning",
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
        className={`${config.bg} text-white rounded-2xl p-5 sm:p-6 cursor-pointer hover:opacity-95 transition-all animate-fade-in-up`}
        style={{ boxShadow: "var(--md-elevation-3)" }}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
            <Icon name={typeIcons[disaster.type]} size={28} filled className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
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
            <h2 className="text-lg sm:text-xl font-bold leading-snug mb-2">
              {disaster.title}
            </h2>
            <p className="text-sm text-white/90 leading-relaxed line-clamp-2">
              {disaster.summary}
            </p>
            <div className="flex items-center gap-3 sm:gap-4 mt-3 text-xs text-white/70 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <Icon name="location_on" size={14} />
                {disaster.region}
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="schedule" size={14} />
                {new Date(disaster.occurredAt).toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="timer" size={14} />
                <ElapsedTime since={disaster.occurredAt} />
              </span>
            </div>
          </div>
          <Icon name="chevron_right" size={24} className="text-white/50 shrink-0 mt-3" />
        </div>
        {/* 特設ページを見るCTA */}
        <div className="mt-4 pt-3 border-t border-white/20 text-center">
          <span className="text-sm font-medium inline-flex items-center gap-1.5">
            特設ページを見る
            <Icon name="arrow_forward" size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
