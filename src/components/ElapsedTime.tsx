"use client";

import { useState, useEffect } from "react";

/** 経過時間を「〇時間〇分前」形式で自動更新表示するコンポーネント */
export default function ElapsedTime({ since }: { since: string }) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    function update() {
      const diff = Date.now() - new Date(since).getTime();
      if (diff < 0) {
        setElapsed("まもなく");
        return;
      }
      const mins = Math.floor(diff / 60000);
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        setElapsed(`${days}日${hours % 24}時間前`);
      } else if (hours > 0) {
        setElapsed(`${hours}時間${mins % 60}分前`);
      } else if (mins > 0) {
        setElapsed(`${mins}分前`);
      } else {
        setElapsed("たった今");
      }
    }

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [since]);

  return <span>{elapsed}</span>;
}
