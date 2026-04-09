import { disasters, infoItems } from "@/data/mock";
import { TierLevel } from "@/types";
import DisasterBanner from "@/components/DisasterBanner";
import TierSection from "@/components/TierSection";

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

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      {/* 災害速報バナー */}
      {activeDisasters.length > 0 && (
        <section className="space-y-4">
          {activeDisasters.map((d) => (
            <DisasterBanner key={d.id} disaster={d} />
          ))}
        </section>
      )}

      {/* コアコンセプト説明 */}
      <div className="md-card-elevated p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0"
            style={{ background: "var(--md-primary-container)", color: "var(--md-on-primary-container)" }}
          >
            ℹ️
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

      {/* 3層レイヤー情報 */}
      {latestDisaster && (
        <div className="space-y-8">
          <TierSection tier={1} items={itemsByTier(1)} />
          <TierSection tier={2} items={itemsByTier(2)} />
          <TierSection tier={3} items={itemsByTier(3)} />
        </div>
      )}

      {/* 災害なし時 */}
      {activeDisasters.length === 0 && (
        <div className="md-card text-center py-24 px-8">
          <div className="text-6xl mb-6">🌤️</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--md-on-surface)" }}>
            現在、災害情報はありません
          </h2>
          <p className="text-base" style={{ color: "var(--md-on-surface-variant)" }}>
            災害発生時は自動で特設ページが生成されます。
          </p>
        </div>
      )}
    </div>
  );
}
