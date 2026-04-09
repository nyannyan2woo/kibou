import { LifelineStatus, TransportStatus } from "@/types";

const lifelineIcons: Record<LifelineStatus["type"], string> = {
  electricity: "⚡",
  water: "💧",
  gas: "🔥",
  telecom: "📱",
};

const lifelineLabels: Record<LifelineStatus["type"], string> = {
  electricity: "電気",
  water: "水道",
  gas: "ガス",
  telecom: "通信",
};

const statusBadge: Record<
  LifelineStatus["status"],
  { label: string; className: string }
> = {
  normal: { label: "正常", className: "bg-emerald-100 text-emerald-700" },
  disrupted: { label: "障害中", className: "bg-red-100 text-red-700" },
  restored: { label: "復旧済", className: "bg-blue-100 text-blue-700" },
};

const transportBadge: Record<
  TransportStatus["status"],
  { label: string; className: string }
> = {
  normal: { label: "通常運行", className: "bg-emerald-100 text-emerald-700" },
  delayed: { label: "遅延", className: "bg-amber-100 text-amber-700" },
  suspended: { label: "運休", className: "bg-red-100 text-red-700" },
  partial: { label: "一部運休", className: "bg-orange-100 text-orange-700" },
};

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LifelinePanel({
  statuses,
}: {
  statuses: LifelineStatus[];
}) {
  return (
    <section>
      <div className="bg-indigo-600 text-white rounded-t-xl px-4 py-3 flex items-center gap-2">
        <span className="text-lg">🔌</span>
        <div>
          <h2 className="text-base font-bold">ライフライン状況</h2>
          <p className="text-[11px] text-white/80">
            電気・水道・ガス・通信の稼働状況
          </p>
        </div>
      </div>
      <div className="bg-white rounded-b-xl shadow-sm divide-y divide-gray-100">
        {statuses.map((s) => {
          const badge = statusBadge[s.status];
          return (
            <div key={s.id} className="p-4 flex items-center gap-3">
              <span className="text-xl">
                {lifelineIcons[s.type]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-gray-700">
                    {lifelineLabels[s.type]}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{s.area}</p>
                <p className="text-xs text-gray-600 mt-0.5">{s.detail}</p>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0">
                {formatTime(s.updatedAt)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function TransportPanel({
  statuses,
}: {
  statuses: TransportStatus[];
}) {
  return (
    <section>
      <div className="bg-violet-600 text-white rounded-t-xl px-4 py-3 flex items-center gap-2">
        <span className="text-lg">🚃</span>
        <div>
          <h2 className="text-base font-bold">交通機関の運行状況</h2>
          <p className="text-[11px] text-white/80">鉄道・バスの運行情報</p>
        </div>
      </div>
      <div className="bg-white rounded-b-xl shadow-sm divide-y divide-gray-100">
        {statuses.map((s) => {
          const badge = transportBadge[s.status];
          return (
            <div key={s.id} className="p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-gray-700">
                    {s.line}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">{s.operator}</p>
                <p className="text-xs text-gray-600 mt-0.5">{s.detail}</p>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0">
                {formatTime(s.updatedAt)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
