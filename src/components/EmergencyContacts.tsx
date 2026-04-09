import Icon from "@/components/Icon";

/** 緊急連絡先データ（警察・消防・海保・災害用伝言ダイヤル） */
const contacts = [
  { label: "警察", number: "110", icon: "local_police", color: "bg-blue-600" },
  { label: "消防・救急", number: "119", icon: "local_fire_department", color: "bg-red-600" },
  { label: "海上保安庁", number: "118", icon: "sailing", color: "bg-cyan-700" },
  { label: "災害用伝言ダイヤル", number: "171", icon: "record_voice_over", color: "bg-purple-600" },
];

/** 緊急連絡先パネル — タップで電話発信できるカード型UI */
export default function EmergencyContacts() {
  return (
    <section>
      <div
        className="bg-red-700 text-white rounded-t-2xl px-6 py-4 flex items-center gap-3"
        style={{ boxShadow: "var(--md-elevation-1)" }}
      >
        <Icon name="emergency" size={22} filled className="text-white" />
        <div>
          <h2 className="text-lg font-bold">緊急連絡先</h2>
          <p className="text-xs text-white/80 mt-0.5">タップで発信できます</p>
        </div>
      </div>
      <div
        className="rounded-b-2xl grid grid-cols-2 sm:grid-cols-4 gap-px"
        style={{
          background: "var(--md-outline-variant)",
          boxShadow: "var(--md-elevation-1)",
        }}
      >
        {contacts.map((c) => (
          <a
            key={c.number}
            href={`tel:${c.number}`}
            className="flex flex-col items-center gap-2 py-5 px-3 text-center transition-colors hover:opacity-90"
            style={{ background: "var(--md-surface-container-lowest)" }}
          >
            <div
              className={`w-12 h-12 ${c.color} rounded-full flex items-center justify-center`}
            >
              <Icon name={c.icon} size={24} filled className="text-white" />
            </div>
            <span className="text-2xl font-bold" style={{ color: "var(--md-on-surface)" }}>
              {c.number}
            </span>
            <span className="text-xs font-medium" style={{ color: "var(--md-outline)" }}>
              {c.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
