import { disasters, shelters } from "@/data/mock";
import ShelterList from "@/components/ShelterList";
import Icon from "@/components/Icon";

/**
 * 避難所情報ページ
 * 開設中の避難所を収容率・設備フィルタ付きで一覧表示する
 */
export default async function SheltersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disaster = disasters.find((d) => d.id === id)!;

  const openShelters = shelters.filter((s) => s.isOpen);
  const totalCapacity = openShelters.reduce((sum, s) => sum + s.capacity, 0);
  const totalOccupancy = openShelters.reduce((sum, s) => sum + s.currentOccupancy, 0);

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="night_shelter" size={24} filled style={{ color: "var(--md-primary)" }} />
          <h1 className="text-xl font-bold" style={{ color: "var(--md-on-surface)" }}>
            避難所情報
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--md-on-surface-variant)" }}>
          {disaster.region} の開設中避難所一覧
        </p>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in-up stagger-1">
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black" style={{ color: "var(--md-on-surface)" }}>
            {openShelters.length}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>箇所開設</p>
        </div>
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black" style={{ color: "var(--md-on-surface)" }}>
            {totalOccupancy.toLocaleString()}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>人が避難中</p>
        </div>
        <div className="md-card p-4 text-center">
          <p className="text-2xl font-black" style={{ color: "var(--md-on-surface)" }}>
            {(totalCapacity - totalOccupancy).toLocaleString()}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>人分の空き</p>
        </div>
      </div>

      {/* 避難所リスト */}
      <ShelterList shelters={shelters} />
    </div>
  );
}
