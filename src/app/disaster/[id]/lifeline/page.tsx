import { disasters, lifelineStatuses } from "@/data/mock";
import { LifelinePanel } from "@/components/StatusPanels";
import Icon from "@/components/Icon";

/**
 * ライフラインページ
 * 電気・水道・ガス・通信の稼働状況を一覧表示する
 */
export default async function LifelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disaster = disasters.find((d) => d.id === id)!;

  const disrupted = lifelineStatuses.filter((s) => s.status === "disrupted");
  const normal = lifelineStatuses.filter((s) => s.status === "normal");
  const restored = lifelineStatuses.filter((s) => s.status === "restored");

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="power" size={24} filled style={{ color: "var(--md-primary)" }} />
          <h1 className="text-xl font-bold" style={{ color: "var(--md-on-surface)" }}>
            ライフライン状況
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--md-on-surface-variant)" }}>
          {disaster.region} のインフラ稼働状況
        </p>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in-up stagger-1">
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black text-red-600 dark:text-red-400">{disrupted.length}</p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>障害中</p>
        </div>
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{normal.length}</p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>正常</p>
        </div>
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{restored.length}</p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>復旧済</p>
        </div>
      </div>

      {/* ライフラインパネル */}
      <LifelinePanel statuses={lifelineStatuses} />
    </div>
  );
}
