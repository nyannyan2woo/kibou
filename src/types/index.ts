export type TierLevel = 1 | 2 | 3;

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

export interface InfoItem {
  id: string;
  disasterId: string;
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

export interface LifelineStatus {
  id: string;
  type: "electricity" | "water" | "gas" | "telecom";
  area: string;
  status: "normal" | "disrupted" | "restored";
  detail: string;
  updatedAt: string;
}

export interface TransportStatus {
  id: string;
  line: string;
  operator: string;
  status: "normal" | "delayed" | "suspended" | "partial";
  detail: string;
  updatedAt: string;
}
