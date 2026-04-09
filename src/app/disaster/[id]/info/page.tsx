import { disasters, infoItems } from "@/data/mock";
import { TierLevel } from "@/types";
import TierSection from "@/components/TierSection";
import Icon from "@/components/Icon";

/**
 * 情報一覧ページ
 * 信頼度レイヤー別（Tier 1〜3）の情報を表示する
 */
export default async function InfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disaster = disasters.find((d) => d.id === id)!;

  const items = infoItems.filter((i) => i.disasterId === id);
  const itemsByTier = (tier: TierLevel) =>
    items
      .filter((i) => i.tier === tier)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ページヘッダー */}
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="assignment" size={24} filled style={{ color: "var(--md-primary)" }} />
          <h1 className="text-xl font-bold" style={{ color: "var(--md-on-surface)" }}>
            情報一覧
          </h1>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: "var(--md-primary-container)",
              color: "var(--md-on-primary-container)",
            }}
          >
            全{items.length}件
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--md-on-surface-variant)" }}>
          {disaster.title} に関する情報を信頼度レイヤー別に表示しています
        </p>
      </div>

      {/* 信頼度レイヤー説明 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in-up stagger-1">
        {[
          { label: "確定情報", count: itemsByTier(1).length, color: "bg-emerald-500", icon: "verified" },
          { label: "報道ベース", count: itemsByTier(2).length, color: "bg-amber-500", icon: "newspaper" },
          { label: "未確認情報", count: itemsByTier(3).length, color: "bg-gray-500", icon: "warning" },
        ].map((t) => (
          <div
            key={t.label}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: "var(--md-surface-container)" }}
          >
            <div className={`w-10 h-10 ${t.color} rounded-xl flex items-center justify-center shrink-0`}>
              <Icon name={t.icon} size={20} filled className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--md-on-surface)" }}>{t.label}</p>
              <p className="text-lg font-black" style={{ color: "var(--md-on-surface)" }}>{t.count}件</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3層レイヤー情報 */}
      <div className="space-y-6 sm:space-y-8">
        <TierSection tier={1} items={itemsByTier(1)} />
        <TierSection tier={2} items={itemsByTier(2)} />
        <TierSection tier={3} items={itemsByTier(3)} />
      </div>
    </div>
  );
}
