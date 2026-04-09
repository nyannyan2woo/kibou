import Link from "next/link";
import { notFound } from "next/navigation";
import {
  disasters,
  infoItems,
  shelters,
  lifelineStatuses,
  transportStatuses,
} from "@/data/mock";
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
 * 災害特設ページ（概要ハブ）
 * ステータスサマリーと各機能ページへのナビゲーションカードを表示する
 */
export default async function DisasterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disaster = disasters.find((d) => d.id === id);
  if (!disaster) notFound();

  const items = infoItems.filter((i) => i.disasterId === id);
  const openShelters = shelters.filter((s) => s.isOpen);
  const disruptedLifelines = lifelineStatuses.filter((s) => s.status === "disrupted");
  const suspendedTransport = transportStatuses.filter(
    (s) => s.status === "suspended" || s.status === "delayed"
  );

  const severityBg = {
    critical: "bg-red-600",
    warning: "bg-orange-500",
    advisory: "bg-yellow-500",
  };

  /** 各機能ページへのナビゲーションカード */
  const featureCards = [
    {
      label: "情報一覧",
      icon: "assignment",
      href: `/disaster/${id}/info`,
      color: "bg-emerald-600",
      count: `${items.length}件`,
      desc: "信頼度レイヤー別の情報",
    },
    {
      label: "避難所",
      icon: "night_shelter",
      href: `/disaster/${id}/shelters`,
      color: "bg-blue-600",
      count: `${openShelters.length}箇所`,
      desc: "開設中の避難所一覧",
    },
    {
      label: "ライフライン",
      icon: "power",
      href: `/disaster/${id}/lifeline`,
      color: disruptedLifelines.length > 0 ? "bg-red-600" : "bg-emerald-600",
      count: disruptedLifelines.length > 0 ? `${disruptedLifelines.length}件障害` : "正常",
      desc: "電気・水道・ガス・通信",
    },
    {
      label: "交通機関",
      icon: "train",
      href: `/disaster/${id}/transport`,
      color: suspendedTransport.length > 0 ? "bg-red-600" : "bg-emerald-600",
      count: suspendedTransport.length > 0 ? `${suspendedTransport.length}路線影響` : "正常",
      desc: "鉄道・バスの運行情報",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
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

      {/* 機能別ナビゲーションカード */}
      <section className="animate-fade-in-up stagger-1">
        <h2
          className="text-base font-bold mb-3 flex items-center gap-2"
          style={{ color: "var(--md-on-surface)" }}
        >
          <Icon name="apps" size={20} filled style={{ color: "var(--md-primary)" }} />
          詳細情報
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {featureCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="md-card overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className={`${card.color} text-white px-4 py-3 flex items-center gap-2`}>
                <Icon name={card.icon} size={20} filled className="text-white" />
                <span className="text-sm font-bold">{card.label}</span>
                <Icon
                  name="chevron_right"
                  size={18}
                  className="ml-auto text-white/60 group-hover:translate-x-0.5 transition-transform"
                />
              </div>
              <div className="p-4">
                <p
                  className="text-lg font-black"
                  style={{ color: "var(--md-on-surface)" }}
                >
                  {card.count}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 緊急連絡先 */}
      <div className="animate-fade-in-up stagger-2">
        <EmergencyContacts />
      </div>
    </div>
  );
}
