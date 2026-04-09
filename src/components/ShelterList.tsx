"use client";

import { useState } from "react";
import { EvacuationShelter } from "@/types";
import Icon from "@/components/Icon";

/** 設備タグのアイコンマッピング */
const facilityIcons: Record<string, string> = {
  飲料水: "water_drop",
  毛布: "bed",
  簡易トイレ: "wc",
  "Wi-Fi": "wifi",
  AED: "monitor_heart",
  ペット可: "pets",
  授乳室: "child_care",
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

/** 収容率ステータスラベル */
function occupancyLabel(shelter: EvacuationShelter) {
  const ratio = shelter.currentOccupancy / shelter.capacity;
  if (ratio >= 0.8) return { text: "混雑", bg: "var(--md-error-container)", color: "var(--md-error)" };
  if (ratio >= 0.5) return { text: "やや混雑", bg: "var(--md-warning-container)", color: "var(--md-warning)" };
  return { text: "空きあり", bg: "var(--md-success-container)", color: "var(--md-success)" };
}

/** 避難所のソート順フィルタ */
type SortOption = "occupancy-asc" | "occupancy-desc" | "name";

/** 避難所一覧 — 開設中の避難所を収容率バー付きで表示 */
export default function ShelterList({
  shelters,
}: {
  shelters: EvacuationShelter[];
}) {
  const [facilityFilter, setFacilityFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("occupancy-asc");

  const openShelters = shelters.filter((s) => s.isOpen);

  // 全設備リストを収集
  const allFacilities = Array.from(
    new Set(openShelters.flatMap((s) => s.facilities))
  );

  // フィルタ適用
  const filtered = facilityFilter
    ? openShelters.filter((s) => s.facilities.includes(facilityFilter))
    : openShelters;

  // ソート適用
  const sorted = [...filtered].sort((a, b) => {
    const ratioA = a.currentOccupancy / a.capacity;
    const ratioB = b.currentOccupancy / b.capacity;
    if (sort === "occupancy-asc") return ratioA - ratioB;
    if (sort === "occupancy-desc") return ratioB - ratioA;
    return a.name.localeCompare(b.name, "ja");
  });

  return (
    <section>
      <div
        className="bg-blue-600 text-white rounded-t-2xl px-5 sm:px-6 py-4 flex items-center gap-3"
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

      {/* フィルタ・ソートバー */}
      <div
        className="px-5 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center border-b"
        style={{
          background: "var(--md-surface-container-low)",
          borderColor: "var(--md-outline-variant)",
        }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium" style={{ color: "var(--md-on-surface-variant)" }}>
            <Icon name="filter_list" size={14} className="align-middle mr-1" />
            設備:
          </span>
          <button
            onClick={() => setFacilityFilter(null)}
            className={`text-[11px] px-3 py-1 rounded-full font-medium transition-colors ${
              facilityFilter === null
                ? "bg-blue-600 text-white"
                : "bg-transparent border"
            }`}
            style={
              facilityFilter === null
                ? undefined
                : { borderColor: "var(--md-outline-variant)", color: "var(--md-on-surface-variant)" }
            }
          >
            すべて
          </button>
          {allFacilities.map((f) => (
            <button
              key={f}
              onClick={() => setFacilityFilter(facilityFilter === f ? null : f)}
              className={`text-[11px] px-3 py-1 rounded-full font-medium transition-colors ${
                facilityFilter === f
                  ? "bg-blue-600 text-white"
                  : "bg-transparent border"
              }`}
              style={
                facilityFilter === f
                  ? undefined
                  : { borderColor: "var(--md-outline-variant)", color: "var(--md-on-surface-variant)" }
              }
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-xs" style={{ color: "var(--md-outline)" }}>
            <Icon name="sort" size={14} className="align-middle mr-1" />
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-xs px-2 py-1 rounded-lg border-none"
            style={{
              background: "var(--md-surface-container)",
              color: "var(--md-on-surface)",
            }}
          >
            <option value="occupancy-asc">空き順</option>
            <option value="occupancy-desc">混雑順</option>
            <option value="name">名前順</option>
          </select>
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
        {sorted.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="search_off" size={32} style={{ color: "var(--md-outline)" }} />
            <p className="text-sm mt-2" style={{ color: "var(--md-on-surface-variant)" }}>
              条件に一致する避難所がありません
            </p>
          </div>
        )}
        {sorted.map((shelter) => {
          const { pct, barColor } = occupancyBar(shelter);
          const status = occupancyLabel(shelter);
          return (
            <div key={shelter.id} className="p-5" style={{ borderColor: "var(--md-outline-variant)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold" style={{ color: "var(--md-on-surface)" }}>
                      {shelter.name}
                    </h3>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.text}
                    </span>
                  </div>
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
                    className="text-[11px] px-3 py-1 rounded-full font-medium inline-flex items-center gap-1"
                    style={{
                      background: "var(--md-secondary-container)",
                      color: "var(--md-on-surface-variant)",
                    }}
                  >
                    {facilityIcons[f] && <Icon name={facilityIcons[f]} size={13} />}
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
