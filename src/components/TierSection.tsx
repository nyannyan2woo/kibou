import { InfoItem, TierLevel } from "@/types";
import InfoCard from "./InfoCard";

/** ティアごとのセクションヘッダー設定 */
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

/** 信頼度レイヤーセクション — ヘッダーと情報カード一覧を描画 */
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
        className={`${header.headerBg} text-white rounded-t-2xl px-6 py-4 flex items-center gap-3`}
        style={{ boxShadow: "var(--md-elevation-1)" }}
      >
        <span className="text-xl">{header.icon}</span>
        <div>
          <h2 className="text-lg font-bold">{header.title}</h2>
          <p className="text-xs text-white/80 mt-0.5">{header.subtitle}</p>
        </div>
        <span className="ml-auto text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
          {items.length}件
        </span>
      </div>
      <div
        className="rounded-b-2xl p-5 space-y-4"
        style={{
          background: "var(--md-surface-container-lowest)",
          boxShadow: "var(--md-elevation-1)",
        }}
      >
        {items.map((item) => (
          <InfoCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
