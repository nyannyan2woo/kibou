import { disasters, transportStatuses } from "@/data/mock";
import { TransportPanel } from "@/components/StatusPanels";
import Icon from "@/components/Icon";

/**
 * 交通機関ページ
 * 鉄道・バスの運行情報を一覧表示する
 */
export default async function TransportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disaster = disasters.find((d) => d.id === id)!;

  const suspended = transportStatuses.filter((s) => s.status === "suspended");
  const delayed = transportStatuses.filter((s) => s.status === "delayed");
  const normalOrPartial = transportStatuses.filter(
    (s) => s.status === "normal" || s.status === "partial"
  );

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="train" size={24} filled style={{ color: "var(--md-primary)" }} />
          <h1 className="text-xl font-bold" style={{ color: "var(--md-on-surface)" }}>
            交通機関の運行状況
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--md-on-surface-variant)" }}>
          {disaster.region} の鉄道・バス運行情報
        </p>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in-up stagger-1">
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black text-red-600 dark:text-red-400">{suspended.length}</p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>運休</p>
        </div>
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{delayed.length}</p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>遅延</p>
        </div>
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{normalOrPartial.length}</p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>運行中</p>
        </div>
      </div>

      {/* 交通パネル */}
      <TransportPanel statuses={transportStatuses} />
    </div>
  );
}
