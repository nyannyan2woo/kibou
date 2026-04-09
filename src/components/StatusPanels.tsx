import { LifelineStatus, TransportStatus } from "@/types";
import Icon from "@/components/Icon";

/** ライフライン種別のアイコン */
const lifelineIcons: Record<LifelineStatus["type"], string> = {
  electricity: "bolt",
  water: "water_drop",
  gas: "local_fire_department",
  telecom: "cell_tower",
};

/** ライフライン種別の日本語ラベル */
const lifelineLabels: Record<LifelineStatus["type"], string> = {
  electricity: "電気",
  water: "水道",
  gas: "ガス",
  telecom: "通信",
};

/** ライフライン稼働状況のバッジ（正常 / 障害中 / 復旧済） */
const statusBadge: Record<
  LifelineStatus["status"],
  { label: string; bg: string; color: string }
> = {
  normal: { label: "正常", bg: "var(--md-success-container)", color: "var(--md-success)" },
  disrupted: { label: "障害中", bg: "var(--md-error-container)", color: "var(--md-error)" },
  restored: { label: "復旧済", bg: "var(--md-primary-container)", color: "var(--md-primary)" },
};

/** 交通機関の運行ステータスバッジ */
const transportBadge: Record<
  TransportStatus["status"],
  { label: string; bg: string; color: string }
> = {
  normal: { label: "通常運行", bg: "var(--md-success-container)", color: "var(--md-success)" },
  delayed: { label: "遅延", bg: "var(--md-warning-container)", color: "var(--md-warning)" },
  suspended: { label: "運休", bg: "var(--md-error-container)", color: "var(--md-error)" },
  partial: { label: "一部運休", bg: "var(--md-warning-container)", color: "var(--md-warning)" },
};

/** 日時文字列を「HH:MM」形式にフォーマット */
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** ライフライン状況パネル — 電気・水道・ガス・通信の稼働状態を一覧表示 */
export function LifelinePanel({
  statuses,
}: {
  statuses: LifelineStatus[];
}) {
  return (
    <section>
      <div
        className="bg-indigo-600 text-white rounded-t-2xl px-6 py-4 flex items-center gap-3"
        style={{ boxShadow: "var(--md-elevation-1)" }}
      >
        <Icon name="power" size={22} filled className="text-white" />
        <div>
          <h2 className="text-lg font-bold">ライフライン状況</h2>
          <p className="text-xs text-white/80 mt-0.5">
            電気・水道・ガス・通信の稼働状況
          </p>
        </div>
      </div>
      <div
        className="rounded-b-2xl divide-y"
        style={{
          background: "var(--md-surface-container-lowest)",
          boxShadow: "var(--md-elevation-1)",
          borderColor: "var(--md-outline-variant)",
        }}
      >
        {statuses.map((s) => {
          const badge = statusBadge[s.status];
          return (
            <div key={s.id} className="p-5 flex items-center gap-4" style={{ borderColor: "var(--md-outline-variant)" }}>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{ background: "var(--md-surface-container)" }}
              >
                <Icon name={lifelineIcons[s.type]} size={24} filled style={{ color: "var(--md-primary)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold" style={{ color: "var(--md-on-surface)" }}>
                    {lifelineLabels[s.type]}
                  </span>
                  <span
                    className="text-[11px] font-bold px-3 py-0.5 rounded-full"
                    style={{ background: badge.bg, color: badge.color }}
                  >
                    {badge.label}
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "var(--md-outline)" }}>{s.area}</p>
                <p className="text-sm mt-1" style={{ color: "var(--md-on-surface-variant)" }}>{s.detail}</p>
              </div>
              <span className="text-xs shrink-0" style={{ color: "var(--md-outline)" }}>
                {formatTime(s.updatedAt)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** 交通機関パネル — 鉄道・バスの運行情報を一覧表示 */
export function TransportPanel({
  statuses,
}: {
  statuses: TransportStatus[];
}) {
  return (
    <section>
      <div
        className="bg-violet-600 text-white rounded-t-2xl px-6 py-4 flex items-center gap-3"
        style={{ boxShadow: "var(--md-elevation-1)" }}
      >
        <Icon name="train" size={22} filled className="text-white" />
        <div>
          <h2 className="text-lg font-bold">交通機関の運行状況</h2>
          <p className="text-xs text-white/80 mt-0.5">鉄道・バスの運行情報</p>
        </div>
      </div>
      <div
        className="rounded-b-2xl divide-y"
        style={{
          background: "var(--md-surface-container-lowest)",
          boxShadow: "var(--md-elevation-1)",
          borderColor: "var(--md-outline-variant)",
        }}
      >
        {statuses.map((s) => {
          const badge = transportBadge[s.status];
          return (
            <div key={s.id} className="p-5 flex items-center gap-4" style={{ borderColor: "var(--md-outline-variant)" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold" style={{ color: "var(--md-on-surface)" }}>
                    {s.line}
                  </span>
                  <span
                    className="text-[11px] font-bold px-3 py-0.5 rounded-full"
                    style={{ background: badge.bg, color: badge.color }}
                  >
                    {badge.label}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--md-outline)" }}>{s.operator}</p>
                <p className="text-sm mt-1" style={{ color: "var(--md-on-surface-variant)" }}>{s.detail}</p>
              </div>
              <span className="text-xs shrink-0" style={{ color: "var(--md-outline)" }}>
                {formatTime(s.updatedAt)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
