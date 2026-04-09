"use client";

import { useState } from "react";
import { InfoItem } from "@/types";

const tierConfig = {
  1: {
    label: "確定情報",
    sublabel: "公式発表・信頼度100%",
    color: "border-l-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800",
    icon: "✅",
  },
  2: {
    label: "報道・確認中",
    sublabel: "報道ベース・公式発表待ち",
    color: "border-l-amber-400",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
    icon: "📰",
  },
  3: {
    label: "未確認情報",
    sublabel: "SNS情報・AI抽出・要注意",
    color: "border-l-gray-400",
    bg: "bg-gray-50",
    badge: "bg-gray-200 text-gray-600",
    icon: "⚠️",
  },
} as const;

const categoryIcons: Record<InfoItem["category"], string> = {
  evacuation: "🏠",
  lifeline: "🔌",
  transport: "🚃",
  medical: "🏥",
  weather: "🌏",
  general: "📋",
};

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function InfoCardTier3({ item }: { item: InfoItem }) {
  const [revealed, setRevealed] = useState(false);
  const config = tierConfig[3];

  return (
    <div
      className={`border-l-4 ${config.color} ${config.bg} rounded-lg overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badge}`}
          >
            {config.icon} {config.label}
          </span>
          <span className="text-[10px] text-gray-400">
            {formatTime(item.publishedAt)}
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-700 mb-1">{item.title}</h3>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="mt-2 w-full text-center py-2 px-4 bg-gray-200 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-300 transition-colors"
          >
            ⚠️ 未確認情報です — タップして詳細を表示
          </button>
        ) : (
          <div className="mt-2">
            <div className="bg-yellow-100 border border-yellow-300 rounded-md p-2 mb-2 text-[11px] text-yellow-800">
              ⚠️
              この情報は公式に確認されていません。デマの可能性があります。公式発表をお待ちください。
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.detail}
            </p>
            <p className="text-[10px] text-gray-400 mt-2">
              情報元: {item.source}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCardDefault({ item }: { item: InfoItem }) {
  const [expanded, setExpanded] = useState(false);
  const config = tierConfig[item.tier as 1 | 2];

  return (
    <div
      className={`border-l-4 ${config.color} ${config.bg} rounded-lg overflow-hidden cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">{categoryIcons[item.category]}</span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badge}`}
          >
            {config.label}
          </span>
          <span className="text-[10px] text-gray-400">
            {formatTime(item.publishedAt)}
          </span>
          {item.publishedAt !== item.updatedAt && (
            <span className="text-[10px] text-blue-500">
              更新 {formatTime(item.updatedAt)}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>
        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {item.detail}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] text-gray-400">
                情報元: {item.source}
              </span>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-sky-600 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  公式サイト →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InfoCard({ item }: { item: InfoItem }) {
  if (item.tier === 3) return <InfoCardTier3 item={item} />;
  return <InfoCardDefault item={item} />;
}
