import { LifelineStatus, TransportStatus, EvacuationShelter } from "@/types";
import Icon from "@/components/Icon";

/** StatusSummaryコンポーネントのProps */
interface StatusSummaryProps {
  shelters: EvacuationShelter[];
  lifelineStatuses: LifelineStatus[];
  transportStatuses: TransportStatus[];
}

/** 被害状況サマリーカード — 避難所・ライフライン・交通機関の概要を3カラムで表示 */
export default function StatusSummary({
  shelters,
  lifelineStatuses,
  transportStatuses,
}: StatusSummaryProps) {
  const openShelters = shelters.filter((s) => s.isOpen);
  const totalCapacity = openShelters.reduce((sum, s) => sum + s.capacity, 0);
  const totalOccupancy = openShelters.reduce((sum, s) => sum + s.currentOccupancy, 0);
  const disruptedLifelines = lifelineStatuses.filter((s) => s.status === "disrupted").length;
  const suspendedTransport = transportStatuses.filter(
    (s) => s.status === "suspended"
  ).length;

  const cards = [
    {
      icon: "night_shelter",
      label: "避難所",
      value: `${openShelters.length}`,
      unit: "箇所開設",
      sub: `収容 ${totalOccupancy.toLocaleString()} / ${totalCapacity.toLocaleString()}人`,
      color: "bg-blue-600",
    },
    {
      icon: "power_off",
      label: "ライフライン",
      value: `${disruptedLifelines}`,
      unit: "件障害中",
      sub: `全${lifelineStatuses.length}項目中`,
      color: disruptedLifelines > 0 ? "bg-red-600" : "bg-emerald-600",
    },
    {
      icon: "train",
      label: "交通機関",
      value: `${suspendedTransport}`,
      unit: "路線運休",
      sub: `全${transportStatuses.length}路線中`,
      color: suspendedTransport > 0 ? "bg-red-600" : "bg-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="md-card overflow-hidden animate-fade-in-up"
        >
          <div className={`${card.color} text-white px-4 py-2 flex items-center gap-2`}>
            <Icon name={card.icon} size={18} filled className="text-white" />
            <span className="text-xs font-bold">{card.label}</span>
          </div>
          <div className="p-4 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span
                className="text-3xl font-black"
                style={{ color: "var(--md-on-surface)" }}
              >
                {card.value}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--md-on-surface-variant)" }}
              >
                {card.unit}
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--md-outline)" }}>
              {card.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
