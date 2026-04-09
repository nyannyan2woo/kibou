"use client";

import { useState } from "react";
import { InfoItem } from "@/types";
import Icon from "@/components/Icon";

/** ティア別の表示設定（ラベル・色・アイコン） */
const tierConfig = {
  1: {
    label: "確定情報",
    sublabel: "公式発表・信頼度100%",
    color: "border-l-emerald-500",
    bg: "",
    badge: "bg-emerald-100 text-emerald-800",
    icon: "verified",
  },
  2: {
    label: "報道・確認中",
    sublabel: "報道ベース・公式発表待ち",
    color: "border-l-amber-400",
    bg: "",
    badge: "bg-amber-100 text-amber-800",
    icon: "newspaper",
  },
  3: {
    label: "未確認情報",
    sublabel: "SNS情報・AI抽出・要注意",
    color: "border-l-gray-400",
    bg: "",
    badge: "bg-gray-200 text-gray-600",
    icon: "warning",
  },
} as const;

/** カテゴリ別アイコンマッピング */
const categoryIcons: Record<InfoItem["category"], string> = {
  evacuation: "night_shelter",
  lifeline: "power",
  transport: "train",
  medical: "local_hospital",
  weather: "public",
  general: "assignment",
};

/** 日時文字列を「HH:MM」形式にフォーマット */
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Tier3 専用カード — デマ拡散防止のため「ワンタップしないと詳細が読めない」設計
 * 認知のワンクッションを置くことで、未確認情報の無批判な拡散を抑止する
 */
function InfoCardTier3({ item }: { item: InfoItem }) {
  const [revealed, setRevealed] = useState(false);
  const config = tierConfig[3];

  return (
    <div
      className={`md-card border-l-4 ${config.color} overflow-hidden`}
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[11px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 ${config.badge}`}
          >
            <Icon name={config.icon} size={14} filled />
            {config.label}
          </span>
          <span className="text-[11px] text-gray-400">
            {formatTime(item.publishedAt)}
          </span>
        </div>
        <h3 className="text-base font-bold text-gray-700 mb-2">{item.title}</h3>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="mt-2 w-full text-center py-3 px-4 rounded-full text-sm font-medium transition-colors inline-flex items-center justify-center gap-2"
            style={{
              background: "var(--md-surface-container-highest)",
              color: "var(--md-on-surface-variant)",
            }}
          >
            <Icon name="warning" size={16} />
            未確認情報です — タップして詳細を表示
          </button>
        ) : (
          <div className="mt-3 animate-fade-in">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-3 text-xs text-yellow-800 leading-relaxed flex items-start gap-2">
              <Icon name="warning" size={16} className="shrink-0 mt-0.5" />
              <span>この情報は公式に確認されていません。デマの可能性があります。公式発表をお待ちください。</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.detail}
            </p>
            <p className="text-xs text-gray-400 mt-3">
              情報元: {item.source}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** Tier1/Tier2 共通カード — タップで詳細を展開表示 */
function InfoCardDefault({ item }: { item: InfoItem }) {
  const [expanded, setExpanded] = useState(false);
  const config = tierConfig[item.tier as 1 | 2];

  return (
    <div
      className={`md-card border-l-4 ${config.color} overflow-hidden cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Icon name={categoryIcons[item.category]} size={20} filled style={{ color: "var(--md-primary)" }} />
          <span
            className={`text-[11px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 ${config.badge}`}
          >
            <Icon name={config.icon} size={14} filled />
            {config.label}
          </span>
          <span className="text-[11px] text-gray-400">
            {formatTime(item.publishedAt)}
          </span>
          {item.publishedAt !== item.updatedAt && (
            <span className="text-[11px] text-blue-500 font-medium inline-flex items-center gap-0.5">
              <Icon name="update" size={13} />
              {formatTime(item.updatedAt)}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold mb-2" style={{ color: "var(--md-on-surface)" }}>
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--md-on-surface-variant)" }}>
          {item.summary}
        </p>
        {expanded && (
          <div className="mt-4 pt-4 border-t animate-fade-in" style={{ borderColor: "var(--md-outline-variant)" }}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--md-on-surface)" }}>
              {item.detail}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs inline-flex items-center gap-1" style={{ color: "var(--md-outline)" }}>
                <Icon name="source" size={14} />
                {item.source}
              </span>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium underline inline-flex items-center gap-1"
                  style={{ color: "var(--md-primary)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  公式サイト
                  <Icon name="open_in_new" size={13} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** 情報カード — ティアに応じて適切なカードコンポーネントを選択して描画 */
export default function InfoCard({ item }: { item: InfoItem }) {
  if (item.tier === 3) return <InfoCardTier3 item={item} />;
  return <InfoCardDefault item={item} />;
}
