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
import StatusSummary from "@/components/StatusSummary";
import EmergencyContacts from "@/components/EmergencyContacts";
import ElapsedTime from "@/components/ElapsedTime";
import Icon from "@/components/Icon";

/** 災害種別に対応するアイコン名 */
const typeIcons: Record<string, string> = {
  earthquake: "earthquake",
  tsunami: "tsunami",
  typhoon: "cyclone",
  flood: "flood",
  fire: "local_fire_department",
  other: "warning",
};

/**
 * 災害特設ページ
 * 災害IDごとに避難所・ライフライン・交通・3層レイヤー情報を集約表示する
 */
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* 戻るリンク */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: "var(--md-primary)" }}
      >
        <Icon name="arrow_back" size={18} />
        ダッシュボードに戻る
      </Link>

      {/* 災害ヘッダー */}
      <div
        className={`${severityBg[disaster.severity]} text-white rounded-2xl p-5 sm:p-7 animate-fade-in-up`}
        style={{ boxShadow: "var(--md-elevation-3)" }}
      >
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Icon name={typeIcons[disaster.type] || "warning"} size={14} filled />
            特設ページ
          </span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            自動更新中
          </span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <Icon name="timer" size={14} />
            <ElapsedTime since={disaster.occurredAt} />
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-3">{disaster.title}</h1>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
          {disaster.summary}
        </p>
        <div className="flex items-center gap-3 sm:gap-5 mt-4 text-xs sm:text-sm text-white/70 flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Icon name="location_on" size={16} />
            {disaster.region}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="schedule" size={16} />
            発生:{" "}
            {new Date(disaster.occurredAt).toLocaleString("ja-JP", {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* ステータスサマリー */}
      <StatusSummary
        shelters={shelters}
        lifelineStatuses={lifelineStatuses}
        transportStatuses={transportStatuses}
      />

      {/* クイックナビ */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "緊急連絡先", icon: "emergency", href: "#emergency" },
          { label: "避難所", icon: "night_shelter", href: "#shelters" },
          { label: "ライフライン", icon: "power", href: "#lifeline" },
          { label: "交通", icon: "train", href: "#transport" },
          { label: "情報一覧", icon: "assignment", href: "#info" },
        ].map((nav) => (
          <a
            key={nav.label}
            href={nav.href}
            className="md-card flex flex-col items-center gap-2 py-4 px-2 hover:shadow-lg transition-shadow text-center"
          >
            <Icon name={nav.icon} size={28} filled style={{ color: "var(--md-primary)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--md-on-surface)" }}>
              {nav.label}
            </span>
          </a>
        ))}
      </div>

      {/* 緊急連絡先 */}
      <div id="emergency">
        <EmergencyContacts />
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
      <div id="info" className="space-y-6 sm:space-y-8">
        <TierSection tier={1} items={itemsByTier(1)} />
        <TierSection tier={2} items={itemsByTier(2)} />
        <TierSection tier={3} items={itemsByTier(3)} />
      </div>
    </div>
  );
}
