import { InfoItem, TierLevel } from "@/types";
import InfoCard from "./InfoCard";

const tierHeaders = {
  1: {
    title: "確定情報",
    subtitle: "公式発表 — 信頼度 100%",
    headerBg: "bg-emerald-600",
    icon: "✅",
  },
  2: {
    title: "報道・確認中情報",
    subtitle: "報道ベース — 公式発表待ち",
    headerBg: "bg-amber-500",
    icon: "📰",
  },
  3: {
    title: "現場の速報・AI抽出",
    subtitle: "未確認情報 — 要注意",
    headerBg: "bg-gray-500",
    icon: "⚠️",
  },
} as const;

export default function TierSection({
  tier,
  items,
}: {
  tier: TierLevel;
  items: InfoItem[];
}) {
  const header = tierHeaders[tier];

  if (items.length === 0) return null;

  return (
    <section>
      <div
        className={`${header.headerBg} text-white rounded-t-xl px-4 py-3 flex items-center gap-2`}
      >
        <span className="text-lg">{header.icon}</span>
        <div>
          <h2 className="text-base font-bold">{header.title}</h2>
          <p className="text-[11px] text-white/80">{header.subtitle}</p>
        </div>
        <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">
          {items.length}件
        </span>
      </div>
      <div className="space-y-3 bg-white rounded-b-xl p-4 shadow-sm">
        {items.map((item) => (
          <InfoCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
