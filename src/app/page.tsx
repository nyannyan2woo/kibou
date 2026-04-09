import { disasters, infoItems } from "@/data/mock";
import { TierLevel } from "@/types";
import DisasterBanner from "@/components/DisasterBanner";
import TierSection from "@/components/TierSection";

export default function Home() {
  const activeDisasters = disasters.filter((d) => d.isActive);
  const latestDisaster = activeDisasters[0];

  const itemsByTier = (tier: TierLevel) =>
    infoItems
      .filter((i) => i.tier === tier && i.disasterId === latestDisaster?.id)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* 災害速報バナー */}
      {activeDisasters.length > 0 && (
        <section className="space-y-3">
          {activeDisasters.map((d) => (
            <DisasterBanner key={d.id} disaster={d} />
          ))}
        </section>
      )}

      {/* コアコンセプト説明 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 font-bold shrink-0">
            ℹ️
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              KIBOUについて
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              本アプリは信頼性の高い情報のみを配信する「マスメディア型」防災アプリです。
              ユーザーからの情報発信機能はありません。AIが24時間自動で情報を収集・分類し、
              信頼度別に3段階のレイヤーで可視化してお届けします。
            </p>
          </div>
        </div>
      </div>

      {/* 3層レイヤー情報 */}
      {latestDisaster && (
        <>
          <TierSection tier={1} items={itemsByTier(1)} />
          <TierSection tier={2} items={itemsByTier(2)} />
          <TierSection tier={3} items={itemsByTier(3)} />
        </>
      )}

      {/* 災害なし時 */}
      {activeDisasters.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🌤️</div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">
            現在、災害情報はありません
          </h2>
          <p className="text-sm text-slate-500">
            災害発生時は自動で特設ページが生成されます。
          </p>
        </div>
      )}
    </div>
  );
}
