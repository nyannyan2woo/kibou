"use client";

import Link from "next/link";

/** アプリ共通ヘッダー — ロゴ・最終更新時刻・配信ステータスを表示 */
export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 text-white"
      style={{
        background: "var(--md-primary)",
        boxShadow: "var(--md-elevation-3)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-base">
            希
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight tracking-wide">
              KIBOU
            </h1>
            <p className="text-[11px] text-white/70 leading-none mt-0.5">
              防災情報配信プラットフォーム
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-4 text-sm text-white/80">
          <span className="hidden sm:inline">
            最終更新: {new Date().toLocaleTimeString("ja-JP")}
          </span>
          <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full text-xs font-medium">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            配信中
          </span>
        </div>
      </div>
    </header>
  );
}
