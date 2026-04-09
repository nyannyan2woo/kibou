"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-sm">
            希
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-wide">
              KIBOU
            </h1>
            <p className="text-[10px] text-slate-400 leading-none">
              防災情報配信プラットフォーム
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="hidden sm:inline">
            最終更新: {new Date().toLocaleTimeString("ja-JP")}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            配信中
          </span>
        </div>
      </div>
    </header>
  );
}
