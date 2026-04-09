import { EvacuationShelter } from "@/types";
import Icon from "@/components/Icon";

/** 設備タグの色分け */
const facilityColors: Record<string, string> = {
  飲料水: "bg-blue-100 text-blue-700",
  毛布: "bg-orange-100 text-orange-700",
  簡易トイレ: "bg-purple-100 text-purple-700",
  "Wi-Fi": "bg-cyan-100 text-cyan-700",
  AED: "bg-red-100 text-red-700",
  ペット可: "bg-green-100 text-green-700",
  授乳室: "bg-pink-100 text-pink-700",
};

/** 収容率に応じたテキスト色を返す（80%以上: 赤, 50%以上: 黄, それ以下: 緑） */
function occupancyColor(shelter: EvacuationShelter) {
  const ratio = shelter.currentOccupancy / shelter.capacity;
  if (ratio >= 0.8) return "text-red-600";
  if (ratio >= 0.5) return "text-amber-600";
  return "text-emerald-600";
}

/** 収容率バーの割合と色を計算 */
function occupancyBar(shelter: EvacuationShelter) {
  const ratio = Math.min(shelter.currentOccupancy / shelter.capacity, 1);
  const pct = Math.round(ratio * 100);
  let barColor = "bg-emerald-400";
  if (ratio >= 0.8) barColor = "bg-red-400";
  else if (ratio >= 0.5) barColor = "bg-amber-400";
  return { pct, barColor };
}

/** 避難所一覧 — 開設中の避難所を収容率バー付きで表示 */
export default function ShelterList({
  shelters,
}: {
  shelters: EvacuationShelter[];
}) {
  const openShelters = shelters.filter((s) => s.isOpen);

  return (
    <section>
      <div
        className="bg-blue-600 text-white rounded-t-2xl px-6 py-4 flex items-center gap-3"
        style={{ boxShadow: "var(--md-elevation-1)" }}
      >
        <Icon name="night_shelter" size={22} filled className="text-white" />
        <div>
          <h2 className="text-lg font-bold">避難所情報</h2>
          <p className="text-xs text-white/80 mt-0.5">
            開設中の避難所一覧・収容状況
          </p>
        </div>
        <span className="ml-auto text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
          {openShelters.length}箇所開設中
        </span>
      </div>
      <div
        className="rounded-b-2xl divide-y"
        style={{
          background: "var(--md-surface-container-lowest)",
          boxShadow: "var(--md-elevation-1)",
          borderColor: "var(--md-outline-variant)",
        }}
      >
        {openShelters.map((shelter) => {
          const { pct, barColor } = occupancyBar(shelter);
          return (
            <div key={shelter.id} className="p-5" style={{ borderColor: "var(--md-outline-variant)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold" style={{ color: "var(--md-on-surface)" }}>
                    {shelter.name}
                  </h3>
                  <p className="text-xs mt-1 inline-flex items-center gap-1" style={{ color: "var(--md-outline)" }}>
                    <Icon name="location_on" size={14} />
                    {shelter.address}
                  </p>
                </div>
                <span
                  className={`text-sm font-bold ${occupancyColor(shelter)}`}
                >
                  {pct}%
                </span>
              </div>
              {/* 収容率バー */}
              <div
                className="w-full h-2.5 rounded-full overflow-hidden mb-3"
                style={{ background: "var(--md-surface-container-highest)" }}
              >
                <div
                  className={`h-full ${barColor} rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs mb-3" style={{ color: "var(--md-outline)" }}>
                <span>
                  収容: {shelter.currentOccupancy} / {shelter.capacity}人
                </span>
              </div>
              {/* 設備タグ */}
              <div className="flex flex-wrap gap-1.5">
                {shelter.facilities.map((f) => (
                  <span
                    key={f}
                    className={`text-[11px] px-3 py-1 rounded-full font-medium ${
                      facilityColors[f] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
