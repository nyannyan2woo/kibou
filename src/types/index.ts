/** 情報の信頼度レイヤー（1: 確定情報, 2: 報道・確認中, 3: 未確認情報） */
export type TierLevel = 1 | 2 | 3;

/** 災害の基本情報を表すインターフェース */
export interface DisasterInfo {
  id: string;
  title: string;
  type: "earthquake" | "tsunami" | "typhoon" | "flood" | "fire" | "other";
  region: string;
  occurredAt: string;
  severity: "critical" | "warning" | "advisory";
  isActive: boolean;
  summary: string;
}

/** 信頼度レイヤーに分類された個別の情報項目 */
export interface InfoItem {
  id: string;
  /** 紐づく災害ID */
  disasterId: string;
  /** 情報の信頼度レイヤー */
  tier: TierLevel;
  category: "evacuation" | "lifeline" | "transport" | "medical" | "weather" | "general";
  title: string;
  summary: string;
  detail: string;
  source: string;
  sourceUrl?: string;
  publishedAt: string;
  updatedAt: string;
}

/** 避難所の情報（位置・収容状況・設備） */
export interface EvacuationShelter {
  id: string;
  name: string;
  address: string;
  capacity: number;
  currentOccupancy: number;
  isOpen: boolean;
  lat: number;
  lng: number;
  facilities: string[];
}

/** ライフライン（電気・水道・ガス・通信）の稼働状況 */
export interface LifelineStatus {
  id: string;
  type: "electricity" | "water" | "gas" | "telecom";
  area: string;
  status: "normal" | "disrupted" | "restored";
  detail: string;
  updatedAt: string;
}

/** 交通機関の運行状況 */
export interface TransportStatus {
  id: string;
  line: string;
  operator: string;
  status: "normal" | "delayed" | "suspended" | "partial";
  detail: string;
  updatedAt: string;
}
