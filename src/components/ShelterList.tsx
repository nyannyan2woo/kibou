import { EvacuationShelter } from "@/types";

const facilityColors: Record<string, string> = {
  飲料水: "bg-blue-100 text-blue-700",
  毛布: "bg-orange-100 text-orange-700",
  簡易トイレ: "bg-purple-100 text-purple-700",
  "Wi-Fi": "bg-cyan-100 text-cyan-700",
  AED: "bg-red-100 text-red-700",
  ペット可: "bg-green-100 text-green-700",
  授乳室: "bg-pink-100 text-pink-700",
};

function occupancyColor(shelter: EvacuationShelter) {
  const ratio = shelter.currentOccupancy / shelter.capacity;
  if (ratio >= 0.8) return "text-red-600";
  if (ratio >= 0.5) return "text-amber-600";
  return "text-emerald-600";
}

function occupancyBar(shelter: EvacuationShelter) {
  const ratio = Math.min(shelter.currentOccupancy / shelter.capacity, 1);
  const pct = Math.round(ratio * 100);
  let barColor = "bg-emerald-400";
  if (ratio >= 0.8) barColor = "bg-red-400";
  else if (ratio >= 0.5) barColor = "bg-amber-400";
  return { pct, barColor };
}

export default function ShelterList({
  shelters,
}: {
  shelters: EvacuationShelter[];
}) {
  const openShelters = shelters.filter((s) => s.isOpen);

  return (
    <section>
      <div className="bg-blue-600 text-white rounded-t-xl px-4 py-3 flex items-center gap-2">
        <span className="text-lg">🏠</span>
        <div>
          <h2 className="text-base font-bold">避難所情報</h2>
          <p className="text-[11px] text-white/80">
            開設中の避難所一覧・収容状況
          </p>
        </div>
        <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">
          {openShelters.length}箇所開設中
        </span>
      </div>
      <div className="bg-white rounded-b-xl shadow-sm divide-y divide-gray-100">
        {openShelters.map((shelter) => {
          const { pct, barColor } = occupancyBar(shelter);
          return (
            <div key={shelter.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    {shelter.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    📍 {shelter.address}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold ${occupancyColor(shelter)}`}
                >
                  {pct}%
                </span>
              </div>
              {/* 収容率バー */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${barColor} rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                <span>
                  収容: {shelter.currentOccupancy} / {shelter.capacity}人
                </span>
              </div>
              {/* 設備タグ */}
              <div className="flex flex-wrap gap-1">
                {shelter.facilities.map((f) => (
                  <span
                    key={f}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      facilityColors[f] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
