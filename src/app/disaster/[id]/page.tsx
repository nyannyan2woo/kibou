import Link from "next/link";
import { notFound } from "next/navigation";
import {
  disasters,
  infoItems,
  shelters,
  lifelineStatuses,
  transportStatuses,
} from "@/data/mock";
import { TierLevel } from "@/types";
import TierSection from "@/components/TierSection";
import ShelterList from "@/components/ShelterList";
import { LifelinePanel, TransportPanel } from "@/components/StatusPanels";

export default async function DisasterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disaster = disasters.find((d) => d.id === id);

  if (!disaster) {
    notFound();
  }

  const items = infoItems.filter((i) => i.disasterId === id);
  const itemsByTier = (tier: TierLevel) =>
    items
      .filter((i) => i.tier === tier)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

  const severityBg = {
    critical: "bg-red-600",
    warning: "bg-orange-500",
    advisory: "bg-yellow-500",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* 戻るリンク */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        ← ダッシュボードに戻る
      </Link>

      {/* 災害ヘッダー */}
      <div
        className={`${severityBg[disaster.severity]} text-white rounded-xl p-5 shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
            特設ページ
          </span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            自動更新中
          </span>
        </div>
        <h1 className="text-xl font-bold mb-2">{disaster.title}</h1>
        <p className="text-sm text-white/90 leading-relaxed">
          {disaster.summary}
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs text-white/70">
          <span>📍 {disaster.region}</span>
          <span>
            🕐 発生:{" "}
            {new Date(disaster.occurredAt).toLocaleString("ja-JP", {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* クイックナビ */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "避難所", icon: "🏠", href: "#shelters" },
          { label: "ライフライン", icon: "🔌", href: "#lifeline" },
          { label: "交通", icon: "🚃", href: "#transport" },
          { label: "情報一覧", icon: "📋", href: "#info" },
        ].map((nav) => (
          <a
            key={nav.label}
            href={nav.href}
            className="flex flex-col items-center gap-1 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <span className="text-xl">{nav.icon}</span>
            <span className="text-[11px] font-medium text-gray-700">
              {nav.label}
            </span>
          </a>
        ))}
      </div>

      {/* 避難所情報 */}
      <div id="shelters">
        <ShelterList shelters={shelters} />
      </div>

      {/* ライフライン */}
      <div id="lifeline">
        <LifelinePanel statuses={lifelineStatuses} />
      </div>

      {/* 交通機関 */}
      <div id="transport">
        <TransportPanel statuses={transportStatuses} />
      </div>

      {/* 信頼度レイヤー情報 */}
      <div id="info" className="space-y-6">
        <TierSection tier={1} items={itemsByTier(1)} />
        <TierSection tier={2} items={itemsByTier(2)} />
        <TierSection tier={3} items={itemsByTier(3)} />
      </div>
    </div>
  );
}
