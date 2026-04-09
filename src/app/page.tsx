import { disasters, infoItems } from "@/data/mock";
import { TierLevel } from "@/types";
import DisasterBanner from "@/components/DisasterBanner";
import TierSection from "@/components/TierSection";
import Icon from "@/components/Icon";

/**
 * トップページ（ダッシュボード）
 * アクティブな災害があれば速報バナーと3層レイヤー情報を表示し、
 * 災害がない場合は平常時メッセージを描画する
 */
export default function Home() {
  const activeDisasters = disasters.filter((d) => d.isActive);
  const latestDisaster = activeDisasters[0];

  /** 指定ティアの情報を更新日時の降順で取得 */
  const itemsByTier = (tier: TierLevel) =>
    infoItems
      .filter((i) => i.tier === tier && i.disasterId === latestDisaster?.id)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

  const totalInfoCount = latestDisaster
    ? infoItems.filter((i) => i.disasterId === latestDisaster.id).length
    : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* 災害速報バナー */}
      {activeDisasters.length > 0 && (
        <section className="space-y-4">
          {activeDisasters.map((d) => (
            <DisasterBanner key={d.id} disaster={d} />
          ))}
        </section>
      )}

      {/* コアコンセプト説明 */}
      <div className="md-card-elevated p-5 sm:p-6 animate-fade-in-up stagger-1">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0"
            style={{ background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }}
          >
            <Icon name="info" size={24} filled />
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--md-on-surface)" }}>
              KIBOUについて
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--md-on-surface-variant)" }}>
              本アプリは信頼性の高い情報のみを配信する「マスメディア型」防災アプリです。
              ユーザーからの情報発信機能はありません。AIが24時間自動で情報を収集・分類し、
              信頼度別に3段階のレイヤーで可視化してお届けします。
            </p>
          </div>
        </div>
      </div>

      {/* 信頼度レイヤーの説明（災害時） */}
      {latestDisaster && (
        <div className="md-card p-5 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="layers" size={20} filled style={{ color: "var(--md-primary)" }} />
            <h3 className="text-sm font-bold" style={{ color: "var(--md-on-surface)" }}>
              情報の信頼度レイヤー
            </h3>
            <span
              className="ml-auto text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: "var(--md-primary-container)",
                color: "var(--md-on-primary-container)",
              }}
            >
              全{totalInfoCount}件
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { tier: "Tier 1", label: "確定情報", desc: "公式発表・信頼度100%", color: "bg-emerald-500", icon: "verified" },
              { tier: "Tier 2", label: "報道ベース", desc: "公式発表待ち", color: "bg-amber-500", icon: "newspaper" },
              { tier: "Tier 3", label: "未確認情報", desc: "SNS抽出・要注意", color: "bg-gray-500", icon: "warning" },
            ].map((t) => (
              <div key={t.tier} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--md-surface-container)" }}>
                <div className={`w-10 h-10 ${t.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon name={t.icon} size={20} filled className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--md-on-surface)" }}>{t.label}</p>
                  <p className="text-[11px]" style={{ color: "var(--md-outline)" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3層レイヤー情報 */}
      {latestDisaster && (
        <div className="space-y-6 sm:space-y-8">
          <TierSection tier={1} items={itemsByTier(1)} />
          <TierSection tier={2} items={itemsByTier(2)} />
          <TierSection tier={3} items={itemsByTier(3)} />
        </div>
      )}

      {/* 災害なし時 */}
      {activeDisasters.length === 0 && (
        <div className="md-card text-center py-20 sm:py-24 px-6 sm:px-8 animate-scale-in">
          <div className="mb-6">
            <Icon name="sunny" size={64} style={{ color: "var(--md-primary)" }} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "var(--md-on-surface)" }}>
            現在、災害情報はありません
          </h2>
          <p className="text-sm sm:text-base" style={{ color: "var(--md-on-surface-variant)" }}>
            災害発生時は自動で特設ページが生成されます。
          </p>
          <div
            className="mt-8 inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full"
            style={{
              background: "var(--md-surface-container)",
              color: "var(--md-on-surface-variant)",
            }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            システム正常稼働中 — 24時間監視中
          </div>
        </div>
      )}
    </div>
  );
}
