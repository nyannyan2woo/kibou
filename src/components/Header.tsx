"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import { disasters } from "@/data/mock";

/** アプリ共通ヘッダー — ロゴ・最終更新時刻・配信ステータスを表示 */
export default function Header() {
  const activeCount = disasters.filter((d) => d.isActive).length;
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 text-white"
      style={{
        background: "var(--md-header-bg)",
        boxShadow: "var(--md-elevation-3)",
      }}
    >
      {/* 災害発生時のアラートバー */}
      {activeCount > 0 && (
        <div className="bg-red-600 text-white text-xs text-center py-1.5 px-4 font-medium animate-urgent-pulse">
          <Icon name="warning" size={14} filled className="mr-1 align-middle" />
          現在 {activeCount} 件の災害情報を配信中です — 最新情報を確認してください
        </div>
      )}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
            <Icon name="shield" size={24} filled className="text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold leading-tight tracking-wide">
              KIBOU
            </h1>
            <p className="text-[10px] sm:text-[11px] text-white/70 leading-none mt-0.5">
              防災情報配信プラットフォーム
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 text-sm text-white/80">
          {time && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs">
              <Icon name="schedule" size={14} />
              {time}
            </span>
          )}
          <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full text-xs font-medium">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            配信中
          </span>
        </div>
      </div>
    </header>
  );
}
