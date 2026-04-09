import { notFound } from "next/navigation";
import { disasters } from "@/data/mock";
import DisasterNav from "@/components/DisasterNav";

/** 災害特設ページ共通レイアウト — サブナビゲーション付き */
export default async function DisasterLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disaster = disasters.find((d) => d.id === id);

  if (!disaster) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <DisasterNav disasterId={id} />
      {children}
    </div>
  );
}
