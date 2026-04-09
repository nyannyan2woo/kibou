import Link from "next/link";
import Icon from "@/components/Icon";

/**
 * トップページ
 * SaaS機能紹介 — Bento Grid Layout で主要機能を視覚的に紹介
 */
export default function Home() {
  const features = [
    {
      icon: "monitoring",
      title: "AIリアルタイム分析",
      desc: "24時間AIが自動で情報を収集・分類。信頼度スコアリングにより、デマやノイズを自動排除し、確度の高い情報のみをリアルタイムに配信します。",
      main: true,
    },
    {
      icon: "layers",
      title: "信頼度レイヤー",
      desc: "情報を確定・報道・未確認の3段階に分類し、信頼度を可視化。",
    },
    {
      icon: "earthquake",
      title: "特設ページ自動生成",
      desc: "大規模災害時にAIが地域別の情報ハブを即座に構築。",
    },
    {
      icon: "night_shelter",
      title: "避難所情報",
      desc: "収容状況・設備をリアルタイムで確認し、最適な避難先を案内。",
    },
    {
      icon: "power",
      title: "ライフライン監視",
      desc: "電気・水道・ガス・通信の稼働状況を一覧でリアルタイム表示。",
    },
    {
      icon: "train",
      title: "交通情報",
      desc: "鉄道・バスの運行情報を一括確認し、移動手段を迅速に把握。",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-16">
      {/* ヒーローセクション */}
      <section className="text-center py-16 animate-fade-in-up">
        <p
          className="text-sm font-bold tracking-widest uppercase mb-4"
          style={{ color: "var(--md-primary)" }}
        >
          防災情報配信プラットフォーム
        </p>
        <h2
          className="text-4xl font-black mb-5 leading-tight"
          style={{ color: "var(--md-on-surface)" }}
        >
          必要な情報を、確実に届ける。
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--md-on-surface-variant)" }}
        >
          AIが24時間体制で情報を収集・分析し、信頼度別に3段階のレイヤーで可視化。
          <br />
          デマやノイズを排除し、本当に必要な防災情報だけをお届けします。
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/disaster/eq-20260409-tokyo"
            className="px-6 py-3 rounded-full text-sm font-bold transition-shadow hover:shadow-lg"
            style={{
              background: "var(--md-primary)",
              color: "var(--md-on-primary)",
            }}
          >
            無料で始める
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 rounded-full text-sm font-bold border transition-colors"
            style={{
              borderColor: "var(--md-outline-variant)",
              color: "var(--md-on-surface)",
            }}
          >
            詳しく見る
          </Link>
        </div>
      </section>

      {/* Bento Grid 機能紹介 */}
      <section id="features" className="animate-fade-in-up stagger-2">
        <h3
          className="text-2xl font-black text-center mb-10"
          style={{ color: "var(--md-on-surface)" }}
        >
          主な機能
        </h3>

        <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`md-card p-6 flex flex-col justify-between overflow-hidden animate-fade-in-up ${
                f.main ? "col-span-2 row-span-2" : ""
              }`}
              style={{
                animationDelay: `${i * 0.06}s`,
                background: f.main
                  ? "var(--md-primary-container)"
                  : "var(--md-surface-container-lowest)",
              }}
            >
              {/* アイコン */}
              <div
                className={`shrink-0 flex items-center justify-center rounded-2xl ${
                  f.main ? "w-14 h-14" : "w-11 h-11"
                }`}
                style={{
                  background: f.main
                    ? "var(--md-primary)"
                    : "var(--md-primary-container)",
                }}
              >
                <Icon
                  name={f.icon}
                  size={f.main ? 28 : 22}
                  filled
                  style={{
                    color: f.main
                      ? "var(--md-on-primary)"
                      : "var(--md-on-primary-container)",
                  }}
                />
              </div>

              {/* メインカードにはグラフのプレースホルダーを表示 */}
              {f.main && (
                <div
                  className="flex-1 my-5 rounded-xl flex items-end gap-2 px-4 pb-4"
                  style={{ background: "var(--md-surface-container-lowest)" }}
                >
                  {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                    (h, j) => (
                      <div
                        key={j}
                        className="flex-1 rounded-t-md transition-all"
                        style={{
                          height: `${h}%`,
                          background:
                            j === 11
                              ? "var(--md-primary)"
                              : "var(--md-primary-container)",
                          opacity: j === 11 ? 1 : 0.6 + j * 0.03,
                        }}
                      />
                    )
                  )}
                </div>
              )}

              {/* テキスト */}
              <div>
                <h4
                  className={`font-bold mb-1 ${f.main ? "text-xl" : "text-sm"}`}
                  style={{
                    color: f.main
                      ? "var(--md-on-primary-container)"
                      : "var(--md-on-surface)",
                  }}
                >
                  {f.title}
                </h4>
                <p
                  className={`leading-relaxed ${f.main ? "text-sm" : "text-xs"}`}
                  style={{
                    color: f.main
                      ? "var(--md-on-primary-container)"
                      : "var(--md-on-surface-variant)",
                    opacity: f.main ? 0.85 : 1,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
