"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

const navItems = [
  { label: "概要", icon: "dashboard", href: "" },
  { label: "情報一覧", icon: "assignment", href: "/info" },
  { label: "避難所", icon: "night_shelter", href: "/shelters" },
  { label: "ライフライン", icon: "power", href: "/lifeline" },
  { label: "交通", icon: "train", href: "/transport" },
];

/** 災害サブページ間のタブナビゲーション */
export default function DisasterNav({ disasterId }: { disasterId: string }) {
  const pathname = usePathname();
  const basePath = `/disaster/${disasterId}`;

  return (
    <nav className="space-y-3">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: "var(--md-primary)" }}
      >
        <Icon name="arrow_back" size={18} />
        トップに戻る
      </Link>
      <div
        className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {navItems.map((item) => {
          const href = `${basePath}${item.href}`;
          const isActive =
            item.href === ""
              ? pathname === basePath
              : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={item.label}
              href={href}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
              style={
                isActive
                  ? {
                      background: "var(--md-primary-container)",
                      color: "var(--md-on-primary-container)",
                    }
                  : {
                      color: "var(--md-on-surface-variant)",
                    }
              }
            >
              <Icon name={item.icon} size={18} filled={isActive} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
