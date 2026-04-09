import {
  DisasterInfo,
  InfoItem,
  EvacuationShelter,
  LifelineStatus,
  TransportStatus,
} from "@/types";

/**
 * モックデータ
 * 本番環境ではAIが自動収集した情報源（気象庁API・自治体発表等）から取得する
 */

/** 災害一覧（アクティブ／過去の災害） */
export const disasters: DisasterInfo[] = [
  {
    id: "eq-20260409-tokyo",
    title: "令和8年 東京都南部地震",
    type: "earthquake",
    region: "東京都・神奈川県",
    occurredAt: "2026-04-09T06:32:00+09:00",
    severity: "critical",
    isActive: true,
    summary:
      "本日6時32分頃、東京都南部を震源とするM6.8の地震が発生。最大震度6強を観測。津波の心配はありません。",
  },
  {
    id: "typhoon-20260401",
    title: "台風3号接近情報",
    type: "typhoon",
    region: "九州・四国地方",
    occurredAt: "2026-04-01T00:00:00+09:00",
    severity: "advisory",
    isActive: false,
    summary: "台風3号は温帯低気圧に変わりました。",
  },
];

/** 3層レイヤーに分類された情報項目（Tier 1〜3） */
export const infoItems: InfoItem[] = [
  // === Tier 1: 確定情報 ===
  {
    id: "info-001",
    disasterId: "eq-20260409-tokyo",
    tier: 1,
    category: "weather",
    title: "【気象庁発表】東京都南部 震度6強",
    summary:
      "震源：東京都南部（深さ約40km）、マグニチュード6.8。津波の心配はありません。余震に警戒してください。",
    detail:
      "2026年4月9日6時32分頃、東京都南部を震源とする地震が発生しました。震源の深さは約40km、地震の規模（マグニチュード）は6.8と推定されます。この地震による津波の心配はありません。震度6強を東京都大田区、品川区で観測。震度6弱を世田谷区、目黒区、川崎市で観測しています。今後1週間程度は最大震度6強程度の地震に注意してください。",
    source: "気象庁",
    sourceUrl: "https://www.jma.go.jp/",
    publishedAt: "2026-04-09T06:35:00+09:00",
    updatedAt: "2026-04-09T06:40:00+09:00",
  },
  {
    id: "info-002",
    disasterId: "eq-20260409-tokyo",
    tier: 1,
    category: "evacuation",
    title: "【東京都】避難所開設状況",
    summary:
      "大田区・品川区・世田谷区で計47箇所の避難所が開設されています。最寄りの避難所に向かってください。",
    detail:
      "東京都災害対策本部より発表。大田区18箇所、品川区15箇所、世田谷区14箇所の指定避難所が開設されています。各避難所では飲料水・毛布の配布を開始しています。ペットの同行避難が可能です。",
    source: "東京都災害対策本部",
    publishedAt: "2026-04-09T07:00:00+09:00",
    updatedAt: "2026-04-09T08:30:00+09:00",
  },
  {
    id: "info-003",
    disasterId: "eq-20260409-tokyo",
    tier: 1,
    category: "lifeline",
    title: "【東京電力】停電情報",
    summary:
      "大田区・品川区を中心に約12万戸が停電中。復旧見込みは本日15時頃。",
    detail:
      "東京電力パワーグリッドより発表。地震の影響により、大田区約5万戸、品川区約4万戸、世田谷区約3万戸の計約12万戸で停電が発生しています。復旧作業を進めており、本日15時頃の復旧を見込んでいます。",
    source: "東京電力パワーグリッド",
    sourceUrl: "https://teideninfo.tepco.co.jp/",
    publishedAt: "2026-04-09T07:15:00+09:00",
    updatedAt: "2026-04-09T09:00:00+09:00",
  },
  {
    id: "info-004",
    disasterId: "eq-20260409-tokyo",
    tier: 1,
    category: "lifeline",
    title: "【東京都水道局】断水情報",
    summary:
      "品川区の一部地域で断水が発生。給水車を5箇所に配備済みです。",
    detail:
      "東京都水道局より発表。品川区東品川、南品川、西品川の一部地域で断水が発生しています。給水車を品川区役所前、東品川公園、南品川小学校、大井町駅前、品川シーサイド駅前の5箇所に配備しています。",
    source: "東京都水道局",
    publishedAt: "2026-04-09T07:30:00+09:00",
    updatedAt: "2026-04-09T08:00:00+09:00",
  },
  // === Tier 2: 報道・確認中情報 ===
  {
    id: "info-005",
    disasterId: "eq-20260409-tokyo",
    tier: 2,
    category: "transport",
    title: "【NHK報道】首都圏の鉄道 運転見合わせ相次ぐ",
    summary:
      "JR東日本・東急・京急など首都圏の主要路線で運転見合わせ。安全確認中。",
    detail:
      "NHKの報道によると、JR東日本は山手線、京浜東北線、東海道線など首都圏の全路線で運転を見合わせています。東急電鉄、京急電鉄も全路線で運転見合わせ中。JR東日本は安全確認が完了次第、順次運転を再開する予定としています。",
    source: "NHK",
    sourceUrl: "https://www3.nhk.or.jp/",
    publishedAt: "2026-04-09T06:50:00+09:00",
    updatedAt: "2026-04-09T07:30:00+09:00",
  },
  {
    id: "info-006",
    disasterId: "eq-20260409-tokyo",
    tier: 2,
    category: "medical",
    title: "【報道】大田区内の病院で負傷者の受入開始",
    summary:
      "大田区内の3つの救急病院が負傷者の受入を開始。軽傷者は近隣のクリニックへ。",
    detail:
      "テレビ朝日の報道によると、東邦大学医療センター大森病院、大田病院、荏原病院で地震による負傷者の受入を開始しています。骨折や打撲などの重傷者を優先的に受け入れており、軽傷の方は近隣のクリニックでの受診を呼びかけています。",
    source: "テレビ朝日",
    publishedAt: "2026-04-09T07:45:00+09:00",
    updatedAt: "2026-04-09T08:15:00+09:00",
  },
  {
    id: "info-007",
    disasterId: "eq-20260409-tokyo",
    tier: 2,
    category: "general",
    title: "【共同通信】政府、災害対策本部を設置",
    summary:
      "政府は非常災害対策本部を設置。自衛隊の派遣要請を検討中。",
    detail:
      "共同通信の報道によると、政府は本日7時に非常災害対策本部を設置しました。内閣総理大臣は「人命救助を最優先に、あらゆる手段を講じる」と述べ、自衛隊の災害派遣要請を検討しているとのことです。",
    source: "共同通信",
    publishedAt: "2026-04-09T07:20:00+09:00",
    updatedAt: "2026-04-09T07:20:00+09:00",
  },
  // === Tier 3: 現場の速報・AI抽出 ===
  {
    id: "info-008",
    disasterId: "eq-20260409-tokyo",
    tier: 3,
    category: "general",
    title: "【SNS情報】大田区蒲田付近で火災の可能性",
    summary:
      "SNS上で大田区蒲田駅東口付近での火災発生を示唆する投稿が複数確認されています。公式発表はまだありません。",
    detail:
      "AI分析により、X（旧Twitter）上で「蒲田 火事」「蒲田 煙」などのキーワードを含む投稿が30分間で127件検出されました。複数の投稿に煙の画像が添付されていますが、公式な消防・自治体からの発表は確認されていません。情報の真偽は未確定です。",
    source: "AI自動抽出（SNS分析）",
    publishedAt: "2026-04-09T07:50:00+09:00",
    updatedAt: "2026-04-09T07:50:00+09:00",
  },
  {
    id: "info-009",
    disasterId: "eq-20260409-tokyo",
    tier: 3,
    category: "lifeline",
    title: "【SNS情報】品川区でガス漏れの報告",
    summary:
      "品川区北品川付近でガスの臭いがするとの投稿が複数あります。東京ガスの公式発表を待ってください。",
    detail:
      "AI分析により、「北品川 ガス臭い」「品川 ガス漏れ」などのキーワードを含む投稿が15件検出されました。東京ガスおよび品川区からの公式発表はまだありません。ガスの臭いがする場合は窓を開け、火気の使用を避けてください。",
    source: "AI自動抽出（SNS分析）",
    publishedAt: "2026-04-09T08:10:00+09:00",
    updatedAt: "2026-04-09T08:10:00+09:00",
  },
];

/** 開設中の避難所リスト */
export const shelters: EvacuationShelter[] = [
  {
    id: "shelter-001",
    name: "大田区立大森第一小学校",
    address: "東京都大田区大森北4-27-3",
    capacity: 300,
    currentOccupancy: 87,
    isOpen: true,
    lat: 35.5876,
    lng: 139.7285,
    facilities: ["飲料水", "毛布", "簡易トイレ", "Wi-Fi"],
  },
  {
    id: "shelter-002",
    name: "品川区立品川学園",
    address: "東京都品川区北品川3-9-30",
    capacity: 500,
    currentOccupancy: 213,
    isOpen: true,
    lat: 35.621,
    lng: 139.7389,
    facilities: ["飲料水", "毛布", "簡易トイレ", "AED", "ペット可"],
  },
  {
    id: "shelter-003",
    name: "世田谷区立駒沢中学校",
    address: "東京都世田谷区駒沢2-10-1",
    capacity: 400,
    currentOccupancy: 45,
    isOpen: true,
    lat: 35.633,
    lng: 139.6612,
    facilities: ["飲料水", "毛布", "簡易トイレ"],
  },
  {
    id: "shelter-004",
    name: "大田区民ホール・アプリコ",
    address: "東京都大田区蒲田5-37-3",
    capacity: 800,
    currentOccupancy: 356,
    isOpen: true,
    lat: 35.5625,
    lng: 139.7161,
    facilities: ["飲料水", "毛布", "簡易トイレ", "Wi-Fi", "AED", "ペット可", "授乳室"],
  },
  {
    id: "shelter-005",
    name: "川崎市立川崎総合科学高等学校",
    address: "神奈川県川崎市幸区小向仲野町5-1",
    capacity: 350,
    currentOccupancy: 0,
    isOpen: true,
    lat: 35.5459,
    lng: 139.6863,
    facilities: ["飲料水", "毛布"],
  },
];

/** ライフラインの稼働状況（電気・水道・ガス・通信） */
export const lifelineStatuses: LifelineStatus[] = [
  {
    id: "ll-001",
    type: "electricity",
    area: "大田区",
    status: "disrupted",
    detail: "約5万戸が停電中。復旧見込み：15時頃",
    updatedAt: "2026-04-09T09:00:00+09:00",
  },
  {
    id: "ll-002",
    type: "electricity",
    area: "品川区",
    status: "disrupted",
    detail: "約4万戸が停電中。復旧見込み：15時頃",
    updatedAt: "2026-04-09T09:00:00+09:00",
  },
  {
    id: "ll-003",
    type: "water",
    area: "品川区（東品川・南品川・西品川）",
    status: "disrupted",
    detail: "断水中。給水車を5箇所に配備済み",
    updatedAt: "2026-04-09T08:00:00+09:00",
  },
  {
    id: "ll-004",
    type: "gas",
    area: "大田区・品川区",
    status: "normal",
    detail: "供給に異常なし（公式発表済み）",
    updatedAt: "2026-04-09T08:30:00+09:00",
  },
  {
    id: "ll-005",
    type: "telecom",
    area: "東京都南部全域",
    status: "disrupted",
    detail: "携帯電話がつながりにくい状況。災害用伝言板をご利用ください",
    updatedAt: "2026-04-09T07:45:00+09:00",
  },
];

/** 交通機関の運行情報 */
export const transportStatuses: TransportStatus[] = [
  {
    id: "tr-001",
    line: "山手線",
    operator: "JR東日本",
    status: "suspended",
    detail: "全線運転見合わせ中。安全確認実施中",
    updatedAt: "2026-04-09T07:00:00+09:00",
  },
  {
    id: "tr-002",
    line: "京浜東北線",
    operator: "JR東日本",
    status: "suspended",
    detail: "全線運転見合わせ中",
    updatedAt: "2026-04-09T07:00:00+09:00",
  },
  {
    id: "tr-003",
    line: "東海道線",
    operator: "JR東日本",
    status: "suspended",
    detail: "東京〜小田原間で運転見合わせ中",
    updatedAt: "2026-04-09T07:00:00+09:00",
  },
  {
    id: "tr-004",
    line: "東急東横線",
    operator: "東急電鉄",
    status: "suspended",
    detail: "全線運転見合わせ中",
    updatedAt: "2026-04-09T07:10:00+09:00",
  },
  {
    id: "tr-005",
    line: "京急本線",
    operator: "京急電鉄",
    status: "suspended",
    detail: "全線運転見合わせ中",
    updatedAt: "2026-04-09T07:05:00+09:00",
  },
  {
    id: "tr-006",
    line: "東京メトロ各線",
    operator: "東京メトロ",
    status: "delayed",
    detail: "全線で速度規制による遅延（15〜30分程度）",
    updatedAt: "2026-04-09T08:00:00+09:00",
  },
];
