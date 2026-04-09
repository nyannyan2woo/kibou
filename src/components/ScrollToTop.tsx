"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/Icon";

/** ページトップへ戻るフローティングボタン — スクロール400px以上で表示 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all animate-scale-in"
      style={{
        background: "var(--md-primary-container)",
        color: "var(--md-on-primary-container)",
        boxShadow: "var(--md-elevation-3)",
      }}
      aria-label="ページトップに戻る"
    >
      <Icon name="arrow_upward" size={24} />
    </button>
  );
}
